
import React from 'react';

interface ImageDisplayProps {
  src: string;
  alt: string;
  title: string;
}

export const ImageDisplay: React.FC<ImageDisplayProps> = ({ src, alt, title }) => {
  return (
    <div className="flex flex-col items-center gap-4">
      <h2 className="text-xl font-bold text-autumn-brown">{title}</h2>
      <div className="w-full aspect-square rounded-xl overflow-hidden shadow-lg border-4 border-white">
        <img
          src={src}
          alt={alt}
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
};
