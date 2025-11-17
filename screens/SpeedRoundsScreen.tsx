import React, { useState, useEffect, useRef, useCallback } from 'react';
import { SpeedRoundsData, SpeedRoundQuestion } from '../lib/gemini';
import BackButton from '../components/BackButton';
import GlassyClock from '../components/GlassyClock';

interface SpeedRoundsScreenProps {
    gameData: SpeedRoundsData | null;
    onBack: () => void;
}

const OptionButton = React.memo(({ option, onClick, disabled, className }: { option: string, onClick: (option: string) => void, disabled: boolean, className: string }) => (
    <button 
        onClick={() => onClick(option)}
        disabled={disabled}
        className={`p-4 rounded-xl shadow-lg border text-lg font-semibold transition-all duration-300 ${className} text-aurora-dark-text`}
    >
        {option}
    </button>
));

const QuestionArea = React.memo(({ question, questionIndex, totalQuestions, score, onAnswer, feedback, getOptionClass }: { question: SpeedRoundQuestion, questionIndex: number, totalQuestions: number, score: number, onAnswer: (option: string) => void, feedback: string | null, getOptionClass: (option: string) => string }) => (
    <>
        <p className="text-aurora-mid-text mb-4">Question {questionIndex + 1} / {totalQuestions} | Score: {score}</p>
        <h2 className="text-2xl sm:text-3xl font-bold mt-6 mb-8 min-h-[100px]">{question.questionText}</h2>
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-4">
            {question.options.map((option, i) => (
                    <OptionButton 
                    key={i}
                    option={option}
                    onClick={onAnswer}
                    disabled={!!feedback}
                    className={getOptionClass(option)}
                    />
            ))}
        </div>
    </>
));


