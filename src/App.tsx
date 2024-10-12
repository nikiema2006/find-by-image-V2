import React, { useState } from 'react';
import { Search, Upload } from 'lucide-react';
import Header from './components/Header';
import MainResult from './components/MainResult';
import AdSpace from './components/AdSpace';
import OtherResults from './components/OtherResults';
import { searchAnime } from './api/animeSearch';
import { AnimeResult } from './types';
import BackgroundColorProvider from './components/BackgroundColorProvider';

function App() {
  const [searchResults, setSearchResults] = useState<AnimeResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (input: File | string) => {
    setIsLoading(true);
    setError(null);
    try {
      const results = await searchAnime(input);
      setSearchResults(results);
    } catch (err) {
      setError('An error occurred while searching. Please try again.');
      console.log('Search error:', err instanceof Error ? err.message : String(err));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <BackgroundColorProvider imageUrl={searchResults[0]?.coverImage}>
      <div className="text-white">
        <div className="container mx-auto px-4 py-8">
          <Header onSearch={handleSearch} />
          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-white"></div>
            </div>
          ) : error ? (
            <div className="text-center mt-16 text-red-300">
              <p className="text-xl">{error}</p>
            </div>
          ) : searchResults.length > 0 ? (
            <>
              <MainResult result={searchResults[0]} />
              <AdSpace />
              <OtherResults results={searchResults.slice(1)} />
            </>
          ) : (
            <div className="text-center mt-16">
              <Search className="mx-auto h-16 w-16 mb-4" />
              <p className="text-xl">Enter an image URL or upload an image to start searching for anime</p>
            </div>
          )}
        </div>
      </div>
    </BackgroundColorProvider>
  );
}

export default App;