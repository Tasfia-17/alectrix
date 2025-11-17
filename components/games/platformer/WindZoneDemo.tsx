import React from 'react';

const Character: React.FC<{ className?: string }> = ({ className }) => (
  <div className={`w-12 h-16 ${className}`}>
    <div className="w-full h-full bg-emerald-300 border-2 border-emerald-800/50 rounded-t-full rounded-b-lg" />
  </div>
);

const WindParticle: React.FC<{ className?: string, style?: React.CSSProperties }> = ({className, style}) => (
    <div className={`absolute w-4 h-0.5 bg-white/50 rounded-full ${className}`} style={style} />
);

const WindZoneDemo: React.FC = () => {
  return (
    <div className="relative w-full h-full overflow-hidden bg-sky-100">
      {/* Platforms */}
      <div className="absolute bottom-10 left-[5%] w-[30%] h-4 bg-slate-400 border-b-4 border-slate-500 rounded-sm" />
      <div className="absolute bottom-24 right-[5%] w-[30%] h-4 bg-slate-400 border-b-4 border-slate-500 rounded-sm" />

      {/* Wind Zone */}
      <div className="absolute bottom-14 left-[35%] w-[30%] h-20 overflow-hidden">
        <WindParticle className="animate-wind" style={{ top: '10%' }}/>
        <WindParticle className="animate-wind" style={{ top: '30%', animationDelay: '0.3s' }}/>
        <WindParticle className="animate-wind" style={{ top: '50%', animationDelay: '0.1s' }}/>
        <WindParticle className="animate-wind" style={{ top: '70%', animationDelay: '0.5s' }}/>
        <WindParticle className="animate-wind" style={{ top: '90%', animationDelay: '0.2s' }}/>
      </div>

      {/* Character */}
      <Character className="absolute bottom-[56px] animate-wind-jump" />
      
      <style>{`
        @keyframes wind-jump {
          0% { left: 15%; transform: translateY(0); }
          10% { transform: translateY(5px) scaleY(0.9); }
          30% { transform: translateY(-70px); }
          60% { left: 75%; transform: translateY(-70px); }
          80%, 100% { left: 75%; transform: translateY(0); }
        }
        .animate-wind-jump {
            animation: wind-jump 6s ease-in-out infinite;
        }

        @keyframes wind {
            from { transform: translateX(-100%); }
            to { transform: translateX(300%); }
        }
        .animate-wind {
            animation: wind 1s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default WindZoneDemo;