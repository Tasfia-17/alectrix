import React from 'react';

const RocketRider: React.FC = () => {
    return (
        <>
            <div className="absolute top-[10%] w-full h-24 opacity-90 animate-fly-across" aria-hidden="true">
                <svg viewBox="0 0 200 80" className="w-48 h-auto">
                    {/* Rocket */}
                    <g transform="rotate(-15 100 40)">
                        <path d="M 50 40 C 70 20, 150 20, 180 40 C 150 60, 70 60, 50 40 Z" fill="#e2e8f0" stroke="#475569" strokeWidth="2" />
                        <path d="M 40 30 L 50 40 L 40 50 Z" fill="#f87171" stroke="#991b1b" strokeWidth="1.5" />
                        <circle cx="120" cy="40" r="10" fill="#60a5fa" stroke="#1e40af" strokeWidth="1.5" />
                    </g>

                    {/* Character */}
                    <g transform="translate(-10, -15)">
                        <circle cx="110" cy="40" r="12" fill="#d9f99d" stroke="#3f6212" strokeWidth="1.5" />
                        <path d="M110 52 C 100 70, 120 70, 110 80" stroke="#3f6212" strokeWidth="2" fill="none" strokeLinecap="round" />
                    </g>
                    
                    {/* Exhaust */}
                    <g className="animate-exhaust">
                        <circle cx="40" cy="40" r="8" fill="#f59e0b" className="opacity-80"/>
                        <circle cx="30" cy="45" r="5" fill="#fca5a5" className="opacity-70"/>
                        <circle cx="25" cy="35" r="6" fill="#f97316" className="opacity-90"/>
                    </g>
                </svg>
            </div>
            <style>{`
                @keyframes fly-across {
                    from { transform: translateX(-100%); }
                    to { transform: translateX(100vw); }
                }
                .animate-fly-across {
                    animation: fly-across 12s linear infinite 2s;
                }

                @keyframes exhaust {
                    0%, 100% { transform: scale(1) translateX(0); opacity: 0.9; }
                    50% { transform: scale(1.2) translateX(-5px); opacity: 0.6; }
                }
                .animate-exhaust {
                    transform-origin: center;
                    animation: exhaust 0.3s ease-in-out infinite;
                }
            `}</style>
        </>
    );
};

export default RocketRider;