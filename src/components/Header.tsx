import React, { useRef, useState } from 'react';
import { Search, Upload } from 'lucide-react';

interface HeaderProps {
  onSearch: (file: File | string) => void;
}

const Header: React.FC<HeaderProps> = ({ onSearch }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [searchInput, setSearchInput] = useState('');

  const handleUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onSearch(file);
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchInput(value);
    if (isValidUrl(value)) {
      onSearch(value);
    }
  };

  const handleSearchClick = () => {
    if (searchInput) {
      onSearch(searchInput);
    }
  };

  const isValidUrl = (string: string) => {
    try {
      new URL(string);
      return true;
    } catch (_) {
      return false;
    }
  };

  return (
    <header className="mb-8">
      <div className="flex items-center justify-center mb-6">
        <img src="/logo.svg" alt="Anime Image Search Logo" className="h-16 w-auto" />
      </div>
      <div className="relative flex items-center">
        <input
          type="text"
          placeholder="Enter image URL or search anime..."
          value={searchInput}
          onChange={handleInputChange}
          className="w-full py-3 px-4 pr-24 rounded-full bg-white bg-opacity-20 backdrop-blur-lg text-white placeholder-white placeholder-opacity-75 focus:outline-none focus:ring-2 focus:ring-white"
        />
        <button
          onClick={handleSearchClick}
          className="absolute right-14 top-1/2 transform -translate-y-1/2 p-2 rounded-full bg-white bg-opacity-20 hover:bg-opacity-30 transition-colors"
        >
          <Search className="h-5 w-5 text-white" />
        </button>
        <button
          onClick={() => fileInputRef.current?.click()}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 rounded-full bg-white bg-opacity-20 hover:bg-opacity-30 transition-colors"
        >
          <Upload className="h-5 w-5 text-white" />
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleUpload}
          className="hidden"
        />
      </div>
    </header>
  );
};

export default Header;