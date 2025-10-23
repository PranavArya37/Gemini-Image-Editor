
import React from 'react';
import { PhotoIcon } from './Icon';

export const Header: React.FC = () => {
  return (
    <header className="bg-white dark:bg-gray-800 shadow-md">
      <div className="container mx-auto px-4 py-4 flex items-center justify-center">
         <div className="flex items-center gap-3 text-primary-600 dark:text-primary-400">
            <PhotoIcon className="w-8 h-8" />
            <h1 className="text-3xl font-extrabold text-gray-800 dark:text-white">
              Gemini Product Photo Editor
            </h1>
        </div>
      </div>
       <div className="bg-primary-600 text-center py-2 px-4">
          <p className="text-white text-sm md:text-base">
              Clean up product photos with simple text instructions. Powered by Gemini 2.5 Flash.
          </p>
      </div>
    </header>
  );
};
