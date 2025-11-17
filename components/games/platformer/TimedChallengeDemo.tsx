import React from 'react';

const Character: React.FC<{ className?: string }> = ({ className }) => (
  <div className={`w-10 h-14 ${className}`}>
    <div className="w-full h-full bg-emerald-300 border-2 border-emerald-800/50 rounded-t-full rounded-b-lg" />
  </div>
);

const TimedChallengeDemo: React.FC = () => {
  return (
    <div className="relative w-full h-full overflow-hidden bg-sky-100 flex items-center justify-center">
      {/* Timer Display */}
      <div className="absolute top-2 right-2 bg-slate-800 text-white font-bold text-2xl px-3 py-1 rounded-lg">
        <span className="animate-timer">30</span>
      </div>

      {/* Platforms */}
      <div className="absolute bottom-10 left-[5%] w-[40%] h-4 bg-slate-400" />
      <div className="absolute bottom-24 left-[55%] w-[40%] h-4 bg-slate-400" />
      
      {/* Goal */}
       <div className="absolute w-8 h-8 text-blue-500 text-3xl bottom-32 left-[75%]">★</div>

      {/* Character */}
      <Character className="absolute bottom-[56px] left-[15%]" />
      
      <style>{`
        @keyframes countdown {
          0% { content: "30"; }
          10% { content: "27"; }
          20% { content: "24"; }
          30% { content: "21"; }
          40% { content: "18"; }
          50% { content: "15"; }
          60% { content: "12"; }
          70% { content: "9"; }
          80% { content: "6"; }
          90% { content: "3"; }
          100% { content: "0"; }
        }
        .animate-timer::before {
          content: "30";
          animation: countdown 10s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default TimedChallengeDemo;