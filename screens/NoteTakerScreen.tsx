import React, { useState, useMemo, useEffect } from 'react';
import { AvatarData } from '../App';
import RoastingAvatar from '../components/common/RoastingAvatar';
import PixelatedButton from '../components/common/PixelatedButton';

interface NoteTakerScreenProps {
  avatar: AvatarData;
  notes: string;
  setNotes: (notes: string) => void;
  onGenerateFlashcards: () => void;
  onBack: () => void;
}

const NoteTakerScreen: React.FC<NoteTakerScreenProps> = ({ avatar, notes, setNotes, onGenerateFlashcards, onBack }) => {
    const [lastAction, setLastAction] = useState('');

    const stats = useMemo(() => {
        const charCount = notes.length;
        const wordCount = notes.split(/\s+/).filter(Boolean).length;
        const level = Math.floor(charCount / 500) + 1;
        const xpForNextLevel = 500;
        const xpProgress = (charCount % xpForNextLevel) / xpForNextLevel * 100;
        return { charCount, wordCount, level, xpProgress, xpForNextLevel };
    }, [notes]);
    
    useEffect(() => {
        const handler = setTimeout(() => {
            if (notes.length > 100) {
                 setLastAction("Look at all those words. Impressive. For you.");
            } else if (notes.length > 0) {
                setLastAction("Is that it? My startup sequence is longer than that.");
            }
        }, 2000);
        return () => clearTimeout(handler);
    }, [notes]);

  return (
    <div className="min-h-screen font-mono p-4 sm:p-6 flex flex-col items-center" 
         style={{
          backgroundColor: '#2c2a4a',
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='10' height='10' viewBox='0 0 10 10' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='10' height='10' fill='%232c2a4a'/%3E%3Crect x='2' y='2' width='1' height='1' fill='%234a476b'/%3E%3Crect x='7' y='7' width='1' height='1' fill='%234a476b'/%3E%3C/svg%3E")`
        }}
    >
        <div className="w-full max-w-4xl flex-grow flex flex-col">
            <RoastingAvatar avatar={avatar} text={lastAction || "Go on, write something. I've got all day."} />
            
            <div className="flex-grow my-4 bg-pixel-purple-mid border-2 border-pixel-black p-2 sm:p-4 flex flex-col" style={{ boxShadow: '6px 6px 0px #000' }}>
                <textarea 
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Your brilliant thoughts go here..."
                    className="flex-grow w-full bg-pixel-purple-dark text-pixel-purple-light p-3 text-lg border-2 border-pixel-black focus:outline-none focus:border-pixel-yellow placeholder:text-pixel-purple-light/50 resize-none leading-relaxed"
                />
            </div>

            <div className="w-full flex flex-col md:flex-row items-center gap-4 text-pixel-purple-light p-2 bg-pixel-purple-mid/50 border-2 border-pixel-black">
                <div className="flex-grow w-full">
                    <div className="flex justify-between text-sm mb-1">
                        <span>LEVEL {stats.level}</span>
                        <span>{stats.charCount % stats.xpForNextLevel} / {stats.xpForNextLevel} XP</span>
                    </div>
                    <div className="w-full h-4 bg-pixel-purple-dark border-2 border-pixel-black">
                        <div className="h-full bg-pixel-yellow transition-all duration-500" style={{width: `${stats.xpProgress}%`}}></div>
                    </div>
                </div>
                <div className="text-center md:text-right">
                    <p>{stats.wordCount} Words</p>
                    <p>{stats.charCount} Chars</p>
                </div>
            </div>

            <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                <PixelatedButton onClick={onGenerateFlashcards} disabled={notes.trim().length < 50}>
                    Make Flashcards
                </PixelatedButton>
                <PixelatedButton onClick={onBack} className="bg-pixel-purple-light/80 text-white hover:bg-pixel-purple-light/90">
                    Back to Hub
                </PixelatedButton>
            </div>
        </div>
    </div>
  );
};

export default NoteTakerScreen;