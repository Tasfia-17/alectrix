import React, { useMemo, useState, useEffect, useCallback } from 'react';
import PuzzleContainer from './PuzzleContainer';

interface Pair {
    term: string;
    definition: string;
}

interface MatchingData {
    title: string;
    pairs: Pair[];
}

interface Item {
    id: number;
    text: string;
}

const shuffleArray = (array: any[]) => {
    let currentIndex = array.length, randomIndex;
    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }
    return array;
};

const MatchingItem = React.memo(({ item, index, type, className, onClick }: { item: Item, index: number, type: 'term' | 'def', className: string, onClick: (item: Item) => void }) => {
    return (
        <div 
            className={`flex items-center gap-3 p-3 rounded-lg shadow-sm transition-all duration-300 cursor-pointer border ${className}`}
            onClick={() => onClick(item)}
        >
            <div className={`flex-shrink-0 w-8 h-8 flex items-center justify-center font-bold rounded-full select-none ${type === 'term' ? 'bg-aurora-purple/20 text-aurora-dark-text' : 'bg-aurora-gold/30 text-aurora-gold-dark'}`}>
                {type === 'term' ? index + 1 : String.fromCharCode(65 + index)}
            </div>
            <div className="font-semibold select-none">{item.text}</div>
        </div>
    );
});

const MatchingPuzzle: React.FC<{ data: MatchingData }> = ({ data }) => {
    const { title, pairs } = data;
    const [shuffledItems, setShuffledItems] = useState<{terms: Item[], definitions: Item[]}>({terms: [], definitions: []});
    
    const [selectedTerm, setSelectedTerm] = useState<Item | null>(null);
    const [matchedPairs, setMatchedPairs] = useState<number[]>([]);
    const [incorrectMatch, setIncorrectMatch] = useState<{termId: number, defId: number} | null>(null);
    
    useEffect(() => {
        const terms = pairs.map((p, index) => ({ id: index, text: p.term }));
        const definitions = pairs.map((p, index) => ({ id: index, text: p.definition }));
        setShuffledItems({
            terms: shuffleArray([...terms]),
            definitions: shuffleArray([...definitions]),
        });
        // Reset state when data changes
        setSelectedTerm(null);
        setMatchedPairs([]);
        setIncorrectMatch(null);
    }, [pairs]);

    const handleTermClick = useCallback((term: Item) => {
        if(matchedPairs.includes(term.id)) return;
        setSelectedTerm(term);
        setIncorrectMatch(null);
    }, [matchedPairs]);

    const handleDefinitionClick = useCallback((definition: Item) => {
        if (!selectedTerm || matchedPairs.includes(definition.id)) return;
        
        if (selectedTerm.id === definition.id) {
            setMatchedPairs(prev => [...prev, selectedTerm.id]);
            setSelectedTerm(null);
            setIncorrectMatch(null);
        } else {
            setIncorrectMatch({ termId: selectedTerm.id, defId: definition.id });
            setSelectedTerm(null);
            setTimeout(() => setIncorrectMatch(null), 1000);
        }
    }, [selectedTerm, matchedPairs]);

    const getTermClass = (term: Item) => {
        if (matchedPairs.includes(term.id)) return 'bg-green-200/80 border-green-300/80 opacity-60';
        if (selectedTerm?.id === term.id) return 'bg-pastel-yellow border-yellow-400/80 scale-105';
        if (incorrectMatch?.termId === term.id) return 'bg-red-200/80 border-red-300/80 animate-pulse';
        return 'bg-white/30 hover:bg-white/50 border-transparent';
    };

    const getDefClass = (def: Item) => {
        if (matchedPairs.includes(def.id)) return 'bg-green-200/80 border-green-300/80 opacity-60';
        if (incorrectMatch?.defId === def.id) return 'bg-red-200/80 border-red-300/80 animate-pulse';
        return 'bg-white/30 hover:bg-white/50 border-transparent';
    };
    
    const handleReset = () => {
        setSelectedTerm(null);
        setMatchedPairs([]);
        setIncorrectMatch(null);
    };

    return (
        <PuzzleContainer title={title}>
            <div className="flex justify-between items-center mb-4">
                <p className="text-center text-sm text-aurora-dark-text/70">
                    {selectedTerm ? `Matching: "${selectedTerm.text}"` : "Click a term on the left, then its definition on the right."}
                </p>
                <button onClick={handleReset} className="text-sm bg-white/50 hover:bg-white/80 text-aurora-dark-text/80 font-bold py-1 px-3 rounded-full transition-colors duration-300">
                    Reset
                </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
                {/* Terms Column */}
                <div className="space-y-3">
                    {shuffledItems.terms.map((item, index) => (
                        <MatchingItem
                            key={`term-${item.id}`}
                            item={item}
                            index={index}
                            type="term"
                            className={getTermClass(item)}
                            onClick={handleTermClick}
                        />
                    ))}
                </div>

                {/* Definitions Column */}
                 <div className="space-y-3">
                    {shuffledItems.definitions.map((item, index) => (
                        <MatchingItem
                            key={`def-${item.id}`}
                            item={item}
                            index={index}
                            type="def"
                            className={getDefClass(item)}
                            onClick={handleDefinitionClick}
                        />
                    ))}
                </div>
            </div>
        </PuzzleContainer>
    );
};

export default MatchingPuzzle;