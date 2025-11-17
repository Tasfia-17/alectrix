import React, { useState, useRef } from 'react';
import { AvatarData } from '../App';
import { AllGamesData, DragAndDropGameData, FindTheMistakeData, KnowledgeTrackerData, MiniAdventureData, OutsideTheBoxData, PuzzleData, ScenariosAndAnalogiesData, SpeedRoundsData, StoryBasedChallengeData, generateAllGames, generateDefaultKnowledgeTrackerData } from '../lib/gemini';

const creationFeatures = [
    { id: 'puzzles', label: "Puzzles" },
    { id: 'dnd', label: "Drag-and-Drop" },
    { id: 'mistakes', label: "Find the Mistake" },
    { id: 'speed', label: "Speed Rounds" },
    { id: 'story', label: "Story Challenge" },
    { id: 'scenarios', label: "Scenarios" },
    { id: 'creative', label: "Creative Problems" },
    { id: 'adventures', label: "Mini Adventures" },
    { id: 'tracking', label: "Knowledge Tracker" }
];

interface CreationHubScreenProps {
    avatar: AvatarData;
    notes: string;
    setNotes: (notes: string) => void;
    allGameData: AllGamesData | null;
    setAllGameData: (data: AllGamesData | null) => void;
    onPuzzlesGenerated: (puzzles: PuzzleData) => void;
    onDragAndDropGameGenerated: (gameData: DragAndDropGameData) => void;
    onFindTheMistakeGenerated: (gameData: FindTheMistakeData) => void;
    onSpeedRoundsGenerated: (gameData: SpeedRoundsData) => void;
    onStoryBasedChallengeGenerated: (gameData: StoryBasedChallengeData) => void;
    onScenariosAndAnalogiesGenerated: (gameData: ScenariosAndAnalogiesData) => void;
    onOutsideTheBoxGenerated: (gameData: OutsideTheBoxData) => void;
    onMiniAdventureGenerated: (gameData: MiniAdventureData) => void;
    onKnowledgeTrackerGenerated: (gameData: KnowledgeTrackerData) => void;
}

