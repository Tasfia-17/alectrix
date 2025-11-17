import React, { useRef, useEffect, useState } from 'react';
import BackButton from '../components/common/BackButton';

interface DrawingScreenProps {
  onGenerate: (drawingDataUrl: string) => void;
  error: string | null;
  onBack: () => void;
}

const COLORS = [
  { name: 'Platform / Wall', color: '#475569' }, // Dark Slate
  { name: 'Player Start', color: '#22C55E' },    // Green
  { name: 'Goal', color: '#3B82F6' },          // Blue
  { name: 'Hazard', color: '#EF4444' },        // Red
  { name: 'Moving Platform', color: '#A855F7' }, // Purple
];

const DrawingScreen: React.FC<DrawingScreenProps> = ({ onGenerate, error, onBack }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [activeColor, setActiveColor] = useState(COLORS[0].color);
  const [brushSize, setBrushSize] = useState(10);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const parent = canvas.parentElement;
    if(parent) {
      canvas.width = parent.clientWidth;
      canvas.height = parent.clientHeight;
    }
    canvas.style.width = '100%';
    canvas.style.height = '100%';

    const context = canvas.getContext('2d');
    if (!context) return;
    context.lineCap = 'round';
    context.lineJoin = 'round';
    contextRef.current = context;
    
    context.fillStyle = 'white';
    context.fillRect(0, 0, canvas.width, canvas.height);
  }, []);

  useEffect(() => {
    if (contextRef.current) {
        contextRef.current.strokeStyle = activeColor;
        contextRef.current.lineWidth = brushSize;
    }
  }, [activeColor, brushSize]);

  const startDrawing = ({ nativeEvent }: React.MouseEvent | React.TouchEvent) => {
    const { offsetX, offsetY } = getCoords(nativeEvent);
    contextRef.current?.beginPath();
    contextRef.current?.moveTo(offsetX, offsetY);
    setIsDrawing(true);
  };

  const finishDrawing = () => {
    contextRef.current?.closePath();
    setIsDrawing(false);
  };

  const draw = ({ nativeEvent }: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawing) return;
    const { offsetX, offsetY } = getCoords(nativeEvent);
    contextRef.current?.lineTo(offsetX, offsetY);
    contextRef.current?.stroke();
  };
  
  const getCoords = (event: MouseEvent | Touch) => {
    const canvas = canvasRef.current;
    if (!canvas) return { offsetX: 0, offsetY: 0};
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    const clientX = 'touches' in event ? event.touches[0].clientX : event.clientX;
    const clientY = 'touches' in event ? event.touches[0].clientY : event.clientY;

    return {
        offsetX: (clientX - rect.left) * scaleX,
        offsetY: (clientY - rect.top) * scaleY
    };
  }

  const handleGenerateClick = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const dataUrl = canvas.toDataURL('image/png');
      onGenerate(dataUrl);
    }
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const context = contextRef.current;
    if(canvas && context) {
        context.fillStyle = 'white';
        context.fillRect(0, 0, canvas.width, canvas.height);
    }
  }

  return (
    <div className="min-h-screen w-full bg-slate-100 flex flex-col font-sans text-slate-800 relative">
      <BackButton onClick={onBack} className="z-30" />
      <header className="w-full p-3 bg-white shadow-md z-20">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
            <div className="flex items-center gap-4 ml-16">
              <div>
                  <h1 className="text-lg font-bold text-slate-700">Draw Your Level</h1>
                  <p className="text-sm text-slate-500 hidden sm:block">Draw platforms for an obstacle course, or paths for a maze!</p>
              </div>
            </div>
            <button onClick={handleGenerateClick} className="px-5 py-2 bg-gradient-to-r from-cyan-300 to-blue-400 text-white font-semibold text-sm rounded-full shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300">
                Generate Game
            </button>
        </div>
      </header>

      <div className="flex-grow flex">
        <aside className="w-24 bg-white border-r border-slate-200 p-4 flex flex-col items-center gap-4">
          <h2 className="text-sm font-bold text-slate-600">Colors</h2>
          <div className="flex flex-col gap-2">
            {COLORS.map(({name, color}) => (
              <button
                key={color}
                title={name}
                onClick={() => setActiveColor(color)}
                className={`w-10 h-10 rounded-full border-4 transition-transform transform hover:scale-110 ${activeColor === color ? 'border-cyan-400' : 'border-white'}`}
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
          <button onClick={clearCanvas} className="mt-auto text-slate-500 hover:text-red-500" title="Clear Canvas">
             <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
          </button>
        </aside>
        
        <main className="flex-grow h-[calc(100vh-68px)] relative p-4 bg-slate-200">
          {error && <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg shadow-lg z-10"><p>{error}</p></div>}
          <div className="w-full h-full bg-white shadow-inner border border-slate-300">
            <canvas
              ref={canvasRef}
              onMouseDown={startDrawing}
              onMouseUp={finishDrawing}
              onMouseLeave={finishDrawing}
              onMouseMove={draw}
              onTouchStart={startDrawing}
              onTouchEnd={finishDrawing}
              onTouchMove={draw}
            />
          </div>
        </main>
      </div>
    </div>
  );
};

export default DrawingScreen;