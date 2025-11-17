import React from 'react';

export const Echo: React.FC = () => {
    return (
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
             <defs>
                 <style>
                    {`
                    @keyframes flap-echo-left {
                        0%, 100% { transform: scaleX(1); }
                        50% { transform: scaleX(0.8) rotate(-5deg); }
                    }
                     @keyframes flap-echo-right {
                        0%, 100% { transform: scaleX(1); }
                        50% { transform: scaleX(0.8) rotate(5deg); }
                    }
                    .flap-left {
                        animation: flap-echo-left 1s ease-in-out infinite;
                        transform-origin: right center;
                    }
                    .flap-right {
                        animation: flap-echo-right 1s ease-in-out infinite;
                        transform-origin: left center;
                    }
                    `}
                </style>
            </defs>
            {/* Left Wing */}
            <g className="flap-left">
                <rect x="2" y="4" width="10" height="16" fill="#556b2f" />
                <rect x="4" y="6" width="2" height="12" fill="#9acd32" />
                <rect x="8" y="6" width="2" height="5" fill="#9acd32" />
                <rect x="6" y="14" width="4" height="2" fill="#9acd32" />
            </g>

            {/* Right Wing */}
            <g className="flap-right">
                <rect x="12" y="4" width="10" height="16" fill="#556b2f" />
                <rect x="18" y="6" width="2" height="12" fill="#9acd32" />
                <rect x="14" y="6" width="2" height="5" fill="#9acd32" />
                <rect x="14" y="14" width="4" height="2" fill="#9acd32" />
            </g>

            {/* Body */}
            <rect x="10" y="2" width="4" height="20" fill="#f5f5dc" />
            <rect x="11" y="3" width="2" height="18" fill="#dcdcdc" />

            {/* Eyes */}
            <rect x="10" y="4" width="1" height="2" fill="#ff4500" />
            <rect x="13" y="4" width="1" height="2" fill="#ff4500" />
        </svg>
    );
};