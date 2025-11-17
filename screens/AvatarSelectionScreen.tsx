import React, { useState } from 'react';
import { AvatarCard } from '../components/AvatarCard';
import { AvatarStoryModal } from '../components/AvatarStoryModal';
import { Blip, Bit, Echo, Glitchy, Query, Sassquatch } from '../components/avatars';
import { AvatarData } from '../App';

const avatars: AvatarData[] = [
  { 
    name: 'Glitchy', 
    component: Glitchy, 
    story: "Found in a corrupted file from 1998, Glitchy has seen more blue screens of death than you've had hot dinners. It communicates in cryptic error messages and judges your questionable browser history. Its purr sounds suspiciously like a dial-up modem."
  },
  { 
    name: 'Bit', 
    component: Bit, 
    story: "Bit was originally designed to sort paperclips, a job it found profoundly boring. Now, it dedicates its 8-bit processing power to sorting your life out, one sarcastic comment at a time. It thinks your study playlist is 'logically suboptimal'."
  },
  { 
    name: 'Sass-quatch', 
    component: Sassquatch, 
    story: "A digital cryptid living in the darkest corners of the dependency folder, Sass-quatch subsists on a diet of unused variables and pure cynicism. It finds your attempts at concentration 'amusingly futile' and will sigh loudly every time you get distracted."
  },
  { 
    name: 'Blip', 
    component: Blip, 
    story: "Congealed from the leftover data of a thousand abandoned projects, Blip is a minimalist with maximalist opinions. It has no limbs to help you, but plenty of jiggles to express its disappointment. It believes motivation is a myth."
  },
  { 
    name: 'Query', 
    component: Query, 
    story: "Query hoards facts instead of gold and considers your knowledge base 'a rather sparse collection.' It will breathe tiny, harmless (but judgmental) puffs of pixelated fire whenever you get an answer wrong. It's not angry, just disappointed."
  },
  { 
    name: 'Echo', 
    component: Echo, 
    story: "Attracted to the bright light of your screen, Echo is here to flutter around and point out every single one of your typos. It has an uncanny ability to find the flaw in any argument and considers your procrastination habits a fascinating, yet pathetic, case study."
  },
];

let audioContext: AudioContext | null = null;

const playSelectSound = () => {
  if (typeof window.AudioContext === 'undefined') return;
  if (!audioContext) {
    audioContext = new (window.AudioContext)();
  }
  const oscillator = audioContext.createOscillator();
  const gainNode = audioContext.createGain();

  oscillator.connect(gainNode);
  gainNode.connect(audioContext.destination);

  oscillator.type = 'square'; // 8-bit sound
  oscillator.frequency.setValueAtTime(440.00, audioContext.currentTime); // A4
  gainNode.gain.setValueAtTime(0.05, audioContext.currentTime);

  gainNode.gain.exponentialRampToValueAtTime(0.0001, audioContext.currentTime + 0.5);
  oscillator.start(audioContext.currentTime);
  oscillator.stop(audioContext.currentTime + 0.5);
};

interface AvatarSelectionScreenProps {
    onAvatarSelect: (avatar: AvatarData) => void;
}

const AvatarSelectionScreen: React.FC<AvatarSelectionScreenProps> = ({ onAvatarSelect }) => {
  const [currentSelection, setCurrentSelection] = useState<AvatarData | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSelectAvatar = (avatar: AvatarData) => {
    setCurrentSelection(avatar);
    setIsModalOpen(true);
    playSelectSound();
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleContinue = () => {
      if (currentSelection) {
          onAvatarSelect(currentSelection);
      }
  }

  return (
    <>
      <div 
        className="min-h-screen font-mono text-white p-4 sm:p-6 md:p-8 flex flex-col justify-center relative overflow-hidden"
      >
        {/* Retro Pixel Art Background */}
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-[#1d2b53] via-[#7e2553] to-[#ff004d]"></div>
        <div className="absolute bottom-[25%] left-1/2 -translate-x-1/2 w-72 h-72 sm:w-96 sm:h-96 bg-[#ffccaa] rounded-full blur-3xl opacity-50"></div>
        <div className="absolute bottom-0 left-0 w-full h-1/4 bg-black">
          {/* Cityscape Silhouette */}
          <div className="absolute bottom-0 left-[5%] w-[10%] h-[40%] bg-[#1d2b53]"></div>
          <div className="absolute bottom-0 left-[12%] w-[5%] h-[60%] bg-[#1d2b53]"></div>
          <div className="absolute bottom-0 left-[20%] w-[15%] h-[25%] bg-[#1d2b53]"></div>
          <div className="absolute bottom-0 left-[38%] w-[8%] h-[50%] bg-[#1d2b53]"></div>
          <div className="absolute bottom-0 left-[50%] w-[12%] h-[35%] bg-[#1d2b53]"></div>
          <div className="absolute bottom-0 left-[65%] w-[10%] h-[55%] bg-[#1d2b53]"></div>
          <div className="absolute bottom-0 left-[80%] w-[15%] h-[30%] bg-[#1d2b53]"></div>
        </div>

        <div className="container mx-auto text-center relative z-10">
          <h1 className="text-5xl sm:text-6xl text-white mb-10 sm:mb-16" style={{ textShadow: '4px 4px 0px #000000' }}>Choose Your Avatar</h1>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-10 sm:gap-x-8 sm:gap-y-12 max-w-4xl mx-auto">
            {avatars.map((avatar) => (
              <AvatarCard
                key={avatar.name}
                name={avatar.name}
                AvatarComponent={avatar.component}
                isSelected={currentSelection?.name === avatar.name}
                onSelect={() => handleSelectAvatar(avatar)}
              />
            ))}
          </div>
          
          <div className="mt-20 sm:mt-24">
              <button 
                onClick={handleContinue}
                disabled={!currentSelection}
                className="w-full max-w-sm bg-pixel-yellow text-deep-sienna font-bold text-lg py-3 px-8 border-2 border-pixel-black 
                           transform active:translate-x-1 active:translate-y-1 transition-all duration-100 ease-in-out
                           hover:enabled:bg-yellow-300 disabled:opacity-40 disabled:cursor-not-allowed disabled:bg-gray-400"
                style={{ boxShadow: '4px 4px 0px #000000' }}
              >
                Continue with {currentSelection?.name || '...'}
              </button>
          </div>
        </div>
      </div>
      {isModalOpen && currentSelection && (
        <AvatarStoryModal 
          avatar={currentSelection} 
          onClose={closeModal} 
        />
      )}
    </>
  );
};

export default AvatarSelectionScreen;