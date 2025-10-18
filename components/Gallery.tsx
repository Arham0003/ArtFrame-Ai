
import React from 'react';
import type { GeneratedImage } from '../types';
import ImageCard from './ImageCard';

interface GalleryProps {
  images: GeneratedImage[];
  onDeleteImage: (id: string) => void;
}

const Gallery: React.FC<GalleryProps> = ({ images, onDeleteImage }) => {
  if (images.length === 0) {
    return (
      <div className="text-center py-20 px-4">
        <div className="mx-auto w-24 h-24 flex items-center justify-center rounded-full bg-gray-200 dark:bg-gray-800 mb-6">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </div>
        <h3 className="text-xl font-semibold text-gray-800 dark:text-white">Your gallery is empty</h3>
        <p className="mt-2 text-gray-500 dark:text-gray-400">Generate your first AI wallpaper to see it here!</p>
      </div>
    );
  }

  return (
    <div className="w-full">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Your Creations</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6">
            {images.map((image) => (
                <ImageCard key={image.id} image={image} onDelete={onDeleteImage} />
            ))}
        </div>
    </div>
  );
};

export default Gallery;
