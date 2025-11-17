import React, { useState } from 'react';
import LandingScreen from './screens/LandingScreen';
import HubScreen from './screens/HubScreen';
import InspirationScreen from './screens/InspirationScreen';
import DrawingScreen from './screens/DrawingScreen';
import GameGenerationScreen from './screens/GameGenerationScreen';
import PlayableGameScreen from './screens/PlayableGameScreen';
import AssetCustomizationScreen from './screens/AssetCustomizationScreen';
import { generateLevelFromDrawing, LevelData } from './lib/gemini';
import { getHistory, saveGameToHistory, HistoryEntry } from './lib/history';
import HistoryScreen from './screens/HistoryScreen';
import LeaderboardScreen from './screens/LeaderboardScreen';


export type CustomAssets = {
  player?: string; // image data URL
  goal?: string;
  hazard?: string;
};


type GameState = 'landing' | 'hub' | 'inspiration' | 'drawing' | 'generating' | 'customizing' | 'playing' | 'history' | 'leaderboard';

const App: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>('landing');
  const [levelData, setLevelData] = useState<LevelData | null>(null);
  const [drawingDataUrl, setDrawingDataUrl] = useState<string | null>(null);
  const [customAssets, setCustomAssets] = useState<CustomAssets>({});
  const [error, setError] = useState<string | null>(null);
  const [history, setHistory] = useState<HistoryEntry[]>(() => getHistory());

  const handleEnter = () => {
    setGameState('hub');
  };
  
  const handleNavigate = (screen: GameState) => {
    setError(null);
    setGameState(screen);
  }

  const handleGenerateGame = async (drawing: string) => {
    setGameState('generating');
    setDrawingDataUrl(drawing);
    setError(null);
    setCustomAssets({}); // Reset assets on new generation
    try {
      // remove the "data:image/png;base64," prefix
      const base64Image = drawing.split(',')[1];
      const data = await generateLevelFromDrawing(base64Image);
      setLevelData(data);
      setGameState('customizing');
    } catch (e) {
      console.error(e);
      setError("The AI couldn't understand the drawing. Try making the shapes clearer and use the suggested colors!");
      setGameState('drawing'); // Go back to drawing screen on error
    }
  };
  
  const handleStartGame = (assets: CustomAssets) => {
    if (levelData && drawingDataUrl) {
        const newEntry: HistoryEntry = {
            id: Date.now().toString(),
            timestamp: Date.now(),
            levelData,
            customAssets: assets,
            drawingDataUrl,
        };
        const updatedHistory = saveGameToHistory(newEntry);
        setHistory(updatedHistory);
    }
    setCustomAssets(assets);
    setGameState('playing');
  }

  const handlePlayFromHistory = (entry: HistoryEntry) => {
    setLevelData(entry.levelData);
    setCustomAssets(entry.customAssets);
    setDrawingDataUrl(entry.drawingDataUrl);
    setGameState('playing');
  };


  const renderContent = () => {
    switch (gameState) {
      case 'hub':
        return <HubScreen onNavigateToInspiration={() => handleNavigate('inspiration')} onNavigateToHistory={() => handleNavigate('history')} onNavigateToLeaderboard={() => handleNavigate('leaderboard')} />;
      case 'inspiration':
        return <InspirationScreen onNavigate={() => handleNavigate('drawing')} onBack={() => handleNavigate('hub')} />;
      case 'drawing':
        return <DrawingScreen onGenerate={handleGenerateGame} error={error} onBack={() => handleNavigate('inspiration')} />;
      case 'generating':
        return <GameGenerationScreen drawingDataUrl={drawingDataUrl} />;
      case 'customizing':
        return <AssetCustomizationScreen levelData={levelData} onStartGame={handleStartGame} onBack={() => handleNavigate('drawing')} />;
      case 'playing':
        return <PlayableGameScreen levelData={levelData} customAssets={customAssets} onBackToEditor={() => handleNavigate('drawing')} />;
      case 'history':
        return <HistoryScreen history={history} onPlay={handlePlayFromHistory} onBack={() => handleNavigate('hub')} />;
      case 'leaderboard':
        return <LeaderboardScreen onBack={() => handleNavigate('hub')} />;
      case 'landing':
      default:
        return <LandingScreen onEnter={handleEnter} />;
    }
  };

  return (
    <main>
      {renderContent()}
    </main>
  );
};

export default App;
