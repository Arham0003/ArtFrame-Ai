
import React, { useState, useCallback } from 'react';
import Header from './components/Header';
import GenerationCard from './components/GenerationCard';
import Gallery from './components/Gallery';
import type { GeneratedImage, Size } from './types';
import { generateImage } from './services/geminiService';

const App: React.FC = () => {
  const [generatedImages, setGeneratedImages] = useState<GeneratedImage[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = useCallback(async (prompt: string, style: string, size: Size) => {
    setIsLoading(true);
    setError(null);
    try {
      const base64Image = await generateImage(prompt, style, size);
      const newImage: GeneratedImage = {
        id: new Date().toISOString(),
        base64: base64Image,
        prompt,
        style,
        size,
      };
      setGeneratedImages(prev => [newImage, ...prev]);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred.');
      }
    } finally {
      setIsLoading(false);
    }
  }, []);
  
  const handleDeleteImage = (id: string) => {
    setGeneratedImages(prev => prev.filter(image => image.id !== id));
  };


  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
      <Header />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
        <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 dark:text-white">
                Create Your Perfect Wallpaper
            </h1>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-500 dark:text-gray-400">
                Describe any scene, choose a style, and pick your device. Our AI will craft a unique background just for you.
            </p>
        </div>
        
        <GenerationCard onGenerate={handleGenerate} isLoading={isLoading} />
        
        {error && (
            <div className="my-8 max-w-3xl mx-auto p-4 bg-red-100 dark:bg-red-900/30 border border-red-400 dark:border-red-500/50 text-red-700 dark:text-red-300 rounded-lg">
                <p className="font-semibold">Generation Failed</p>
                <p className="text-sm">{error}</p>
            </div>
        )}

        <div className="mt-24">
            <Gallery images={generatedImages} onDeleteImage={handleDeleteImage} />
        </div>
      </main>
      <footer className="text-center py-8 text-gray-400 dark:text-gray-500 text-sm">
        <p>&copy; {new Date().getFullYear()} ArtFrame AI. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default App;
