import React from 'react';
import { HistoryEvent } from '../lib/history';
import PixelatedContainer from '../components/common/PixelatedContainer';

interface HistoryScreenProps {
  history: HistoryEvent[];
  onBack: () => void;
}

const eventIcons: Record<HistoryEvent['type'], string> = {
  task_add: '📝',
  task_check: '✅',
  task_complete: '🎉',
  task_delete: '❌',
  game_played: '🎮',
};

const HistoryScreen: React.FC<HistoryScreenProps> = ({ history, onBack }) => {

  const formatTimestamp = (isoString: string) => {
    const date = new Date(isoString);
    return date.toLocaleString();
  };

  return (
    <div className="min-h-screen font-mono p-4 sm:p-6 flex flex-col items-center" 
         style={{
          backgroundColor: '#2c2a4a',
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='10' height='10' viewBox='0 0 10 10' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='10' height='10' fill='%232c2a4a'/%3E%3Crect x='8' y='2' width='1' height='1' fill='%234a476b'/%3E%3Crect x='3' y='7' width='1' height='1' fill='%234a476b'/%3E%3C/svg%3E")`
        }}
    >
      <div className="w-full max-w-2xl flex-grow flex flex-col">
        <PixelatedContainer title="Your Glorious History">
          {history.length === 0 ? (
            <div className="flex-grow flex items-center justify-center">
              <p className="text-pixel-purple-light/70">You haven't done anything yet. Shocking.</p>
            </div>
          ) : (
            <ul className="flex-grow overflow-y-auto space-y-2 pr-2">
              {history.map(event => (
                <li key={event.id} className="flex items-start gap-3 bg-pixel-purple-dark p-2 border border-pixel-black/50">
                  <span className="text-xl">{eventIcons[event.type]}</span>
                  <div className="flex-grow">
                    <p className="text-pixel-purple-light font-semibold">{event.detail}</p>
                    <p className="text-xs text-pixel-purple-light/50">{formatTimestamp(event.timestamp)}</p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </PixelatedContainer>

         <div className="w-full flex flex-col items-center justify-end h-24 mt-4">
            <button 
                onClick={onBack}
                className="w-full max-w-sm bg-pixel-yellow text-deep-sienna font-bold text-lg py-3 px-8 border-2 border-pixel-black 
                           transform active:translate-x-1 active:translate-y-1 transition-all duration-100 ease-in-out
                           hover:bg-yellow-300"
                style={{ boxShadow: '4px 4px 0px #000000' }}
                >
                Back to Hub
            </button>
        </div>
      </div>
    </div>
  );
};

export default HistoryScreen;
