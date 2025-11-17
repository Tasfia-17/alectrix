import React from 'react';

const LadderClimber: React.FC = () => {
  return (
    <>
      <div className="absolute top-0 right-4 md:right-16 w-16 h-full opacity-70" aria-hidden="true">
        {/* Ladder */}
        <svg viewBox="0 0 50 800" className="absolute top-0 w-full h-full">
            <line x1="10" y1="-20" x2="10" y2="820" stroke="#ca8a04" strokeWidth="3" strokeDasharray="5 3"/>
            <line x1="40" y1="-20" x2="40" y2="820" stroke="#ca8a04" strokeWidth="3" strokeDasharray="5 3"/>
            <path d="M10 20 H40 M10 60 H40 M10 100 H40 M10 140 H40 M10 180 H40 M10 220 H40 M10 260 H40 M10 300 H40 M10 340 H40 M10 380 H40 M10 420 H40 M10 460 H40 M10 500 H40 M10 540 H40 M10 580 H40 M10 620 H40 M10 660 H40 M10 700 H40 M10 740 H40 M10 780 H40" stroke="#ca8a04" strokeWidth="3" strokeLinecap="round"/>
        </svg>

        {/* Character */}
        <div className="absolute w-full animate-climb">
            <svg viewBox="0 0 50 50" className="w-full h-auto">
                <g className="animate-climb-step">
                    <circle cx="25" cy="15" r="8" fill="#ecfccb" stroke="#4d7c0f" strokeWidth="1.5" />
                    <path d="M25 23 L 25 40" stroke="#4d7c0f" strokeWidth="2" fill="none" strokeLinecap="round" />
                    <path d="M25 28 L 15 35" stroke="#4d7c0f" strokeWidth="2" fill="none" strokeLinecap="round" />
                    <path d="M25 35 L 35 42" stroke="#4d7c0f" strokeWidth="2" fill="none" strokeLinecap="round" />
                </g>
            </svg>
        </div>
      </div>
      <style>{`
        @keyframes climb {
          from { transform: translateY(100vh); }
          to { transform: translateY(-50px); }
        }
        .animate-climb {
          animation: climb 10s linear infinite;
        }
        @keyframes climb-step {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px) rotate(2deg); }
        }
        .animate-climb-step {
            transform-origin: center;
            animation: climb-step 1s ease-in-out infinite;
        }
      `}</style>
    </>
  );
};

export default LadderClimber;