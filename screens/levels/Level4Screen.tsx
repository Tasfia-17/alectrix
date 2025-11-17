import React, { useState, useEffect } from 'react';
import { AvatarData } from '../../App';
import { Task } from '../ToDoListScreen';
import RoastingAvatar from '../../components/common/RoastingAvatar';
import ReflectionModal from '../../components/common/ReflectionModal';
import PixelatedButton from '../../components/common/PixelatedButton';

interface LevelProps {
  task: Task;
  avatar: AvatarData;
  onComplete: (reflection?: string) => void;
}

const PRESENTATION_TIME = 15 * 60; // 15 minutes
const HECKLER_RATE = 12000; // 12 seconds
const MAX_AUDIENCE = 50;

const Level4Screen: React.FC<LevelProps> = ({ task, avatar, onComplete }) => {
    const [timeLeft, setTimeLeft] = useState(PRESENTATION_TIME);
    const [hecklers, setHecklers] = useState<{id: number, x: number, y: number}[]>([]);
    const [showReflection, setShowReflection] = useState(false);

    const audienceCount = Math.floor(((PRESENTATION_TIME - timeLeft) / PRESENTATION_TIME) * MAX_AUDIENCE);
    const minutes = Math.floor(timeLeft / 60).toString().padStart(2, '0');
    const seconds = (timeLeft % 60).toString().padStart(2, '0');

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(prev => {
                if (prev <= 1) {
                    clearInterval(timer);
                    setShowReflection(true);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        const spawner = setInterval(() => {
            if (hecklers.length < 2 && audienceCount > 5) {
                setHecklers(prev => [...prev, {
                    id: Date.now(),
                    x: Math.random() * 80 + 10,
                    y: Math.random() * 40 + 50, // lower half
                }]);
            }
        }, HECKLER_RATE);
        return () => clearInterval(spawner);
    }, [hecklers.length, audienceCount]);

    const silenceHeckler = (id: number) => {
        setHecklers(prev => prev.filter(h => h.id !== id));
    };

    useEffect(() => {
        if (hecklers.length > 0) {
            const penalty = setInterval(() => {
                 setTimeLeft(prev => Math.max(0, prev - hecklers.length)); // Lose 1s per heckler
            }, 1000);
            return () => clearInterval(penalty);
        }
    }, [hecklers]);
    
    return (
        <>
            <div className="min-h-screen font-mono p-4 sm:p-8 flex flex-col items-center justify-between relative overflow-hidden" 
                 style={{background: 'linear-gradient(to bottom, #1e1e3f 50%, #7d5a50 50%)'}}>
                
                {/* Stage */}
                <div className="absolute bottom-0 left-0 w-full h-1/2 bg-[#8B4513] border-t-8 border-black"></div>
                <div className="absolute bottom-1/2 left-1/2 -translate-x-1/2 w-24 h-48 bg-yellow-300/30 rounded-t-full blur-2xl"></div>

                <div className="w-full max-w-2xl z-20">
                    <RoastingAvatar avatar={avatar} text="The crowd is... non-existent. Perfect. Now you can't disappoint anyone but me." />
                </div>

                <div className="w-full max-w-4xl h-64 relative z-10 flex-grow my-4">
                    {/* Audience */}
                    {Array.from({ length: audienceCount }).map((_, i) => (
                         <div key={i} className="absolute text-2xl" style={{left: `${Math.random()*90+5}%`, top: `${Math.random()*40+55}%`}}>
                            👤
                         </div>
                    ))}
                     {/* Hecklers */}
                    {hecklers.map(h => (
                         <button key={h.id} onClick={() => silenceHeckler(h.id)} className="absolute text-3xl animate-bounce-sm" style={{left: `${h.x}%`, top: `${h.y}%`}}>
                            🍅
                         </button>
                    ))}
                </div>

                <div className="w-full max-w-sm z-20 flex flex-col items-center">
                    <h1 className="text-2xl font-bold mb-2 text-white bg-black/50 p-2" >{task.text}</h1>
                    <p className="text-4xl font-bold mb-4 text-white bg-black/50 p-2">{minutes}:{seconds}</p>
                    <PixelatedButton onClick={() => setShowReflection(true)}>
                        End Rehearsal
                    </PixelatedButton>
                </div>
            </div>
            {showReflection && <ReflectionModal onSave={(text) => onComplete(text)} onClose={() => onComplete()} />}
        </>
    );
};

export default Level4Screen;
