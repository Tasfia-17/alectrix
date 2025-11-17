import React, { useState, useEffect, useRef, useCallback } from 'react';
import { LevelData } from '../../lib/gemini';
import { CustomAssets } from '../../App';
import BackButton from '../common/BackButton';

// --- TYPE DEFINITIONS ---
interface Vector2 { x: number; y: number; }
interface MovingPlatform extends GameObject {
    moveType: 'horizontal' | 'vertical';
    moveRange: number;
}
interface GameObject { x: number; y: number; width: number; height: number; }


interface GameProps {
  levelData: LevelData;
  customAssets: CustomAssets;
  onBackToEditor: () => void;
  onPlayAgain: () => void;
}

// --- CONSTANTS ---
const PLAYER_SIZE = { width: 3, height: 5 }; // in %
const GRAVITY = 0.08;
const JUMP_FORCE = -2.0;
const MOVE_SPEED = 0.6;
const MAX_FALL_SPEED = 2.5;
const FRICTION = 0.85;

// --- HELPER HOOK for game loop ---
const useGameLoop = (callback: (deltaTime: number, time: number) => void) => {
    const requestRef = useRef<number>();
    const previousTimeRef = useRef<number>();

    const loop = (time: number) => {
        if (previousTimeRef.current !== undefined) {
            const deltaTime = time - previousTimeRef.current;
            callback(deltaTime, time);
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

// --- HELPER FUNCTION for moving platforms ---
const getMovingPlatformPosition = (platform: MovingPlatform, time: number): Vector2 => {
    const speed = 0.0005; // Controls speed of oscillation
    const oscillation = (Math.sin(time * speed) + 1) / 2; // Moves between 0 and 1
    const newPos = { x: platform.x, y: platform.y };
    if (platform.moveType === 'horizontal') {
        newPos.x = platform.x + platform.moveRange * oscillation;
    } else {
        newPos.y = platform.y + platform.moveRange * oscillation;
    }
    return newPos;
}

// --- MAIN COMPONENT ---
const PlatformerGame: React.FC<GameProps> = ({ levelData, customAssets, onBackToEditor, onPlayAgain }) => {
    const gameContainerRef = useRef<HTMLDivElement>(null);
    const [playerPos, setPlayerPos] = useState<Vector2>({ x: levelData.playerStart.x, y: levelData.playerStart.y });
    const playerVelRef = useRef<Vector2>({ x: 0, y: 0 });
    const [isOnGround, setIsOnGround] = useState(false);
    const [collectedGoals, setCollectedGoals] = useState<boolean[]>(new Array(levelData.goals.length).fill(false));
    const inputRef = useRef({ left: false, right: false, jump: false });
    
    const goalsLeft = collectedGoals.filter(g => !g).length;
    const hasWon = levelData.goals.length > 0 && goalsLeft === 0;

    const gameLogic = useCallback((deltaTime: number, time: number) => {
        if (hasWon) return;

        let newVel = { ...playerVelRef.current };
        let newPos = { ...playerPos };
        const prevPos = { ...playerPos };
        
        const prevTime = time - deltaTime;


        // Horizontal Movement
        if (inputRef.current.left) newVel.x = -MOVE_SPEED;
        if (inputRef.current.right) newVel.x = MOVE_SPEED;
        newVel.x *= FRICTION; // Apply friction

        // Vertical Movement (Gravity)
        newVel.y += GRAVITY;
        if (newVel.y > MAX_FALL_SPEED) newVel.y = MAX_FALL_SPEED;

        // Jumping
        if (inputRef.current.jump && isOnGround) {
            newVel.y = JUMP_FORCE;
        }

        // Update Position based on velocity
        newPos.x += newVel.x;
        newPos.y += newVel.y;
        
        // --- Collision Detection ---
        let onGround = false;

        // Boundary checks
        if (newPos.x < 0) newPos.x = 0;
        if (newPos.x + PLAYER_SIZE.width > 100) newPos.x = 100 - PLAYER_SIZE.width;
        if (newPos.y > 150) {
            onPlayAgain();
            return;
        };

        const playerRect = { ...newPos, ...PLAYER_SIZE };
        
        // Static Platforms
        levelData.platforms.forEach(p => {
            if (playerRect.x < p.x + p.width && playerRect.x + playerRect.width > p.x &&
                playerRect.y < p.y + p.height && playerRect.y + playerRect.height > p.y) {
                
                const prevPlayerBottom = prevPos.y + PLAYER_SIZE.height;
                if (prevPlayerBottom <= p.y + 1 && newVel.y >= 0) { // Landing on top
                    newPos.y = p.y - PLAYER_SIZE.height;
                    newVel.y = 0;
                    onGround = true;
                }
                else { // Side collision
                    newVel.x = 0;
                    if(prevPos.x < p.x) newPos.x = p.x - PLAYER_SIZE.width;
                    else newPos.x = p.x + p.width;
                }
            }
        });

        // Moving Platforms
        levelData.movingPlatforms?.forEach(mp => {
            const currentPlatformPos = getMovingPlatformPosition(mp, time);
            const platformRect = { ...currentPlatformPos, width: mp.width, height: mp.height };

            if (playerRect.x < platformRect.x + platformRect.width && playerRect.x + playerRect.width > platformRect.x &&
                playerRect.y < platformRect.y + platformRect.height && playerRect.y + playerRect.height > platformRect.y) {
                
                const prevPlayerBottom = prevPos.y + PLAYER_SIZE.height;
                const prevPlatformPos = getMovingPlatformPosition(mp, prevTime);

                if (prevPlayerBottom <= prevPlatformPos.y + 1 && newVel.y >= 0) { // Landing on top
                    newPos.y = platformRect.y - PLAYER_SIZE.height;
                    newVel.y = 0;
                    onGround = true;
                    // Sticking logic
                    const deltaX = currentPlatformPos.x - prevPlatformPos.x;
                    const deltaY = currentPlatformPos.y - prevPlatformPos.y;
                    newPos.x += deltaX;
                    newPos.y += deltaY;
                } else { // Side collision
                    newVel.x = 0;
                    if (prevPos.x < mp.x) newPos.x = platformRect.x - PLAYER_SIZE.width;
                    else newPos.x = platformRect.x + mp.width;
                }
            }
        });
        
        // Hazards
        levelData.hazards.forEach(h => {
             if (playerRect.x < h.x + h.width && playerRect.x + playerRect.width > h.x &&
                playerRect.y < h.y + h.height && playerRect.y + playerRect.height > h.y) {
                    onPlayAgain(); // Reset via remount
                }
        });
        
        // Goals
        const newCollected = [...collectedGoals];
        levelData.goals.forEach((goal, i) => {
            if (!newCollected[i]) {
                const goalRect = { x: goal.x - 1.5, y: goal.y - 1.5, width: 3, height: 3 }; // 3x3 goal area
                if (playerRect.x < goalRect.x + goalRect.width && playerRect.x + playerRect.width > goalRect.x &&
                    playerRect.y < goalRect.y + goalRect.height && playerRect.y + playerRect.height > goalRect.y) {
                    newCollected[i] = true;
                }
            }
        });

        // Update State
        setPlayerPos(newPos);
        playerVelRef.current = newVel;
        setIsOnGround(onGround);
        if(JSON.stringify(collectedGoals) !== JSON.stringify(newCollected)) {
            setCollectedGoals(newCollected);
        }
    }, [hasWon, collectedGoals, levelData, onPlayAgain, playerPos, isOnGround]);

    useGameLoop(gameLogic);

    const handleInput = (key: 'left' | 'right' | 'jump', value: boolean) => {
        inputRef.current = ({ ...inputRef.current, [key]: value });
    };

    return (
      <div className="h-screen w-full bg-sky-100 flex flex-col items-center justify-center font-sans select-none touch-manipulation p-4 relative">
        <BackButton onClick={onBackToEditor} />
        <div className="w-full max-w-4xl aspect-video bg-white shadow-2xl border-4 border-slate-300 relative overflow-hidden rounded-lg">
          {/* Render Platforms */}
          {levelData.platforms.map((p, i) => (
            <div key={`p-${i}`} className="absolute bg-slate-500" style={{ left: `${p.x}%`, top: `${p.y}%`, width: `${p.width}%`, height: `${p.height}%` }} />
          ))}
          {/* Render Moving Platforms */}
          {levelData.movingPlatforms?.map((p, i) => {
              const time = performance.now();
              const currentPos = getMovingPlatformPosition(p, time);
              return <div key={`mp-${i}`} className="absolute bg-purple-400" style={{ left: `${currentPos.x}%`, top: `${currentPos.y}%`, width: `${p.width}%`, height: `${p.height}%` }} />
          })}
          {/* Render Hazards */}
          {levelData.hazards.map((h, i) => customAssets.hazard ? (
              <img key={`h-img-${i}`} src={customAssets.hazard} className="absolute object-contain" style={{ left: `${h.x}%`, top: `${h.y}%`, width: `${h.width}%`, height: `${h.height}%` }} alt="Hazard" />
          ) : (
            <div key={`h-div-${i}`} className="absolute bg-red-400" style={{ left: `${h.x}%`, top: `${h.y}%`, width: `${h.width}%`, height: `${h.height}%` }} />
          ))}
          {/* Render Goals */}
           {levelData.goals.map((g, i) => !collectedGoals[i] && ( customAssets.goal ? (
                <img key={`g-img-${i}`} src={customAssets.goal} className="absolute object-contain" style={{ left: `${g.x}%`, top: `${g.y}%`, width: '3%', height: '3%', transform: 'translate(-50%, -50%)' }} alt="Goal" />
            ) : (
                <div key={`g-div-${i}`} className="absolute text-blue-500 text-3xl" style={{ left: `${g.x}%`, top: `${g.y}%`, transform: 'translate(-50%, -50%)' }}>★</div>
           )))}
          {/* Render Player */}
          {customAssets.player ? (
            <img src={customAssets.player} className="absolute object-contain" style={{ left: `${playerPos.x}%`, top: `${playerPos.y}%`, width: `${PLAYER_SIZE.width}%`, height: `${PLAYER_SIZE.height}%` }} alt="Player" />
          ) : (
            <div className="absolute bg-emerald-400" style={{ left: `${playerPos.x}%`, top: `${playerPos.y}%`, width: `${PLAYER_SIZE.width}%`, height: `${PLAYER_SIZE.height}%` }} />
          )}
          
          {hasWon && (
              <div className="absolute inset-0 bg-white/80 flex flex-col items-center justify-center z-10">
                  <h2 className="font-display text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-orange-400 to-yellow-400 animate-pulse">YOU WON!</h2>
                  <button onClick={onPlayAgain} className="mt-8 px-5 py-2 bg-slate-100 text-slate-800 font-semibold rounded-lg shadow-lg">Play Again</button>
              </div>
          )}
        </div>
        
        {/* UI and Controls */}
        <div className="w-full max-w-4xl mt-4 flex justify-between items-center px-2">
            <div className="flex gap-2">
                <button onMouseDown={() => handleInput('left', true)} onMouseUp={() => handleInput('left', false)} onTouchStart={() => handleInput('left', true)} onTouchEnd={() => handleInput('left', false)} className="w-14 h-14 bg-emerald-400 text-white text-3xl rounded-full shadow-lg active:bg-emerald-500 active:transform active:translate-y-0.5">◀</button>
                <button onMouseDown={() => handleInput('right', true)} onMouseUp={() => handleInput('right', false)} onTouchStart={() => handleInput('right', true)} onTouchEnd={() => handleInput('right', false)} className="w-14 h-14 bg-emerald-400 text-white text-3xl rounded-full shadow-lg active:bg-emerald-500 active:transform active:translate-y-0.5">▶</button>
            </div>
            
            <div className="bg-white/80 px-4 py-2 rounded-lg shadow-md text-center">
                <div className="text-lg font-bold text-slate-700">{goalsLeft}</div>
                <div className="text-xs text-slate-500">GOALS LEFT</div>
            </div>

            <button onMouseDown={() => handleInput('jump', true)} onMouseUp={() => handleInput('jump', false)} onTouchStart={() => handleInput('jump', true)} onTouchEnd={() => handleInput('jump', false)} className="w-16 h-16 bg-emerald-400 text-white text-xl font-bold rounded-full shadow-lg active:bg-emerald-500 active:transform active:translate-y-0.5">JUMP</button>
        </div>
      </div>
    );
};

export default PlatformerGame;