import React from 'react';

export const Bit: React.FC = () => {
    return (
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            {/* Body */}
            <rect x="6" y="9" width="12" height="10" fill="#c0c0c0" />
            <rect x="7" y="10" width="10" height="8" fill="#a9a9a9" />

            {/* Head */}
            <rect x="8" y="2" width="8" height="7" fill="#c0c0c0" />
            
            {/* Eye */}
            <rect x="9" y="4" width="6" height="3" fill="#ff0000" />
            <rect x="10" y="5" width="4" height="1" fill="#ff4d4d" />

            {/* Antenna */}
            <rect x="11" y="0" width="2" height="2" fill="#c0c0c0" />
            <rect x="10" y="1" width="4" height="1" fill="#a9a9a9" />

            {/* Arms */}
            <rect x="3" y="10" width="3" height="2" fill="#a9a9a9" />
            <rect x="18" y="10" width="3" height="2" fill="#a9a9a9" />
            <rect x="2" y="12" width="2" height="2" fill="#c0c0c0" />
            <rect x="20" y="12" width="2" height="2" fill="#c0c0c0" />

            {/* Treads */}
            <rect x="5" y="19" width="14" height="4" fill="#696969" />
            <rect x="6" y="20" width="12" height="2" fill="#808080" />
        </svg>
    );
};