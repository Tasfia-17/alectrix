import React, { useState } from 'react';

interface AssetCustomizationCardProps {
  title: string;
  description: string;
  defaultElement: React.ReactNode;
  onAssetGenerated: (url: string) => void;
  generateImageAsset: (prompt: string) => Promise<string>;
}

const AssetCustomizationCard: React.FC<AssetCustomizationCardProps> = ({ title, description, defaultElement, onAssetGenerated, generateImageAsset }) => {
  const [prompt, setPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [generatedAsset, setGeneratedAsset] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!prompt) {
      setError("Please enter a description first!");
      return;
    }
    setIsLoading(true);
    setError(null);
    setGeneratedAsset(null);
    try {
      const imageUrl = await generateImageAsset(prompt);
      setGeneratedAsset(imageUrl);
      onAssetGenerated(imageUrl);
    } catch (e) {
      console.error(e);
      setError("Couldn't generate the image. Please try a different prompt.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-md border border-slate-200/80 p-6 flex flex-col h-full">
      <h3 className="text-xl font-bold text-slate-700 mb-2">{title}</h3>
      <p className="text-slate-500 text-sm mb-4">{description}</p>
      
      <div className="w-full aspect-square bg-slate-100 rounded-xl flex items-center justify-center mb-4 relative overflow-hidden">
        {isLoading && (
          <div className="absolute inset-0 bg-white/70 flex flex-col items-center justify-center z-10">
            <div className="w-12 h-12 border-4 border-t-transparent border-blue-400 rounded-full animate-spin mb-2" />
            <p className="text-slate-600">Generating...</p>
          </div>
        )}
        {generatedAsset ? (
          <img src={generatedAsset} alt="Generated asset" className="w-full h-full object-contain p-4" />
        ) : (
          defaultElement
        )}
      </div>

      <div className="mt-auto">
        <input
            type="text"
            value={prompt}
            onChange={(e) => {
                setPrompt(e.target.value);
                if (error) setError(null);
            }}
            placeholder="e.g., a happy robot knight"
            className="w-full px-4 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            disabled={isLoading}
        />
        {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        <button
          onClick={handleGenerate}
          disabled={isLoading || !prompt}
          className="w-full mt-3 px-5 py-2 bg-gradient-to-r from-cyan-300 to-blue-400 text-white font-semibold text-sm rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Creating...' : 'Generate'}
        </button>
      </div>
    </div>
  );
};

export default AssetCustomizationCard;