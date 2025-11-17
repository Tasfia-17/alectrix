import React, { useState } from 'react';
import { LevelData, generateImageAsset } from '../lib/gemini';
import { CustomAssets } from '../App';
import AssetCustomizationCard from '../components/common/AssetCustomizationCard';
import BackButton from '../components/common/BackButton';

interface AssetCustomizationScreenProps {
  levelData: LevelData | null;
  onStartGame: (assets: CustomAssets) => void;
  onBack: () => void;
}

const AssetCustomizationScreen: React.FC<AssetCustomizationScreenProps> = ({ levelData, onStartGame, onBack }) => {
  const [playerAsset, setPlayerAsset] = useState<string | undefined>(undefined);
  const [goalAsset, setGoalAsset] = useState<string | undefined>(undefined);
  const [hazardAsset, setHazardAsset] = useState<string | undefined>(undefined);
  
  if (!levelData) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-slate-100">
        <p>Loading level data...</p>
        <button onClick={onBack} className="ml-4 text-blue-500">Go Back</button>
      </div>
    );
  }

  const handleStart = () => {
    onStartGame({
      player: playerAsset,
      goal: goalAsset,
      hazard: hazardAsset,
    });
  };
  
  const hasGoals = levelData.goals && levelData.goals.length > 0;
  const hasHazards = levelData.hazards && levelData.hazards.length > 0;

  return (
    <div className="min-h-screen w-full bg-slate-50 font-sans p-4 sm:p-8 relative">
      <BackButton onClick={onBack} />
      <div className="max-w-7xl mx-auto">
        <header className="relative text-center mb-12 animate-fade-in-up">
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-slate-800 mb-2">Customize Your Game</h1>
          <p className="text-base text-slate-500">
            Describe your hero, goals, and dangers, and let the AI bring them to life! (Or skip and play with defaults)
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            <AssetCustomizationCard
                title="Your Hero"
                description="What does the player character look like?"
                defaultElement={<div className="w-16 h-16 bg-emerald-400 rounded-lg" />}
                onAssetGenerated={(url) => setPlayerAsset(url)}
                generateImageAsset={generateImageAsset}
            />
            {hasGoals && (
                <AssetCustomizationCard
                    title="The Goal"
                    description="What are you collecting or trying to reach?"
                    defaultElement={<div className="w-16 h-16 flex items-center justify-center text-blue-500 text-5xl">★</div>}
                    onAssetGenerated={(url) => setGoalAsset(url)}
                    generateImageAsset={generateImageAsset}
                />
            )}
            {hasHazards && (
                 <AssetCustomizationCard
                    title="The Hazard"
                    description="What danger should the player avoid?"
                    defaultElement={<div className="w-16 h-16 bg-red-400 rounded-lg" />}
                    onAssetGenerated={(url) => setHazardAsset(url)}
                    generateImageAsset={generateImageAsset}
                />
            )}
        </div>

        <footer className="text-center">
            <button
                onClick={handleStart}
                className="px-8 py-4 bg-gradient-to-r from-emerald-300 to-teal-300 text-white font-bold text-lg rounded-full shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 ease-in-out focus:outline-none focus:ring-4 focus:ring-emerald-200">
                Let's Play!
            </button>
        </footer>
      </div>
    </div>
  );
};

export default AssetCustomizationScreen;