import React from 'react';

const Character: React.FC<{ className?: string }> = ({ className }) => (
  <div className={`w-12 h-16 ${className}`}>
    <div className="w-full h-full bg-emerald-300 border-2 border-emerald-800/50 rounded-t-full rounded-b-lg" />
  </div>
);

const BouncyPlatformDemo: React.FC = () => {
  return (
    <div className="relative w-full h-full overflow-hidden bg-sky-100 flex items-center justify-center">
      {/* Normal Platform */}
      <div className="absolute bottom-10 left-[5%] w-[40%] h-4 bg-slate-400 border-b-4 border-slate-500 rounded-sm" />

      {/* Bouncy Platform */}
      <div className="absolute bottom-10 right-[5%] w-[40%] h-4 bg-orange-300 border-b-4 border-orange-500 rounded-sm animate-bounce-squash" />
      
      {/* Character */}
      <Character className="absolute bottom-[56px] animate-bounce-jump" />
      
      <style>{`
        @keyframes bounce-jump {
          0% { left: 15%; transform: translateY(0); }
          10% { transform: translateY(5px) scaleY(0.9); }
          25% { transform: translateY(-50px); }
          40% { left: 15%; transform: translateY(0); }
          
          50% { left: 75%; transform: translateY(0); }
          60% { transform: translateY(10px) scaleY(0.8); }
          80% { transform: translateY(-120px); }
          95%, 100% { left: 75%; transform: translateY(0); }
        }
        .animate-bounce-jump {
          animation: bounce-jump 6s ease-in-out infinite;
          transform-origin: bottom center;
        }
        
        @keyframes bounce-squash {
            0%, 55%, 100% { transform: scaleY(1); }
            60% { transform: scaleY(0.7); }
            70% { transform: scaleY(1.2); }
        }
        .animate-bounce-squash {
            animation: bounce-squash 6s ease-in-out infinite;
            transform-origin: bottom;
        }
      `}</style>
    </div>
  );
};

export default BouncyPlatformDemo;