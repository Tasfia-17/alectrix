import React from 'react';

const KeyAndDoorDemo: React.FC = () => {
  return (
    <div className="relative w-full h-full overflow-hidden bg-rose-50 p-4">
        {/* Maze Walls */}
        <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full">
            <path d="M10 10 H 90 V 90 H 10 V 10" fill="none" stroke="#6B7280" strokeWidth="4" />
            <path d="M10 50 H 50 M 50 10 V 50" fill="none" stroke="#6B7280" strokeWidth="4" />
        </svg>

        {/* Door */}
        <div className="absolute w-1 h-12 bg-slate-500 top-[calc(50%-24px)] left-[50%] animate-maze-door" />
        
        {/* Key */}
        <div className="absolute w-6 h-6 text-blue-500 text-3xl top-[70%] left-[70%] animate-key-get">🔑</div>

        {/* Character */}
        <div className="absolute w-6 h-6 rounded-full bg-emerald-300 border-2 border-emerald-800/50 animate-key-run" />
      
      <style>{`
        @keyframes key-run {
          0% { top: 25%; left: 25%; }
          30% { top: 70%; left: 25%; }
          50% { top: 70%; left: 70%; }
          70% { top: 25%; left: 70%; }
          100% { top: 25%; left: 25%; }
        }
        .animate-key-run {
          animation: key-run 10s ease-in-out infinite;
        }

        @keyframes key-get {
            0%, 40%, 100% { opacity: 1; }
            50%, 90% { opacity: 0; }
        }
        .animate-key-get {
            animation: key-get 10s linear infinite;
        }

        @keyframes maze-door {
            0%, 50%, 100% { opacity: 1; }
            60%, 90% { opacity: 0; }
        }
        .animate-maze-door {
            animation: maze-door 10s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default KeyAndDoorDemo;