
import React, { useState, useMemo } from 'react';
import type { Size, StyleModifier } from '../types';
import { STYLE_MODIFIERS, SIZE_CATEGORIES, DEFAULT_SIZE_CODE } from '../constants';
import SizeSelector from './SizeSelector';
import Spinner from './Spinner';

interface GenerationCardProps {
  onGenerate: (prompt: string, style: string, size: Size) => void;
  isLoading: boolean;
}

const GenerationCard: React.FC<GenerationCardProps> = ({ onGenerate, isLoading }) => {
  const [prompt, setPrompt] = useState<string>('A serene bioluminescent forest at night, with glowing mushrooms and a crystal clear river');
  const [selectedStyle, setSelectedStyle] = useState<StyleModifier>(STYLE_MODIFIERS[1]);

  const defaultSize = useMemo(() => {
    for (const category of SIZE_CATEGORIES) {
      const found = category.sizes.find(s => s.code === DEFAULT_SIZE_CODE);
      if (found) return found;
    }
    return SIZE_CATEGORIES[0].sizes[0];
  }, []);

  const [selectedSize, setSelectedSize] = useState<Size>(defaultSize);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (prompt.trim() && !isLoading) {
      onGenerate(prompt, selectedStyle.label, selectedSize);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-xl p-6 sm:p-8 space-y-8 transform transition-all hover:shadow-2xl duration-500">
      
      <div>
        <label htmlFor="prompt" className="block text-lg font-semibold text-gray-800 dark:text-white mb-2">1. Describe your wallpaper</label>
        <textarea
          id="prompt"
          rows={3}
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="e.g., A futuristic cyberpunk city skyline at dusk..."
          className="w-full p-4 rounded-lg border-2 border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
          maxLength={500}
        />
        <p className="text-right text-xs text-gray-400 mt-1">{prompt.length} / 500</p>
      </div>

      <div>
        <label className="block text-lg font-semibold text-gray-800 dark:text-white mb-3">2. Choose a style</label>
        <div className="flex flex-wrap gap-3">
          {STYLE_MODIFIERS.map((style) => (
            <button
              key={style.id}
              onClick={() => setSelectedStyle(style)}
              className={`px-4 py-2 rounded-lg text-sm font-medium border-2 transition-all duration-200 transform hover:-translate-y-0.5 ${
                selectedStyle.id === style.id
                  ? 'gradient-bg text-white border-transparent shadow-md'
                  : 'bg-white dark:bg-gray-700 text-gray-600 dark:text-gray-300 border-gray-200 dark:border-gray-600 hover:border-blue-400 dark:hover:border-blue-500'
              }`}
            >
              {style.label}
            </button>
          ))}
        </div>
      </div>
      
      <div>
        <label className="block text-lg font-semibold text-gray-800 dark:text-white mb-3">3. Select your device size</label>
        <SizeSelector selectedSize={selectedSize} onSizeSelect={setSelectedSize} />
      </div>

      <button
        onClick={handleSubmit}
        disabled={isLoading || !prompt.trim()}
        className="w-full h-16 flex items-center justify-center text-lg font-bold text-white rounded-xl gradient-bg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 focus:outline-none focus:ring-4 focus:ring-blue-500/50 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
      >
        {isLoading ? (
          <>
            <Spinner className="w-8 h-8 mr-3" />
            Generating...
          </>
        ) : (
          '✨ Generate Wallpaper'
        )}
      </button>
    </div>
  );
};

export default GenerationCard;
