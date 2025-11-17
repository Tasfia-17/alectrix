import React from 'react';

const Character: React.FC<{ className?: string }> = ({ className }) => (
  <div className={`w-12 h-16 ${className}`}>
    <div className="w-full h-full bg-emerald-300 border-2 border-emerald-800/50 rounded-t-full rounded-b-lg" />
  </div>
);

const GoalFlag: React.FC = () => (
    <div className="absolute w-16 h-32 bottom-24 right-[10%]">
        <svg viewBox="0 0 60 120" className="w-full h-full">
            <line x1="10" y1="10" x2="10" y2="110" stroke="#6B7280" strokeWidth="3" />
            <path d="M 10 20 L 50 40 L 10 60 Z" fill="#6EE7B7" stroke="#047857" strokeWidth="2" />
        </svg>
    </div>
);

const GoalDemo: React.FC = () => {
  return (
    <div className="relative w-full h-full overflow-hidden bg-sky-100">
      {/* Platforms */}
      <div className="absolute bottom-10 left-[5%] w-[45%] h-4 bg-slate-400 border-b-4 border-slate-500 rounded-sm" />
      <div className="absolute bottom-10 right-[5%] w-[45%] h-4 bg-slate-400 border-b-4 border-slate-500 rounded-sm" />
      
      {/* Character */}
      <Character className="absolute bottom-[56px] left-[15%]" />
      
      {/* Goal Flag */}
      <GoalFlag />
    </div>
  );
};

export default GoalDemo;