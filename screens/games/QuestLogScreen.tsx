import React, { useState, useEffect } from 'react';
import { AvatarData } from '../../App';
import RoastingAvatar from '../../components/common/RoastingAvatar';

interface QuestLogScreenProps {
  avatar: AvatarData;
  onBack: () => void;
  onComplete: (quest: string) => void;
}

interface Quest {
    id: number;
    text: string;
    xp: number;
}

const allQuests: Quest[] = [
    { id: 1, text: "Drink a glass of water.", xp: 10 },
    { id: 2, text: "Stretch for one minute.", xp: 15 },
    { id: 3, text: "Step outside for 30 seconds.", xp: 20 },
    { id: 4, text: "Tidy one small thing.", xp: 15 },
    { id: 5, text: "Listen to one favorite song.", xp: 10 },
    { id: 6, text: "Write down one good thing.", xp: 20 },
    { id: 7, text: "Take 5 deep breaths.", xp: 10 },
];

const QUEST_LOG_KEY = 'alectrix_quest_log';

const QuestLogScreen: React.FC<QuestLogScreenProps> = ({ avatar, onBack, onComplete }) => {
    const [level, setLevel] = useState(1);
    const [xp, setXp] = useState(0);
    const [quests, setQuests] = useState<Quest[]>([]);
    const [completedQuests, setCompletedQuests] = useState<number[]>([]);

    const xpToNextLevel = level * 100;
    const xpProgress = (xp / xpToNextLevel) * 100;

    useEffect(() => {
        // Load saved data or initialize
        const savedData = localStorage.getItem(QUEST_LOG_KEY);
        if (savedData) {
            const { savedLevel, savedXp, savedQuests, savedCompleted, date } = JSON.parse(savedData);
            const today = new Date().toDateString();
            if (date === today) {
                setLevel(savedLevel);
                setXp(savedXp);
                setQuests(savedQuests);
                setCompletedQuests(savedCompleted);
            } else {
                initializeNewDay(savedLevel, savedXp);
            }
        } else {
            initializeNewDay(1, 0);
        }
    }, []);
    
    const initializeNewDay = (currentLevel: number, currentXp: number) => {
        const shuffled = [...allQuests].sort(() => 0.5 - Math.random());
        const newQuests = shuffled.slice(0, 3);
        setLevel(currentLevel);
        setXp(currentXp);
        setQuests(newQuests);
        setCompletedQuests([]);
        saveData(currentLevel, currentXp, newQuests, []);
    }

    const saveData = (level: number, xp: number, quests: Quest[], completed: number[]) => {
        const dataToSave = {
            savedLevel: level,
            savedXp: xp,
            savedQuests: quests,
            savedCompleted: completed,
            date: new Date().toDateString(),
        };
        localStorage.setItem(QUEST_LOG_KEY, JSON.stringify(dataToSave));
    };

    const completeQuest = (quest: Quest) => {
        if (completedQuests.includes(quest.id)) return;
        
        let newXp = xp + quest.xp;
        let newLevel = level;
        
        if (newXp >= xpToNextLevel) {
            newLevel += 1;
            newXp -= xpToNextLevel;
        }

        setLevel(newLevel);
        setXp(newXp);
        
        const newCompleted = [...completedQuests, quest.id];
        setCompletedQuests(newCompleted);

        onComplete(quest.text);
        saveData(newLevel, newXp, quests, newCompleted);
    };

  return (
    <div className="min-h-screen font-mono p-4 sm:p-6 flex flex-col items-center justify-between" 
         style={{ backgroundColor: '#5E4534' }}
    >
      <RoastingAvatar avatar={avatar} text="Behold, your list of trivially easy tasks. Try not to strain yourself." />
      
      <div className="w-full max-w-md flex-grow my-4 bg-[#7D5A50] border-2 border-pixel-black p-4 flex flex-col" style={{ boxShadow: '6px 6px 0 #000' }}>
        <h2 className="text-3xl text-pixel-yellow text-center mb-2" style={{textShadow: '2px 2px 0 #000'}}>Daily Quest Log</h2>
        
        {/* Level and XP */}
        <div className="text-white mb-4">
            <div className="flex justify-between items-baseline">
                <span className="font-bold">Level {level}</span>
                <span className="text-xs">{xp} / {xpToNextLevel} XP</span>
            </div>
            <div className="w-full h-4 bg-pixel-purple-dark border-2 border-pixel-black mt-1">
                <div className="h-full bg-pixel-yellow" style={{width: `${xpProgress}%`}}></div>
            </div>
        </div>

        {/* Quests */}
        <div className="space-y-2">
            {quests.map(q => (
                <div key={q.id} className={`p-2 border border-black flex items-center justify-between transition-colors ${completedQuests.includes(q.id) ? 'bg-gray-500/50 text-gray-400' : 'bg-vintage-brown-light'}`}>
                    <div>
                        <p className={`font-bold ${completedQuests.includes(q.id) ? 'line-through' : ''}`}>{q.text}</p>
                        <p className="text-xs text-black/70">{q.xp} XP</p>
                    </div>
                    <button onClick={() => completeQuest(q)} disabled={completedQuests.includes(q.id)} className="bg-pixel-yellow text-black border-2 border-pixel-black px-3 py-1 font-bold disabled:opacity-30 disabled:cursor-not-allowed">
                        ✓
                    </button>
                </div>
            ))}
        </div>
      </div>
      
      <div className="w-full max-w-md">
        <button onClick={onBack} className="w-full bg-pixel-yellow text-deep-sienna font-bold text-lg py-3 border-2 border-pixel-black transform active:translate-y-1" style={{ boxShadow: '4px 4px 0 #000' }}>
          Back to Hub
        </button>
      </div>
    </div>
  );
};

export default QuestLogScreen;
