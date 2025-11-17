import React from 'react';

const ButterflyChaser: React.FC = () => {
    return (
        <>
            <div className="absolute top-1/2 -left-24 w-64 h-48 opacity-90 animate-chase-across" aria-hidden="true">
                <svg viewBox="0 0 200 150" className="w-full h-full">
                    {/* Character */}
                    <g className="animate-chaser-hop">
                        <circle cx="50" cy="100" r="15" fill="#ffedd5" stroke="#f97316" strokeWidth="1.5" />
                        <path d="M50 115 C 40 130, 60 130, 50 145" stroke="#f97316" strokeWidth="2" fill="none" strokeLinecap="round" />
                        <path d="M50 120 L 35 130" stroke="#f97316" strokeWidth="2" fill="none" strokeLinecap="round" />
                        <path d="M50 120 L 65 130" stroke="#f97316" strokeWidth="2" fill="none" strokeLinecap="round" />
                    </g>

                    {/* Butterfly 1 */}
                    <g transform="translate(150, 80)" className="animate-flutter-1">
                        <path d="M 0 0 C -10 -10, -10 10, 0 0 Z" fill="#c084fc" />
                        <path d="M 0 0 C 10 -10, 10 10, 0 0 Z" fill="#e9d5ff" />
                    </g>

                     {/* Butterfly 2 */}
                    <g transform="translate(120, 50)" className="animate-flutter-2">
                        <path d="M 0 0 C -8 -8, -8 8, 0 0 Z" fill="#67e8f9" />
                        <path d="M 0 0 C 8 -8, 8 8, 0 0 Z" fill="#cffafe" />
                    </g>
                </svg>
            </div>
            <style>{`
                @keyframes chase-across {
                    0% { transform: translateX(0) translateY(-50%); }
                    100% { transform: translateX(calc(100vw + 100px)) translateY(-50%); }
                }
                .animate-chase-across {
                    animation: chase-across 15s linear infinite 4s;
                }

                @keyframes chaser-hop {
                    0%, 100% { transform: translateY(0) rotate(-5deg); }
                    50% { transform: translateY(-10px) rotate(5deg); }
                }
                .animate-chaser-hop {
                    transform-origin: center bottom;
                    animation: chaser-hop 0.8s ease-in-out infinite;
                }

                @keyframes flutter-1 {
                    0%, 100% { transform: translate(0, 0) scale(1); }
                    25% { transform: translate(10px, -15px) scale(1.1) rotate(10deg); }
                    50% { transform: translate(-5px, -25px) scale(0.9) rotate(-5deg); }
                    75% { transform: translate(5px, -10px) scale(1) rotate(5deg); }
                }
                .animate-flutter-1 {
                    animation: flutter-1 2s ease-in-out infinite;
                }

                @keyframes flutter-2 {
                    0%, 100% { transform: translate(0, 0) scale(1); }
                    25% { transform: translate(-15px, -10px) scale(0.9) rotate(-15deg); }
                    50% { transform: translate(10px, 5px) scale(1.1) rotate(10deg); }
                    75% { transform: translate(-5px, -5px) scale(1) rotate(0deg); }
                }
                .animate-flutter-2 {
                    animation: flutter-2 2.5s ease-in-out infinite 0.3s;
                }
            `}</style>
        </>
    )
}

export default ButterflyChaser;