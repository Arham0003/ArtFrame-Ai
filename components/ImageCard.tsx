
import React from 'react';
import type { GeneratedImage } from '../types';
import Icon from './Icon';

interface ImageCardProps {
  image: GeneratedImage;
  onDelete: (id: string) => void;
}

const ImageCard: React.FC<ImageCardProps> = ({ image, onDelete }) => {
  const imageUrl = `data:image/png;base64,${image.base64}`;

  return (
    <div className="group relative aspect-[9/16] bg-gray-700 rounded-xl overflow-hidden shadow-lg transition-transform duration-300 ease-in-out hover:shadow-2xl hover:-translate-y-1">
      <img
        src={imageUrl}
        alt={image.prompt}
        className="w-full h-full object-cover"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-300"></div>
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-4 group-hover:translate-y-0">
        <p className="text-white text-sm font-medium truncate">{image.prompt}</p>
        <p className="text-gray-300 text-xs">{image.size.label} ({image.style})</p>
      </div>
      <div className="absolute top-3 right-3 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform -translate-y-4 group-hover:translate-y-0">
        <a
          href={imageUrl}
          download={`artframe-ai-${image.id}.png`}
          className="w-10 h-10 flex items-center justify-center bg-white/20 backdrop-blur-sm text-white rounded-full hover:bg-white/30 transition-colors"
          title="Download"
        >
          <Icon name="download" className="w-5 h-5" />
        </a>
        <button
          onClick={() => onDelete(image.id)}
          className="w-10 h-10 flex items-center justify-center bg-red-500/50 backdrop-blur-sm text-white rounded-full hover:bg-red-500/70 transition-colors"
          title="Delete"
        >
          <Icon name="delete" className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default ImageCard;
