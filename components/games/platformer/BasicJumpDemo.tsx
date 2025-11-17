import React, { useState } from 'react';

const Character: React.FC<{ className?: string }> = ({ className }) => (
  <div className={`w-12 h-16 ${className}`}>
    <div className="w-full h-full bg-emerald-300 border-2 border-emerald-800/50 rounded-t-full rounded-b-lg flex items-center justify-center">
      <div className="flex gap-1">
        <div className="w-2 h-2 bg-emerald-900 rounded-full animate-eye-blink" />
        <div className="w-2 h-2 bg-emerald-900 rounded-full animate-eye-blink" style={{ animationDelay: '0.1s' }} />
      </div>
    </div>
  </div>
);


const BasicJumpDemo: React.FC = () => {
  const [isJumping, setIsJumping] = useState(false);

  const handleJump = () => {
    if (isJumping) return;
    setIsJumping(true);
    setTimeout(() => setIsJumping(false), 800);
  };

  return (
    <div className="relative w-full h-full overflow-hidden cursor-pointer bg-sky-100 flex items-center justify-center" onClick={handleJump} title="Click to jump">
      {/* Platform */}
      <div className="absolute bottom-10 left-[10%] w-[80%] h-4 bg-slate-400 border-b-4 border-slate-500 rounded-sm" />

      {/* Character */}
      <Character className={`absolute bottom-[56px] left-[calc(50%-24px)] transition-transform duration-500 ease-out ${isJumping ? 'animate-jump' : ''}`} />
      
      <style>{`
        @keyframes jump {
          0% { transform: translateY(0) scaleY(1); }
          10% { transform: translateY(5px) scaleY(0.9); }
          50% { transform: translateY(-80px) scaleY(1); }
          90% { transform: translateY(5px) scaleY(0.9); }
          100% { transform: translateY(0) scaleY(1); }
        }
        .animate-jump {
          animation: jump 0.8s ease-in-out;
        }
        @keyframes eye-blink {
            0%, 90%, 100% { transform: scaleY(1); }
            95% { transform: scaleY(0.1); }
        }
        .animate-eye-blink {
            transform-origin: center;
            animation: eye-blink 4s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default BasicJumpDemo;