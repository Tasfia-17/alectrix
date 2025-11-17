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

const RESEARCH_TIME = 25 * 60; // 25 minutes
const DISTRACTION_RATE = 8000; // 8 seconds

const Level3Screen: React.FC<LevelProps> = ({ task, avatar, onComplete }) => {
    const [progress, setProgress] = useState(0);
    const [distractions, setDistractions] = useState<{ id: number, x: number, y: number }[]>([]);
    const [isStalled, setIsStalled] = useState(false);
    const [showReflection, setShowReflection] = useState(false);

    useEffect(() => {
        if (isStalled) return;
        const timer = setInterval(() => {
            setProgress(prev => {
                const newProgress = prev + (100 / RESEARCH_TIME);
                if (newProgress >= 100) {
                    clearInterval(timer);
                    setShowReflection(true);
                    return 100;
                }
                return newProgress;
            });
        }, 1000);
        return () => clearInterval(timer);
    }, [isStalled]);

    useEffect(() => {
        const spawner = setInterval(() => {
            if (distractions.length < 3) {
                 setDistractions(prev => [...prev, {
                    id: Date.now(),
                    x: Math.random() * 80 + 10,
                    y: Math.random() * 60 + 20, // Avoid top/bottom edges
                }]);
            }
        }, DISTRACTION_RATE);
        return () => clearInterval(spawner);
    }, [distractions.length]);

    const banishDistraction = (id: number) => {
        setDistractions(prev => prev.filter(d => d.id !== id));
        if (isStalled) setIsStalled(false);
    };

    useEffect(() => {
        if (distractions.length > 0 && !isStalled) {
            const stallTimeout = setTimeout(() => setIsStalled(true), 5000); // Stall if distraction is not cleared in 5s
            return () => clearTimeout(stallTimeout);
        } else if (distractions.length === 0 && isStalled) {
            setIsStalled(false);
        }
    }, [distractions, isStalled]);

    return (
        <>
            <div className="min-h-screen font-mono p-4 sm:p-8 flex flex-col items-center justify-between relative overflow-hidden" 
                 style={{backgroundColor: '#4a476b'}}>
                
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-9xl text-white/5 opacity-50 select-none">📜</div>

                <div className="w-full max-w-2xl z-10">
                    <RoastingAvatar avatar={avatar} text="Ghosts of your past failures are here to distract you. Or maybe they're just regular ghosts. Either way, get rid of them." />
                </div>

                <div className="w-full max-w-2xl flex-grow flex flex-col items-center justify-center my-4 relative">
                    <h1 className="text-3xl sm:text-4xl font-bold mb-4 text-white" style={{textShadow: '3px 3px 0 #000'}}>{task.text}</h1>

                    {/* Distractions */}
                    {distractions.map(d => (
                        <button key={d.id} onClick={() => banishDistraction(d.id)} className="text-5xl absolute transform -translate-x-1/2 -translate-y-1/2 animate-float-subtle" style={{left: `${d.x}%`, top: `${d.y}%`}}>
                            👻
                        </button>
                    ))}
                    
                    {/* Character */}
                    <div className="text-6xl my-4">🧘</div>

                    {/* Progress Bar */}
                    <div className="w-full h-8 bg-pixel-purple-dark border-2 border-pixel-black mb-4">
                        <div className={`h-full bg-pixel-yellow transition-all duration-1000 linear ${isStalled ? 'animate-pulse bg-red-500' : ''}`} style={{ width: `${progress}%` }}></div>
                    </div>
                     <p className="text-white font-bold">{isStalled ? "STALLED! Banish the distraction!" : "Deciphering..."}</p>
                </div>

                <div className="w-full max-w-sm z-10">
                    <PixelatedButton onClick={() => setShowReflection(true)}>
                        Leave the Temple
                    </PixelatedButton>
                </div>
            </div>
            {showReflection && <ReflectionModal onSave={(text) => onComplete(text)} onClose={() => onComplete()} />}
        </>
    );
};

export default Level3Screen;
