import React from 'react';

export const Sassquatch: React.FC = () => {
    return (
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            {/* Fur */}
            <rect x="4" y="5" width="16" height="16" fill="#8b4513" />
            <rect x="5" y="4" width="14" height="1" fill="#a0522d" />
            <rect x="3" y="7" width="1" height="12" fill="#a0522d" />
            <rect x="20" y="7" width="1" height="12" fill="#a0522d" />
            <rect x="5" y="21" width="14" height="1" fill="#a0522d" />

            {/* Face Plate */}
            <rect x="7" y="8" width="10" height="9" fill="#f5deb3" />

            {/* Eyes */}
            <rect x="9" y="10" width="2" height="3" fill="#2f4f4f" />
            <rect x="13" y="10" width="2" height="3" fill="#2f4f4f" />

            {/* Eyebrows */}
            <rect x="8" y="9" width="4" height="1" fill="#8b4513" />
            <rect x="12" y="9" width="4" height="1" fill="#8b4513" />

            {/* Mouth */}
            <rect x="9" y="15" width="6" height="1" fill="#8b4513" />
            
            {/* Horns */}
            <rect x="6" y="2" width="2" height="2" fill="#d2b48c" />
            <rect x="16" y="2" width="2" height="2" fill="#d2b48c" />
        </svg>
    );
};