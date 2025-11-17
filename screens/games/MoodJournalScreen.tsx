import React, { useState } from 'react';
import { AvatarData } from '../../App';
import RoastingAvatar from '../../components/common/RoastingAvatar';

interface MoodJournalScreenProps {
  avatar: AvatarData;
  onBack: () => void;
  onComplete: (mood: string) => void;
}

interface Mood {
    name: string;
    icon: string;
    message: string;
}

const moods: Mood[] = [
    { name: 'Happy', icon: '😊', message: 'It\'s great that you\'re feeling happy! Embrace this positive moment.' },
    { name: 'Sad', icon: '😢', message: 'It\'s okay to feel sad sometimes. Your feelings are valid. Be kind to yourself.' },
    { name: 'Anxious', icon: '😟', message: 'Anxiety is tough. Remember to breathe. This feeling will pass.' },
    { name: 'Angry', icon: '😠', message: 'Feeling angry is a normal human emotion. Take a moment to understand its source.' },
    { name: 'Calm', icon: '😌', message: 'Feeling calm is a wonderful state. Enjoy this peace and tranquility.' },
    { name: 'Tired', icon: '😴', message: 'It\'s alright to feel tired. Your body and mind need rest to recharge.' },
    { name: 'Excited', icon: '🤩', message: 'Excitement is a fantastic energy! Channel it into something you love.' },
    { name: 'Content', icon: '🙂', message: 'Feeling content is a quiet joy. Appreciate this feeling of being at ease.' },
];

const MoodJournalScreen: React.FC<MoodJournalScreenProps> = ({ avatar, onBack, onComplete }) => {
    const [selectedMood, setSelectedMood] = useState<Mood | null>(null);

    const handleMoodSelect = (mood: Mood) => {
        setSelectedMood(mood);
        onComplete(mood.name);
    };

    const handleCloseModal = () => {
        setSelectedMood(null);
    }

  return (
    <div className="min-h-screen font-mono p-4 sm:p-6 flex flex-col items-center justify-between" 
         style={{ backgroundColor: '#2c2a4a' }}
    >
      <RoastingAvatar avatar={avatar} text="So, how are you feeling? Pick one. I'll try to care for at least five seconds." />
      
      <div className="w-full max-w-lg flex-grow flex flex-col items-center justify-center my-4">
        <div className="bg-pixel-purple-mid border-2 border-pixel-black p-4" style={{ boxShadow: '6px 6px 0px #000' }}>
            <h2 className="text-pixel-yellow text-xl text-center mb-4">How are you feeling right now?</h2>
            <div className="grid grid-cols-4 gap-2">
                {moods.map(mood => (
                    <button key={mood.name} onClick={() => handleMoodSelect(mood)} className="bg-pixel-purple-dark border-2 border-pixel-black p-2 aspect-square flex flex-col items-center justify-center text-3xl hover:bg-pixel-purple-light/20 transition-colors">
                        {mood.icon}
                    </button>
                ))}
            </div>
        </div>
      </div>
      
      <div className="w-full max-w-lg">
        <button onClick={onBack} className="w-full bg-pixel-yellow text-deep-sienna font-bold text-lg py-3 border-2 border-pixel-black transform active:translate-y-1" style={{ boxShadow: '4px 4px 0 #000' }}>
          Back to Hub
        </button>
      </div>

      {selectedMood && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 animate-fade-in" onClick={handleCloseModal}>
              <div className="bg-pixel-purple-dark p-6 border-2 border-pixel-black w-11/12 max-w-sm text-center" style={{ boxShadow: '8px 8px 0px #000' }} onClick={e => e.stopPropagation()}>
                  <p className="text-6xl mb-4">{selectedMood.icon}</p>
                  <h2 className="text-pixel-yellow text-3xl mb-2">{selectedMood.name}</h2>
                  <p className="text-pixel-purple-light">{selectedMood.message}</p>
                  <button onClick={handleCloseModal} className="mt-4 w-full bg-pixel-yellow text-deep-sienna font-bold py-2 border-2 border-pixel-black">Got it</button>
              </div>
          </div>
      )}
    </div>
  );
};

export default MoodJournalScreen;
