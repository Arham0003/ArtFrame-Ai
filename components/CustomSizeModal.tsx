
import React, { useState, useEffect } from 'react';
import type { Size } from '../types';

interface CustomSizeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (size: Size) => void;
  maxW: number;
  maxH: number;
}

const CustomSizeModal: React.FC<CustomSizeModalProps> = ({ isOpen, onClose, onSave, maxW, maxH }) => {
  const [width, setWidth] = useState<string>('1920');
  const [height, setHeight] = useState<string>('1080');

  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);
  
  if (!isOpen) return null;

  const handleSave = () => {
    const w = parseInt(width, 10);
    const h = parseInt(height, 10);

    if (isNaN(w) || isNaN(h) || w <= 0 || h <= 0 || w > maxW || h > maxH) {
      alert(`Please enter valid dimensions. Width must be between 1 and ${maxW}, height between 1 and ${maxH}.`);
      return;
    }

    onSave({
      code: 'CUS-TOM',
      label: `${w} x ${h}`,
      width: w,
      height: h,
      description: 'Custom dimensions',
      popular: false,
    });
    onClose();
  };
  
  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };


  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm transition-opacity duration-300"
      onClick={handleOverlayClick}
    >
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-8 w-full max-w-md m-4 transform transition-all duration-300 scale-95 opacity-0 animate-fade-in-scale">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Custom Dimensions</h2>
        <p className="text-gray-500 dark:text-gray-400 mb-6">Enter your desired wallpaper width and height.</p>
        <div className="space-y-4">
          <div>
            <label htmlFor="width" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Width (px)</label>
            <input
              type="number"
              id="width"
              value={width}
              onChange={(e) => setWidth(e.target.value)}
              placeholder={`Max ${maxW}`}
              className="mt-1 block w-full bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm h-12 px-4"
            />
          </div>
          <div>
            <label htmlFor="height" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Height (px)</label>
            <input
              type="number"
              id="height"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              placeholder={`Max ${maxH}`}
              className="mt-1 block w-full bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm h-12 px-4"
            />
          </div>
        </div>
        <div className="mt-8 flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="px-6 py-3 rounded-lg text-sm font-semibold bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-6 py-3 rounded-lg text-sm font-semibold text-white gradient-bg hover:opacity-90 transition-opacity"
          >
            Save Dimensions
          </button>
        </div>
      </div>
       <style>{`
          @keyframes fade-in-scale {
            from { opacity: 0; transform: scale(0.95); }
            to { opacity: 1; transform: scale(1); }
          }
          .animate-fade-in-scale {
            animation: fade-in-scale 300ms cubic-bezier(0.4, 0, 0.2, 1) forwards;
          }
        `}</style>
    </div>
  );
};

export default CustomSizeModal;
