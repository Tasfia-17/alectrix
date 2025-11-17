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

const BATTERY_LIFE = 15 * 60; // 15 minutes
const BUG_SPAWN_RATE = 10000; // 10 seconds

const Level2Screen: React.FC<LevelProps> = ({ task, avatar, onComplete }) => {
    const [battery, setBattery] = useState(BATTERY_LIFE);
    const [bugs, setBugs] = useState<{id: number, x: number, y: number}[]>([]);
    const [showReflection, setShowReflection] = useState(false);

    const batteryPercentage = (battery / BATTERY_LIFE) * 100;
    const minutes = Math.floor(battery / 60).toString().padStart(2, '0');
    const seconds = (battery % 60).toString().padStart(2, '0');

    useEffect(() => {
        const timer = setInterval(() => {
            setBattery(prev => {
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
        const bugSpawner = setInterval(() => {
            if (bugs.length < 3) {
                 setBugs(prev => [...prev, {
                    id: Date.now(),
                    x: Math.random() * 80 + 10,
                    y: Math.random() * 80 + 10,
                }]);
            }
        }, BUG_SPAWN_RATE);
        return () => clearInterval(bugSpawner);
    }, [bugs.length]);

    const squashBug = (id: number) => {
        setBugs(prev => prev.filter(bug => bug.id !== id));
        setBattery(prev => Math.min(BATTERY_LIFE, prev + 15)); // 15s bonus
    };

    return (
        <>
            <div className="min-h-screen font-mono p-4 sm:p-8 flex flex-col items-center justify-between relative overflow-hidden bg-black text-white" 
                 style={{background: 'radial-gradient(circle, #3a3a3a 0%, #000000 70%)'}}>
                 <div className="w-full max-w-2xl z-10">
                    <RoastingAvatar avatar={avatar} text="Bugs in your code? I'm shocked. Truly. Try to fix them before your light runs out." />
                </div>

                <div className="w-full h-80 max-w-2xl bg-black border-4 border-gray-600 my-4 relative" style={{boxShadow: 'inset 0 0 15px #000'}}>
                    {/* Bugs */}
                    {bugs.map(bug => (
                        <button key={bug.id} onClick={() => squashBug(bug.id)} className="text-3xl absolute transform -translate-x-1/2 -translate-y-1/2 animate-bob" style={{left: `${bug.x}%`, top: `${bug.y}%`}}>
                            🐛
                        </button>
                    ))}

                    {/* Headlamp Effect */}
                    <div className="absolute inset-0" style={{
                        background: `radial-gradient(circle at center, transparent ${batteryPercentage*0.5}%, black 100%)`,
                        transition: 'background 1s linear'
                    }}></div>

                    <p className="absolute bottom-2 left-2 text-green-400">&gt; {task.text}</p>
                </div>

                 <div className="w-full max-w-sm z-10 flex flex-col items-center">
                    <p className="text-xl mb-2">🔋 Battery: {minutes}:{seconds}</p>
                     <div className="w-full h-6 bg-gray-800 border-2 border-gray-600 mb-4">
                        <div className="h-full bg-green-500" style={{width: `${batteryPercentage}%`, transition: 'width 1s linear'}}></div>
                     </div>
                    <PixelatedButton onClick={() => setShowReflection(true)}>
                        Leave The Cave
                    </PixelatedButton>
                </div>
            </div>
            {showReflection && <ReflectionModal onSave={(text) => onComplete(text)} onClose={() => onComplete()} />}
        </>
    );
};

export default Level2Screen;
