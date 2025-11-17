import React, { useState } from 'react';
import { AvatarData } from '../App';
import RoastingAvatar from '../components/common/RoastingAvatar';
import PixelatedButton from '../components/common/PixelatedButton';
import { FlashcardData, generateFlashcards } from '../lib/gemini';

interface FlashcardScreenProps {
  avatar: AvatarData;
  notes: string;
  onBack: () => void;
}

const FlashcardViewer: React.FC<{ data: FlashcardData }> = ({ data }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isFlipped, setIsFlipped] = useState(false);

    const handleNext = () => {
        setIsFlipped(false);
        setCurrentIndex(prev => (prev + 1) % data.cards.length);
    };

    const handlePrev = () => {
        setIsFlipped(false);
        setCurrentIndex(prev => (prev - 1 + data.cards.length) % data.cards.length);
    };

    const card = data.cards[currentIndex];

    return (
        <div className="w-full flex-grow flex flex-col items-center justify-center">
            <div className="w-full max-w-lg h-64 perspective-1000">
                <div 
                    className="relative w-full h-full transform-style-3d transition-transform duration-700 cursor-pointer"
                    style={{ transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)' }}
                    onClick={() => setIsFlipped(!isFlipped)}
                >
                    {/* Front */}
                    <div className="absolute w-full h-full backface-hidden bg-pixel-purple-light border-4 border-pixel-black flex items-center justify-center p-4 text-center">
                        <p className="text-xl md:text-2xl font-bold text-black">{card.front}</p>
                    </div>
                    {/* Back */}
                    <div className="absolute w-full h-full backface-hidden bg-pixel-yellow border-4 border-pixel-black flex items-center justify-center p-4 text-center" style={{ transform: 'rotateY(180deg)' }}>
                         <p className="text-lg md:text-xl font-bold text-deep-sienna">{card.back}</p>
                    </div>
                </div>
            </div>
             <p className="text-pixel-purple-light my-4">{currentIndex + 1} / {data.cards.length}</p>
            <div className="flex gap-4">
                <button onClick={handlePrev} className="text-4xl text-pixel-purple-light hover:text-white">◄</button>
                <button onClick={() => setIsFlipped(!isFlipped)} className="text-4xl text-pixel-purple-light hover:text-white">🔄</button>
                <button onClick={handleNext} className="text-4xl text-pixel-purple-light hover:text-white">►</button>
            </div>
        </div>
    );
};


const FlashcardScreen: React.FC<FlashcardScreenProps> = ({ avatar, notes, onBack }) => {
    const [flashcardData, setFlashcardData] = useState<FlashcardData | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleGenerate = async () => {
        if (notes.trim().length < 50) {
            setError("You need at least 50 characters of notes to make flashcards.");
            return;
        }
        setIsLoading(true);
        setError(null);
        try {
            const data = await generateFlashcards(notes);
            if (data && data.cards && data.cards.length > 0) {
                setFlashcardData(data);
            } else {
                setError("I couldn't make any flashcards from that. It's probably your fault.");
            }
        } catch (e) {
            setError("Something went wrong. The circuits are probably fried.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
    <div className="min-h-screen font-mono p-4 sm:p-6 flex flex-col items-center justify-between" 
         style={{
          backgroundColor: '#2c2a4a',
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='10' height='10' viewBox='0 0 10 10' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='10' height='10' fill='%232c2a4a'/%3E%3Crect x='4' y='1' width='1' height='1' fill='%234a476b'/%3E%3Crect x='1' y='8' width='1' height='1' fill='%234a476b'/%3E%3C/svg%3E")`
        }}
    >
        <style>{`
            .perspective-1000 { perspective: 1000px; }
            .transform-style-3d { transform-style: preserve-3d; }
            .backface-hidden { backface-visibility: hidden; -webkit-backface-visibility: hidden; }
        `}</style>
        <div className="w-full max-w-2xl">
           <RoastingAvatar avatar={avatar} text={flashcardData ? flashcardData.title : "Flashcards. Because rote memorization is the peak of learning, right?"} />
        </div>
        
        <div className="w-full max-w-2xl flex-grow my-4 flex flex-col items-center justify-center">
            {isLoading ? (
                 <div className="text-center text-pixel-yellow animate-pulse">
                    <h2 className="text-3xl">Forging Knowledge...</h2>
                    <p className="text-pixel-purple-light/80">Don't rush me. This requires... effort.</p>
                </div>
            ) : flashcardData ? (
                <FlashcardViewer data={flashcardData} />
            ) : (
                <div className="text-center animate-fade-in">
                    <h2 className="text-2xl text-pixel-yellow mb-4">Ready to Forge Some Flashcards?</h2>
                    <p className="text-pixel-purple-light/70 mb-4 max-w-md">Your current notes have {notes.length} characters. I can work with that. Probably.</p>
                    {error && <p className="text-red-400 mb-4">{error}</p>}
                    <PixelatedButton onClick={handleGenerate} disabled={notes.trim().length < 50}>
                        Generate Now
                    </PixelatedButton>
                </div>
            )}
        </div>

        <div className="w-full max-w-sm">
            <PixelatedButton onClick={onBack}>
                Back to Hub
            </PixelatedButton>
        </div>
    </div>
    );
};

export default FlashcardScreen;