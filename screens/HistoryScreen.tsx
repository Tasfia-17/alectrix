import React from 'react';
import { HistoryEntry } from '../lib/history';
import HistoryCard from '../components/common/HistoryCard';
import BookReader from '../components/penciled/BookReader';
import StarCatcher from '../components/penciled/StarCatcher';
import BackButton from '../components/common/BackButton';

interface HistoryScreenProps {
  history: HistoryEntry[];
  onPlay: (entry: HistoryEntry) => void;
  onBack: () => void;
}

const HistoryScreen: React.FC<HistoryScreenProps> = ({ history, onPlay, onBack }) => {

  const handleShare = async (entry: HistoryEntry) => {
    const shareData = {
      title: 'Art2Arcade Game',
      text: 'Check out this game I created with Art2Arcade!',
      url: window.location.href, // Shares the link to the app itself
    };
    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        alert('Sharing is not supported on this browser.');
      }
    } catch (err) {
      console.error('Error sharing:', err);
    }
  };

  const handleDownload = (entry: HistoryEntry) => {
    const dataToDownload = {
      levelData: entry.levelData,
      customAssets: entry.customAssets,
      drawingDataUrl: entry.drawingDataUrl,
    };
    const dataStr = JSON.stringify(dataToDownload, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `art2arcade-game-${entry.id}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen w-full bg-[#FFFDF5] font-sans text-slate-700 p-4 sm:p-8 relative overflow-hidden">
      <BookReader />
      <StarCatcher />
      <BackButton onClick={onBack} />
      <div className="max-w-7xl mx-auto relative z-10">
        <header className="relative text-center mb-12 animate-fade-in-up">
          <h1 className="font-display text-4xl sm:text-5xl font-bold mb-3">My Creations</h1>
          <p className="text-base md:text-lg text-slate-500 max-w-3xl mx-auto">
            A gallery of all the games you've brought to life.
          </p>
        </header>

        {history.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-xl text-slate-500">You haven't created any games yet!</p>
            <p className="mt-4 text-slate-500">Go back and draw something to see it appear here.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {history.map(entry => (
              <HistoryCard
                key={entry.id}
                entry={entry}
                onPlay={() => onPlay(entry)}
                onShare={() => handleShare(entry)}
                onDownload={() => handleDownload(entry)}
              />
            ))}
          </div>
        )}

      </div>
       <style>{`
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
        }
      `}</style>
    </div>
  );
};

export default HistoryScreen;