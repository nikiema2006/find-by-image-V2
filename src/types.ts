export interface AnimeResult {
  title: string;
  episode: number | null;
  from: string;
  to: string;
  similarity: number;
  previewVideo: string;
  coverImage: string;
  score: number;
  year: number;
  producers: string[];
  studios: string[];
  genres: string[];
  synopsis: string;
}