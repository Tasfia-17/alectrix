import React from 'react';

export const Glitchy: React.FC = () => {
    return (
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            <defs>
                <style>
                    {`
                    @keyframes glitch-color {
                        0%, 100% { fill: #8e8e8e; }
                        5%, 95% { fill: #a1a1a1; }
                        10%, 90% { fill: #8e8e8e; }
                        11%, 89% { fill: #ff4d4d; }
                        12%, 88% { fill: #8e8e8e; }
                        40%, 60% { fill: #a1a1a1; }
                        41%, 59% { fill: #4dffff; }
                        42%, 58% { fill: #a1a1a1; }
                    }
                    .glitch-anim {
                        animation: glitch-color 3s steps(1, end) infinite;
                    }
                    `}
                </style>
            </defs>
            <g className="glitch-anim">
                {/* Body */}
                <rect x="5" y="10" width="14" height="9" />
                <rect x="6" y="9" width="12" height="1" />
                <rect x="4" y="12" width="1" height="6" />
                <rect x="19" y="12" width="1" height="6" />

                {/* Head */}
                <rect x="7" y="4" width="10" height="7" />

                {/* Ears */}
                <rect x="7" y="2" width="2" height="2" />
                <rect x="15" y="2" width="2" height="2" />

                {/* Tail */}
                <rect x="18" y="7" width="4" height="2" />
                <rect x="20" y="9" width="2" height="3" />
            </g>

            {/* Eyes */}
            <rect x="9" y="6" width="2" height="3" fill="#ffff00" />
            <rect x="13" y="6" width="2" height="3" fill="#ffff00" />

            {/* Nose */}
            <rect x="11" y="9" width="2" height="1" fill="#ffc0cb" />
        </svg>
    );
};