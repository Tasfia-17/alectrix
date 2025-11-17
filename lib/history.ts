import { LevelData } from './gemini';
import { CustomAssets } from '../App';

export interface HistoryEntry {
  id: string;
  timestamp: number;
  levelData: LevelData;
  customAssets: CustomAssets;
  drawingDataUrl: string;
}

const HISTORY_KEY = 'art2arcade-history';

export const getHistory = (): HistoryEntry[] => {
  try {
    const historyJson = localStorage.getItem(HISTORY_KEY);
    return historyJson ? JSON.parse(historyJson) : [];
  } catch (error) {
    console.error("Failed to parse history from localStorage", error);
    return [];
  }
};

export const saveGameToHistory = (newEntry: HistoryEntry): HistoryEntry[] => {
  const history = getHistory();
  // Add to the beginning of the array
  const updatedHistory = [newEntry, ...history];
  // Limit history size to prevent localStorage from filling up
  if (updatedHistory.length > 20) {
    updatedHistory.pop();
  }
  try {
    localStorage.setItem(HISTORY_KEY, JSON.stringify(updatedHistory));
  } catch (error) {
    console.error("Failed to save history to localStorage", error);
  }
  return updatedHistory;
};
