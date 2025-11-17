import React, { useState, useEffect, useRef, useCallback } from 'react';
import { LevelData } from '../../lib/gemini';
import { CustomAssets } from '../../App';
import BackButton from '../common/BackButton';

interface GameProps {
  levelData: LevelData;
  customAssets: CustomAssets;
  onBackToEditor: () => void;
  onPlayAgain: () => void;
}

interface Hazard {
  x: number;
  y: number;
  width: number;
  height: number;
  speed: number;
}

const PLAYER_SIZE = { width: 5, height: 5 };
const MOVE_SPEED = 1.2;
const GAME_DURATION = 30; // in seconds

const useGameLoop = (callback: (deltaTime: number) => void) => {
    const requestRef = useRef<number>();
    const previousTimeRef = useRef<number>();

    const loop = (time: number) => {
        if (previousTimeRef.current !== undefined) {
            const deltaTime = time - previousTimeRef.current;
            callback(deltaTime);
        }
        previousTimeRef.current = time;
        requestRef.current = requestAnimationFrame(loop);
    };

    useEffect(() => {
        requestRef.current = requestAnimationFrame(loop);
        return () => {
            if (requestRef.current) cancelAnimationFrame(requestRef.current);
        };
    }, [callback]);
};

const FallingDodgerGame: React.FC<GameProps> = ({ levelData, customAssets, onBackToEditor, onPlayAgain }) => {
  const [playerPos, setPlayerPos] = useState({ x: levelData.playerStart.x, y: 95 - PLAYER_SIZE.height });
  const [hazards, setHazards] = useState<Hazard[]>([]);
  const [timeLeft, setTimeLeft] = useState(GAME_DURATION);
  const inputRef = useRef({ left: false, right: false });
  const hasWon = timeLeft <= 0;
  const gameStartTimeRef = useRef<number | null>(null);

  useEffect(() => {
    // Initialize hazards with random speeds and starting positions
    const initialHazards = levelData.hazards.map(h => ({
      ...h,
      y: -h.height - (Math.random() * 100), // Start off-screen at random intervals
      speed: 0.2 + Math.random() * 0.3, // Random falling speed
    }));
    setHazards(initialHazards);
    gameStartTimeRef.current = performance.now();
  }, [levelData.hazards]);

  const gameLogic = useCallback((deltaTime: number) => {
    if (hasWon) return;

    // Update Timer
    const elapsedTime = (performance.now() - (gameStartTimeRef.current ?? 0)) / 1000;
    setTimeLeft(Math.max(0, GAME_DURATION - elapsedTime));

    // Player Movement
    setPlayerPos(prevPos => {
      let newX = prevPos.x;
      if (inputRef.current.left) newX -= MOVE_SPEED;
      if (inputRef.current.right) newX += MOVE_SPEED;

      // Boundary checks
      if (newX < 0) newX = 0;
      if (newX + PLAYER_SIZE.width > 100) newX = 100 - PLAYER_SIZE.width;
      return { ...prevPos, x: newX };
    });

    // Hazard Movement and Collision
    const playerRect = { ...playerPos, ...PLAYER_SIZE };
    setHazards(prevHazards => {
      const newHazards = prevHazards.map(h => {
        let newY = h.y + h.speed * (deltaTime / 16); // Normalize speed
        if (newY > 100) {
          // Reset hazard to the top when it goes off-screen
          newY = -h.height - (Math.random() * 50);
          h.x = Math.random() * (100 - h.width);
        }

        // Collision Check
        const hazardRect = { x: h.x, y: newY, width: h.width, height: h.height };
        if (playerRect.x < hazardRect.x + hazardRect.width &&
            playerRect.x + playerRect.width > hazardRect.x &&
            playerRect.y < hazardRect.y + hazardRect.height &&
            playerRect.y + PLAYER_SIZE.height > hazardRect.y) {
          onPlayAgain();
        }
        return { ...h, y: newY };
      });
      return newHazards;
    });
  }, [hasWon, playerPos, onPlayAgain]);

  useGameLoop(gameLogic);

  const handleInput = (key: 'left' | 'right', value: boolean) => {
    inputRef.current = { ...inputRef.current, [key]: value };
  };

  return (
    <div className="h-screen w-full bg-slate-800 flex flex-col items-center justify-center font-sans select-none touch-manipulation p-4 relative">
      <BackButton onClick={onBackToEditor} />
      <div className="w-full max-w-4xl aspect-video bg-slate-900 shadow-2xl border-4 border-sky-300/50 relative overflow-hidden rounded-lg">
        {/* Render Hazards */}
        {hazards.map((h, i) => customAssets.hazard ? (
             <img key={`h-img-${i}`} src={customAssets.hazard} className="absolute object-contain" style={{ left: `${h.x}%`, top: `${h.y}%`, width: `${h.width}%`, height: `${h.height}%` }} alt="Hazard" />
        ) : (
            <div key={`h-div-${i}`} className="absolute bg-red-400" style={{ left: `${h.x}%`, top: `${h.y}%`, width: `${h.width}%`, height: `${h.height}%` }} />
        ))}
        {/* Render Player */}
        {customAssets.player ? (
             <img src={customAssets.player} className="absolute object-contain" style={{ left: `${playerPos.x}%`, top: `${playerPos.y}%`, width: `${PLAYER_SIZE.width}%`, height: `${PLAYER_SIZE.height}%` }} alt="Player" />
        ) : (
            <div className="absolute bg-emerald-400" style={{ left: `${playerPos.x}%`, top: `${playerPos.y}%`, width: `${PLAYER_SIZE.width}%`, height: `${PLAYER_SIZE.height}%` }} />
        )}
        
        {hasWon && (
          <div className="absolute inset-0 bg-black/70 flex flex-col items-center justify-center z-10">
            <h2 className="font-display text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-300 via-cyan-300 to-green-300 animate-pulse">YOU SURVIVED!</h2>
            <button onClick={onPlayAgain} className="mt-8 px-5 py-2 bg-slate-700 text-white font-semibold rounded-lg shadow-lg">Play Again</button>
          </div>
        )}
      </div>

      <div className="w-full max-w-4xl mt-4 flex justify-between items-center px-2">
        <div className="flex gap-2">
          <button onMouseDown={() => handleInput('left', true)} onMouseUp={() => handleInput('left', false)} onTouchStart={() => handleInput('left', true)} onTouchEnd={() => handleInput('left', false)} className="w-20 h-14 bg-sky-400 text-white text-3xl rounded-lg shadow-lg active:bg-sky-500 active:transform active:translate-y-0.5">◀</button>
          <button onMouseDown={() => handleInput('right', true)} onMouseUp={() => handleInput('right', false)} onTouchStart={() => handleInput('right', true)} onTouchEnd={() => handleInput('right', false)} className="w-20 h-14 bg-sky-400 text-white text-3xl rounded-lg shadow-lg active:bg-sky-500 active:transform active:translate-y-0.5">▶</button>
        </div>
        
        <div className="bg-slate-700/80 px-4 py-2 rounded-lg shadow-md text-center">
            <div className="text-xl font-bold text-white">{Math.ceil(timeLeft)}</div>
            <div className="text-xs text-slate-300">SECONDS LEFT</div>
        </div>
      </div>
    </div>
  );
};

export default FallingDodgerGame;