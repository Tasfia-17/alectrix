import React, { useState, useEffect } from 'react';
import { AvatarData } from '../../App';
import RoastingAvatar from '../../components/common/RoastingAvatar';

interface MindfulMeadowScreenProps {
  avatar: AvatarData;
  onBack: () => void;
  onComplete: () => void;
}

const Flower: React.FC<{delay: number}> = ({delay}) => (
    <div className="absolute bottom-0 text-3xl" style={{ 
        left: `${10 + Math.random() * 80}%`,
        animation: `grow-flower 4s ease-out ${delay}s forwards`,
        opacity: 0,
    }}>
        {['🌸', '🌷', '🌼'][Math.floor(Math.random()*3)]}
    </div>
);

const MindfulMeadowScreen: React.FC<MindfulMeadowScreenProps> = ({ avatar, onBack, onComplete }) => {
  const [instruction, setInstruction] = useState('Get Ready...');
  const [isAnimating, setIsAnimating] = useState(false);
  const [key, setKey] = useState(0);

  const startBreathingCycle = () => {
    setIsAnimating(true);
    setKey(prev => prev + 1); // Reset animations
    setInstruction('Breathe In...');
    setTimeout(() => setInstruction('Hold...'), 4000); // Inhale for 4s
    setTimeout(() => setInstruction('Breathe Out...'), 7000); // Hold for 3s
    setTimeout(() => {
        setInstruction('Get Ready...');
        setIsAnimating(false);
        onComplete();
    }, 13000); // Exhale for 6s
  };

  return (
    <div className="min-h-screen font-mono p-4 sm:p-6 flex flex-col items-center justify-between overflow-hidden" 
         style={{
          background: 'linear-gradient(to bottom, #8ecae6 60%, #2a9d8f 100%)'
        }}
    >
        <style>{`
            @keyframes grow-flower {
                from { transform: scale(0); opacity: 0; }
                to { transform: scale(1); opacity: 1; }
            }
            @keyframes sway-grass {
                from { transform: skewX(-5deg); }
                to { transform: skewX(5deg); }
            }
        `}</style>

      <RoastingAvatar avatar={avatar} text="Inhale. Exhale. Don't mess it up. It's literally the one thing you're supposed to do automatically." />
      
      <div className="flex flex-col items-center justify-center my-4 w-full h-64 relative">
        {/* Sky */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[80%] w-48 h-48 sm:w-64 sm:h-64 flex items-center justify-center">
            <div
                key={key}
                className="w-16 h-16 bg-yellow-300 rounded-full"
                style={{
                    transition: 'transform 4s ease-in-out',
                    transform: isAnimating && instruction === 'Breathe In...' ? 'scale(1.5)' : 'scale(1)',
                }}
            ></div>
        </div>
        
        {/* Meadow */}
        <div className="absolute bottom-0 w-full h-1/2 bg-[#2a9d8f] overflow-hidden">
             <div 
                key={key+1} 
                className="w-full h-full"
                style={{ animation: isAnimating && instruction === 'Breathe Out...' ? 'sway-grass 6s ease-in-out infinite alternate' : 'none' }}
             >
                {isAnimating && instruction === 'Breathe In...' && Array.from({length: 5}).map((_, i) => <Flower key={i} delay={i * 0.5} />)}
             </div>
        </div>

        <p className="relative text-white text-3xl font-bold z-10" style={{textShadow: '2px 2px 0 #000'}}>{instruction}</p>
      </div>
      
      <div className="w-full max-w-sm grid grid-cols-2 gap-4">
        <button 
            onClick={startBreathingCycle}
            disabled={isAnimating}
            className="bg-pixel-yellow text-deep-sienna font-bold py-3 border-2 border-pixel-black 
                       transform active:translate-x-1 active:translate-y-1 disabled:opacity-50"
            style={{ boxShadow: '4px 4px 0 #000' }}
            >
            Start Cycle
        </button>
         <button 
            onClick={onBack}
            className="bg-pixel-purple-light/80 text-white font-bold py-3 border-2 border-pixel-black 
                       transform active:translate-x-1 active:translate-y-1"
            style={{ boxShadow: '4px 4px 0 #000' }}
            >
            Back to Hub
        </button>
      </div>
    </div>
  );
};

export default MindfulMeadowScreen;