const SpeedRoundsScreen: React.FC<SpeedRoundsScreenProps> = ({ gameData, onBack }) => {
    const [gameState, setGameState] = useState<'setup' | 'playing' | 'finished'>('setup');
    const [timerDuration, setTimerDuration] = useState<number>(5);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [timeLeft, setTimeLeft] = useState(timerDuration);
    const [score, setScore] = useState(0);
    const [feedback, setFeedback] = useState<'correct' | 'incorrect' | 'unanswered' | null>(null);
    
    const progressionTimeoutRef = useRef<number | null>(null);
    const countdownIntervalRef = useRef<number | null>(null);

    const handleNextQuestion = useCallback(() => {
        setFeedback(null);
        if (gameData && currentQuestionIndex < gameData.questions.length - 1) {
            setCurrentQuestionIndex(prev => prev + 1);
        } else {
            setGameState('finished');
        }
    }, [currentQuestionIndex, gameData]);


    useEffect(() => {
        if (gameState === 'playing') {
            setTimeLeft(timerDuration);
            
            countdownIntervalRef.current = window.setInterval(() => {
                setTimeLeft(prev => (prev > 0 ? prev - 0.1 : 0));
            }, 100);

            progressionTimeoutRef.current = window.setTimeout(() => {
                setFeedback('unanswered');
                setTimeout(handleNextQuestion, 500);
            }, timerDuration * 1000);
        }
        
        return () => {
            if (progressionTimeoutRef.current) clearTimeout(progressionTimeoutRef.current);
            if (countdownIntervalRef.current) clearInterval(countdownIntervalRef.current);
        };

    }, [gameState, currentQuestionIndex, timerDuration, handleNextQuestion]);
    
    const handleAnswerClick = useCallback((option: string) => {
        if (feedback) return; // Prevent multiple answers

        if (progressionTimeoutRef.current) clearTimeout(progressionTimeoutRef.current);
        if (countdownIntervalRef.current) clearInterval(countdownIntervalRef.current);
        
        const isCorrect = option === gameData?.questions[currentQuestionIndex].correctAnswer;
        if (isCorrect) {
            setScore(s => s + 1);
            setFeedback('correct');
        } else {
            setFeedback('incorrect');
        }
        
        setTimeout(handleNextQuestion, 1000); // Show feedback for 1s
    }, [feedback, gameData, currentQuestionIndex, handleNextQuestion]);

    const startGame = (duration: number) => {
        setTimerDuration(duration);
        setTimeLeft(duration);
        setCurrentQuestionIndex(0);
        setScore(0);
        setFeedback(null);
        setGameState('playing');
    };
    
    if (!gameData || !Array.isArray(gameData.questions) || gameData.questions.length === 0) {
        return (
             <div className="relative min-h-screen w-full bg-gradient-to-br from-pastel-purple via-pastel-pink to-pastel-yellow font-nunito p-8 flex flex-col items-center justify-center text-center">
                <BackButton onBack={onBack} />
                <h1 className="text-3xl font-bold text-aurora-dark-text/80 mb-4">Oh no!</h1>
                <p className="text-aurora-dark-text/60 mb-8">Something went wrong and we couldn't find your speed round questions.</p>
            </div>
        );
    }
    
    const currentQuestion = gameData.questions[currentQuestionIndex];

    const getOptionClass = useCallback((option: string) => {
        if (!feedback) return 'bg-white/30 hover:bg-white/50 border-transparent';
        const isCorrect = option === currentQuestion.correctAnswer;
        // This logic is tricky for incorrect answers without knowing which was selected
        // We'll highlight the correct one, and fade others
        if(isCorrect) return 'bg-green-300 border-green-400 scale-105';
        
        return 'bg-white/30 border-transparent opacity-60';
    }, [feedback, currentQuestion]);

    return (
        <div className="relative min-h-screen w-full bg-gradient-to-br from-aurora-deep-blue via-aurora-night-purple to-aurora-dark-text font-nunito p-4 sm:p-6 lg:p-8 flex flex-col items-center justify-center text-white">
            <BackButton onBack={onBack} />
             {gameState === 'setup' && (
                <div className="text-center animate-fade-in">
                    <h1 className="font-handwritten text-5xl sm:text-6xl text-transparent bg-clip-text bg-gradient-to-r from-purple-300 via-white to-pink-200 mb-4">{gameData.title}</h1>
                    <p className="max-w-prose mx-auto text-aurora-light-text mb-8">{gameData.instruction}</p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        {[2, 5, 10].map(duration => (
                            <button key={duration} onClick={() => startGame(duration)} className="bg-white/10 backdrop-blur-md border border-white/20 text-aurora-light-text font-bold text-lg py-3 px-8 rounded-full shadow-lg transform active:scale-95 hover:bg-white/20 transition-all duration-300">
                                {duration} Second Round
                            </button>
                        ))}
                    </div>
                </div>
            )}
            {gameState === 'playing' && currentQuestion && (
                <div className="w-full max-w-2xl text-center flex flex-col items-center animate-fade-in">
                    <GlassyClock duration={timerDuration} timeLeft={timeLeft} />
                    <QuestionArea 
                        question={currentQuestion}
                        questionIndex={currentQuestionIndex}
                        totalQuestions={gameData.questions.length}
                        score={score}
                        onAnswer={handleAnswerClick}
                        feedback={feedback}
                        getOptionClass={getOptionClass}
                    />
                </div>
            )}
             {gameState === 'finished' && (
                <div className="text-center animate-fade-in">
                    <h1 className="font-handwritten text-5xl sm:text-6xl text-transparent bg-clip-text bg-gradient-to-r from-purple-300 via-white to-pink-200 mb-4">Round Complete!</h1>
                    <p className="text-3xl mb-8">Your final score is: <span className="font-bold text-aurora-gold">{score} / {gameData.questions.length}</span></p>
                    <button onClick={() => setGameState('setup')} className="bg-white/10 backdrop-blur-md border border-white/20 text-aurora-light-text font-bold text-lg py-3 px-8 rounded-full shadow-lg transform active:scale-95 hover:bg-white/20 transition-all duration-300">
                        Play Again
                    </button>
                </div>
            )}
        </div>
    );
};

export default SpeedRoundsScreen;
