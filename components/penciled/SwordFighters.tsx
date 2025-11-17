import React from 'react';

const SwordFighters: React.FC = () => {
  return (
    <>
      <div className="absolute top-4 left-4 md:top-12 md:left-24 w-48 h-32 opacity-80" aria-hidden="true">
        <svg viewBox="0 0 200 150" className="w-full h-full animate-fight-fade">
          {/* Character 1 */}
          <g className="animate-fighter-1">
            <circle cx="50" cy="50" r="15" fill="#ffe4e6" stroke="#be123c" strokeWidth="1.5" />
            <path d="M50 65 L 50 100" stroke="#be123c" strokeWidth="2" fill="none" strokeLinecap="round" />
            <path d="M50 75 L 30 90" stroke="#be123c" strokeWidth="2" fill="none" strokeLinecap="round" />
            <path d="M50 100 L 65 120" stroke="#be123c" strokeWidth="2" fill="none" strokeLinecap="round" />
            {/* Sword 1 */}
            <line x1="60" y1="70" x2="100" y2="80" stroke="#57534e" strokeWidth="2" strokeLinecap="round" />
            <line x1="65" y1="75" x2="60" y2="65" stroke="#57534e" strokeWidth="2" strokeLinecap="round" />
          </g>

          {/* Character 2 */}
          <g className="animate-fighter-2">
            <circle cx="150" cy="60" r="15" fill="#dbeafe" stroke="#1d4ed8" strokeWidth="1.5" />
            <path d="M150 75 L 150 110" stroke="#1d4ed8" strokeWidth="2" fill="none" strokeLinecap="round" />
            <path d="M150 85 L 170 100" stroke="#1d4ed8" strokeWidth="2" fill="none" strokeLinecap="round" />
            <path d="M150 110 L 135 130" stroke="#1d4ed8" strokeWidth="2" fill="none" strokeLinecap="round" />
            {/* Sword 2 */}
            <line x1="140" y1="80" x2="100" y2="80" stroke="#57534e" strokeWidth="2" strokeLinecap="round" />
            <line x1="135" y1="85" x2="140" y2="75" stroke="#57534e" strokeWidth="2" strokeLinecap="round" />
          </g>
          
          {/* Clash Sparks */}
          <g transform="translate(100, 80)">
              <path d="M0 0 l 5 5" stroke="#f59e0b" strokeWidth="1.5" className="animate-spark-1" />
              <path d="M0 0 l -5 -5" stroke="#f59e0b" strokeWidth="1.5" className="animate-spark-2" />
              <path d="M0 0 l 6 -2" stroke="#f59e0b" strokeWidth="1" className="animate-spark-3" />
          </g>
        </svg>
      </div>
      <style>{`
        @keyframes fight-fade {
          from { opacity: 0; transform: scale(0.8); }
          to { opacity: 0.8; transform: scale(1); }
        }
        .animate-fight-fade {
          animation: fight-fade 1.2s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }
        @keyframes fighter-1-anim {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          50% { transform: translate(5px, -2px) rotate(3deg); }
        }
        .animate-fighter-1 {
          transform-origin: 50px 110px;
          animation: fighter-1-anim 1.5s ease-in-out infinite;
        }

        @keyframes fighter-2-anim {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          50% { transform: translate(-5px, 2px) rotate(-3deg); }
        }
        .animate-fighter-2 {
          transform-origin: 150px 120px;
          animation: fighter-2-anim 1.5s ease-in-out infinite;
        }
        
        @keyframes spark {
            0%, 100% { transform: scale(0); opacity: 0; }
            50% { transform: scale(1); opacity: 1; }
            99% { transform: scale(1.2); opacity: 0; }
        }
        .animate-spark-1 { animation: spark 0.75s ease-out infinite; }
        .animate-spark-2 { animation: spark 0.75s ease-out infinite 0.2s; }
        .animate-spark-3 { animation: spark 0.75s ease-out infinite 0.4s; }
      `}</style>
    </>
  );
};

export default SwordFighters;