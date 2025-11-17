import React from 'react';

const Character: React.FC<{ className?: string }> = ({ className }) => (
  <div className={`w-12 h-12 ${className}`}>
    <div className="w-full h-full bg-emerald-300 border-2 border-emerald-800/50 rounded-lg" />
  </div>
);

const Hazard: React.FC<{ className?: string, style?: React.CSSProperties, shape: 'square' | 'circle' }> = ({ className, style, shape }) => (
    <div className={`absolute bg-red-400 border-b-4 border-red-500 ${shape === 'circle' ? 'rounded-full' : 'rounded-sm'} ${className}`} style={style} />
);

const MultiHazardDemo: React.FC = () => {
  return (
    <div className="relative w-full h-full overflow-hidden bg-slate-800">
      {/* Falling Hazards */}
      <Hazard shape="square" className="w-10 h-10 left-[10%] animate-fall" style={{ animationDelay: '0s', animationDuration: '2s' }} />
      <Hazard shape="circle" className="w-6 h-6 left-[30%] animate-fall" style={{ animationDelay: '0.5s', animationDuration: '1.5s' }} />
      <Hazard shape="square" className="w-8 h-8 left-[50%] animate-fall" style={{ animationDelay: '0.2s', animationDuration: '2.5s' }} />
      <Hazard shape="circle" className="w-12 h-12 left-[70%] animate-fall" style={{ animationDelay: '1.2s', animationDuration: '3s' }} />
      
      {/* Ground */}
      <div className="absolute bottom-0 left-0 w-full h-2 bg-slate-600" />
      
      {/* Character */}
      <Character className="absolute bottom-2 animate-dodge" />
      
      <style>{`
        @keyframes fall {
            from { transform: translateY(-100%); }
            to { transform: translateY(250px); }
        }
        .animate-fall {
            animation: fall linear infinite;
        }

        @keyframes dodge {
            0%, 100% { left: 10%; }
            50% { left: calc(90% - 48px); }
        }
        .animate-dodge {
            animation: dodge 4s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default MultiHazardDemo;