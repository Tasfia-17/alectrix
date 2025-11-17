import React, { useState } from 'react';

interface ReflectionModalProps {
  onSave: (reflectionText: string) => void;
  onClose: () => void;
}

const ReflectionModal: React.FC<ReflectionModalProps> = ({ onSave, onClose }) => {
  const [text, setText] = useState('');

  const handleSave = () => {
    onSave(text);
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm font-mono animate-fade-in"
      onClick={onClose}
    >
      <div 
        className="relative w-11/12 max-w-md m-4 p-6 bg-pixel-purple-dark text-white border-2 border-pixel-black"
        style={{ boxShadow: '8px 8px 0px rgba(0,0,0,0.5)' }}
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-4xl text-pixel-yellow mb-4 text-center" style={{ textShadow: '2px 2px 0px #000' }}>
          Reflection
        </h2>
        <p className="text-pixel-purple-light/80 mb-4 text-center">
          How did that go? What did you learn? Be honest.
        </p>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="My brain feels like..."
          className="w-full h-32 bg-pixel-purple-mid text-pixel-purple-light p-2 border-2 border-pixel-black focus:outline-none focus:border-pixel-yellow placeholder:text-pixel-purple-light/50 resize-none"
        />
        <div className="mt-4 flex flex-col sm:flex-row gap-2">
            <button onClick={handleSave} className="flex-1 bg-pixel-yellow text-deep-sienna font-bold py-2 border-2 border-pixel-black transform active:translate-y-0.5" style={{ boxShadow: '2px 2px 0px #000' }}>
                Save & Exit
            </button>
            <button onClick={onClose} className="flex-1 bg-pixel-purple-light/50 text-white font-bold py-2 border-2 border-pixel-black transform active:translate-y-0.5" style={{ boxShadow: '2px 2px 0px #000' }}>
                Exit Without Saving
            </button>
        </div>
      </div>
    </div>
  );
};

export default ReflectionModal;