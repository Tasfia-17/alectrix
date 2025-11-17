import React from 'react';

const FloatingJellyfish: React.FC = () => {
  return (
    <>
      <div className="absolute top-full right-1/4 md:right-1/3 w-24 h-48 opacity-80 animate-jelly-drift" aria-hidden="true">
        <svg viewBox="0 0 80 160" className="w-full h-full">
            {/* Head */}
            <path d="M 10 40 Q 40 10, 70 40 T 10 40" fill="#a5f3fc" stroke="#0891b2" strokeWidth="2" />
            
            {/* Tentacles */}
            <g className="animate-tentacle-flow">
                <path d="M 25 40 C 20 60, 30 80, 25 100" stroke="#164e63" strokeWidth="1.5" fill="none" strokeLinecap="round" />
                <path d="M 40 40 C 45 70, 35 90, 40 120" stroke="#0891b2" strokeWidth="1.5" fill="none" strokeLinecap="round" />
                <path d="M 55 40 C 60 65, 50 85, 55 110" stroke="#164e63" strokeWidth="1.5" fill="none" strokeLinecap="round" />
            </g>
        </svg>
      </div>
      <style>{`
        @keyframes jelly-drift {
            from { transform: translateY(0); }
            to { transform: translateY(-120vh); }
        }
        .animate-jelly-drift {
            animation: jelly-drift 20s linear infinite 3s;
        }
        @keyframes tentacle-flow {
            0%, 100% { transform: skewX(0deg); }
            50% { transform: skewX(5deg); }
        }
        .animate-tentacle-flow {
            animation: tentacle-flow 4s ease-in-out infinite;
        }
      `}</style>
    </>
  );
};

export default FloatingJellyfish;