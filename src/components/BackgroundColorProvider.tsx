import React, { ReactNode, useState, useEffect } from 'react';

interface BackgroundColorProviderProps {
  children: ReactNode;
  imageUrl?: string;
}

const BackgroundColorProvider: React.FC<BackgroundColorProviderProps> = ({ children, imageUrl }) => {
  const [color, setColor] = useState<string | null>(null);

  useEffect(() => {
    if (imageUrl) {
      const img = new Image();
      img.crossOrigin = 'Anonymous';
      img.src = imageUrl;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        if (ctx) {
          canvas.width = img.width;
          canvas.height = img.height;
          ctx.drawImage(img, 0, 0, img.width, img.height);
          const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
          const data = imageData.data;
          let r = 0, g = 0, b = 0;
          for (let i = 0; i < data.length; i += 4) {
            r += data[i];
            g += data[i + 1];
            b += data[i + 2];
          }
          r = Math.floor(r / (data.length / 4));
          g = Math.floor(g / (data.length / 4));
          b = Math.floor(b / (data.length / 4));
          setColor(`rgb(${r},${g},${b})`);
        }
      };
    }
  }, [imageUrl]);

  const gradientStyle = {
    background: color
      ? `linear-gradient(135deg, ${color} 0%, #000000 100%)`
      : 'linear-gradient(135deg, #8B5CF6 0%, #3B82F6 100%)',
    transition: 'background 1s ease-in-out',
  };

  return (
    <div style={gradientStyle} className="min-h-screen">
      {children}
    </div>
  );
};

export default BackgroundColorProvider;