import React, { useState, useEffect } from 'react';
import LandingScreen from './screens/LandingScreen';
import AvatarSelectionScreen from './screens/AvatarSelectionScreen';
import IntroductionScreen from './screens/IntroductionScreen';
import HubScreen from './screens/HubScreen';
import ToDoListScreen, { Task } from './screens/ToDoListScreen';
import { Glitchy } from './components/avatars';
import { getHistory, addHistoryEvent, HistoryEvent } from './lib/history';

// Level Screens
import Level1Screen from './screens/levels/Level1Screen';
import Level2Screen from './screens/levels/Level2Screen';
import Level3Screen from './screens/levels/Level3Screen';
import Level4Screen from './screens/levels/Level4Screen';
import Level5Screen from './screens/levels/Level5Screen';

// Game Screens
import GameHubScreen from './screens/games/GameHubScreen';
import MindfulMeadowScreen from './screens/games/MindfulMeadowScreen';
import GratitudeGardenScreen from './screens/games/GratitudeGardenScreen';
import ThoughtValidatorScreen from './screens/games/ThoughtValidatorScreen';
import QuestLogScreen from './screens/games/QuestLogScreen';
import PathfinderScreen from './screens/games/PathfinderScreen';
import MoodJournalScreen from './screens/games/MoodJournalScreen';


// Feature Screens
import MusicPlayerScreen from './screens/MusicPlayerScreen';
import MoodBoardScreen from './screens/MoodBoardScreen';
import HistoryScreen from './screens/HistoryScreen';
import KnowledgeMapScreen from './screens/KnowledgeMapScreen';
import NoteTakerScreen from './screens/NoteTakerScreen';
import FlashcardScreen from './screens/FlashcardScreen';

type Screen = 
  | 'landing' 
  | 'avatarSelection' 
  | 'introduction' 
  | 'hub'
  | 'toDoList'
  | 'level'
  | 'gameHub'
  | 'mindfulMeadow'
  | 'gratitudeGarden'
  | 'thoughtValidator'
  | 'questLog'
  | 'pathfinder'
  | 'moodJournal'
  | 'music'
  | 'moodBoard'
  | 'history'
  | 'knowledgeMap'
  | 'noteTaker'
  | 'flashcards';

export interface AvatarData {
  name: string;
  component: React.FC;
  story: string;
}

const levelScreens = [Level1Screen, Level2Screen, Level3Screen, Level4Screen, Level5Screen, Level1Screen, Level1Screen, Level1Screen]; // Added dummy screens for more tasks
const TASKS_KEY = 'alectrix_tasks';

const initialTasks: Task[] = [
  { id: 1, text: "Ascend Math Mountain", completed: false },
  { id: 2, text: "Mine the Code Caverns", completed: false },
  { id: 3, text: "Uncover Temple Secrets", completed: false },
  { id: 4, text: "Rehearse on the Big Stage", completed: false },
  { id: 5, text: "Chip Away at the Writer's Block", completed: false },
];

