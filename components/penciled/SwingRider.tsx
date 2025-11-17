import React from 'react';

const SwingRider: React.FC = () => {
  return (
    <>
      <div className="absolute top-8 right-1/4 md:right-1/3 w-48 h-64 opacity-80" aria-hidden="true">
        <svg viewBox="0 0 150 200" className="w-full h-full animate-swing-fade">
          {/* Cloud */}
          <path d="M 30 50 Q 20 30, 50 30 T 90 30 Q 120 30, 130 50 T 90 70 T 50 70 Q 20 70, 30 50 Z" fill="#f0f9ff" stroke="#a1a1aa" strokeWidth="1.5" strokeDasharray="3 3" />
          
          <g className="animate-swing">
            {/* Swing Ropes */}
            <line x1="50" y1="65" x2="60" y2="150" stroke="#a16207" strokeWidth="1.5" />
            <line x1="100" y1="65" x2="90" y2="150" stroke="#a16207" strokeWidth="1.5" />
            {/* Swing Seat */}
            <rect x="55" y="150" width="40" height="5" fill="#facc15" stroke="#a16207" strokeWidth="1.5" />

            {/* Character */}
            <circle cx="75" cy="125" r="12" fill="#e0e7ff" stroke="#3730a3" strokeWidth="1.5" />
            <path d="M75 137 L 75 150" stroke="#3730a3" strokeWidth="2" fill="none" strokeLinecap="round" />
            <path d="M75 150 L 65 165" stroke="#3730a3" strokeWidth="2" fill="none" strokeLinecap="round" />
            <path d="M75 150 L 85 165" stroke="#3730a3" strokeWidth="2" fill="none" strokeLinecap="round" />
          </g>
        </svg>
      </div>
      <style>{`
        @keyframes swing-fade {
          from { opacity: 0; transform: scale(0.9); }
          to { opacity: 0.8; transform: scale(1); }
        }
        .animate-swing-fade {
          animation: swing-fade 2s ease-out forwards 0.5s;
        }

        @keyframes swing {
          0%, 100% { transform: rotate(15deg); }
          50% { transform: rotate(-15deg); }
        }
        .animate-swing {
          transform-origin: 75px 65px;
          animation: swing 6s ease-in-out infinite;
        }
      `}</style>
    </>
  );
};

export default SwingRider;