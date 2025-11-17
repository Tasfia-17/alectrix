import React from 'react';

interface PixelatedButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

const PixelatedButton: React.FC<PixelatedButtonProps> = ({ onClick, children, className = '', style }) => {
  return (
    <button
      onClick={onClick}
      className={`w-full bg-pixel-yellow text-deep-sienna font-bold text-lg py-3 px-8 border-2 border-pixel-black 
                 transform active:translate-x-1 active:translate-y-1 transition-all duration-100 ease-in-out
                 hover:bg-yellow-300 ${className}`}
      style={{ boxShadow: '4px 4px 0px #000000', ...style }}
    >
      {children}
    </button>
  );
};

export default PixelatedButton;
