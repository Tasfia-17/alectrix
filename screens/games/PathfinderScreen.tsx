import React, { useState, useEffect } from 'react';
import { AvatarData } from '../../App';
import RoastingAvatar from '../../components/common/RoastingAvatar';

interface PathfinderScreenProps {
  avatar: AvatarData;
  onBack: () => void;
  onComplete: () => void;
}

const mazes = [
    [
        'S.##.',
        '..#..',
        '##.#.',
        '.#...',
        '.##.E',
    ],
    [
        'S.#..',
        '.#.#.',
        '.#.#.',
        '.#.#.',
        '..#.E',
    ],
    [
        'S....',
        '####.',
        '.....',
        '.####',
        '....E',
    ]
];

const PathfinderScreen: React.FC<PathfinderScreenProps> = ({ avatar, onBack, onComplete }) => {
    const [maze, setMaze] = useState<string[]>([]);
    const [path, setPath] = useState<string[]>([]);
    const [isComplete, setIsComplete] = useState(false);

    useEffect(() => {
        loadNewMaze();
    }, []);

    const loadNewMaze = () => {
        setMaze(mazes[Math.floor(Math.random() * mazes.length)]);
        setPath(['0,0']);
        setIsComplete(false);
    };

    const handleCellClick = (r: number, c: number) => {
        if (isComplete || maze[r]?.[c] === '#') return;

        const lastPos = path[path.length - 1].split(',').map(Number);
        const isAdjacent = Math.abs(r - lastPos[0]) + Math.abs(c - lastPos[1]) === 1;

        if (isAdjacent) {
            const newPos = `${r},${c}`;
            if (path.includes(newPos)) {
                // backtrack
                setPath(p => p.slice(0, p.indexOf(newPos) + 1));
            } else {
                setPath(p => [...p, newPos]);
            }
        }
    };
    
    useEffect(() => {
        const lastPos = path[path.length - 1];
        if(!lastPos) return;
        const [r, c] = lastPos.split(',').map(Number);
        if (maze[r]?.[c] === 'E') {
            setIsComplete(true);
            onComplete();
        }
    }, [path, maze, onComplete]);


  return (
    <div className="min-h-screen font-mono p-4 sm:p-6 flex flex-col items-center justify-between" 
         style={{ backgroundColor: '#2c3e50' }}
    >
      <RoastingAvatar avatar={avatar} text="A maze. How fitting. Let's see if you can find your way out of this one." />
      
      <div className="flex flex-col items-center justify-center my-4">
        <div className="bg-pixel-purple-dark border-4 border-pixel-black p-2" style={{ boxShadow: '4px 4px 0 #000' }}>
            {maze.map((row, r) => (
                <div key={r} className="flex">
                    {row.split('').map((cell, c) => {
                        const isPath = path.includes(`${r},${c}`);
                        let bgColor = 'bg-pixel-purple-mid';
                        if (isPath) bgColor = 'bg-pixel-yellow';
                        if (cell === '#') bgColor = 'bg-pixel-black';

                        return (
                            <div key={c} onClick={() => handleCellClick(r, c)} className={`w-12 h-12 sm:w-14 sm:h-14 border border-pixel-black/20 flex items-center justify-center ${bgColor} cursor-pointer`}>
                                {cell === 'S' && <span className="text-2xl">🏁</span>}
                                {cell === 'E' && <span className="text-2xl">🏆</span>}
                            </div>
                        )
                    })}
                </div>
            ))}
        </div>
        {isComplete && <p className="text-pixel-yellow mt-4 text-xl animate-fade-in">Path Found!</p>}
      </div>
      
      <div className="w-full max-w-sm grid grid-cols-2 gap-4">
        <button onClick={loadNewMaze} className="bg-pixel-yellow text-deep-sienna font-bold py-3 border-2 border-pixel-black transform active:translate-y-1" style={{ boxShadow: '4px 4px 0 #000' }}>
            New Maze
        </button>
        <button onClick={onBack} className="bg-pixel-purple-light/80 text-white font-bold py-3 border-2 border-pixel-black transform active:translate-y-1" style={{ boxShadow: '4px 4px 0 #000' }}>
          Back to Hub
        </button>
      </div>
    </div>
  );
};

export default PathfinderScreen;
