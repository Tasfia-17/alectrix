import React from 'react';

const Character: React.FC<{ className?: string }> = ({ className }) => (
  <div className={`w-12 h-16 ${className}`}>
    <div className="w-full h-full bg-emerald-300 border-2 border-emerald-800/50 rounded-t-full rounded-b-lg" />
  </div>
);

const TrickyJumpsDemo: React.FC = () => {
  return (
    <div className="relative w-full h-full overflow-hidden bg-sky-100 flex items-center justify-center">
      {/* Platforms */}
      <div className="absolute bottom-10 left-[5%] w-[20%] h-4 bg-slate-400 border-b-4 border-slate-500 rounded-sm" />
      <div className="absolute bottom-24 left-[40%] w-[20%] h-4 bg-slate-400 border-b-4 border-slate-500 rounded-sm" />
      <div className="absolute bottom-10 right-[5%] w-[20%] h-4 bg-slate-400 border-b-4 border-slate-500 rounded-sm" />

      {/* Character */}
      <Character className="absolute bottom-[56px] animate-tricky-jump" />
      
      <style>{`
        @keyframes tricky-jump {
          0%, 100% { left: 10%; transform: translateY(0); }
          15% { left: 10%; transform: translateY(5px) scaleY(0.9); }
          
          25% { transform: translateY(-80px); }
          40% { left: 45%; transform: translateY(-80px); }
          
          50% { left: 45%; transform: translateY(0); }
          55% { left: 45%; transform: translateY(5px) scaleY(0.9); }

          65% { transform: translateY(-80px); }
          80% { left: 80%; transform: translateY(-80px); }
          90%, 95% { left: 80%; transform: translateY(0); }
        }
        .animate-tricky-jump {
            animation: tricky-jump 6s ease-in-out infinite;
            transform-origin: bottom center;
        }
      `}</style>
    </div>
  );
};

export default TrickyJumpsDemo;
