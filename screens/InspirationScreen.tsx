import React from 'react';
import DemoCard from '../components/common/DemoCard';
import BasicJumpDemo from '../components/games/platformer/BasicJumpDemo';
import MovingPlatformDemo from '../components/games/platformer/MovingPlatformDemo';
import CollectibleDemo from '../components/games/platformer/CollectibleDemo';
import EnemyAvoidDemo from '../components/games/platformer/EnemyAvoidDemo';
import GoalDemo from '../components/games/platformer/GoalDemo';
import MazeNavDemo from '../components/games/maze/MazeNavDemo';
import VerticalClimbDemo from '../components/games/platformer/VerticalClimbDemo';
import TrickyJumpsDemo from '../components/games/platformer/TrickyJumpsDemo';
import PatrollingHazardDemo from '../components/games/maze/PatrollingHazardDemo';
import BasicDodgeDemo from '../components/games/falling/BasicDodgeDemo';
import PowerupCollectDemo from '../components/games/falling/PowerupCollectDemo';
import BackButton from '../components/common/BackButton';
import SwitchAndDoorDemo from '../components/games/platformer/SwitchAndDoorDemo';
import BouncyPlatformDemo from '../components/games/platformer/BouncyPlatformDemo';
import CrumblingPlatformDemo from '../components/games/platformer/CrumblingPlatformDemo';
import TimedChallengeDemo from '../components/games/platformer/TimedChallengeDemo';
import WindZoneDemo from '../components/games/platformer/WindZoneDemo';
import KeyAndDoorDemo from '../components/games/maze/KeyAndDoorDemo';
import PressurePlateDemo from '../components/games/maze/PressurePlateDemo';
import ShrinkingZoneDemo from '../components/games/falling/ShrinkingZoneDemo';
import MultiHazardDemo from '../components/games/falling/MultiHazardDemo';
import ShieldPowerupDemo from '../components/games/falling/ShieldPowerupDemo';

interface InspirationScreenProps {
  onNavigate: () => void;
  onBack: () => void;
}

