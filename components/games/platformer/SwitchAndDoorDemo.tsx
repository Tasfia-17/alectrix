import React from 'react';

const Character: React.FC<{ className?: string }> = ({ className }) => (
  <div className={`w-12 h-16 ${className}`}>
    <div className="w-full h-full bg-emerald-300 border-2 border-emerald-800/50 rounded-t-full rounded-b-lg" />
  </div>
);

const SwitchAndDoorDemo: React.FC = () => {
  return (
    <div className="relative w-full h-full overflow-hidden bg-sky-100 p-4">
      {/* Platforms */}
      <div className="absolute bottom-4 left-[5%] w-[40%] h-4 bg-slate-400 border-b-4 border-slate-500 rounded-sm" />
      <div className="absolute bottom-4 right-[5%] w-[40%] h-4 bg-slate-400 border-b-4 border-slate-500 rounded-sm" />
      
      {/* Switch Button */}
      <div className="absolute bottom-8 left-[calc(25%-12px)] w-6 h-4 bg-blue-300 rounded-t-md animate-switch-press" />

      {/* Door */}
      <div className="absolute bottom-4 left-[calc(50%-2px)] w-4 h-24 bg-slate-600 animate-door-open" />

      {/* Character */}
      <Character className="absolute bottom-8 animate-switch-run" />
      
      <style>{`
        @keyframes switch-run {
          0%, 10% { left: 10%; }
          40% { left: calc(25% - 24px); }
          50%, 100% { left: 80%; }
        }
        .animate-switch-run {
          animation: switch-run 7s ease-in-out infinite;
        }

        @keyframes switch-press {
          0%, 30%, 50%, 100% { transform: scaleY(1); }
          40% { transform: scaleY(0.3); }
        }
        .animate-switch-press {
          transform-origin: bottom;
          animation: switch-press 7s ease-in-out infinite;
        }

        @keyframes door-open {
            0%, 40% { opacity: 1; transform: translateY(0); }
            50%, 100% { opacity: 0; transform: translateY(100%); }
        }
        .animate-door-open {
            animation: door-open 7s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default SwitchAndDoorDemo;