import React from 'react';

interface AvatarCardProps {
  name: string;
  AvatarComponent: React.FC;
  isSelected: boolean;
  onSelect: () => void;
}

export const AvatarCard: React.FC<AvatarCardProps> = ({ name, AvatarComponent, isSelected, onSelect }) => {
  return (
    <div
      onClick={onSelect}
      className="relative flex flex-col items-center justify-center cursor-pointer group transition-transform duration-300 ease-out transform hover:scale-110"
    >
        <div className={`relative w-28 h-28 sm:w-32 sm:h-32 p-2 border-2 transition-colors duration-200 ${isSelected ? 'border-pixel-yellow bg-pixel-yellow/20' : 'border-transparent'}`} style={{ imageRendering: 'pixelated' }}>
            <div className="w-full h-full">
                <AvatarComponent />
            </div>
        </div>
        
        <p className={`mt-2 font-mono text-center text-sm sm:text-base transition-colors duration-300 ${isSelected ? 'text-pixel-yellow' : 'text-gray-300 group-hover:text-white'}`}>
            {name}
        </p>
    </div>
  );
};