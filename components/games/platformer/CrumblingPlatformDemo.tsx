import React from 'react';

const Character: React.FC<{ className?: string }> = ({ className }) => (
  <div className={`w-12 h-16 ${className}`}>
    <div className="w-full h-full bg-emerald-300 border-2 border-emerald-800/50 rounded-t-full rounded-b-lg" />
  </div>
);

const CrumblingBlock: React.FC<{ delay: string }> = ({ delay }) => (
    <div className="w-8 h-4 bg-yellow-800/70 border-b-2 border-yellow-900/80 animate-crumble" style={{ animationDelay: delay }}/>
);

const CrumblingPlatformDemo: React.FC = () => {
  return (
    <div className="relative w-full h-full overflow-hidden bg-sky-100">
      {/* Static Platforms */}
      <div className="absolute bottom-10 left-[5%] w-[25%] h-4 bg-slate-400 border-b-4 border-slate-500 rounded-sm" />
      <div className="absolute bottom-10 right-[5%] w-[25%] h-4 bg-slate-400 border-b-4 border-slate-500 rounded-sm" />
      
      {/* Crumbling Platform */}
      <div className="absolute bottom-24 left-1/2 -translate-x-1/2 flex gap-px">
        <CrumblingBlock delay="0s" />
        <CrumblingBlock delay="0.1s" />
        <CrumblingBlock delay="0.2s" />
        <CrumblingBlock delay="0.3s" />
      </div>

      {/* Character */}
      <Character className="absolute bottom-[56px] animate-crumble-run" />
      
      <style>{`
        @keyframes crumble-run {
          0%, 10% { left: 10%; transform: translateY(0); }
          25% { transform: translateY(-70px); }
          40% { left: calc(50% - 24px); transform: translateY(-70px); }
          50% { left: calc(50% - 24px); transform: translateY(0); }
          60% { transform: translateY(-70px); }
          75%, 100% { left: 80%; transform: translateY(0); }
        }
        .animate-crumble-run {
            animation: crumble-run 8s ease-in-out infinite;
        }

        @keyframes crumble {
            0%, 45%, 100% { transform: translate(0, 0) rotate(0); opacity: 1; }
            50% { transform: translate(2px, 2px) rotate(5deg); }
            55% { transform: translate(-2px, 4px) rotate(-5deg); }
            90% { transform: translate(0, 150px) rotate(180deg); opacity: 0; }
        }
        .animate-crumble {
            animation: crumble 8s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default CrumblingPlatformDemo;