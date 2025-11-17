import React from 'react';

export const Query: React.FC = () => {
    return (
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            {/* Body */}
            <rect x="6" y="10" width="10" height="9" fill="#483d8b" />
            <rect x="5" y="12" width="1" height="5" fill="#483d8b" />

            {/* Head */}
            <rect x="13" y="5" width="6" height="6" fill="#483d8b" />
            <rect x="19" y="7" width="2" height="2" fill="#483d8b" />
            
            {/* Eye */}
            <rect x="15" y="7" width="2" height="2" fill="#ffd700" />

            {/* Belly */}
            <rect x="7" y="12" width="8" height="6" fill="#e6e6fa" />

            {/* Wings */}
            <rect x="8" y="4" width="5" height="6" fill="#6a5acd" />
            <rect x="9" y="3" width="3" height="1" fill="#6a5acd" />
            
            {/* Tail */}
            <rect x="2" y="16" width="4" height="2" fill="#483d8b" />
            <rect x="0" y="17" width="2" height="2" fill="#483d8b" />

            {/* Legs */}
            <rect x="7" y="19" width="2" height="3" fill="#6a5acd" />
            <rect x="12" y="19" width="2" height="3" fill="#6a5acd" />
        </svg>
    );
};