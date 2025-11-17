import React from 'react';

const Character: React.FC<{ className?: string }> = ({ className }) => (
  <div className={`w-12 h-12 relative ${className}`}>
    <div className="w-full h-full bg-emerald-300 border-2 border-emerald-800/50 rounded-lg" />
    <div className="absolute -inset-2 border-2 border-cyan-300 rounded-full animate-shield-pulse" />
  </div>
);

const Hazard: React.FC<{ className?: string, style?: React.CSSProperties }> = ({ className, style }) => (
    <div className={`absolute w-8 h-8 bg-red-400 border-b-4 border-red-500 rounded-sm ${className}`} style={style} />
);

const Powerup: React.FC<{ className?: string }> = ({ className }) => (
    <div className={`absolute w-8 h-8 bg-blue-300 border-b-4 border-blue-500 rounded-full ${className}`} />
);

const ShieldPowerupDemo: React.FC = () => {
  return (
    <div className="relative w-full h-full overflow-hidden bg-slate-800">
      {/* Falling Objects */}
      <Powerup className="left-[50%] animate-powerup-fall" />
      <Hazard className="left-[55%] animate-hazard-fall-deflect" />
      
      {/* Ground */}
      <div className="absolute bottom-0 left-0 w-full h-2 bg-slate-600" />
      
      {/* Character */}
      <Character className="absolute bottom-2 left-[45%]" />
      
      <style>{`
        @keyframes powerup-fall {
            0% { transform: translateY(-100%); opacity: 1; }
            40% { transform: translateY(180px); opacity: 1; }
            50%, 100% { transform: translateY(180px); opacity: 0; }
        }
        .animate-powerup-fall {
            animation: powerup-fall 5s linear infinite;
        }

        @keyframes hazard-fall-deflect {
            0%, 50% { transform: translateY(-100%); }
            70% { transform: translateY(180px) rotate(0deg); }
            100% { transform: translateY(100px) translateX(-100px) rotate(-360deg); }
        }
        .animate-hazard-fall-deflect {
            animation: hazard-fall-deflect 5s linear infinite;
        }

        @keyframes shield-pulse {
            0%, 40%, 100% { opacity: 0; transform: scale(0.8); }
            50%, 70% { opacity: 1; transform: scale(1.2); }
            80% { opacity: 0; transform: scale(1.5); }
        }
        .animate-shield-pulse {
            animation: shield-pulse 5s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default ShieldPowerupDemo;