import axios from 'axios';
import { AnimeResult } from '../types';

const TRACE_MOE_API = 'https://api.trace.moe/search';
const JIKAN_API = 'https://api.jikan.moe/v4';

// Custom error logging function
function logError(message: string, error: unknown) {
  console.log(`${message}: ${error instanceof Error ? error.message : String(error)}`);
}

export async function searchAnime(input: File | string): Promise<AnimeResult[]> {
  try {
    let traceResponse;
    if (typeof input === 'string') {
      // Search by URL
      traceResponse = await axios.get(`${TRACE_MOE_API}?anilistInfo&url=${encodeURIComponent(input)}`);
    } else {
      // Search by file upload
      const formData = new FormData();
      formData.append('image', input);
      traceResponse = await axios.post(`${TRACE_MOE_API}?anilistInfo`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
    }

    const animeResults: AnimeResult[] = [];

    // Process trace.moe results
    for (const result of traceResponse.data.result) {
      try {
        // Fetch additional info from Jikan API
        const jikanResponse = await axios.get(`${JIKAN_API}/anime/${result.anilist.idMal}`);
        const animeInfo = jikanResponse.data.data;

        animeResults.push({
          title: result.anilist.title.english || result.anilist.title.romaji || result.anilist.title.native,
          episode: result.episode,
          from: formatTime(result.from),
          to: formatTime(result.to),
          similarity: result.similarity,
          previewVideo: result.video,
          coverImage: animeInfo.images.jpg.large_image_url,
          score: animeInfo.score,
          year: animeInfo.year,
          producers: animeInfo.producers.map((p: any) => p.name),
          studios: animeInfo.studios.map((s: any) => s.name),
          genres: animeInfo.genres.map((g: any) => g.name),
          synopsis: animeInfo.synopsis,
        });
      } catch (error) {
        logError('Error fetching additional anime info', error);
      }
    }

    return animeResults;
  } catch (error) {
    logError('Error searching anime', error);
    throw new Error('Failed to search anime. Please try again.');
  }
}

function formatTime(seconds: number): string {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
}