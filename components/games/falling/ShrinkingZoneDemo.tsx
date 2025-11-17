import React from 'react';

const Character: React.FC<{ className?: string }> = ({ className }) => (
  <div className={`w-10 h-10 ${className}`}>
    <div className="w-full h-full bg-emerald-300 border-2 border-emerald-800/50 rounded-lg" />
  </div>
);

const Hazard: React.FC<{ className?: string, style?: React.CSSProperties }> = ({ className, style }) => (
    <div className={`absolute w-6 h-6 bg-red-400 rounded-sm ${className}`} style={style} />
);

const ShrinkingZoneDemo: React.FC = () => {
  return (
    <div className="relative w-full h-full overflow-hidden bg-slate-800 flex justify-center items-end">
        {/* Shrinking Floor */}
        <div className="absolute bottom-0 h-2 bg-slate-600 animate-floor-shrink" />

        {/* Hazards */}
        <Hazard className="left-[10%] animate-fall" style={{ animationDuration: '2.5s' }} />
        <Hazard className="left-[30%] animate-fall" style={{ animationDelay: '1s', animationDuration: '2s' }} />
        <Hazard className="left-[60%] animate-fall" style={{ animationDelay: '0.5s', animationDuration: '3s' }} />
        <Hazard className="left-[85%] animate-fall" style={{ animationDuration: '2.2s' }} />

        {/* Character */}
        <Character className="absolute bottom-2 animate-dodge-fast" />

        <style>{`
            @keyframes floor-shrink {
                0% { width: 100%; }
                100% { width: 30%; }
            }
            .animate-floor-shrink {
                animation: floor-shrink 8s linear infinite alternate;
            }

            @keyframes fall {
                from { transform: translateY(-100%); }
                to { transform: translateY(250px); }
            }
            .animate-fall {
                animation: fall linear infinite;
            }

            @keyframes dodge-fast {
                0%, 100% { left: 40%; }
                50% { left: 50%; }
            }
            .animate-dodge-fast {
                animation: dodge-fast 2s ease-in-out infinite;
            }
        `}</style>
    </div>
  );
};

export default ShrinkingZoneDemo;