const CreationHubScreen: React.FC<CreationHubScreenProps> = ({ 
    avatar, 
    notes,
    setNotes,
    allGameData,
    setAllGameData,
    onPuzzlesGenerated, 
    onDragAndDropGameGenerated, 
    onFindTheMistakeGenerated, 
    onSpeedRoundsGenerated, 
    onStoryBasedChallengeGenerated, 
    onScenariosAndAnalogiesGenerated, 
    onOutsideTheBoxGenerated, 
    onMiniAdventureGenerated, 
    onKnowledgeTrackerGenerated 
}) => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [isGenerating, setIsGenerating] = useState<boolean>(false);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const MAX_CHARS = 5000;

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            const file = event.target.files[0];
            setSelectedFile(file);
            const reader = new FileReader();
            reader.onload = (e) => {
                const text = e.target?.result as string;
                setNotes(text.slice(0, MAX_CHARS));
            };
            reader.readAsText(file);
        }
    };

    const handleUploadClick = () => {
        fileInputRef.current?.click();
    };

    const navigateToGame = (featureId: string, data: AllGamesData) => {
        switch (featureId) {
            case 'puzzles':
                onPuzzlesGenerated(data.puzzles);
                break;
            case 'dnd':
                onDragAndDropGameGenerated(data.dragAndDrop);
                break;
            case 'mistakes':
                onFindTheMistakeGenerated(data.findTheMistake);
                break;
            case 'speed':
                onSpeedRoundsGenerated(data.speedRounds);
                break;
            case 'story':
                onStoryBasedChallengeGenerated(data.storyBasedChallenge);
                break;
            case 'scenarios':
                onScenariosAndAnalogiesGenerated(data.scenariosAndAnalogies);
                break;
            case 'creative':
                onOutsideTheBoxGenerated(data.outsideTheBox);
                break;
            case 'adventures':
                onMiniAdventureGenerated(data.miniAdventure);
                break;
            case 'tracking':
                onKnowledgeTrackerGenerated(data.knowledgeTracker);
                break;
        }
    };

    const handleGenerateAndNavigate = async (featureId: string) => {
        if (allGameData) {
            navigateToGame(featureId, allGameData);
            return;
        }

        if (isGenerating || !notes.trim()) return;

        setIsGenerating(true);
        try {
            const result = await generateAllGames(notes);
            if (result) {
                setAllGameData(result);
                navigateToGame(featureId, result);
            } else {
                alert("Sorry, I couldn't create games from that text. Please try again with different material.");
            }
        } catch (error) {
            console.error("Error generating games:", error);
            alert("An error occurred while conjuring your games. Please check your connection and try again.");
        } finally {
            setIsGenerating(false);
        }
    };
    
    const handleFeatureClick = (featureId: string) => {
        if (featureId === 'tracking' && !notes.trim()) {
            if (isGenerating) return;
            setIsGenerating(true);
            try {
                const defaultData = generateDefaultKnowledgeTrackerData();
                onKnowledgeTrackerGenerated(defaultData);
            } catch (error) {
                console.error("Error getting default knowledge tracker:", error);
                alert("An error occurred while preparing your tracker.");
            } finally {
                setIsGenerating(false);
            }
        } else {
            handleGenerateAndNavigate(featureId);
        }
    };

    return (
        <div className="min-h-screen w-full bg-gradient-to-br from-pastel-purple via-pastel-pink to-pastel-yellow font-nunito p-4 sm:p-6 overflow-hidden relative flex flex-col items-center">
            {/* Animated Glittery Clouds on a pastel background */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
                <div className="absolute -top-1/4 -left-1/4 w-[200%] h-[200%] animate-cloud-drift-slow">
                    <div className="absolute w-96 h-96 bg-[radial-gradient(ellipse_at_center,_rgba(255,255,255,0.4)_0%,_rgba(255,255,255,0)_70%)] rounded-full animate-sparkle-subtle" style={{ top: '20%', left: '10%' }}></div>
                    <div className="absolute w-80 h-80 bg-[radial-gradient(ellipse_at_center,_rgba(255,221,238,0.3)_0%,_rgba(255,221,238,0)_70%)] rounded-full animate-sparkle-subtle" style={{ top: '50%', left: '60%', animationDelay: '2s' }}></div>
                </div>
                 <div className="absolute -top-1/4 -left-1/4 w-[200%] h-[200%] animate-cloud-drift-fast">
                    <div className="absolute w-72 h-72 bg-[radial-gradient(ellipse_at_center,_rgba(255,255,255,0.3)_0%,_rgba(255,255,255,0)_70%)] rounded-full animate-sparkle-subtle" style={{ top: '30%', left: '80%', animationDelay: '1s' }}></div>
                    <div className="absolute w-64 h-64 bg-[radial-gradient(ellipse_at_center,_rgba(255,221,238,0.4)_0%,_rgba(255,221,238,0)_70%)] rounded-full animate-sparkle-subtle" style={{ top: '70%', left: '20%', animationDelay: '3s' }}></div>
                </div>
            </div>

            {/* Main Content */}
            <div className="relative z-10 flex flex-col items-center w-full max-w-4xl mx-auto flex-grow">
                <div className="w-28 h-28 sm:w-32 sm:h-32 mb-4 animate-fade-in" style={{filter: 'drop-shadow(0 4px 10px rgba(0,0,0,0.1))'}}>
                    <avatar.component />
                </div>
                
                {/* Creation Board Section */}
                <div className="w-full flex flex-col items-center mb-6 flex-grow">
                     <h2 className="text-3xl sm:text-4xl font-handwritten text-center mb-4 text-aurora-dark-text/80" style={{textShadow: '0 1px 3px rgba(255,255,255,0.5)'}}>Upload, Write, or Paste Your Material</h2>
                    <div 
                        className="relative w-full p-0.5 rounded-2xl bg-gradient-to-r from-aurora-purple/30 via-white/50 to-aurora-purple/30 shadow-2xl shadow-aurora-purple/10 h-full"
                    >
                        <div className="bg-white/40 backdrop-blur-sm rounded-[14px] p-4 flex flex-col h-full">
                            <textarea 
                                value={notes}
                                onChange={(e) => setNotes(e.target.value)}
                                maxLength={MAX_CHARS}
                                placeholder="Begin your journey here..."
                                className="w-full flex-grow bg-transparent border-none focus:ring-0 outline-none resize-none placeholder:text-aurora-dark-text/40 
                                           text-lg text-aurora-dark-text/90"
                            />
                             <div className="flex justify-between items-center mt-2 border-t border-white/30 pt-2">
                                <div className="flex items-center gap-2">
                                     <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept=".txt,.md,.rtf" />
                                     <button onClick={handleUploadClick} className="bg-white/50 hover:bg-white/80 text-aurora-dark-text/80 font-bold text-xs py-1.5 px-4 rounded-full transition-colors duration-300">
                                         Upload File
                                     </button>
                                     {selectedFile && <span className="text-xs text-aurora-dark-text/70 truncate max-w-[150px]">{selectedFile.name}</span>}
                                </div>
                                <div className="text-right text-sm text-aurora-dark-text/60 font-mono">{notes.length} / {MAX_CHARS}</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Feature Buttons */}
                <div className="w-full grid grid-cols-3 md:grid-cols-5 gap-2 sm:gap-3">
                    {creationFeatures.map((feature, index) => {
                        const isLoading = isGenerating;
                        const isTrackingButton = feature.id === 'tracking';
                        const isDisabled = isTrackingButton ? isLoading : (!notes.trim() || isLoading);
                        return (
                            <button
                                key={feature.id}
                                onClick={() => handleFeatureClick(feature.id)}
                                disabled={isDisabled && !allGameData}
                                className={`relative text-center w-full overflow-hidden flex items-center justify-center h-16
                                           bg-gradient-to-br from-aurora-gold/20 via-aurora-gold/5 to-transparent backdrop-blur-md 
                                           border border-aurora-gold/40 text-aurora-gold-dark font-semibold text-[10px] sm:text-xs
                                           py-2 px-1 rounded-lg shadow-lg shadow-aurora-gold/10
                                           transform active:scale-95 hover:bg-aurora-gold/30 hover:border-aurora-gold/60 
                                           transition-all duration-300 ease-in-out animate-fade-in
                                           disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none`}
                                 style={{ animationDelay: `${200 + index * 50}ms` }}
                            >
                                <span 
                                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-glass-shine" 
                                    style={{ backgroundSize: '200% 100%' }}
                                ></span>
                                <span className={`relative transition-opacity duration-300 ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
                                    {feature.label}
                                </span>
                                {isLoading && (
                                    <span className="absolute inset-0 flex items-center justify-center animate-pulse text-xs">
                                        Conjuring...
                                    </span>
                                )}
                            </button>
                        )
                    })}
                </div>
            </div>
        </div>
    );
};

export default CreationHubScreen;