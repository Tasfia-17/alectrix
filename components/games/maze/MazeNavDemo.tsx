import React from 'react';

const MazeNavDemo: React.FC = () => {
  return (
    <div className="relative w-full h-full overflow-hidden bg-rose-50 flex items-center justify-center p-4">
        {/* Maze Walls */}
        <svg viewBox="0 0 100 100" className="w-full h-full">
            <path d="M10 10 H 90 V 90 H 10 V 10" fill="none" stroke="#6B7280" strokeWidth="4" />
            <path d="M10 30 H 70 V 50 H 30 V 70 H 90" fill="none" stroke="#6B7280" strokeWidth="4" />
        </svg>

        {/* Character */}
        <div className="absolute w-8 h-8 rounded-full bg-emerald-300 border-2 border-emerald-800/50 animate-maze-path" />
      
      <style>{`
        @keyframes maze-path {
          0% { top: 15%; left: 15%; }
          15% { top: 15%; left: 75%; }
          30% { top: 35%; left: 75%; }
          45% { top: 35%; left: 35%; }
          60% { top: 55%; left: 35%; }
          75% { top: 55%; left: 75%; }
          90%, 100% { top: 75%; left: 75%; }
        }
        .animate-maze-path {
          animation: maze-path 10s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default MazeNavDemo;