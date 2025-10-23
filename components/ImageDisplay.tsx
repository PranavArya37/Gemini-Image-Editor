
import React from 'react';
import { Spinner } from './Spinner';
import { ImageIcon } from './Icon';

interface ImageDisplayProps {
  title: string;
  imageUrl: string | null;
  isLoading?: boolean;
  placeholderText?: string;
}

export const ImageDisplay: React.FC<ImageDisplayProps> = ({ title, imageUrl, isLoading = false, placeholderText }) => {
  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-lg w-full">
      <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4 text-center">{title}</h3>
      <div className="aspect-square w-full bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center relative overflow-hidden">
        {isLoading && (
          <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center z-10">
            <Spinner />
            <p className="text-white mt-4">Editing your image...</p>
          </div>
        )}
        {imageUrl ? (
          <img src={imageUrl} alt={title} className="object-contain w-full h-full" />
        ) : (
          !isLoading && (
            <div className="text-center text-gray-400 dark:text-gray-500 p-4">
              <ImageIcon className="w-16 h-16 mx-auto mb-2" />
              <p>{placeholderText || 'Image will be shown here'}</p>
            </div>
          )
        )}
      </div>
    </div>
  );
};
