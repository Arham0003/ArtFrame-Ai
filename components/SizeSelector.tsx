
import React, { useState } from 'react';
import type { Size, SizeCategory } from '../types';
import { SIZE_CATEGORIES } from '../constants';
import Icon from './Icon';
import CustomSizeModal from './CustomSizeModal';

interface SizeSelectorProps {
  selectedSize: Size;
  onSizeSelect: (size: Size) => void;
}

const SizeSelector: React.FC<SizeSelectorProps> = ({ selectedSize, onSizeSelect }) => {
  const [activeCategory, setActiveCategory] = useState<string>(
    SIZE_CATEGORIES.find(cat => cat.sizes.some(s => s.code === selectedSize.code))?.category || SIZE_CATEGORIES[0].category
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const handleSizeClick = (size: Size) => {
    if (size.code === 'CUS-TOM') {
      setIsModalOpen(true);
    } else {
      onSizeSelect(size);
    }
  };

  const handleSaveCustomSize = (size: Size) => {
    onSizeSelect(size);
    setIsModalOpen(false);
  };

  return (
    <div className="w-full">
      <div className="mb-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex -mb-px space-x-4" aria-label="Tabs">
          {SIZE_CATEGORIES.map((category) => (
            <button
              key={category.category}
              onClick={() => setActiveCategory(category.category)}
              className={`flex items-center space-x-2 whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                activeCategory === category.category
                  ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300 dark:hover:border-gray-600'
              }`}
            >
              <Icon name={category.icon} className="w-5 h-5" />
              <span>{category.category}</span>
            </button>
          ))}
        </div>
      </div>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
        {SIZE_CATEGORIES.find(c => c.category === activeCategory)?.sizes.map((size) => (
          <button
            key={size.code}
            onClick={() => handleSizeClick(size)}
            className={`group relative p-3 text-left rounded-lg border-2 transition-all duration-200 transform hover:-translate-y-1 ${
              selectedSize.code === size.code
                ? 'gradient-bg border-transparent shadow-lg'
                : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:border-blue-400 dark:hover:border-blue-500 hover:shadow-md'
            }`}
          >
            <p className={`font-semibold text-sm ${selectedSize.code === size.code ? 'text-white' : 'text-gray-800 dark:text-white'}`}>
              {size.label}
            </p>
            <p className={`text-xs ${selectedSize.code === size.code ? 'text-blue-100' : 'text-gray-500 dark:text-gray-400'}`}>
              {size.width ? `${size.width} x ${size.height}` : 'Custom'}
            </p>
          </button>
        ))}
      </div>

      <CustomSizeModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveCustomSize}
        maxW={7680}
        maxH={4320}
      />
    </div>
  );
};

export default SizeSelector;
