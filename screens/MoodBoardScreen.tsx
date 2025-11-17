import React, { useState, useRef, useEffect, FormEvent } from 'react';
import { AvatarData } from '../App';

// --- Screen Components for the Monitor ---

const StarrySky: React.FC = () => {
    const Star: React.FC<{ style: React.CSSProperties }> = ({ style }) => (
        <div className="absolute w-px h-px sm:w-1 sm:h-1 bg-white rounded-full animate-sparkle" style={style}></div>
    );
    return (
        <>
            <Star style={{ top: '20%', left: '30%', animationDelay: '0s' }} />
            <Star style={{ top: '50%', left: '80%', animationDelay: '1s' }} />
            <Star style={{ top: '80%', left: '10%', animationDelay: '0.5s' }} />
            <Star style={{ top: '40%', left: '50%', animationDelay: '1.5s' }} />
            <Star style={{ top: '65%', left: '60%', animationDelay: '0.2s' }} />
        </>
    );
};

const Matrix: React.FC = () => (
    <div className="overflow-hidden h-full">
        {'01'.repeat(20).split('').map((char, i) => (
            <p key={i} className="text-green-500 text-xs" style={{ 
                animation: `fall ${Math.random() * 5 + 3}s linear infinite`,
                marginLeft: `${Math.random() * 95}%`
            }}>
                {char}
            </p>
        ))}
        <style>{`
            @keyframes fall {
                to { transform: translateY(100px); }
            }
        `}</style>
    </div>
);

const Sunset: React.FC = () => (
    <div className="w-full h-full bg-gradient-to-b from-orange-400 via-pink-500 to-indigo-800">
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-8 h-8 bg-yellow-300 rounded-full"></div>
    </div>
);


// --- Pixel Art Desk Components ---

const PixelMonitor: React.FC<{ onScreenChange: () => void; screenComponent: React.ReactNode }> = ({ onScreenChange, screenComponent }) => {
    return (
        <button onClick={onScreenChange} className="relative w-40 h-28 sm:w-48 sm:h-32 group cursor-pointer flex-shrink-0">
            {/* Monitor Casing */}
            <div className="absolute inset-0 bg-gray-300 border-2 border-black rounded-t-lg transition-transform group-hover:scale-105"></div>
            <div className="absolute inset-2 bg-black border-2 border-gray-500 overflow-hidden">
                {screenComponent}
            </div>
            {/* Monitor Stand */}
            <div className="absolute bottom-[-12px] left-1/2 -translate-x-1/2 w-16 h-3 bg-gray-300 border-2 border-black"></div>
            <div className="absolute bottom-[-20px] left-1/2 -translate-x-1/2 w-24 h-2 bg-gray-400 border-2 border-black rounded-b-md"></div>
        </button>
    );
};

