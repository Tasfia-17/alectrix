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

const WRITING_TIME = 30 * 60; // 30 minutes
const IDEA_RATE = 7000; // 7 seconds

const Level5Screen: React.FC<LevelProps> = ({ task, avatar, onComplete }) => {
    const [timeLeft, setTimeLeft] = useState(WRITING_TIME);
    const [ideas, setIdeas] = useState<{id: number, x: number, y: number, type: 'good' | 'bad'}[]>([]);
    const [showReflection, setShowReflection] = useState(false);

    const progress = ((WRITING_TIME - timeLeft) / WRITING_TIME) * 100;
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
            if (ideas.length < 4) {
                 setIdeas(prev => [...prev, {
                    id: Date.now(),
                    x: Math.random() * 80 + 10,
                    y: Math.random() * 50,
                    type: 'bad',
                }]);
            }
        }, IDEA_RATE);
        return () => clearInterval(spawner);
    }, [ideas.length]);

    const handleIdeaClick = (id: number) => {
        setIdeas(prev => prev.filter(idea => idea.id !== id));
        setTimeLeft(prev => Math.min(WRITING_TIME, prev + 20)); // 20s bonus
    };

    return (
        <>
            <div className="min-h-screen font-mono p-4 sm:p-8 flex flex-col items-center justify-between relative overflow-hidden" 
                 style={{background: 'linear-gradient(to bottom, #d1c4e9 0%, #ffffff 100%)'}}>
                
                <div className="w-full max-w-2xl z-10">
                    <RoastingAvatar avatar={avatar} text="Ah, the 'Writer's Block'. A fitting name for both the task and your general state of being." />
                </div>
                
                <div className="w-full max-w-md h-80 flex-grow flex items-center justify-center my-4 relative">
                    {/* Ideas */}
                    {ideas.map(idea => (
                        <button key={idea.id} onClick={() => handleIdeaClick(idea.id)} className="text-4xl absolute animate-float-subtle" style={{left: `${idea.x}%`, top: `${idea.y}%`}}>
                            🗑️
                        </button>
                    ))}

                    {/* Writer's Block */}
                    <div className="relative w-64 h-64 flex items-center justify-center">
                        <div className="absolute inset-0 bg-gray-400"></div>
                        <div className="absolute inset-0 bg-white" style={{clipPath: `inset(0 0 ${100 - progress}% 0)`}}></div>
                        <div className="text-6xl z-10">{progress > 50 ? '🏆' : '✍️'}</div>
                        <p className="absolute bottom-2 text-black font-bold z-20 bg-white/50 px-2">{Math.floor(progress)}%</p>
                    </div>
                </div>

                <div className="w-full max-w-sm z-10 flex flex-col items-center">
                    <p className="text-4xl font-bold mb-4 text-deep-sienna bg-white/50 p-2 border-2 border-black">{minutes}:{seconds}</p>
                    <PixelatedButton onClick={() => setShowReflection(true)}>
                        Finish Writing
                    </PixelatedButton>
                </div>
            </div>
            {showReflection && <ReflectionModal onSave={(text) => onComplete(text)} onClose={() => onComplete()} />}
        </>
    );
};

export default Level5Screen;
