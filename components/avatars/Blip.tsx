import React from 'react';

export const Blip: React.FC = () => {
    return (
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            <defs>
                 <style>
                    {`
                    @keyframes bounce-blip {
                        0%, 100% { transform: scale(1, 1) translateY(0); }
                        50% { transform: scale(1.1, 0.9) translateY(2px); }
                    }
                    .blip-anim {
                        animation: bounce-blip 1.5s ease-in-out infinite;
                        transform-origin: bottom center;
                    }
                    `}
                </style>
            </defs>
            <g className="blip-anim">
                {/* Body */}
                <rect x="6" y="10" width="12" height="10" fill="#00ff7f" />
                <rect x="5" y="12" width="14" height="6" fill="#00ff7f" />
                <rect x="7" y="9" width="10" height="1" fill="#98fb98" />
                <rect x="8" y="8" width="8" height="1" fill="#98fb98" />

                {/* Eyes */}
                <rect x="9" y="13" width="2" height="3" fill="#2f4f4f" />
                <rect x="13" y="13" width="2" height="3" fill="#2f4f4f" />

                {/* Shadow */}
                <rect x="5" y="20" width="14" height="2" fill="#008000" />
            </g>
        </svg>
    );
};