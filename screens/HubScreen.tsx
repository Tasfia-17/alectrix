import React from 'react';
import Artist from '../components/penciled/Artist';
import SwordFighters from '../components/penciled/SwordFighters';
import PaperPlanePilot from '../components/penciled/PaperPlanePilot';


interface HubScreenProps {
  onNavigateToInspiration: () => void;
  onNavigateToHistory: () => void;
  onNavigateToLeaderboard: () => void;
}

const HubScreen: React.FC<HubScreenProps> = ({ onNavigateToInspiration, onNavigateToHistory, onNavigateToLeaderboard }) => {
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-[#FFFDF5] flex flex-col items-center justify-center p-4 font-sans text-slate-700">
      
      {/* Animated decorative elements */}
      <SwordFighters />
      <PaperPlanePilot />
      <Artist />

      <main className="relative z-10 flex flex-col items-center text-center animate-fade-in-up">
        <h1 className="text-4xl md:text-5xl font-bold font-display text-slate-700 mb-4">
          Let's Build a Game!
        </h1>
        <p className="text-base md:text-lg text-slate-500 max-w-2xl mb-12">
          Your imagination is the controller. See what's possible, then draw a level for our AI to bring to life.
        </p>

        <div className="flex flex-col items-center gap-6">
            <div className="flex flex-col sm:flex-row gap-4">
                <button
                    onClick={onNavigateToInspiration}
                    className="px-8 py-4 bg-gradient-to-r from-sky-300 to-blue-400 text-white font-bold text-lg rounded-full shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 ease-in-out focus:outline-none focus:ring-4 focus:ring-sky-200">
                    Create a Game
                </button>
                <button
                    onClick={onNavigateToHistory}
                    className="px-8 py-4 bg-gradient-to-r from-violet-300 to-pink-300 text-white font-bold text-lg rounded-full shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 ease-in-out focus:outline-none focus:ring-4 focus:ring-violet-200">
                    My Creations
                </button>
            </div>
             <button
                onClick={onNavigateToLeaderboard}
                className="px-8 py-4 bg-gradient-to-r from-amber-200 to-orange-300 text-white font-bold text-lg rounded-full shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 ease-in-out focus:outline-none focus:ring-4 focus:ring-amber-100">
                Hall of Fame
            </button>
        </div>

      </main>

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

export default HubScreen;