
import React from 'react';

interface PromptInputProps {
  prompt: string;
  setPrompt: (value: string) => void;
  onSubmit: () => void;
  isLoading: boolean;
}

export const PromptInput: React.FC<PromptInputProps> = ({ prompt, setPrompt, onSubmit, isLoading }) => {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === 'Enter' && !e.shiftKey) {
          e.preventDefault();
          if (!isLoading) {
              onSubmit();
          }
      }
  };
    
  return (
    <div className="relative">
      <textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder='e.g., "Remove the background and add a soft shadow"'
        disabled={isLoading}
        rows={3}
        className="w-full p-4 pr-12 bg-gray-100 dark:bg-gray-700 border-2 border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition duration-200 resize-none placeholder-gray-400 dark:placeholder-gray-500"
      />
    </div>
  );
};