const App: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<Screen>('landing');
  const [selectedAvatar, setSelectedAvatar] = useState<AvatarData>({ 
    name: 'Glitchy', 
    component: Glitchy, 
    story: "Found in a corrupted file from 1998, Glitchy has seen more blue screens of death than you've had hot dinners. It communicates in cryptic error messages and judges your questionable browser history. Its purr sounds suspiciously like a dial-up modem." 
  });
  const [activeTask, setActiveTask] = useState<Task | null>(null);
  const [userHistory, setUserHistory] = useState<HistoryEvent[]>(getHistory());
  const [notes, setNotes] = useState<string>('');
  const [tasks, setTasks] = useState<Task[]>(() => {
      try {
        const savedTasks = localStorage.getItem(TASKS_KEY);
        return savedTasks ? JSON.parse(savedTasks) : initialTasks;
      } catch {
        return initialTasks;
      }
  });

  useEffect(() => {
    localStorage.setItem(TASKS_KEY, JSON.stringify(tasks));
  }, [tasks]);

  const logEvent = (type: HistoryEvent['type'], detail: string) => {
    const newHistory = addHistoryEvent({ type, detail });
    setUserHistory(newHistory);
  };
  
  const handleAddTask = (text: string) => {
    if (tasks.length >= 8) { // Max 8 tasks to match level positions
        // Optionally, provide feedback to the user that the list is full.
        console.warn("Task list is full.");
        return;
    }
    const newTask: Task = {
        id: Date.now(),
        text: text,
        completed: false,
    };
    setTasks(prevTasks => [...prevTasks, newTask]);
    logEvent('task_add', text);
  };

  const navigateTo = (screen: Screen) => setCurrentScreen(screen);

  const handleAvatarSelected = (avatar: AvatarData) => {
    setSelectedAvatar(avatar);
    navigateTo('introduction');
  };
  
  const handleTaskSelect = (task: Task) => {
    setActiveTask(task);
    navigateTo('level');
  };

  const handleTaskComplete = (task: Task, reflection?: string) => {
    const detail = reflection ? `${task.text} | Reflection: ${reflection}` : task.text;
    logEvent('task_complete', detail);
    setTasks(prevTasks => prevTasks.map(t => t.id === task.id ? { ...t, completed: true } : t));
    navigateTo('toDoList');
  }

  const renderScreen = () => {
    switch (currentScreen) {
      case 'landing':
        return <LandingScreen onStart={() => navigateTo('avatarSelection')} />;
      case 'avatarSelection':
        return <AvatarSelectionScreen onAvatarSelect={handleAvatarSelected} />;
      case 'introduction':
        return <IntroductionScreen avatar={selectedAvatar} onComplete={() => navigateTo('hub')} />;
      case 'hub':
        return <HubScreen avatar={selectedAvatar} onNavigate={navigateTo} />;
      case 'toDoList':
        return <ToDoListScreen avatar={selectedAvatar} tasks={tasks} onTaskSelect={handleTaskSelect} onAddTask={handleAddTask} onBack={() => navigateTo('hub')} />;
      case 'level':
        if (activeTask) {
          const taskIndex = tasks.findIndex(t => t.id === activeTask.id);
          const LevelComponent = levelScreens[taskIndex % levelScreens.length]; // Use modulo to prevent out-of-bounds
          return <LevelComponent 
                    task={activeTask} 
                    avatar={selectedAvatar} 
                    onComplete={(reflection?: string) => handleTaskComplete(activeTask, reflection)} 
                 />;
        }
        return <HubScreen avatar={selectedAvatar} onNavigate={navigateTo} />; // Fallback
      
      // Game Hub and Games
      case 'gameHub':
        return <GameHubScreen onNavigate={navigateTo} onBack={() => navigateTo('hub')} />;
      case 'mindfulMeadow':
        return <MindfulMeadowScreen avatar={selectedAvatar} onBack={() => navigateTo('gameHub')} onComplete={() => logEvent('game_played', 'Mindful Meadow')} />;
      case 'gratitudeGarden':
        return <GratitudeGardenScreen avatar={selectedAvatar} onBack={() => navigateTo('gameHub')} onComplete={(gratitude) => logEvent('game_played', `Planted in Gratitude Garden: ${gratitude}`)} />;
      case 'thoughtValidator':
        return <ThoughtValidatorScreen avatar={selectedAvatar} onBack={() => navigateTo('gameHub')} onComplete={(thought) => logEvent('game_played', `Validated a thought: ${thought}`)} />;
      case 'questLog':
        return <QuestLogScreen avatar={selectedAvatar} onBack={() => navigateTo('gameHub')} onComplete={(quest) => logEvent('game_played', `Completed quest: ${quest}`)} />;
      case 'pathfinder':
        return <PathfinderScreen avatar={selectedAvatar} onBack={() => navigateTo('gameHub')} onComplete={() => logEvent('game_played', 'Pathfinder')} />;
      case 'moodJournal':
        return <MoodJournalScreen avatar={selectedAvatar} onBack={() => navigateTo('gameHub')} onComplete={(mood) => logEvent('game_played', `Logged mood: ${mood}`)} />;

      // Other Features
      case 'music':
        return <MusicPlayerScreen onBack={() => navigateTo('hub')} />;
      case 'moodBoard':
        return <MoodBoardScreen avatar={selectedAvatar} onBack={() => navigateTo('hub')} />;
      case 'history':
        return <HistoryScreen history={userHistory} onBack={() => navigateTo('hub')} />;
      case 'knowledgeMap':
        return <KnowledgeMapScreen avatar={selectedAvatar} notes={notes} setNotes={setNotes} onBack={() => navigateTo('hub')} />;
      case 'noteTaker':
        return <NoteTakerScreen avatar={selectedAvatar} notes={notes} setNotes={setNotes} onGenerateFlashcards={() => navigateTo('flashcards')} onBack={() => navigateTo('hub')} />;
      case 'flashcards':
        return <FlashcardScreen avatar={selectedAvatar} notes={notes} onBack={() => navigateTo('hub')} />;
        
      default:
        return <LandingScreen onStart={() => navigateTo('avatarSelection')} />;
    }
  };

  return <>{renderScreen()}</>;
};

export default App;