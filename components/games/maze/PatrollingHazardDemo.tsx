import React from 'react';

const PatrollingHazardDemo: React.FC = () => {
  return (
    <div className="relative w-full h-full overflow-hidden bg-rose-50 flex items-center justify-center p-4">
        {/* Maze Walls */}
        <svg viewBox="0 0 100 100" className="w-full h-full">
            <path d="M10 10 H 90 V 90 H 10 V 10" fill="none" stroke="#6B7280" strokeWidth="4" />
            <path d="M10 50 H 90" fill="none" stroke="#6B7280" strokeWidth="4" />
        </svg>

        {/* Character (safe) */}
        <div className="absolute w-8 h-8 rounded-full bg-emerald-300 border-2 border-emerald-800/50 top-[25%]" style={{ left: 'calc(50% - 16px)'}} />

        {/* Patrolling Hazard */}
        <div className="absolute w-8 h-8 rounded-sm bg-red-400 border-2 border-red-800/50 bottom-[25%] animate-patrol" />
      
      <style>{`
        @keyframes patrol {
          0%, 100% { left: 15%; }
          50% { left: calc(85% - 32px); }
        }
        .animate-patrol {
          animation: patrol 5s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default PatrollingHazardDemo;
