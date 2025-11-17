import React, { useState } from 'react';
import { AvatarData } from '../App';
import RoastingAvatar from '../components/common/RoastingAvatar';

export interface Task {
  id: number;
  text: string;
  completed: boolean;
}

interface ToDoListScreenProps {
  avatar: AvatarData;
  tasks: Task[];
  onTaskSelect: (task: Task) => void;
  onAddTask: (text: string) => void;
  onBack: () => void;
}

const levelPositions = [
  { top: '20%', left: '15%' },
  { top: '40%', left: '40%' },
  { top: '30%', left: '75%' },
  { top: '55%', left: '85%' },
  { top: '65%', left: '60%' },
  { top: '80%', left: '80%' },
  { top: '90%', left: '50%' },
  { top: '75%', left: '25%' },
];


const ToDoListScreen: React.FC<ToDoListScreenProps> = ({ avatar, tasks, onTaskSelect, onAddTask, onBack }) => {
  const [newTaskText, setNewTaskText] = useState('');

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTaskText.trim()) {
      onAddTask(newTaskText.trim());
      setNewTaskText('');
    }
  };

  return (
    <div className="min-h-screen font-mono p-4 sm:p-6 flex flex-col items-center justify-between" 
         style={{
          backgroundColor: '#3a5941', // Dark green for land
          backgroundImage: `linear-gradient(to bottom, #a2d2ff 60%, #3a5941 60%)`, // Sky and land
        }}
    >
        <div className="w-full max-w-lg flex flex-col items-center">
           <RoastingAvatar avatar={avatar} text="Your 'epic quest'. Right. Try not to get lost on the way to Level 1." />
           <form onSubmit={handleAddTask} className="w-full flex gap-2 mt-4 max-w-sm">
             <input 
                type="text"
                value={newTaskText}
                onChange={(e) => setNewTaskText(e.target.value)}
                placeholder="Add another pointless task..."
                className="flex-grow bg-pixel-purple-dark text-pixel-purple-light p-2 border-2 border-pixel-black focus:outline-none focus:border-pixel-yellow placeholder:text-pixel-purple-light/50 text-sm"
             />
             <button type="submit" className="bg-pixel-yellow text-deep-sienna font-bold px-4 border-2 border-pixel-black transform active:translate-x-0.5 active:translate-y-0.5" style={{ boxShadow: '2px 2px 0px #000' }}>
                Add
             </button>
           </form>
        </div>
        
        <div className="w-full max-w-2xl flex-grow my-4 relative">
            {/* World Map Container */}
            <div className="absolute inset-0 overflow-hidden">
                {/* Path */}
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                    <path 
                        d="M 18 22 C 30 30, 35 40, 42 42 S 65 35, 77 32 C 80 40, 85 50, 87 57 S 80 65, 62 67 C 70 75, 75 80, 82 82 S 60 95, 52 92 C 40 88, 30 80, 27 77"
                        stroke="#a17a69" 
                        strokeWidth="2" 
                        fill="none" 
                        strokeDasharray="4 2"
                    />
                </svg>

                {/* Levels */}
                {tasks.slice(0, levelPositions.length).map((task, index) => (
                    <div 
                        key={task.id} 
                        className="absolute transform -translate-x-1/2 -translate-y-1/2"
                        style={{ ...levelPositions[index] }}
                    >
                        <button 
                            onClick={() => onTaskSelect(task)}
                            className="w-16 h-16 bg-pixel-purple-mid border-4 border-pixel-black rounded-full flex flex-col items-center justify-center text-white
                                       hover:bg-pixel-yellow hover:text-black transition-colors duration-200 group"
                        >
                            <span className="text-2xl font-bold">{index + 1}</span>
                            <span className="text-xs hidden group-hover:block absolute -bottom-6 bg-black/50 p-1 rounded max-w-[120px] truncate">{task.text}</span>
                        </button>
                        {task.completed && (
                            <div className="absolute -top-4 -right-4 text-3xl transform rotate-12 animate-fade-in">
                                🚩
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
      
        <div className="w-full max-w-lg flex flex-col items-center justify-end h-20">
            <button 
                onClick={onBack}
                className="w-full bg-pixel-yellow text-deep-sienna font-bold text-lg py-3 px-8 border-2 border-pixel-black 
                           transform active:translate-x-1 active:translate-y-1 transition-all duration-100 ease-in-out
                           hover:bg-yellow-300"
                style={{ boxShadow: '4px 4px 0px #000000' }}
                >
                Back to Hub
            </button>
        </div>
    </div>
  );
};

export default ToDoListScreen;