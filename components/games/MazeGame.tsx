import React, { useState, useEffect, useRef, useCallback } from 'react';
import { LevelData } from '../../lib/gemini';
import { CustomAssets } from '../../App';
import BackButton from '../common/BackButton';

interface Vector2 { x: number; y: number; }

interface GameProps {
  levelData: LevelData;
  customAssets: CustomAssets;
  onBackToEditor: () => void;
  onPlayAgain: () => void;
}

// --- CONSTANTS ---
const PLAYER_SIZE = { width: 4, height: 4 }; // in %
const MOVE_SPEED = 0.5;

// --- HELPER HOOK for game loop ---
const useGameLoop = (callback: () => void) => {
    const requestRef = useRef<number>();
    const loop = () => {
        callback();
        requestRef.current = requestAnimationFrame(loop);
    };
    useEffect(() => {
        requestRef.current = requestAnimationFrame(loop);
        return () => {
            if (requestRef.current) cancelAnimationFrame(requestRef.current);
        };
    }, [callback]);
};

// --- MAIN COMPONENT ---
const MazeGame: React.FC<GameProps> = ({ levelData, customAssets, onBackToEditor, onPlayAgain }) => {
    const [playerPos, setPlayerPos] = useState<Vector2>({ x: levelData.playerStart.x, y: levelData.playerStart.y });
    const inputRef = useRef({ up: false, down: false, left: false, right: false });
    const [hasWon, setHasWon] = useState(false);

    const checkCollision = (pos: Vector2) => {
        const playerRect = { ...pos, ...PLAYER_SIZE };
        for (const wall of levelData.platforms) {
            if (playerRect.x < wall.x + wall.width &&
                playerRect.x + playerRect.width > wall.x &&
                playerRect.y < wall.y + wall.height &&
                playerRect.y + playerRect.height > wall.y) {
                return true;
            }
        }
        for (const hazard of levelData.hazards) {
            if (playerRect.x < hazard.x + hazard.width &&
                playerRect.x + playerRect.width > hazard.x &&
                playerRect.y < hazard.y + hazard.height &&
                playerRect.y + playerRect.height > hazard.y) {
                onPlayAgain(); // Reset via remount
                return true;
            }
        }
        return false;
    };

    const gameLogic = useCallback(() => {
        if (hasWon) return;

        let newPos = { ...playerPos };

        if (inputRef.current.up) newPos.y -= MOVE_SPEED;
        if (inputRef.current.down) newPos.y += MOVE_SPEED;
        if (inputRef.current.left) newPos.x -= MOVE_SPEED;
        if (inputRef.current.right) newPos.x += MOVE_SPEED;

        // Boundary checks
        if (newPos.x < 0) newPos.x = 0;
        if (newPos.x + PLAYER_SIZE.width > 100) newPos.x = 100 - PLAYER_SIZE.width;
        if (newPos.y < 0) newPos.y = 0;
        if (newPos.y + PLAYER_SIZE.height > 100) newPos.y = 100 - PLAYER_SIZE.height;

        if (!checkCollision(newPos)) {
            setPlayerPos(newPos);
        }

        // Goal Check
        const playerRect = { ...newPos, ...PLAYER_SIZE };
        for (const goal of levelData.goals) {
            const goalRect = { x: goal.x - 1, y: goal.y - 1, width: 2, height: 2 };
            if (playerRect.x < goalRect.x + goalRect.width &&
                playerRect.x + playerRect.width > goalRect.x &&
                playerRect.y < goalRect.y + goalRect.height &&
                playerRect.y + playerRect.height > goalRect.y) {
                setHasWon(true);
            }
        }
    }, [playerPos, hasWon, levelData, onPlayAgain]);

    useGameLoop(gameLogic);

    const handleInput = (key: 'up' | 'down' | 'left' | 'right', value: boolean) => {
        inputRef.current = { ...inputRef.current, [key]: value };
    };

    return (
      <div className="h-screen w-full bg-sky-100 flex flex-col items-center justify-center font-sans select-none touch-manipulation p-4 relative">
        <BackButton onClick={onBackToEditor} />
        <div className="w-full max-w-4xl aspect-video bg-white shadow-2xl border-4 border-slate-300 relative overflow-hidden rounded-lg">
          {/* Render Walls */}
          {levelData.platforms.map((p, i) => (
            <div key={`p-${i}`} className="absolute bg-slate-500" style={{ left: `${p.x}%`, top: `${p.y}%`, width: `${p.width}%`, height: `${p.height}%` }} />
          ))}
           {/* Render Hazards */}
           {levelData.hazards.map((h, i) => customAssets.hazard ? (
              <img key={`h-img-${i}`} src={customAssets.hazard} className="absolute object-contain" style={{ left: `${h.x}%`, top: `${h.y}%`, width: `${h.width}%`, height: `${h.height}%` }} alt="Hazard" />
            ) : (
                <div key={`h-div-${i}`} className="absolute bg-red-400" style={{ left: `${h.x}%`, top: `${h.y}%`, width: `${h.width}%`, height: `${h.height}%` }} />
            ))}
          {/* Render Goal */}
          {levelData.goals.map((g, i) => customAssets.goal ? (
                <img key={`g-img-${i}`} src={customAssets.goal} className="absolute object-contain" style={{ left: `${g.x}%`, top: `${g.y}%`, width: '4%', height: '4%', transform: 'translate(-50%, -50%)' }} alt="Goal" />
            ) : (
                <div key={`g-div-${i}`} className="absolute text-blue-500 text-3xl" style={{ left: `${g.x}%`, top: `${g.y}%`, transform: 'translate(-50%, -50%)' }}>★</div>
          ))}
          {/* Render Player */}
           {customAssets.player ? (
                <img src={customAssets.player} className="absolute object-contain" style={{ left: `${playerPos.x}%`, top: `${playerPos.y}%`, width: `${PLAYER_SIZE.width}%`, height: `${PLAYER_SIZE.height}%` }} alt="Player" />
            ) : (
                <div className="absolute bg-emerald-400 rounded-full" style={{ left: `${playerPos.x}%`, top: `${playerPos.y}%`, width: `${PLAYER_SIZE.width}%`, height: `${PLAYER_SIZE.height}%` }} />
            )}
          
          {hasWon && (
              <div className="absolute inset-0 bg-white/80 flex flex-col items-center justify-center z-10">
                  <h2 className="font-display text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-orange-400 to-yellow-400 animate-pulse">YOU WON!</h2>
                  <button onClick={onPlayAgain} className="mt-8 px-5 py-2 bg-slate-100 text-slate-800 font-semibold rounded-lg shadow-lg">Play Again</button>
              </div>
          )}
        </div>
        
        {/* UI and Controls */}
        <div className="w-full max-w-4xl mt-2 flex justify-center items-center px-2">
            <div className="grid grid-cols-3 gap-2 w-40 h-40">
                <div />
                <button onMouseDown={() => handleInput('up', true)} onMouseUp={() => handleInput('up', false)} onTouchStart={() => handleInput('up', true)} onTouchEnd={() => handleInput('up', false)} className="bg-emerald-400 text-white text-3xl rounded-lg shadow-lg active:bg-emerald-500">▲</button>
                <div />
                <button onMouseDown={() => handleInput('left', true)} onMouseUp={() => handleInput('left', false)} onTouchStart={() => handleInput('left', true)} onTouchEnd={() => handleInput('left', false)} className="bg-emerald-400 text-white text-3xl rounded-lg shadow-lg active:bg-emerald-500">◀</button>
                <div />
                <button onMouseDown={() => handleInput('right', true)} onMouseUp={() => handleInput('right', false)} onTouchStart={() => handleInput('right', true)} onTouchEnd={() => handleInput('right', false)} className="bg-emerald-400 text-white text-3xl rounded-lg shadow-lg active:bg-emerald-500">▶</button>
                <div />
                <button onMouseDown={() => handleInput('down', true)} onMouseUp={() => handleInput('down', false)} onTouchStart={() => handleInput('down', true)} onTouchEnd={() => handleInput('down', false)} className="bg-emerald-400 text-white text-3xl rounded-lg shadow-lg active:bg-emerald-500">▼</button>
                <div />
            </div>
        </div>
      </div>
    );
};

export default MazeGame;