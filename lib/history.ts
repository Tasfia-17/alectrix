export interface HistoryEvent {
  id: number;
  timestamp: string;
  type: 'task_add' | 'task_complete' | 'task_check' | 'task_delete' | 'game_played';
  detail: string;
}

const HISTORY_KEY = 'alectrix_history';

export const getHistory = (): HistoryEvent[] => {
  try {
    const savedHistory = localStorage.getItem(HISTORY_KEY);
    return savedHistory ? JSON.parse(savedHistory) : [];
  } catch (error) {
    console.error("Failed to parse history from localStorage", error);
    return [];
  }
};

export const addHistoryEvent = (event: Omit<HistoryEvent, 'id' | 'timestamp'>): HistoryEvent[] => {
  const history = getHistory();
  const newEvent: HistoryEvent = {
    ...event,
    id: Date.now(),
    timestamp: new Date().toISOString(),
  };
  const updatedHistory = [newEvent, ...history].slice(0, 100); // Keep last 100 events
  localStorage.setItem(HISTORY_KEY, JSON.stringify(updatedHistory));
  return updatedHistory;
};
