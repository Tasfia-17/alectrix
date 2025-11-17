import React, { useState } from 'react';
import { AvatarData } from '../../App';
import RoastingAvatar from '../../components/common/RoastingAvatar';

interface ThoughtValidatorScreenProps {
  avatar: AvatarData;
  onBack: () => void;
  onComplete: (thought: string) => void;
}

const distortions = [
  { name: 'All-or-Nothing', desc: 'Seeing things in black and white.' },
  { name: 'Overgeneralization', desc: 'Seeing a single negative event as a never-ending pattern.' },
  { name: 'Mental Filter', desc: 'Focusing on the negatives and ignoring the positives.' },
  { name: 'Catastrophizing', desc: 'Expecting the worst-case scenario to happen.' },
  { name: 'Mind Reading', desc: 'Assuming you know what others are thinking.' },
  { name: 'Personalization', desc: 'Blaming yourself for things you\'re not responsible for.' },
];

const ThoughtValidatorScreen: React.FC<ThoughtValidatorScreenProps> = ({ avatar, onBack, onComplete }) => {
  const [step, setStep] = useState(1);
  const [negativeThought, setNegativeThought] = useState('');
  const [selectedDistortions, setSelectedDistortions] = useState<string[]>([]);
  const [balancedThought, setBalancedThought] = useState('');

  const toggleDistortion = (name: string) => {
    setSelectedDistortions(prev =>
      prev.includes(name) ? prev.filter(d => d !== name) : [...prev, name]
    );
  };

  const handleFinish = () => {
    if (balancedThought.trim()) {
      onComplete(negativeThought);
      onBack();
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <>
            <h2 className="text-pixel-yellow text-xl mb-2 text-center">Step 1: Identify the Thought</h2>
            <textarea
              value={negativeThought}
              onChange={e => setNegativeThought(e.target.value)}
              placeholder="What's the negative thought on your mind?"
              className="w-full h-24 bg-pixel-purple-mid text-pixel-purple-light p-2 border-2 border-pixel-black"
            />
            <button onClick={() => setStep(2)} disabled={!negativeThought.trim()} className="mt-4 w-full bg-pixel-yellow text-deep-sienna font-bold py-2 border-2 border-pixel-black disabled:opacity-50">Next Step</button>
          </>
        );
      case 2:
        return (
          <>
            <h2 className="text-pixel-yellow text-xl mb-2 text-center">Step 2: Spot Distortions</h2>
            <div className="grid grid-cols-2 gap-2">
                {distortions.map(d => (
                    <button key={d.name} onClick={() => toggleDistortion(d.name)} className={`p-2 border-2 border-pixel-black text-left ${selectedDistortions.includes(d.name) ? 'bg-pixel-yellow text-black' : 'bg-pixel-purple-dark text-white'}`}>
                        <p className="font-bold">{d.name}</p>
                        <p className="text-xs opacity-80">{d.desc}</p>
                    </button>
                ))}
            </div>
             <button onClick={() => setStep(3)} className="mt-4 w-full bg-pixel-yellow text-deep-sienna font-bold py-2 border-2 border-pixel-black">Next Step</button>
          </>
        );
      case 3:
        return (
            <>
                <h2 className="text-pixel-yellow text-xl mb-2 text-center">Step 3: Reframe It</h2>
                 <p className="text-sm text-pixel-purple-light/70 mb-2 p-2 bg-pixel-purple-dark border border-pixel-black">Original: "{negativeThought}"</p>
                <textarea
                value={balancedThought}
                onChange={e => setBalancedThought(e.target.value)}
                placeholder="Write a more balanced, realistic thought..."
                className="w-full h-24 bg-pixel-purple-mid text-pixel-purple-light p-2 border-2 border-pixel-black"
                />
                <button onClick={handleFinish} disabled={!balancedThought.trim()} className="mt-4 w-full bg-pixel-yellow text-deep-sienna font-bold py-2 border-2 border-pixel-black disabled:opacity-50">Finish & Exit</button>
            </>
        )
      default:
        return null;
    }
  };


  return (
    <div className="min-h-screen font-mono p-4 sm:p-6 flex flex-col items-center justify-between" 
         style={{
          backgroundColor: '#2c2a4a',
        }}
    >
      <RoastingAvatar avatar={avatar} text="Your brain is telling you lies again. Let's see if we can teach it some basic logic." />

      <div className="w-full max-w-lg flex-grow my-4 bg-pixel-purple-mid border-2 border-pixel-black p-4" style={{ boxShadow: '6px 6px 0px #000' }}>
        {renderStep()}
      </div>
      
      <div className="w-full max-w-lg">
        <button onClick={onBack} className="w-full bg-pixel-purple-light/80 text-white font-bold py-3 border-2 border-pixel-black transform active:translate-y-1" style={{ boxShadow: '4px 4px 0 #000' }}>
          Back to Hub
        </button>
      </div>
    </div>
  );
};

export default ThoughtValidatorScreen;
