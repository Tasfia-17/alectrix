import React from 'react';
import PlatformerGame from '../components/games/PlatformerGame';
import MazeGame from '../components/games/MazeGame';
import FallingDodgerGame from '../components/games/FallingDodgerGame';
import { LevelData } from '../lib/gemini';
import { CustomAssets } from '../App';

interface PlayableGameScreenProps {
  levelData: LevelData | null;
  customAssets: CustomAssets;
  onBackToEditor: () => void;
}

const PlayableGameScreen: React.FC<PlayableGameScreenProps> = ({ levelData, customAssets, onBackToEditor }) => {
    if (!levelData) {
        return <div className="h-screen w-full flex items-center justify-center bg-gray-100 font-sans">Loading level data...</div>;
    }
    
    // We use a key here to force a re-mount of the game component
    // when the user wants to play again. This is a simple way to reset the game's internal state.
    const [gameKey, setGameKey] = React.useState(0);
    const handlePlayAgain = () => setGameKey(prev => prev + 1);
    
    const gameProps = {
        levelData,
        customAssets,
        onBackToEditor,
        onPlayAgain: handlePlayAgain
    };

    switch (levelData.gameType) {
        case 'maze':
            return <MazeGame key={gameKey} {...gameProps} />;
        case 'falling-dodger':
            return <FallingDodgerGame key={gameKey} {...gameProps} />;
        case 'platformer':
        default:
            return <PlatformerGame key={gameKey} {...gameProps} />;
    }
};

export default PlayableGameScreen;