const InspirationScreen: React.FC<InspirationScreenProps> = ({ onNavigate, onBack }) => {
  return (
    <div className="min-h-screen w-full bg-[#FFFDF5] font-sans text-slate-700 p-4 sm:p-8 relative">
      <BackButton onClick={onBack} />
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-12 animate-fade-in-up">
          <h1 className="font-display text-4xl sm:text-5xl font-bold mb-3">Game Possibilities</h1>
          <p className="text-base md:text-lg text-slate-500 max-w-3xl mx-auto">
            Our AI can create different games based on your drawing. Here are some examples to inspire you!
          </p>
        </header>

        {/* Platformer Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6 text-center sm:text-left">Platformer Games</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <DemoCard title="Jumping" description="Create platforms with gaps to jump across.">
              <BasicJumpDemo />
            </DemoCard>
            <DemoCard title="Moving Platforms" description="Use purple to draw platforms that move up, down, left, or right.">
              <MovingPlatformDemo />
            </DemoCard>
             <DemoCard title="Vertical Levels" description="Stack platforms to build levels that go upwards.">
              <VerticalClimbDemo />
            </DemoCard>
            <DemoCard title="Tricky Jumps" description="Make small, precise platforms for a tougher challenge.">
              <TrickyJumpsDemo />
            </DemoCard>
            <DemoCard title="Collect Goals" description="Draw blue shapes as stars or coins for the player to collect.">
              <CollectibleDemo />
            </DemoCard>
            <DemoCard title="Avoid Hazards" description="Red shapes become dangerous obstacles to avoid.">
              <EnemyAvoidDemo />
            </DemoCard>
             <DemoCard title="Switches & Doors" description="Use blue shapes as switches to open paths or remove obstacles.">
              <SwitchAndDoorDemo />
            </DemoCard>
            <DemoCard title="Bouncy Platforms" description="Designate special platforms that launch the player higher.">
              <BouncyPlatformDemo />
            </DemoCard>
            <DemoCard title="Crumbling Blocks" description="Create platforms that fall away after being touched for a thrilling escape.">
              <CrumblingPlatformDemo />
            </DemoCard>
            <DemoCard title="Wind Zones" description="Add invisible forces that can push the player across wide gaps.">
              <WindZoneDemo />
            </DemoCard>
            <DemoCard title="Timed Challenges" description="See if players can collect everything before a timer runs out.">
              <TimedChallengeDemo />
            </DemoCard>
            <DemoCard title="Reach the Finish" description="Design a level with a clear start and end for the player to complete.">
              <GoalDemo />
            </DemoCard>
             <DemoCard title="Your Idea Here!" description="Combine these elements or invent new challenges. What will you create?">
              <div className="w-full h-full bg-sky-100 flex items-center justify-center text-5xl font-bold text-slate-400">?</div>
            </DemoCard>
          </div>
        </section>

        {/* Maze Section */}
        <section className="mb-16">
            <h2 className="text-3xl font-bold mb-6 text-center sm:text-left">Maze Games</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                <DemoCard title="Navigate Paths" description="Draw interconnected paths and walls to create a top-down maze.">
                    <MazeNavDemo />
                </DemoCard>
                <DemoCard title="Moving Hazards" description="Add red shapes inside corridors that patrol back and forth.">
                    <PatrollingHazardDemo />
                </DemoCard>
                 <DemoCard title="Keys & Locked Doors" description="Require the player to find a key (blue) to open a specific barrier.">
                    <KeyAndDoorDemo />
                </DemoCard>
                <DemoCard title="Pressure Plates" description="Design temporary paths that only open when a player is standing on a switch.">
                    <PressurePlateDemo />
                </DemoCard>
                <DemoCard title="Find the Goal" description="Place a blue goal somewhere in the maze for the player to find.">
                    <div className="w-full h-full bg-rose-50 flex items-center justify-center p-4">
                        <svg viewBox="0 0 100 100" className="w-full h-full">
                            <path d="M10 10 H 90 V 90 H 10 V 10 M 30 10 V 70 H 50" fill="none" stroke="#6B7280" strokeWidth="4" />
                            <path d="M70 30 V 90 H 50" fill="none" stroke="#6B7280" strokeWidth="4" />
                            <circle cx="20" cy="20" r="5" fill="#A7F3D0" />
                            <text x="80" y="80" fontSize="20" textAnchor="middle" alignmentBaseline="middle">★</text>
                        </svg>
                    </div>
                </DemoCard>
            </div>
        </section>

        {/* Falling Dodger Section */}
        <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6 text-center sm:text-left">Falling Dodger Games</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                <DemoCard title="Dodge Hazards" description="Draw red shapes at the top to make them fall from the sky.">
                    <BasicDodgeDemo />
                </DemoCard>
                <DemoCard title="Collect Power-ups" description="Blue shapes can fall too! Make them helpful items to collect.">
                    <PowerupCollectDemo />
                </DemoCard>
                <DemoCard title="Varied Hazards" description="Mix up the size, shape, and speed of falling red objects for more variety.">
                    <MultiHazardDemo />
                </DemoCard>
                <DemoCard title="Shield Power-ups" description="Draw blue items that grant temporary invincibility against hazards.">
                    <ShieldPowerupDemo />
                </DemoCard>
                <DemoCard title="Shrinking Arena" description="Make the safe zone smaller over time for an extra challenge.">
                    <ShrinkingZoneDemo />
                </DemoCard>
                <DemoCard title="Survive" description="The goal is to survive the onslaught for a set amount of time.">
                    <div className="w-full h-full bg-slate-800 text-sky-300 flex items-center justify-center text-4xl font-bold">30s</div>
                </DemoCard>
            </div>
        </section>

        <footer className="text-center">
            <button
                onClick={onNavigate}
                className="px-8 py-4 bg-gradient-to-r from-emerald-300 to-teal-300 text-white font-bold text-lg rounded-full shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 ease-in-out focus:outline-none focus:ring-4 focus:ring-emerald-200">
                I'm Inspired, Let's Draw!
            </button>
        </footer>
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

export default InspirationScreen;