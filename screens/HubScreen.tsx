import React from 'react';
import { AvatarData } from '../App';
import PixelatedButton from '../components/common/PixelatedButton';

type ScreenName = 'toDoList' | 'gameHub' | 'music' | 'moodBoard' | 'history' | 'knowledgeMap' | 'noteTaker' | 'flashcards';

interface HubScreenProps {
  avatar: AvatarData;
  onNavigate: (screen: ScreenName) => void;
}

const HubScreen: React.FC<HubScreenProps> = ({ avatar, onNavigate }) => {
  const menuItems: { label: string; screen: ScreenName }[] = [
    { label: "Today's List", screen: 'toDoList' },
    { label: 'Knowledge Map', screen: 'knowledgeMap' },
    { label: 'Pixel Notetaker', screen: 'noteTaker' },
    { label: 'Flashcard Forge', screen: 'flashcards' },
    { label: 'Mental Health Break', screen: 'gameHub' },
    { label: 'Study Jams', screen: 'music' },
    { label: 'Mood Board', screen: 'moodBoard' },
    { label: 'My Progress', screen: 'history' },
  ];

  return (
    <div 
      className="min-h-screen font-mono p-8 flex flex-col items-center justify-center text-center"
      style={{
        backgroundColor: '#2c2a4a', // pixel-purple-dark
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='10' height='10' viewBox='0 0 10 10' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='10' height='10' fill='%232c2a4a'/%3E%3Crect x='8' y='2' width='1' height='1' fill='%234a476b'/%3E%3Crect x='3' y='7' width='1' height='1' fill='%234a476b'/%3E%3C/svg%3E")`
      }}
    >
      <div className="flex-1 flex flex-col items-center justify-center animate-fade-in">
        <div className="w-48 h-48 mb-6 animate-bob" style={{ imageRendering: 'pixelated'}}>
            <avatar.component />
        </div>
        <h1 
          className="text-5xl font-bold mb-2 text-pixel-yellow"
          style={{ textShadow: '4px 4px 0px #000000'}}
        >
          Well, you're back.
        </h1>
        <p className="text-lg text-pixel-purple-light/80">
          What's on the agenda today, genius?
        </p>
      </div>

      <div className="w-full max-w-sm grid grid-cols-1 gap-4">
        {menuItems.map((item, index) => (
          <PixelatedButton 
            key={item.screen}
            onClick={() => onNavigate(item.screen)}
            className="animate-fade-in"
            style={{ animationDelay: `${100 + index * 50}ms` }}
          >
            {item.label}
          </PixelatedButton>
        ))}
      </div>
    </div>
  );
};

export default HubScreen;