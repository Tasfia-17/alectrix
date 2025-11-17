import React from 'react';

const BookReader: React.FC = () => {
  return (
    <>
      <div className="absolute bottom-48 left-4 md:left-12 w-48 h-56 opacity-80" aria-hidden="true">
        <svg viewBox="0 0 150 180" className="w-full h-full animate-reader-fade">
          {/* Tree */}
          <path d="M 75 180 C 60 150, 40 120, 50 80 Q 55 60, 75 50 Q 95 60, 100 80 C 110 120, 90 150, 75 180 Z" fill="#d4d4d8" stroke="#71717a" strokeWidth="2" strokeDasharray="4 4" />
          <path d="M 75 50 C 60 30, 80 10, 90 20 C 110 30, 100 50, 75 50 Z" fill="#bef264" stroke="#4d7c0f" strokeWidth="1.5" />
          <path d="M 50 80 C 30 70, 40 40, 60 45 C 70 50, 65 75, 50 80 Z" fill="#a3e635" stroke="#4d7c0f" strokeWidth="1.5" />

          {/* Character */}
          <g transform="translate(10, 20)" className="animate-reader-bob">
            <circle cx="80" cy="120" r="15" fill="#f3e8ff" stroke="#7e22ce" strokeWidth="1.5" />
            <path d="M80 135 C 70 155, 90 155, 80 160" stroke="#7e22ce" strokeWidth="2" fill="none" strokeLinecap="round" />
            
            {/* Book */}
            <g transform="translate(50, 125) rotate(-10)">
                <path d="M 0 0 L 20 5 L 20 25 L 0 20 Z" fill="#fafafa" stroke="#52525b" strokeWidth="1" />
                <path d="M 20 5 L 40 0 L 40 20 L 20 25 Z" fill="#fafafa" stroke="#52525b" strokeWidth="1" />
                {/* Page turning animation */}
                <path d="M 20 6 C 25 10, 25 18, 20 22" stroke="#a1a1aa" strokeWidth="0.5" fill="none" className="animate-page-turn" />
            </g>
          </g>
        </svg>
      </div>
      <style>{`
        @keyframes reader-fade {
          from { opacity: 0; transform: scale(0.9); }
          to { opacity: 0.8; transform: scale(1); }
        }
        .animate-reader-fade {
          animation: reader-fade 1.8s ease-out forwards;
        }
        @keyframes reader-bob {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-3px); }
        }
        .animate-reader-bob {
          animation: reader-bob 5s ease-in-out infinite;
        }
        @keyframes page-turn {
          0%, 40%, 100% { opacity: 0; }
          60%, 90% { opacity: 1; }
        }
        .animate-page-turn {
            animation: page-turn 4s linear infinite 1s;
        }
      `}</style>
    </>
  );
};

export default BookReader;