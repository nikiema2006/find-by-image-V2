import React from 'react';
import { AnimeResult } from '../types';

interface OtherResultsProps {
  results: AnimeResult[];
}

const OtherResults: React.FC<OtherResultsProps> = ({ results }) => {
  return (
    <div>
      <h3 className="text-xl font-bold mb-4">Other Results</h3>
      <div className="space-y-4">
        {results.map((result, index) => (
          <div
            key={index}
            className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-lg p-4 flex items-center"
          >
            <div className="flex-grow">
              <h4 className="font-bold">{result.title}</h4>
              <p className="text-sm">Episode: {result.episode}</p>
              <p className="text-sm">Similarity: {Math.round(result.similarity * 100)}%</p>
              <p className="text-sm">
                {result.from} - {result.to}
              </p>
            </div>
            <div className="w-1/3 ml-4">
              <video
                src={result.previewVideo}
                className="w-full h-auto rounded"
                autoPlay
                loop
                muted
              ></video>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OtherResults;