import React from 'react';

const Balloonist: React.FC = () => {
  return (
    <>
      <div className="absolute bottom-0 right-4 md:right-12 w-48 h-64 opacity-80" aria-hidden="true">
        <svg viewBox="0 0 150 250" className="w-full h-full animate-balloon-fade">
          <g className="animate-float">
            {/* Balloons */}
            <circle cx="75" cy="50" r="25" fill="#fca5a5" stroke="#991b1b" strokeWidth="1.5" />
            <path d="M75 75 Q 70 85, 75 90 Q 80 85, 75 75" fill="#991b1b" />
            <circle cx="50" cy="70" r="20" fill="#86efac" stroke="#14532d" strokeWidth="1.5" />
            <path d="M50 90 Q 45 100, 50 105 Q 55 100, 50 90" fill="#14532d" />
            <circle cx="100" cy="70" r="22" fill="#93c5fd" stroke="#1e3a8a" strokeWidth="1.5" />
            <path d="M100 92 Q 95 102, 100 107 Q 105 102, 100 92" fill="#1e3a8a" />
            
            {/* Strings */}
            <path d="M75 90 C 70 120, 70 120, 75 150" stroke="#78716c" strokeWidth="1" fill="none" />
            <path d="M50 105 C 60 125, 65 125, 75 150" stroke="#78716c" strokeWidth="1" fill="none" />
            <path d="M100 107 C 90 127, 85 127, 75 150" stroke="#78716c" strokeWidth="1" fill="none" />
            
            {/* Character */}
            <circle cx="75" cy="160" r="12" fill="#fef08a" stroke="#854d0e" strokeWidth="1.5" />
            <path d="M75 172 C 65 190, 85 190, 75 210" stroke="#854d0e" strokeWidth="2" fill="none" strokeLinecap="round" />
            <path d="M75 180 L 60 195 M75 180 L 90 195" stroke="#854d0e" strokeWidth="2" fill="none" strokeLinecap="round" />

          </g>
        </svg>
      </div>
      <style>{`
        @keyframes balloon-fade {
          from { opacity: 0; transform: translateY(100px); }
          to { opacity: 0.8; transform: translateY(0); }
        }
        .animate-balloon-fade {
          animation: balloon-fade 2s ease-out forwards;
        }

        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(-1deg); }
          50% { transform: translateY(-15px) rotate(1deg); }
        }
        .animate-float {
          transform-origin: center 200px;
          animation: float 8s ease-in-out infinite;
        }
      `}</style>
    </>
  );
};

export default Balloonist;