import React, { useState, useEffect, useCallback } from 'react';
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

const FOCUS_TIME = 20 * 60; // 20 minutes

const quizQuestions = [
    { q: "What is 7 x 8?", a: ["56", "54", "64"] },
    { q: "What is the square root of 144?", a: ["12", "14", "11"] },
    { q: "What is 15% of 200?", a: ["30", "25", "35"] }
];

const Level1Screen: React.FC<LevelProps> = ({ task, avatar, onComplete }) => {
    const [timeLeft, setTimeLeft] = useState(FOCUS_TIME);
    const [paused, setPaused] = useState(false);
    const [showReflection, setShowReflection] = useState(false);
    const [showQuiz, setShowQuiz] = useState(false);
    const [currentQuestion, setCurrentQuestion] = useState(quizQuestions[0]);

    const progress = 100 - (timeLeft / FOCUS_TIME) * 100;
    const minutes = Math.floor(timeLeft / 60).toString().padStart(2, '0');
    const seconds = (timeLeft % 60).toString().padStart(2, '0');

    useEffect(() => {
        if (paused) return;
        const timer = setInterval(() => {
            setTimeLeft(prev => {
                if (prev <= 1) {
                    clearInterval(timer);
                    setShowReflection(true);
                    return 0;
                }
                // Trigger quiz every 5 minutes (300s)
                if ((FOCUS_TIME - prev) > 0 && (FOCUS_TIME - prev) % 300 === 0) {
                    setPaused(true);
                    setShowQuiz(true);
                    setCurrentQuestion(quizQuestions[Math.floor(Math.random() * quizQuestions.length)]);
                }
                return prev - 1;
            });
        }, 1000);
        return () => clearInterval(timer);
    }, [paused]);

    const handleQuizAnswer = (isCorrect: boolean) => {
        if (!isCorrect) {
            setTimeLeft(prev => Math.max(0, prev - 30)); // 30s penalty
        }
        setShowQuiz(false);
        setPaused(false);
    };
    
    return (
        <>
            <div className="min-h-screen font-mono p-4 sm:p-8 flex flex-col items-center justify-between relative overflow-hidden text-white" 
                 style={{background: 'linear-gradient(to bottom, #8ecae6 0%, #2c3e50 100%)'}}>
                <div className="w-full max-w-2xl z-10">
                    <RoastingAvatar avatar={avatar} text="Oh, climbing a mountain. A perfect metaphor for how needlessly difficult you make everything." />
                </div>

                <div className="flex-grow flex flex-col items-center justify-center w-full my-4 z-10">
                    <h1 className="text-3xl sm:text-4xl font-bold mb-2" style={{textShadow: '3px 3px 0 #000'}}>{task.text}</h1>
                    <p className="text-5xl font-bold" style={{textShadow: '3px 3px 0 #000'}}>{minutes}:{seconds}</p>

                    {/* Mountain Climb Visual */}
                    <div className="w-64 h-64 bg-gray-700/50 rounded-full mt-4 flex items-end justify-center relative overflow-hidden border-4 border-black">
                         <div className="absolute bottom-0 w-full bg-green-700" style={{height: `${progress}%`, transition: 'height 1s linear'}}></div>
                         <div className="text-4xl z-10" style={{bottom: `${progress-5}%`, position: 'absolute', transition: 'bottom 1s linear'}}>🧗</div>
                         <div className="absolute top-2 text-2xl">🏔️</div>
                    </div>
                </div>

                <div className="w-full max-w-sm z-10">
                    <PixelatedButton onClick={() => setShowReflection(true)}>
                        I'm Done Climbing
                    </PixelatedButton>
                </div>
            </div>
            {showQuiz && (
                 <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm font-mono animate-fade-in">
                    <div className="w-11/12 max-w-sm p-6 bg-pixel-purple-dark text-white border-2 border-pixel-black" style={{ boxShadow: '8px 8px 0px rgba(0,0,0,0.5)' }}>
                        <h2 className="text-2xl text-pixel-yellow mb-4 text-center">Secure Your Footing!</h2>
                        <p className="text-center mb-4">{currentQuestion.q}</p>
                        <div className="grid grid-cols-1 gap-2">
                            {currentQuestion.a.map(ans => (
                                <PixelatedButton key={ans} onClick={() => handleQuizAnswer(ans === currentQuestion.a[0])}>
                                    {ans}
                                </PixelatedButton>
                            ))}
                        </div>
                    </div>
                 </div>
            )}
            {showReflection && <ReflectionModal onSave={(text) => onComplete(text)} onClose={() => onComplete()} />}
        </>
    );
};

export default Level1Screen;
