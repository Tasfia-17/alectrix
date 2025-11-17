import React from 'react';

const Character: React.FC<{ className?: string }> = ({ className }) => (
  <div className={`w-12 h-12 ${className}`}>
    <div className="w-full h-full bg-emerald-300 border-2 border-emerald-800/50 rounded-lg" />
  </div>
);

const Hazard: React.FC<{ className?: string, style?: React.CSSProperties }> = ({ className, style }) => (
    <div className={`absolute w-8 h-8 bg-red-400 border-b-4 border-red-500 rounded-sm ${className}`} style={style} />
);

const Powerup: React.FC<{ className?: string, style?: React.CSSProperties }> = ({ className, style }) => (
    <div className={`absolute w-8 h-8 bg-blue-300 border-b-4 border-blue-500 rounded-full ${className}`} style={style} />
);

const PowerupCollectDemo: React.FC = () => {
  return (
    <div className="relative w-full h-full overflow-hidden bg-slate-800">
      {/* Falling Objects */}
      <Hazard className="left-[20%] animate-fall" style={{ animationDelay: '0s', animationDuration: '2.2s' }} />
      <Powerup className="left-[45%] animate-fall" style={{ animationDelay: '0.8s', animationDuration: '2.0s' }} />
      <Hazard className="left-[75%] animate-fall" style={{ animationDelay: '1.5s', animationDuration: '2.5s' }} />
      
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

export default PowerupCollectDemo;
