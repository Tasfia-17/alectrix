import React, { useState, useRef, useCallback } from 'react';
import PuzzleContainer from './PuzzleContainer';

interface CrosswordData {
    title: string;
    size: number;
    grid: ({ number?: number; letter?: string } | null)[][];
    clues: {
        across: string[];
        down: string[];
    };
}

interface CrosswordCellProps {
    cellData: ({ number?: number; letter?: string } | null);
    rIndex: number;
    cIndex: number;
    value: string;
    feedback: 'correct' | 'incorrect' | null;
    isActive: boolean;
    onCellClick: (row: number, col: number) => void;
    onInputChange: (e: React.ChangeEvent<HTMLInputElement>, row: number, col: number) => void;
    inputRef: (el: HTMLInputElement | null) => void;
}

const CrosswordCell = React.memo<CrosswordCellProps>(({ cellData, rIndex, cIndex, value, feedback, isActive, onCellClick, onInputChange, inputRef }) => {
    const getFeedbackClass = () => {
        if (feedback === 'correct') return 'bg-green-200/80 border-green-300';
        if (feedback === 'incorrect') return 'bg-red-200/80 border-red-300';
        if (isActive) return 'bg-yellow-200/80 border-yellow-300';
        return 'bg-white/60 border-gray-300/50';
    };

    return (
        <div
            className={`relative w-8 h-8 sm:w-10 sm:h-10 text-center border-transparent text-sm sm:text-base font-bold uppercase
            ${cellData ? '' : 'bg-aurora-dark-text/20 rounded-sm'}`}
            onClick={() => cellData && onCellClick(rIndex, cIndex)}
        >
            {cellData ? (
                <>
                    {cellData.number && (
                        <span className="absolute top-0 left-0.5 text-[8px] sm:text-[10px] text-gray-500 font-normal select-none">
                            {cellData.number}
                        </span>
                    )}
                    <input
                        ref={inputRef}
                        type="text"
                        maxLength={1}
                        value={value}
                        onChange={(e) => onInputChange(e, rIndex, cIndex)}
                        className={`w-full h-full text-center outline-none transition-colors duration-200 rounded-sm ${getFeedbackClass()}`}
                    />
                </>
            ) : null}
        </div>
    );
});


const CrosswordPuzzle: React.FC<{ data: CrosswordData }> = ({ data }) => {
    const { title, grid, clues, size } = data;
    const [userInput, setUserInput] = useState<string[][]>(() => Array(size).fill(null).map(() => Array(size).fill('')));
    const [activeCell, setActiveCell] = useState<{ row: number; col: number } | null>(null);
    const [feedback, setFeedback] = useState<('correct' | 'incorrect' | null)[][]>(() => Array(size).fill(null).map(() => Array(size).fill(null)));
    const inputRefs = useRef<(HTMLInputElement | null)[][]>(Array(size).fill(null).map(() => Array(size).fill(null)));

    const handleCellClick = useCallback((row: number, col: number) => {
        setActiveCell({ row, col });
        setFeedback(Array(size).fill(null).map(() => Array(size).fill(null))); // Clear feedback on new selection
    }, [size]);

    const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>, row: number, col: number) => {
        const value = e.target.value.toUpperCase().slice(0, 1);
        setUserInput(prevInput => {
            const newUserInput = prevInput.map(r => [...r]);
            newUserInput[row][col] = value;
            return newUserInput;
        });

        // Auto-focus next cell if a letter is entered
        if (value && col < size - 1 && grid[row][col + 1]) {
           inputRefs.current[row][col+1]?.focus();
           setActiveCell({ row, col: col + 1 });
        }
    }, [size, grid]);
    
    const handleCheckAnswers = useCallback(() => {
        const newFeedback = Array(size).fill(null).map(() => Array(size).fill(null));
        for(let r=0; r < size; r++) {
            for(let c=0; c < size; c++) {
                if(grid[r][c]) { // only check non-empty cells
                    if(userInput[r][c] === grid[r][c]?.letter) {
                        newFeedback[r][c] = 'correct';
                    } else if (userInput[r][c] !== '') {
                        newFeedback[r][c] = 'incorrect';
                    }
                }
            }
        }
        setFeedback(newFeedback);
    }, [size, grid, userInput]);


    return (
        <PuzzleContainer title={title}>
            <div className="flex flex-col lg:flex-row gap-6 items-start justify-center">
                {/* Grid */}
                <div className="flex-shrink-0 mx-auto">
                    <div 
                        className="grid bg-white/50 p-2 rounded-lg shadow-inner gap-0.5"
                        style={{ gridTemplateColumns: `repeat(${size}, minmax(0, 1fr))` }}
                    >
                        {grid.map((row, rIndex) => 
                            row.map((cell, cIndex) => (
                                <CrosswordCell
                                    key={`${rIndex}-${cIndex}`}
                                    cellData={cell}
                                    rIndex={rIndex}
                                    cIndex={cIndex}
                                    value={userInput[rIndex][cIndex]}
                                    feedback={feedback[rIndex][cIndex]}
                                    isActive={activeCell?.row === rIndex && activeCell?.col === cIndex}
                                    onCellClick={handleCellClick}
                                    onInputChange={handleInputChange}
                                    inputRef={el => {
                                        if (!inputRefs.current[rIndex]) inputRefs.current[rIndex] = [];
                                        inputRefs.current[rIndex][cIndex] = el;
                                    }}
                                />
                            ))
                        )}
                    </div>
                     <button onClick={handleCheckAnswers} className="mt-4 w-full bg-aurora-purple/80 hover:bg-aurora-purple text-white font-bold py-2 px-4 rounded-full transition-colors duration-300">
                        Check Answers
                    </button>
                </div>

                {/* Clues */}
                <div className="flex-grow grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 text-sm w-full">
                    <div>
                        <h3 className="font-bold text-lg mb-2 text-aurora-dark-text/80">Across</h3>
                        <ul className="space-y-1 list-inside">
                            {clues.across.map((clue, i) => <li key={`a-${i}`}>{clue}</li>)}
                        </ul>
                    </div>
                     <div>
                        <h3 className="font-bold text-lg mb-2 text-aurora-dark-text/80">Down</h3>
                        <ul className="space-y-1 list-inside">
                             {clues.down.map((clue, i) => <li key={`d-${i}`}>{clue}</li>)}
                        </ul>
                    </div>
                </div>
            </div>
        </PuzzleContainer>
    );
};

export default CrosswordPuzzle;