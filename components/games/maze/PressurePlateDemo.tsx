import React from 'react';

const PressurePlateDemo: React.FC = () => {
  return (
    <div className="relative w-full h-full overflow-hidden bg-rose-50 p-4">
        {/* Maze Walls */}
        <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full">
            <path d="M10 10 H 90 V 90 H 10 V 10 M50 10 V 90" fill="none" stroke="#6B7280" strokeWidth="4" />
        </svg>

        {/* Pressure Plate */}
        <div className="absolute w-8 h-8 bg-blue-200 border-2 border-blue-400 top-[calc(50%-16px)] left-[calc(25%-16px)] animate-plate-press" />

        {/* Door */}
        <div className="absolute w-1 h-12 bg-slate-500 top-[calc(50%-24px)] left-[50%] animate-plate-door" />
        
        {/* Character */}
        <div className="absolute w-6 h-6 rounded-full bg-emerald-300 border-2 border-emerald-800/50 animate-plate-run" />
      
      <style>{`
        @keyframes plate-run {
          0%, 100% { top: 25%; left: 25%; }
          30% { top: 50%; left: 25%; }
          70% { top: 50%; left: 75%; }
        }
        .animate-plate-run {
          transform: translate(-50%, -50%);
          animation: plate-run 8s ease-in-out infinite;
        }

        @keyframes plate-press {
            0%, 20%, 80%, 100% { transform: scale(1); }
            40%, 60% { transform: scale(0.9); }
        }
        .animate-plate-press {
            animation: plate-press 8s ease-in-out infinite;
        }

        @keyframes plate-door {
            0%, 20%, 80%, 100% { opacity: 1; }
            40%, 60% { opacity: 0; }
        }
        .animate-plate-door {
            animation: plate-door 8s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default PressurePlateDemo;