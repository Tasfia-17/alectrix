import React from 'react';

const Character: React.FC<{ className?: string }> = ({ className }) => (
  <div className={`w-12 h-16 ${className}`}>
    <div className="w-full h-full bg-emerald-300 border-2 border-emerald-800/50 rounded-t-full rounded-b-lg" />
  </div>
);


const VerticalClimbDemo: React.FC = () => {
  return (
    <div className="relative w-full h-full overflow-hidden bg-sky-100 flex items-center justify-center">
      {/* Platforms */}
      <div className="absolute bottom-2 left-[10%] w-[80%] h-4 bg-slate-400 border-b-4 border-slate-500 rounded-sm" />
      <div className="absolute bottom-20 right-[10%] w-[60%] h-4 bg-slate-400 border-b-4 border-slate-500 rounded-sm" />
      <div className="absolute bottom-40 left-[10%] w-[60%] h-4 bg-slate-400 border-b-4 border-slate-500 rounded-sm" />
      <div className="absolute top-10 right-[10%] w-[80%] h-4 bg-slate-400 border-b-4 border-slate-500 rounded-sm" />


      {/* Character */}
      <Character className="absolute animate-climb" />
      
      <style>{`
        @keyframes climb {
          0% { bottom: 24px; left: 20%; }
          10% { transform: translateY(5px) scaleY(0.9); }
          25% { bottom: 96px; left: 70%; transform: translateY(-60px); }
          30% { bottom: 96px; left: 70%; transform: translateY(0); }
          40% { transform: translateY(5px) scaleY(0.9); }
          55% { bottom: 176px; left: 30%; transform: translateY(-60px); }
          60% { bottom: 176px; left: 30%; transform: translateY(0); }
          70% { transform: translateY(5px) scaleY(0.9); }
          85% { top: 56px; left: 80%; transform: translateY(-60px); }
          90%, 100% { top: 56px; left: 80%; transform: translateY(0); }
        }
        .animate-climb {
          animation: climb 8s ease-in-out infinite;
          transform-origin: bottom center;
        }
      `}</style>
    </div>
  );
};

export default VerticalClimbDemo;
