import React from 'react';

const PaperPlanePilot: React.FC = () => {
  return (
    <>
      <div className="absolute top-[40%] left-[15%] md:left-[20%] w-32 h-24 opacity-80" aria-hidden="true">
        <svg viewBox="0 0 100 80" className="w-full h-full animate-pilot-fade">
            <g className="animate-fly-loop">
                {/* Paper Plane */}
                <path d="M 10 40 L 80 10 L 50 40 L 80 70 Z" fill="#e2e8f0" stroke="#64748b" strokeWidth="1.5" strokeLinejoin="round" strokeLinecap="round" />
                
                {/* Character */}
                <circle cx="50" cy="35" r="8" fill="#f0abfc" stroke="#86198f" strokeWidth="1.5" />
            </g>
        </svg>
      </div>
      <style>{`
        @keyframes pilot-fade {
          from { opacity: 0; transform: translateX(-20px); }
          to { opacity: 0.8; transform: translateX(0); }
        }
        .animate-pilot-fade {
          animation: pilot-fade 2s ease-out forwards 1.5s;
        }
        @keyframes fly-loop {
            0% { transform: translate(0, 0) rotate(0deg) scale(1); }
            25% { transform: translate(10px, -15px) rotate(10deg) scale(1.05); }
            50% { transform: translate(0px, 0px) rotate(0deg) scale(1); }
            75% { transform: translate(-10px, 15px) rotate(-10deg) scale(0.95); }
            100% { transform: translate(0, 0) rotate(0deg) scale(1); }
        }
        .animate-fly-loop {
            animation: fly-loop 8s ease-in-out infinite;
        }
      `}</style>
    </>
  );
};

export default PaperPlanePilot;