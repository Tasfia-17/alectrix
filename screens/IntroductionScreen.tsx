import React, { useState } from 'react';
import { AvatarData } from '../App';

interface IntroductionScreenProps {
  avatar: AvatarData;
  onComplete: () => void;
}

const MessagePopup: React.FC<{ text: string }> = ({ text }) => {
    return (
        <div 
            className="relative bg-pixel-purple-dark text-pixel-purple-light border-2 border-pixel-black p-4 w-full max-w-xs sm:max-w-sm mx-auto animate-fade-in" 
            style={{ boxShadow: '4px 4px 0px #000000' }}
        >
            <p className="text-center text-lg">{text}</p>
        </div>
    );
};

const NextButton: React.FC<{ onClick: () => void }> = ({ onClick }) => {
    return (
        <button onClick={onClick} className="animate-bob" aria-label="Next message">
            <svg width="40" height="24" viewBox="0 0 40 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-pixel-purple-light/60 hover:text-pixel-purple-light/90 transition-colors">
                <rect x="16" y="16" width="8" height="8" fill="currentColor"/>
                <rect x="8" y="8" width="8" height="8" fill="currentColor"/>
                <rect x="24" y="8" width="8" height="8" fill="currentColor"/>
                <rect y="0" width="8" height="8" fill="currentColor"/>
                <rect x="32" y="0" width="8" height="8" fill="currentColor"/>
            </svg>
        </button>
    );
}

const IntroductionScreen: React.FC<IntroductionScreenProps> = ({ avatar, onComplete }) => {
  const [messageIndex, setMessageIndex] = useState(0);

  const messages = [
    "Yo.",
    `I'm ${avatar.name}. I've been assigned to your... 'learning journey'.`,
    "Just try to keep up."
  ];

  const handleNext = () => {
    setMessageIndex(prev => Math.min(prev + 1, messages.length));
  };
  
  return (
    <div className="min-h-screen font-mono p-8 flex flex-col items-center justify-around" 
         style={{
          backgroundColor: '#2c2a4a', // pixel-purple-dark
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='10' height='10' viewBox='0 0 10 10' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='10' height='10' fill='%232c2a4a'/%3E%3Crect x='8' y='2' width='1' height='1' fill='%234a476b'/%3E%3Crect x='3' y='7' width='1' height='1' fill='%234a476b'/%3E%3C/svg%3E")`
        }}
    >
      
      {/* Main Content */}
      <div className="flex flex-col items-center justify-center w-full">
        <div className="w-48 h-48 sm:w-56 sm:h-56 animate-bob" style={{ imageRendering: 'pixelated' }}>
            <avatar.component />
        </div>
        <div className="h-32 mt-8 flex items-center">
            {messages[messageIndex] && <MessagePopup key={messageIndex} text={messages[messageIndex]} />}
        </div>
      </div>
      
      {/* Footer / Call to Action */}
      <div className="flex flex-col items-center justify-end h-24">
          {messageIndex < messages.length - 1 ? (
            <NextButton onClick={handleNext} />
          ) : (
             <button 
                onClick={onComplete}
                className="w-full max-w-sm bg-pixel-yellow text-deep-sienna font-bold text-lg py-3 px-8 border-2 border-pixel-black 
                           transform active:translate-x-1 active:translate-y-1 transition-all duration-100 ease-in-out
                           hover:bg-yellow-300 animate-fade-in"
                style={{ boxShadow: '4px 4px 0px #000000', animationDelay: '0.5s' }}
              >
                Right. Let's do this.
            </button>
          )}
      </div>
    </div>
  );
};

export default IntroductionScreen;