
import React, { useState } from 'react';
import { Header } from './components/Header';
import { ImageUploader } from './components/ImageUploader';
import { PromptInput } from './components/PromptInput';
import { ImageDisplay } from './components/ImageDisplay';
import { editImage } from './services/geminiService';
import { MagicWandIcon } from './components/Icon';


export default function App() {
  const [originalImage, setOriginalImage] = useState<File | null>(null);
  const [originalImageUrl, setOriginalImageUrl] = useState<string | null>(null);
  const [editedImage, setEditedImage] = useState<string | null>(null);
  const [prompt, setPrompt] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleImageUpload = (file: File) => {
    setOriginalImage(file);
    setOriginalImageUrl(URL.createObjectURL(file));
    setEditedImage(null);
    setError(null);
  };

  const handleGenerateClick = async () => {
    if (!originalImage) {
      setError('Please upload an image first.');
      return;
    }
    if (!prompt.trim()) {
      setError('Please enter an editing instruction.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setEditedImage(null);

    try {
      const generatedImageBase64 = await editImage(originalImage, prompt);
      setEditedImage(`data:${originalImage.type};base64,${generatedImageBase64}`);
    } catch (err: unknown) {
      console.error(err);
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred.';
      setError(`Failed to edit image: ${errorMessage}`);
    } finally {
      setIsLoading(false);
    }
  };
  
  const examplePrompts = [
    "remove the background",
    "make the background white",
    "add a reflection on the floor",
    "give it a retro, faded look",
    "sharpen the image and enhance colors",
    "add a soft shadow underneath the product"
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 font-sans">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            
            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg flex flex-col gap-6">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white">1. Upload your photo</h2>
              <ImageUploader onImageSelect={handleImageUpload} />
              
              <div className="mt-4">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">2. Describe your edit</h2>
                <PromptInput 
                  prompt={prompt} 
                  setPrompt={setPrompt}
                  onSubmit={handleGenerateClick}
                  isLoading={isLoading}
                />
              </div>

              <div className="mt-2">
                <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-3">Or try an example:</h3>
                <div className="flex flex-wrap gap-2">
                  {examplePrompts.map(p => (
                    <button 
                      key={p}
                      onClick={() => setPrompt(p)}
                      disabled={isLoading}
                      className="px-3 py-1.5 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-full text-sm hover:bg-primary-100 dark:hover:bg-primary-900/50 disabled:opacity-50 transition-colors"
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={handleGenerateClick}
                disabled={isLoading || !originalImage}
                className="w-full mt-4 flex items-center justify-center gap-2 bg-primary-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-primary-700 disabled:bg-primary-400 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 shadow-md"
              >
                <MagicWandIcon />
                {isLoading ? 'Generating...' : 'Generate Image'}
              </button>
               {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
            </div>

            <div className="flex flex-col gap-8">
              <ImageDisplay title="Original Image" imageUrl={originalImageUrl} placeholderText="Upload an image to see the original version here." />
              <ImageDisplay title="Edited Image" imageUrl={editedImage} isLoading={isLoading} placeholderText="Your edited image will appear here." />
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}
