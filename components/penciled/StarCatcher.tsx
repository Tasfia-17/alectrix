import React from 'react';

const StarCatcher: React.FC = () => {
  return (
    <>
      <div className="absolute bottom-8 right-8 md:right-24 w-48 h-64 opacity-80" aria-hidden="true">
        <svg viewBox="0 0 150 200" className="w-full h-full animate-catcher-fade">
          {/* Stars */}
          <g className="animate-star-fall-1">
            <path d="M20 10 L23 18 L30 18 L25 23 L27 30 L20 25 L13 30 L15 23 L10 18 L17 18 Z" fill="#fef08a" />
          </g>
          <g className="animate-star-fall-2">
            <path d="M80 30 L83 38 L90 38 L85 43 L87 50 L80 45 L73 50 L75 43 L70 38 L77 38 Z" fill="#fef08a" />
          </g>
          <g className="animate-star-fall-3">
             <path d="M120 20 L123 28 L130 28 L125 33 L127 40 L120 35 L113 40 L115 33 L110 28 L117 28 Z" fill="#fef08a" />
          </g>

          {/* Character */}
          <g className="animate-catcher-bob">
            <circle cx="100" cy="160" r="15" fill="#fae8ff" stroke="#86198f" strokeWidth="1.5" />
            <path d="M100 175 C 90 195, 110 195, 100 200" stroke="#86198f" strokeWidth="2" fill="none" strokeLinecap="round" />
            
            {/* Net */}
            <line x1="100" y1="165" x2="110" y2="130" stroke="#a16207" strokeWidth="2" />
            <ellipse cx="120" cy="120" rx="20" ry="10" stroke="#a16207" strokeWidth="1.5" fill="none" />
          </g>
        </svg>
      </div>
      <style>{`
        @keyframes catcher-fade {
          from { opacity: 0; }
          to { opacity: 0.8; }
        }
        .animate-catcher-fade {
          animation: catcher-fade 2s ease-out forwards 1s;
        }

        @keyframes star-fall {
          0% { transform: translateY(-30px); opacity: 0; }
          20% { opacity: 1; }
          100% { transform: translateY(180px); opacity: 0; }
        }
        .animate-star-fall-1 { animation: star-fall 5s linear infinite; }
        .animate-star-fall-2 { animation: star-fall 4s linear infinite 1.5s; }
        .animate-star-fall-3 { animation: star-fall 6s linear infinite 3s; }
        
        @keyframes catcher-bob {
            0%, 100% { transform: translateX(0) rotate(0deg); }
            25% { transform: translateX(-5px) rotate(-2deg); }
            75% { transform: translateX(5px) rotate(2deg); }
        }
        .animate-catcher-bob {
            transform-origin: 100px 200px;
            animation: catcher-bob 4s ease-in-out infinite;
        }
      `}</style>
    </>
  );
};

export default StarCatcher;