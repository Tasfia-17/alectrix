import React from 'react';
import { HistoryEntry } from '../../lib/history';

interface HistoryCardProps {
  entry: HistoryEntry;
  onPlay: () => void;
  onShare: () => void;
  onDownload: () => void;
}

const HistoryCard: React.FC<HistoryCardProps> = ({ entry, onPlay, onShare, onDownload }) => {
  const gameTypeLabel = entry.levelData.gameType.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase());
  const dateLabel = new Date(entry.timestamp).toLocaleDateString();

  return (
    <div className="bg-white rounded-2xl shadow-md border border-slate-200/80 p-4 flex flex-col transition-transform transform hover:shadow-lg hover:-translate-y-1 h-full">
      <div className="w-full aspect-video mb-4 bg-slate-100 rounded-lg overflow-hidden relative border border-slate-200">
        <img src={entry.drawingDataUrl} alt="Game drawing" className="w-full h-full object-contain" />
      </div>
      <div className="flex-grow">
        <h3 className="text-base font-bold text-slate-700 ">{gameTypeLabel}</h3>
        <p className="text-slate-500 text-xs mb-4">{dateLabel}</p>
      </div>
      <div className="flex flex-col gap-2 mt-auto">
         <button onClick={onPlay} className="w-full px-4 py-2 bg-gradient-to-r from-emerald-300 to-green-400 text-white font-semibold text-sm rounded-lg shadow-md hover:shadow-lg transition-all duration-200">
            Play
        </button>
        <div className="flex gap-2">
            <button onClick={onShare} className="flex-1 px-4 py-2 bg-slate-100 text-slate-700 font-medium text-sm rounded-lg hover:bg-slate-200 transition-colors duration-200">
                Share
            </button>
            <button onClick={onDownload} className="flex-1 px-4 py-2 bg-slate-100 text-slate-700 font-medium text-sm rounded-lg hover:bg-slate-200 transition-colors duration-200">
                Download
            </button>
        </div>
      </div>
    </div>
  );
};

export default HistoryCard;