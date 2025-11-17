import React from 'react';
import Artist from '../components/penciled/Artist';
import LadderClimber from '../components/penciled/LadderClimber';
import SwordFighters from '../components/penciled/SwordFighters';
import Balloonist from '../components/penciled/Balloonist';
import RocketRider from '../components/penciled/RocketRider';
import BookReader from '../components/penciled/BookReader';
import SwingRider from '../components/penciled/SwingRider';
import StarCatcher from '../components/penciled/StarCatcher';
import PaperPlanePilot from '../components/penciled/PaperPlanePilot';
import FloatingJellyfish from '../components/penciled/FloatingJellyfish';
import ButterflyChaser from '../components/penciled/ButterflyChaser';

interface LandingScreenProps {
  onEnter: () => void;
}

const LandingScreen: React.FC<LandingScreenProps> = ({ onEnter }) => {
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-[#FFFDF5] flex flex-col items-center justify-center p-4 font-sans text-gray-800">
      
      {/* Animated decorative elements */}
      <LadderClimber />
      <SwordFighters />
      <Artist />
      <Balloonist />
      <RocketRider />
      <BookReader />
      <SwingRider />
      <StarCatcher />
      <PaperPlanePilot />
      <FloatingJellyfish />
      <ButterflyChaser />

      {/* Main Content */}
      <main className="relative z-10 flex flex-col items-center text-center animate-fade-in-up">
        <h1 className="text-5xl md:text-6xl font-bold font-display text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 animate-color-cycle mb-4">
          Art2Arcade
        </h1>
        <p className="text-base md:text-lg text-slate-600 max-w-2xl mb-12">
          Unleash your imagination. Bring your drawings to life as playable games.
        </p>
        
        <button 
          onClick={onEnter}
          className="px-6 py-3 bg-gradient-to-r from-sky-300 to-violet-300 text-white font-bold rounded-full shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 ease-in-out focus:outline-none focus:ring-4 focus:ring-sky-200 animate-button-fade-in">
          Get Started
        </button>

      </main>

      <style>{`
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.2s forwards;
        }

        .animate-button-fade-in {
          animation: fade-in-up 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.6s forwards;
          opacity: 0;
        }

        @keyframes color-cycle {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-color-cycle {
          background-size: 200% 200%;
          animation: color-cycle 5s ease infinite;
        }
      `}</style>
    </div>
  );
};

export default LandingScreen;