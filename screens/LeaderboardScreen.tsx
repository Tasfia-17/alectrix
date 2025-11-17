import React from 'react';
import BackButton from '../components/common/BackButton';
import RocketRider from '../components/penciled/RocketRider';
import StarCatcher from '../components/penciled/StarCatcher';

interface LeaderboardScreenProps {
  onBack: () => void;
}

// Mock data for the leaderboard
const leaderboardData = [
  { name: 'Pixel Master', score: 9850, avatar: '🎨' },
  { name: 'Arcade Ace', score: 9500, avatar: '🚀' },
  { name: 'Sketchy', score: 8900, avatar: '✏️' },
  { name: 'Vector Victor', score: 8750, avatar: '🏆' },
  { name: 'Doodle Champ', score: 8400, avatar: '✨' },
  { name: 'Platform Pro', score: 7950, avatar: '👟' },
  { name: 'Maze Runner', score: 7600, avatar: '🗺️' },
  { name: 'Creative Coder', score: 7100, avatar: '💻' },
  { name: 'Artful Gamer', score: 6800, avatar: '🕹️' },
  { name: 'Ink Runner', score: 6550, avatar: '✒️' },
];

const LeaderboardScreen: React.FC<LeaderboardScreenProps> = ({ onBack }) => {
  return (
    <div className="min-h-screen w-full bg-[#FFFDF5] font-sans text-slate-700 p-4 sm:p-8 relative overflow-hidden">
      <RocketRider />
      <StarCatcher />
      <BackButton onClick={onBack} />
      
      <div className="max-w-3xl mx-auto relative z-10">
        <header className="text-center mb-12 animate-fade-in-up">
          <h1 className="font-display text-4xl sm:text-5xl font-bold mb-3">Hall of Fame</h1>
          <p className="text-base md:text-lg text-slate-500 max-w-3xl mx-auto">
            See who's at the top of their game creation game!
          </p>
        </header>

        <div className="space-y-3">
          {leaderboardData.map((player, index) => (
            <div
              key={player.name}
              className="flex items-center bg-white/80 backdrop-blur-sm p-4 rounded-xl shadow-sm border border-slate-200/80 transition-all duration-300 hover:shadow-md hover:scale-[1.02]"
              style={{ animation: `fade-in-up 0.5s ${index * 0.05}s ease-out forwards`, opacity: 0 }}
            >
              <div className="flex items-center w-16 text-xl font-bold text-slate-500">
                <span className="text-slate-400 mr-2 text-lg">#</span>{index + 1}
              </div>
              <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-2xl mr-4">
                {player.avatar}
              </div>
              <div className="flex-grow">
                <p className="font-bold text-base text-slate-800">{player.name}</p>
              </div>
              <div>
                <p className="font-bold text-lg text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                  {player.score.toLocaleString()}
                </p>
              </div>
            </div>
          ))}
        </div>
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

export default LeaderboardScreen;