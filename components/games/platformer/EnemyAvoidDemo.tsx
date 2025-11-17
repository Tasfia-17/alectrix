import React from 'react';

const Character: React.FC<{ className?: string }> = ({ className }) => (
  <div className={`w-12 h-16 ${className}`}>
    <div className="w-full h-full bg-emerald-300 border-2 border-emerald-800/50 rounded-t-full rounded-b-lg" />
  </div>
);

const Enemy: React.FC = () => (
    <div className="absolute w-12 h-12 bottom-[112px] animate-enemy-patrol">
        <svg viewBox="0 0 100 100" className="w-full h-full">
            <g strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <path d="M 20,80 A 40,40 0 0,1 80,80 L 50,20 Z" fill="#FECACA" stroke="#B91C1C" />
                <circle cx="50" cy="55" r="8" fill="#fff" />
                <circle cx="50" cy="55" r="4" fill="#B91C1C" />
            </g>
        </svg>
    </div>
);

const EnemyAvoidDemo: React.FC = () => {
  return (
    <div className="relative w-full h-full overflow-hidden bg-sky-100">
      {/* Platforms */}
      <div className="absolute bottom-10 left-[5%] w-[30%] h-4 bg-slate-400 border-b-4 border-slate-500 rounded-sm" />
      <div className="absolute bottom-24 left-[30%] w-[65%] h-4 bg-slate-400 border-b-4 border-slate-500 rounded-sm" />

      {/* Character (safe) */}
      <Character className="absolute bottom-[56px] left-[10%]" />
      
      {/* Patrolling Enemy */}
      <Enemy />
      
      <style>{`
        @keyframes enemy-patrol {
            0%, 100% { left: 35%; }
            50% { left: 80%; }
        }
        .animate-enemy-patrol {
            animation: enemy-patrol 5s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default EnemyAvoidDemo;