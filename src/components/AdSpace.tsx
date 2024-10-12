import React from 'react';

const AdSpace: React.FC = () => {
  return (
    <div className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-lg p-4 mb-8 text-center">
      <p className="text-lg font-bold">Advertisement</p>
      <p className="text-sm">Your ad could be here!</p>
    </div>
  );
};

export default AdSpace;