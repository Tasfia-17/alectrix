import React from 'react';

interface BackButtonProps {
  onBack: () => void;
}

const BackButton: React.FC<BackButtonProps> = ({ onBack }) => {
  return (
    <button
      onClick={onBack}
      className="absolute top-4 left-4 z-20 p-2 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-aurora-dark-text/70 hover:bg-white/40 transition-all duration-300 shadow-lg"
      aria-label="Go back"
    >
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
      </svg>
    </button>
  );
};

export default BackButton;