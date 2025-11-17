import React, { useState, useCallback } from 'react';
import PuzzleContainer from './PuzzleContainer';

interface Question {
    question: string;
    answer: string;
}

interface FillInTheBlanksData {
    title: string;
    questions: Question[];
}

const CheckIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>;
const XIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-600" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" /></svg>;

const QuestionRow = React.memo(({ q, index, answer, feedbackClass, onAnswerChange }: { q: Question, index: number, answer: string, feedbackClass: string, onAnswerChange: (index: number, value: string) => void }) => {
    const parts = q.question.split('___');
    return (
        <div className="bg-white/30 p-4 rounded-lg shadow-sm">
            <label className="text-base sm:text-lg font-semibold flex flex-wrap items-center gap-x-2">
                <span className="mr-2">{index + 1}.</span>
                <span>{parts[0]}</span>
                <span className="inline-flex items-center gap-2">
                <input 
                    type="text"
                    value={answer}
                    onChange={(e) => onAnswerChange(index, e.target.value)}
                    className={`inline-block w-32 sm:w-40 px-2 py-1 rounded-none border-b-2 bg-transparent transition-colors duration-200 outline-none ${feedbackClass}`}
                />
                    {feedbackClass.includes('green-400') && <CheckIcon />}
                    {feedbackClass.includes('red-400') && <XIcon />}
                </span>
                <span>{parts[1]}</span>
            </label>
        </div>
    );
});

const FillInTheBlanksPuzzle: React.FC<{ data: FillInTheBlanksData }> = ({ data }) => {
    const { title, questions } = data;
    const [answers, setAnswers] = useState<string[]>(Array(questions.length).fill(''));
    const [feedback, setFeedback] = useState<('correct' | 'incorrect' | null)[]>(Array(questions.length).fill(null));

    const handleAnswerChange = useCallback((index: number, value: string) => {
        setAnswers(prevAnswers => {
            const newAnswers = [...prevAnswers];
            newAnswers[index] = value;
            return newAnswers;
        });
        
        // Reset feedback when user types
        setFeedback(prevFeedback => {
            const newFeedback = [...prevFeedback];
            newFeedback[index] = null;
            return newFeedback;
        });
    }, []);

    const checkAnswers = () => {
        const newFeedback = questions.map((q, index) => {
            if (answers[index].trim().toLowerCase() === q.answer.toLowerCase()) {
                return 'correct';
            }
            return 'incorrect';
        });
        setFeedback(newFeedback);
    };
    
    const getFeedbackClass = (index: number) => {
        if(feedback[index] === 'correct') return 'border-green-400';
        if(feedback[index] === 'incorrect') return 'border-red-400';
        return 'border-gray-400/50 focus:border-aurora-purple';
    }

    return (
        <PuzzleContainer title={title}>
            <div className="space-y-4 max-w-3xl mx-auto">
                {questions.map((q, index) => (
                    <QuestionRow
                        key={index}
                        q={q}
                        index={index}
                        answer={answers[index]}
                        feedbackClass={getFeedbackClass(index)}
                        onAnswerChange={handleAnswerChange}
                    />
                ))}
                 <div className="text-center pt-4">
                    <button onClick={checkAnswers} className="bg-aurora-purple/80 hover:bg-aurora-purple text-white font-bold py-2 px-8 rounded-full transition-colors duration-300">
                        Check Answers
                    </button>
                </div>
            </div>
        </PuzzleContainer>
    );
};

export default FillInTheBlanksPuzzle;