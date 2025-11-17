import React from 'react';

export const AlectrixIcon: React.FC = () => {
  return (
    // Container defines the roaming area
    <div className="w-full h-24 relative flex justify-center items-center">
      <div className="w-32 h-16 animate-roam">
        <svg viewBox="0 0 32 16" xmlns="http://www.w3.org/2000/svg" className="w-full h-full animate-bob" style={{ imageRendering: 'pixelated' }}>
          <g fill="#9b95c9"> {/* pixel-purple-light for better contrast */}
            {/* Body */}
            <rect x="8" y="6" width="16" height="8" />
            <rect x="10" y="4" width="12" height="2" />
            <rect x="12" y="14" width="8" height="2" />

            {/* Eyes */}
            <rect x="12" y="6" width="4" height="4" fill="#FEFBF6" />
            <rect x="20" y="6" width="4" height="4" fill="#FEFBF6" />
            <rect x="14" y="8" width="2" height="2" fill="#2c2a4a" /> {/* pixel-purple-dark */}
            <rect x="22" y="8" width="2" height="2" fill="#2c2a4a" /> {/* pixel-purple-dark */}

            {/* Antennae */}
            <rect x="16" y="0" width="2" height="4" />
            <rect x="18" y="2" width="2" height="2" />
            
            {/* Spark */}
            <g className="animate-spark-pixel">
              <rect x="20" y="0" width="2" height="2" fill="#ffd166" /> {/* pixel-yellow */}
              <rect x="22" y="-2" width="2" height="2" fill="#ffd166" />
              <rect x="24" y="0" width="2" height="2" fill="#ffd166" />
              <rect x="22" y="2" width="2" height="2" fill="#ffd166" />
            </g>
          </g>
        </svg>
      </div>
    </div>
  );
};
