import React from 'react';

interface PixelatedContainerProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
}

const PixelatedContainer: React.FC<PixelatedContainerProps> = ({ children, className = '', title }) => {
  return (
    <div className={`bg-pixel-purple-mid border-2 border-pixel-black p-4 w-full flex-grow flex flex-col ${className}`} style={{ boxShadow: '6px 6px 0px #000' }}>
      {title && (
        <h1 className="text-3xl text-center text-pixel-yellow mb-4" style={{ textShadow: '2px 2px 0px #000' }}>
          {title}
        </h1>
      )}
      {children}
    </div>
  );
};

export default PixelatedContainer;
