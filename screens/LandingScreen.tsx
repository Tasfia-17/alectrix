import React from 'react';
import { AlectrixIcon } from '../components/AlectrixIcon';

interface LandingScreenProps {
  onStart: () => void;
}

const LandingScreen: React.FC<LandingScreenProps> = ({ onStart }) => {
  return (
    <div 
      className="min-h-screen font-mono flex flex-col items-center justify-between p-6 sm:p-8 overflow-hidden relative"
    >
      {/* Background Layers */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundColor: '#1a1a2e', // Deep night blue
          backgroundImage: `linear-gradient(to bottom, #2c2a4a 40%, #4a476b 100%)`
        }}
      ></div>
      <div className="absolute bottom-0 left-0 w-full h-1/4 bg-[#1a1a2e] z-0"></div>

      {/* Background Scenery */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-0">
        {/* Moon */}
        <div className="absolute top-[15%] left-[10%] w-16 h-16 sm:w-24 sm:h-24 bg-gray-200 rounded-full" style={{boxShadow: '0 0 20px #fff, inset 5px -5px 10px #00000020'}}>
          <div className="absolute top-[20%] left-[50%] w-4 h-4 bg-gray-400/50 rounded-full"></div>
          <div className="absolute top-[50%] left-[30%] w-6 h-6 bg-gray-400/50 rounded-full"></div>
          <div className="absolute top-[60%] left-[70%] w-3 h-3 bg-gray-400/50 rounded-full"></div>
        </div>

        {/* Twinkling Stars */}
        <div className="absolute w-1 h-1 bg-white animate-sparkle-subtle" style={{top: '20%', left: '80%', animationDuration: '3s'}}></div>
        <div className="absolute w-2 h-2 bg-pixel-yellow/80 animate-sparkle-subtle" style={{top: '50%', left: '90%', animationDuration: '5s', animationDelay: '1s'}}></div>
        <div className="absolute w-1 h-1 bg-white animate-sparkle-subtle" style={{top: '80%', left: '20%', animationDuration: '4s', animationDelay: '0.5s'}}></div>
        <div className="absolute w-2 h-2 bg-pixel-yellow/80 animate-sparkle-subtle" style={{top: '10%', left: '40%', animationDuration: '3.5s', animationDelay: '1.5s'}}></div>
        <div className="absolute w-1 h-1 bg-white animate-sparkle-subtle" style={{top: '60%', left: '50%', animationDuration: '4.5s', animationDelay: '2s'}}></div>
        <div className="absolute w-1 h-1 bg-white animate-sparkle-subtle" style={{top: '30%', left: '65%', animationDuration: '4s', animationDelay: '0.8s'}}></div>
      </div>

      <div className="relative flex-grow flex flex-col items-center justify-center text-center z-10">
        <AlectrixIcon />
        <h1 className="mt-4 text-7xl md:text-8xl text-pixel-yellow" style={{ textShadow: '4px 4px 0px #000000' }}>
          Alectrix
        </h1>
        <p className="mt-2 text-lg font-semibold text-pixel-purple-light tracking-wide">
          – Your Personal 8-Bit Study Quest
        </p>
         <p className="mt-4 max-w-sm text-base text-pixel-purple-light/80 px-4">
          “Level up your learning.”
        </p>
      </div>

      <div className="relative w-full max-w-xs sm:max-w-sm flex flex-col items-center gap-4 z-10">
        <a href="#" className="text-sm text-pixel-purple-light hover:text-white transition-colors duration-300">
          Already signed up? Log in (if you dare).
        </a>
        <button 
          onClick={onStart}
          className="w-full bg-pixel-yellow text-deep-sienna font-bold text-lg py-3 px-8 border-2 border-pixel-black 
                     transform active:translate-x-1 active:translate-y-1 transition-all duration-100 ease-in-out
                     hover:bg-yellow-300"
          style={{ boxShadow: '4px 4px 0px #000000' }}
        >
          <span className="relative">Start Your Journey</span>
        </button>
        <p className="text-xs text-pixel-purple-light/70 text-center mt-2 px-4">
          By continuing, you agree to our{' '}
          <a href="#" className="underline hover:text-white">
            Terms of Service
          </a>{' '}
          and{' '}
          <a href="#" className="underline hover:text-white">
            Privacy Policy
          </a>
        </p>
      </div>
    </div>
  );
};

export default LandingScreen;