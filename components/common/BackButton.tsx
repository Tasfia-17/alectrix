import React from 'react';

interface BackButtonProps {
  onClick: () => void;
  className?: string;
}

const BackButton: React.FC<BackButtonProps> = ({ onClick, className }) => {
  return (
    <button
      onClick={onClick}
      aria-label="Go back"
      className={`absolute top-4 left-4 z-20 w-10 h-10 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center shadow-md hover:bg-slate-100 transition-all duration-200 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-400 ${className}`}
    >
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
      </svg>
    </button>
  );
};

export default BackButton;