const DeskPlant: React.FC<{ isWatered: boolean; onWater: () => void }> = ({ isWatered, onWater }) => (
    <button onClick={onWater} className="relative w-16 h-20 group cursor-pointer flex-shrink-0">
        {isWatered && <div className="absolute top-0 left-1/2 text-xl animate-bounce-sm">💧</div>}
        {isWatered && <div className="absolute top-4 left-2 text-md animate-sparkle">✨</div>}
        {/* Pot */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-12 bg-saddle-brown border-2 border-black transition-transform group-hover:scale-105"></div>
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-14 h-2 bg-deep-sienna border-x-2 border-black"></div>
        {/* Plant */}
        <div className={`absolute bottom-10 left-6 w-4 h-8 border-2 border-black -rotate-12 transition-colors ${isWatered ? 'bg-green-500' : 'bg-green-700'}`}></div>
        <div className={`absolute bottom-10 left-9 w-4 h-10 border-2 border-black rotate-12 transition-colors ${isWatered ? 'bg-green-400' : 'bg-green-600'}`}></div>
    </button>
);

const StickyNote: React.FC<{ text: string; rotation: number; position: React.CSSProperties; onClick: () => void }> = ({ text, rotation, position, onClick }) => (
    <button onClick={onClick} className="absolute w-32 h-32 bg-pixel-yellow text-deep-sienna border-2 border-pixel-black p-2 flex items-center justify-center text-center transform hover:scale-110 transition-transform cursor-pointer"
         style={{ boxShadow: '3px 3px 0px #000', transform: `rotate(${rotation}deg)`, ...position }}>
        <p className="font-mono text-sm leading-tight">{text}</p>
    </button>
);

// --- Main Screen Component ---

interface MoodBoardScreenProps {
  avatar: AvatarData;
  onBack: () => void;
}

const notePool = [
    "Reminder: That thing you were excited about for 5 minutes still exists.",
    "You call it a mood board. I call it evidence of a short attention span.",
    "Is this 'art' or just another way to avoid your responsibilities?",
    "If you stare at this long enough, your tasks will magically complete themselves. (They won't.)",
    "Don't forget to hydrate. Or don't. I'm not your mom.",
    "Wow, such empty. Much like your list of completed tasks.",
    "This note is a placeholder for a better idea you'll have later and then forget.",
    "Beep boop. Does this count as a personality?",
    "This is fine."
];

const avatarChirps = [
    "Don't touch me.",
    "Are you bored? Obviously.",
    "Get back to work.",
    "I'm judging your cursor placement.",
    "Was that click really necessary?"
];

const botResponses = [
    "Fascinating. Tell me more. Or don't.",
    "I'm processing that with the enthusiasm of a dial-up modem.",
    "Did you think that was clever?",
    "Okay, and?",
    "I'll file that under 'Things I Pretend to Care About'.",
    "That's nice. Now, about that looming deadline...",
    "Error 404: Empathy not found.",
    "...",
    "Have you tried turning it off and on again? Your motivation, I mean.",
    "I'm a bot, not a therapist. And even if I was, I'd charge extra for this.",
    "Your input has been noted and will be promptly ignored."
];


const MoodBoardScreen: React.FC<MoodBoardScreenProps> = ({ avatar, onBack }) => {
    const [monitorScreenIndex, setMonitorScreenIndex] = useState(0);
    const [isPlantWatered, setIsPlantWatered] = useState(false);
    const [notes, setNotes] = useState([notePool[0], notePool[1], notePool[2]]);
    const [avatarChirp, setAvatarChirp] = useState('');
    const [chatHistory, setChatHistory] = useState<{ sender: 'user' | 'bot', text: string }[]>([
        { sender: 'bot', text: "What do you want?" }
    ]);
    const [userInput, setUserInput] = useState('');
    const chatLogRef = useRef<HTMLDivElement>(null);

    const monitorScreens = [<StarrySky />, <Matrix />, <Sunset />];

    useEffect(() => {
        if (chatLogRef.current) {
            chatLogRef.current.scrollTop = chatLogRef.current.scrollHeight;
        }
    }, [chatHistory]);

    const handleMonitorClick = () => setMonitorScreenIndex(prev => (prev + 1) % monitorScreens.length);
    
    const handlePlantClick = () => {
        if(isPlantWatered) return;
        setIsPlantWatered(true);
        setTimeout(() => setIsPlantWatered(false), 2000);
    };

    const handleNoteClick = (index: number) => {
        setNotes(prevNotes => {
            const newNotes = [...prevNotes];
            let newNote = notePool[Math.floor(Math.random() * notePool.length)];
            while (newNotes.includes(newNote)) {
                newNote = notePool[Math.floor(Math.random() * notePool.length)];
            }
            newNotes[index] = newNote;
            return newNotes;
        });
    };
    
    const handleAvatarClick = () => {
        if(avatarChirp) return;
        setAvatarChirp(avatarChirps[Math.floor(Math.random() * avatarChirps.length)]);
        setTimeout(() => setAvatarChirp(''), 3000);
    };

    const handleSendMessage = (e: FormEvent) => {
        e.preventDefault();
        if (userInput.trim() === '') return;

        const newUserMessage = { sender: 'user' as const, text: userInput.trim() };
        
        setChatHistory(prev => [...prev, newUserMessage]);
        setUserInput('');

        setTimeout(() => {
            const randomResponse = botResponses[Math.floor(Math.random() * botResponses.length)];
            const newBotMessage = { sender: 'bot' as const, text: randomResponse };
            setChatHistory(prev => [...prev, newBotMessage]);
        }, 800);
    };

  return (
    <div className="min-h-screen font-mono flex flex-col items-center justify-between overflow-hidden relative" 
         style={{ backgroundColor: '#2c2a4a' /* pixel-purple-dark */ }}
    >
        {/* Wall */}
        <div className="absolute inset-0 z-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='10' height='10' viewBox='0 0 10 10' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='10' height='10' fill='%232c2a4a'/%3E%3Crect x='1' y='5' width='1' height='1' fill='%234a476b'/%3E%3Crect x='6' y='8' width='1' height='1' fill='%234a476b'/%3E%3C/svg%3E")`
        }}></div>
        
        {/* Desk */}
        <div className="absolute bottom-0 left-0 w-full h-1/3 bg-saddle-brown border-t-8 border-deep-sienna z-10"></div>
        
        {/* Scene Container */}
        <div className="relative w-full max-w-5xl mx-auto flex-grow z-20 flex flex-col">
             {/* Wall area for notes */}
            <div className="flex-grow relative">
                <StickyNote text={notes[0]} rotation={-3} position={{top: '10%', left: '5%'}} onClick={() => handleNoteClick(0)} />
                <StickyNote text={notes[1]} rotation={5} position={{top: '15%', right: '10%'}} onClick={() => handleNoteClick(1)} />
                <StickyNote text={notes[2]} rotation={2} position={{top: '40%', left: '50%', transform: 'translateX(-50%) rotate(2deg)'}} onClick={() => handleNoteClick(2)} />
            </div>

            {/* Desk area for items */}
            <div className="flex-shrink-0 flex justify-center items-end gap-4 md:gap-8 flex-wrap px-4 pb-4">
                 <div className="hidden lg:block">
                    <DeskPlant isWatered={isPlantWatered} onWater={handlePlantClick} />
                 </div>
                 <div className="hidden sm:block">
                    <PixelMonitor onScreenChange={handleMonitorClick} screenComponent={monitorScreens[monitorScreenIndex]} />
                 </div>
                
                {/* Chat Window */}
                <div className="w-64 h-56 bg-pixel-purple-mid border-2 border-pixel-black p-2 flex flex-col flex-shrink-0" style={{ boxShadow: '4px 4px 0 #000' }}>
                    <div ref={chatLogRef} className="flex-grow overflow-y-auto mb-2 bg-pixel-purple-dark p-1 border border-pixel-black">
                        {chatHistory.map((msg, index) => (
                            <div key={index} className={`text-sm mb-1 ${msg.sender === 'user' ? 'text-right' : 'text-left'}`}>
                                <p className={`inline-block p-1 rounded max-w-[90%] break-words ${msg.sender === 'user' ? 'bg-pixel-blue-light text-black' : 'bg-pixel-purple-light text-black'}`}>
                                    {msg.text}
                                </p>
                            </div>
                        ))}
                    </div>
                    <form onSubmit={handleSendMessage} className="flex gap-1">
                        <input 
                            type="text" 
                            value={userInput} 
                            onChange={(e) => setUserInput(e.target.value)}
                            placeholder="Say something..."
                            className="flex-grow bg-pixel-purple-dark text-white p-1 border border-pixel-black focus:outline-none focus:border-pixel-yellow placeholder:text-pixel-purple-light/50"
                        />
                        <button type="submit" className="bg-pixel-yellow text-black font-bold px-2 border border-pixel-black">
                            &gt;
                        </button>
                    </form>
                </div>

                {/* Avatar */}
                <div className="relative">
                    {avatarChirp && (
                        <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-white text-black text-xs p-2 rounded-md border-2 border-black animate-fade-in w-max z-30">
                            {avatarChirp}
                        </div>
                    )}
                    <button onClick={handleAvatarClick} className="w-24 h-24 sm:w-28 sm:h-28 animate-bob cursor-pointer" style={{ imageRendering: 'pixelated' }}>
                        <avatar.component />
                    </button>
                </div>
            </div>
        </div>
      
        {/* Back Button */}
        <div className="w-full max-w-sm flex flex-col items-center justify-end h-24 mb-4 z-20">
            <button 
                onClick={onBack}
                className="w-full bg-pixel-yellow text-deep-sienna font-bold text-lg py-3 px-8 border-2 border-pixel-black 
                           transform active:translate-x-1 active:translate-y-1 transition-all duration-100 ease-in-out
                           hover:bg-yellow-300"
                style={{ boxShadow: '4px 4px 0px #000000' }}
            >
                Back to Hub
            </button>
        </div>
    </div>
  );
};

export default MoodBoardScreen;
