import React from 'react';

const Artist: React.FC = () => {
  return (
    <>
      <div className="absolute bottom-0 left-4 md:left-12 w-48 h-64 opacity-80" aria-hidden="true">
        <svg viewBox="0 0 150 200" className="w-full h-full animate-draw-fade">
          {/* Desk */}
          <path d="M10 180 Q 5 175, 10 170 L 140 150 Q 145 145, 140 140" stroke="#a16207" strokeWidth="2" fill="#facc15" strokeLinecap="round" strokeDasharray="5 5" />
          <line x1="30" y1="180" x2="40" y2="200" stroke="#a16207" strokeWidth="2" strokeLinecap="round" />
          <line x1="120" y1="160" x2="130" y2="180" stroke="#a16207" strokeWidth="2" strokeLinecap="round" />
          
          {/* Character */}
          <circle cx="80" cy="110" r="15" fill="#e0f2fe" stroke="#0ea5e9" strokeWidth="1.5" />
          <path d="M80 125 C 70 150, 90 150, 80 175" stroke="#0ea5e9" strokeWidth="2" fill="none" strokeLinecap="round" />
          
          {/* Drawing Arm & Pencil */}
          <g className="animate-drawing-arm">
            <path d="M70 130 Q 110 130, 120 150" stroke="#0ea5e9" strokeWidth="2" fill="none" strokeLinecap="round" />
            <path d="M120 150 L 130 145 L 125 140 Z" fill="#27272a" />
          </g>

          {/* Sketch lines */}
          <path d="M110 135 q 5 -5, 10 0" stroke="#fb923c" strokeWidth="1" fill="none" className="animate-sketch-1" strokeLinecap="round"/>
          <path d="M115 142 q 0 5, -5 5" stroke="#38bdf8" strokeWidth="1" fill="none" className="animate-sketch-2" strokeLinecap="round"/>
        </svg>
      </div>
      <style>{`
        @keyframes draw-fade {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 0.8; transform: translateY(0px); }
        }
        .animate-draw-fade {
          animation: draw-fade 1.5s ease-out forwards;
        }
        @keyframes drawing-arm {
          0%, 100% { transform: rotate(0deg); }
          50% { transform: rotate(-10deg); }
        }
        .animate-drawing-arm {
          transform-origin: 70px 130px;
          animation: drawing-arm 2s ease-in-out infinite;
        }
        @keyframes sketch {
          0%, 50% { stroke-dashoffset: 20; opacity: 0;}
          70%, 100% { stroke-dashoffset: 0; opacity: 1;}
        }
        .animate-sketch-1 {
          stroke-dasharray: 20;
          stroke-dashoffset: 20;
          animation: sketch 2s ease-in-out infinite 0.5s;
        }
        .animate-sketch-2 {
          stroke-dasharray: 20;
          stroke-dashoffset: 20;
          animation: sketch 2s ease-in-out infinite 1s;
        }
      `}</style>
    </>
  );
};

export default Artist;