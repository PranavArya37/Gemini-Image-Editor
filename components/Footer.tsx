
import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-white dark:bg-gray-800 shadow-inner mt-12 py-6">
      <div className="container mx-auto px-4 text-center text-gray-600 dark:text-gray-400">
        <p>
          &copy; {new Date().getFullYear()} Google Gemini Image Editor -{' '}
          <a
            href="https://pranavarya.in"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary-600 dark:text-primary-400 hover:underline"
          >
            Pranav Arya
          </a>
          . All rights reserved.
        </p>
      </div>
    </footer>
  );
};
