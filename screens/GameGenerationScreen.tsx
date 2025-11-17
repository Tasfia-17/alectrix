import React, { useState, useEffect } from 'react';

const MESSAGES = [
    "Analyzing your masterpiece...",
    "Dreaming up a new world...",
    "Checking for fun-fairness...",
    "Building platforms and paths...",
    "Adding a sprinkle of magic...",
    "Getting pixels in a row...",
    "Warming up the game engine...",
];

interface GameGenerationScreenProps {
    drawingDataUrl: string | null;
}

const GameGenerationScreen: React.FC<GameGenerationScreenProps> = ({ drawingDataUrl }) => {
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
        setMessageIndex(prevIndex => (prevIndex + 1) % MESSAGES.length);
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative min-h-screen w-full bg-slate-100 flex items-center justify-center p-4 font-sans overflow-hidden">
        {/* Faded background drawing */}
        {drawingDataUrl && (
            <div className="absolute inset-0 z-0">
                <img src={drawingDataUrl} alt="Your drawing" className="w-full h-full object-cover opacity-10 filter blur-sm scale-110" />
            </div>
        )}
        
        <div className="relative z-10 w-full max-w-md bg-white/80 backdrop-blur-sm rounded-2xl shadow-2xl p-8 text-slate-700 border border-slate-200">
            <div className="text-center">
                <h1 className="font-display text-3xl font-bold tracking-wider mb-6 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500">
                    Bringing it to Life!
                </h1>
                
                <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden relative my-6">
                    <div className="absolute top-0 left-0 h-full bg-gradient-to-r from-cyan-300 to-blue-400 animate-loading-bar" />
                </div>

                <div className="h-6 relative overflow-hidden text-sm">
                     {MESSAGES.map((msg, index) => (
                        <p key={index} className={`absolute w-full transition-all duration-500 ease-in-out ${messageIndex === index ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full'}`}>
                            {msg}
                        </p>
                    ))}
                </div>
            </div>
        </div>
        <style>{`
            @keyframes loading-bar {
                0% { transform: translateX(-100%); }
                100% { transform: translateX(100%); }
            }
            .animate-loading-bar {
                animation: loading-bar 2s linear infinite;
            }
        `}</style>
    </div>
  );
};

export default GameGenerationScreen;