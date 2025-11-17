import React from 'react';

interface Avatar {
  name:string;
  component: React.FC;
  story: string;
}

interface AvatarStoryModalProps {
  avatar: Avatar;
  onClose: () => void;
}

export const AvatarStoryModal: React.FC<AvatarStoryModalProps> = ({ avatar, onClose }) => {
  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm font-mono"
      onClick={onClose}
    >
      <div 
        className="relative w-11/12 max-w-sm m-4 p-6 bg-vintage-brown-dark text-white border-2 border-pixel-black animate-fade-in"
        style={{ boxShadow: '8px 8px 0px rgba(0,0,0,0.5)' }}
        onClick={(e) => e.stopPropagation()} // Prevent closing modal when clicking inside
      >
        <button 
          onClick={onClose}
          className="absolute -top-2 -right-2 w-8 h-8 bg-pixel-yellow text-deep-sienna border-2 border-pixel-black text-2xl font-bold flex items-center justify-center hover:bg-yellow-300 active:translate-x-0.5 active:translate-y-0.5"
          aria-label="Close"
          style={{ boxShadow: '2px 2px 0px #000000' }}
        >
          &times;
        </button>

        <div className="flex flex-col items-center text-center">
          <div className="w-28 h-28 mb-3" style={{ imageRendering: 'pixelated' }}>
            <avatar.component />
          </div>
          <h2 className="text-4xl text-pixel-yellow mb-2" style={{ textShadow: '2px 2px 0px #000' }}>
            {avatar.name}
          </h2>
          <p className="text-vintage-brown-light/90 text-sm leading-relaxed">
            {avatar.story}
          </p>
        </div>
      </div>
    </div>
  );
};