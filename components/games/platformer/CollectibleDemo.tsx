import React, { useState } from 'react';

const Character: React.FC<{ className?: string }> = ({ className }) => (
  <div className={`w-12 h-16 ${className}`}>
    <div className="w-full h-full bg-emerald-300 border-2 border-emerald-800/50 rounded-t-full rounded-b-lg" />
  </div>
);

const Star: React.FC<{ onClick: () => void; isCollected: boolean }> = ({ onClick, isCollected }) => (
    <div 
      className={`absolute w-12 h-12 cursor-pointer transition-all duration-300 ${isCollected ? 'opacity-0 scale-150' : 'opacity-100'}`} 
      style={{ bottom: '130px', left: 'calc(75% - 24px)' }}
      onClick={onClick}
      title="Click to collect"
    >
        <svg viewBox="0 0 24 24" className="w-full h-full">
            <path 
              d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" 
              fill="#BFDBFE"
              stroke="#3B82F6" 
              strokeWidth="1.5"
              strokeLinejoin="round" 
              strokeLinecap="round" 
            />
        </svg>
    </div>
);


const CollectibleDemo: React.FC = () => {
  const [isCollected, setIsCollected] = useState(false);

  const handleCollect = () => {
      setIsCollected(true);
      setTimeout(() => setIsCollected(false), 2000); // Reset after 2 seconds
  }

  return (
    <div className="relative w-full h-full overflow-hidden bg-sky-100">
      {/* Platforms */}
      <div className="absolute bottom-10 left-[5%] w-[40%] h-4 bg-slate-400 border-b-4 border-slate-500 rounded-sm"/>
      <div className="absolute bottom-24 left-[55%] w-[40%] h-4 bg-slate-400 border-b-4 border-slate-500 rounded-sm" />

      {/* Character */}
      <Character className="absolute bottom-[56px] left-[15%]" />
      
      {/* Collectible Star */}
      <Star onClick={handleCollect} isCollected={isCollected} />

    </div>
  );
};

export default CollectibleDemo;