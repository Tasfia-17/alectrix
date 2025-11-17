import React from 'react';

type GameScreen = 'mindfulMeadow' | 'gratitudeGarden' | 'thoughtValidator' | 'questLog' | 'pathfinder' | 'moodJournal';
type ScreenName = GameScreen | 'hub' | 'toDoList' | 'music' | 'moodBoard' | 'history';

interface GameHubScreenProps {
  onNavigate: (screen: ScreenName) => void;
  onBack: () => void;
}

const games: { name: string, screen: GameScreen, icon: string, description: string }[] = [
    { name: 'Mindful Meadow', screen: 'mindfulMeadow', icon: '🧘', description: 'Sync your breath with a blooming meadow.' },
    { name: 'Gratitude Garden', screen: 'gratitudeGarden', icon: '🌸', description: 'Grow a garden by noting what you\'re grateful for.' },
    { name: 'Thought Validator', screen: 'thoughtValidator', icon: '⚖️', description: 'Challenge and reframe negative thoughts.' },
    { name: 'Quest Log', screen: 'questLog', icon: '📜', description: 'Complete small, real-world tasks to build momentum.' },
    { name: 'Pathfinder', screen: 'pathfinder', icon: '🗺️', description: 'Solve simple mazes for a quick mental win.' },
    { name: 'Mood Journal', screen: 'moodJournal', icon: '🎭', description: 'Identify and acknowledge your emotions.' },
];

const GameHubScreen: React.FC<GameHubScreenProps> = ({ onNavigate, onBack }) => {
  return (
    <div className="min-h-screen font-mono p-4 sm:p-6 flex flex-col items-center" 
         style={{
          backgroundColor: '#2c2a4a',
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='10' height='10' viewBox='0 0 10 10' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='10' height='10' fill='%232c2a4a'/%3E%3Crect x='5' y='5' width='1' height='1' fill='%234a476b'/%3E%3Crect x='1' y='2' width='1' height='1' fill='%234a476b'/%3E%3C/svg%3E")`
        }}
    >
      <div className="w-full max-w-2xl flex-grow flex flex-col">
        <div className="bg-pixel-purple-mid border-2 border-pixel-black p-4 w-full flex-grow flex flex-col" style={{ boxShadow: '6px 6px 0px #000' }}>
            <h1 className="text-3xl text-center text-pixel-yellow mb-2" style={{ textShadow: '2px 2px 0px #000' }}>Mental Health Break</h1>
            <p className="text-center text-pixel-purple-light/80 mb-6">Take a moment. Or don't. See if I care.</p>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {games.map(game => (
                    <button 
                        key={game.screen}
                        onClick={() => onNavigate(game.screen)}
                        className="bg-pixel-purple-dark border-2 border-pixel-black p-4 aspect-square flex flex-col items-center justify-center
                                   hover:bg-pixel-purple-light/20 hover:border-pixel-yellow transition-colors duration-200
                                   transform active:translate-x-0.5 active:translate-y-0.5 relative group"
                        style={{ boxShadow: '3px 3px 0px #000' }}
                    >
                        <span className="text-5xl mb-2">{game.icon}</span>
                        <span className="text-pixel-purple-light text-center text-sm">{game.name}</span>
                        <div className="absolute -bottom-2 translate-y-full w-48 p-2 bg-black text-white text-xs rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                            {game.description}
                        </div>
                    </button>
                ))}
            </div>
        </div>

        <div className="w-full flex flex-col items-center justify-end h-24 mt-4">
          <button 
              onClick={onBack}
              className="w-full max-w-sm bg-pixel-yellow text-deep-sienna font-bold text-lg py-3 px-8 border-2 border-pixel-black 
                         transform active:translate-x-1 active:translate-y-1 transition-all duration-100 ease-in-out
                         hover:bg-yellow-300"
              style={{ boxShadow: '4px 4px 0px #000000' }}
              >
              Back to Hub
          </button>
        </div>
      </div>
    </div>
  );
};

export default GameHubScreen;
