import React from 'react';

const Character: React.FC<{ className?: string }> = ({ className }) => (
  <div className={`w-12 h-16 ${className}`}>
    <div className="w-full h-full bg-emerald-300 border-2 border-emerald-800/50 rounded-t-full rounded-b-lg" />
  </div>
);

const MovingPlatformDemo: React.FC = () => {
  return (
    <div className="relative w-full h-full overflow-hidden bg-sky-100 flex items-center justify-center">
        <div className="absolute top-1/2 left-0 w-full animate-platform-move">
            {/* Platform */}
            <div className="absolute w-[40%] h-4 bg-purple-300 border-b-4 border-purple-500 rounded-sm"/>

            {/* Character */}
            <Character className="absolute bottom-4 left-[calc(20%-24px)]" />
        </div>
        
        {/* Static Platforms for reference */}
        <div className="absolute bottom-10 left-0 w-[20%] h-4 bg-slate-400 border-b-4 border-slate-500 rounded-sm" />
        <div className="absolute bottom-10 right-0 w-[20%] h-4 bg-slate-400 border-b-4 border-slate-500 rounded-sm" />

      <style>{`
        @keyframes platform-move {
          0%, 100% { transform: translateX(20%); }
          50% { transform: translateX(80%); }
        }
        .animate-platform-move {
            animation: platform-move 6s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default MovingPlatformDemo;