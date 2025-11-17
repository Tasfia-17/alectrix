import React, { useState, useEffect } from 'react';
import { AvatarData } from '../../App';
import RoastingAvatar from '../../components/common/RoastingAvatar';

interface GratitudeGardenScreenProps {
  avatar: AvatarData;
  onBack: () => void;
  onComplete: (gratitude: string) => void;
}

interface Flower {
    emoji: string;
    gratitude: string;
}

const FLOWERS = ['🌸', '🌻', '🌷', '🌹', '🌼', '🌺'];
const GARDEN_KEY = 'alectrix_gratitude_garden_v2';

const GratitudeGardenScreen: React.FC<GratitudeGardenScreenProps> = ({ avatar, onBack, onComplete }) => {
  const [gratitude, setGratitude] = useState('');
  const [garden, setGarden] = useState<Flower[]>(() => {
    try {
        const savedGarden = localStorage.getItem(GARDEN_KEY);
        return savedGarden ? JSON.parse(savedGarden) : [];
    } catch (e) {
        console.error("Failed to load garden", e);
        return [];
    }
  });
  const [isWatering, setIsWatering] = useState(false);
  const [showHistory, setShowHistory] = useState(false);

  useEffect(() => {
      localStorage.setItem(GARDEN_KEY, JSON.stringify(garden));
  }, [garden]);

  const handlePlant = () => {
    if (gratitude.trim() === '') return;
    
    const newFlower: Flower = {
        gratitude: gratitude.trim(),
        emoji: FLOWERS[Math.floor(Math.random() * FLOWERS.length)]
    };
    
    setGarden(prev => [...prev, newFlower].slice(-21)); // Max 21 flowers
    onComplete(gratitude.trim());
    setGratitude('');
    setIsWatering(true);
    setTimeout(() => setIsWatering(false), 1500);
  };

  return (
    <div className="min-h-screen font-mono p-4 sm:p-6 flex flex-col items-center justify-between" 
         style={{
          backgroundColor: '#4a476b',
          backgroundImage: `linear-gradient(to bottom, #9b95c9 50%, #2c3e50 80%, #1a1a2e 100%)`
        }}
    >
      <RoastingAvatar avatar={avatar} text="Ah, your collection of forced positivity. Keep it up, I guess." />
      
      <div className="w-full max-w-md flex-grow flex flex-col items-center justify-center my-4 relative">
        {/* Garden Plot */}
        <div className="w-full h-48 bg-[#5a3a22] border-4 border-[#3b2a1a] grid grid-cols-7 gap-1 p-2 mb-6 relative" >
            {garden.map((flower, index) => (
                <div key={index} className="group relative animate-fade-in flex items-center justify-center" style={{animationDelay: `${index * 50}ms`}}>
                    <span className="text-3xl cursor-pointer">{flower.emoji}</span>
                    <div className="absolute -top-2 translate-y-[-100%] w-40 p-2 bg-black text-white text-xs rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 text-center">
                        {flower.gratitude}
                    </div>
                </div>
            ))}
            {isWatering && (
                <div className="absolute -top-8 -right-8 text-5xl animate-fade-in" style={{animation: 'watering 1.5s ease-in-out forwards'}}>
                    💧🌱
                </div>
            )}
            <style>{`
                @keyframes watering {
                    0% { transform: translate(0, 0) rotate(0deg); opacity: 1; }
                    50% { transform: translate(-30px, 30px) rotate(-30deg); opacity: 1; }
                    100% { transform: translate(-30px, 30px) rotate(-30deg); opacity: 0; }
                }
            `}</style>
        </div>

        {/* Inputs */}
        <div className="w-full space-y-2">
            <input
                type="text"
                value={gratitude}
                onChange={e => setGratitude(e.target.value)}
                placeholder="I am grateful for..."
                className="w-full bg-pixel-purple-dark text-pixel-purple-light p-3 border-2 border-pixel-black focus:outline-none focus:border-pixel-yellow placeholder:text-pixel-purple-light/50"
            />
        </div>
        <button onClick={() => setShowHistory(true)} className="text-pixel-purple-light/60 text-xs mt-2 hover:text-white">View History</button>
      </div>
      
      <div className="w-full max-w-sm grid grid-cols-2 gap-4">
        <button onClick={handlePlant} disabled={gratitude.trim() === ''} className="bg-pixel-yellow text-deep-sienna font-bold py-3 border-2 border-pixel-black transform active:translate-y-1 disabled:opacity-50" style={{ boxShadow: '4px 4px 0 #000' }}>
            Plant Flower
        </button>
        <button onClick={onBack} className="bg-pixel-purple-light/80 text-white font-bold py-3 border-2 border-pixel-black transform active:translate-y-1" style={{ boxShadow: '4px 4px 0 #000' }}>
            Back to Hub
        </button>
      </div>

      {showHistory && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 animate-fade-in" onClick={() => setShowHistory(false)}>
              <div className="bg-pixel-purple-dark p-4 border-2 border-pixel-black w-11/12 max-w-md h-2/3 flex flex-col" onClick={e => e.stopPropagation()}>
                  <h2 className="text-pixel-yellow text-2xl mb-4 text-center">Gratitude History</h2>
                  <ul className="overflow-y-auto space-y-2 flex-grow">
                      {garden.slice().reverse().map((flower, index) => (
                          <li key={index} className="text-pixel-purple-light bg-pixel-purple-mid p-2">{flower.emoji} {flower.gratitude}</li>
                      ))}
                      {garden.length === 0 && <p className="text-pixel-purple-light/50 text-center">Your history is empty.</p>}
                  </ul>
                  <button onClick={() => setShowHistory(false)} className="mt-4 bg-pixel-yellow text-deep-sienna font-bold py-2 border-2 border-pixel-black">Close</button>
              </div>
          </div>
      )}
    </div>
  );
};

export default GratitudeGardenScreen;
