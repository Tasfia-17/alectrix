import React, { useState, useEffect, useMemo, useRef } from 'react';
import { AvatarData } from '../App';
import { generateKnowledgeMap, KnowledgeMapData, KnowledgeMapNode } from '../lib/gemini';
import RoastingAvatar from '../components/common/RoastingAvatar';
import PixelatedButton from '../components/common/PixelatedButton';

interface KnowledgeMapScreenProps {
  avatar: AvatarData;
  notes: string;
  setNotes: (notes: string) => void;
  onBack: () => void;
}

const useGraphLayout = (mapData: KnowledgeMapData | null, width: number, height: number) => {
    return useMemo(() => {
        if (!mapData || !mapData.nodes || width === 0) return { nodePositions: new Map(), edgePaths: [] };

        const nodePositions = new Map<string, { x: number, y: number }>();
        const centralNodes = mapData.nodes.filter(n => n.isCentral);
        const otherNodes = mapData.nodes.filter(n => !n.isCentral);
        
        const centerX = width / 2;
        const centerY = height / 2;
        const radius = Math.min(width, height) / 2.8;

        centralNodes.forEach((node, i) => {
            const angle = (i / centralNodes.length) * 2 * Math.PI;
            nodePositions.set(node.id, {
                x: centerX + (centralNodes.length > 1 ? Math.cos(angle) * radius / 3.5 : 0),
                y: centerY + (centralNodes.length > 1 ? Math.sin(angle) * radius / 3.5 : 0),
            });
        });

        otherNodes.forEach((node, i) => {
            const angle = (i / otherNodes.length) * 2 * Math.PI;
            nodePositions.set(node.id, {
                x: centerX + Math.cos(angle) * radius,
                y: centerY + Math.sin(angle) * radius,
            });
        });
        
        const edgePaths = mapData.edges.map(edge => {
            const fromPos = nodePositions.get(edge.from);
            const toPos = nodePositions.get(edge.to);
            if (!fromPos || !toPos) return null;
            return {
                id: `${edge.from}-${edge.to}`,
                path: `M ${fromPos.x} ${fromPos.y} L ${toPos.x} ${toPos.y}`,
                labelPos: { x: (fromPos.x + toPos.x) / 2, y: (fromPos.y + toPos.y) / 2 },
                label: edge.label,
                from: edge.from,
                to: edge.to,
            };
        }).filter((p): p is NonNullable<typeof p> => p !== null);

        return { nodePositions, edgePaths };
    }, [mapData, width, height]);
};

const KnowledgeMapScreen: React.FC<KnowledgeMapScreenProps> = ({ avatar, notes, setNotes, onBack }) => {
    const [mapData, setMapData] = useState<KnowledgeMapData | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [selectedNode, setSelectedNode] = useState<KnowledgeMapNode | null>(null);
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (containerRef.current) {
            const resizeObserver = new ResizeObserver(entries => {
                const { width, height } = entries[0].contentRect;
                setDimensions({ width, height });
            });
            resizeObserver.observe(containerRef.current);
            return () => resizeObserver.disconnect();
        }
    }, []);

    const { nodePositions, edgePaths } = useGraphLayout(mapData, dimensions.width, dimensions.height);

    const handleGenerateMap = async () => {
        if (notes.trim().length < 50) {
            setError("Please enter at least 50 characters of notes to generate a map.");
            return;
        }
        setIsLoading(true);
        setError(null);
        setSelectedNode(null);
        try {
            const data = await generateKnowledgeMap(notes);
            if (data && data.nodes && data.edges) {
                setMapData(data);
            } else {
                setError("Sorry, I couldn't generate a map from that. Try different notes.");
            }
        } catch (e) {
            setError("An unexpected error occurred. Please try again.");
            console.error(e);
        } finally {
            setIsLoading(false);
        }
    };
    
    const relatedNodeIds = useMemo(() => {
        if (!selectedNode || !mapData) return new Set();
        const connected = new Set([selectedNode.id]);
        mapData.edges.forEach(edge => {
            if (edge.from === selectedNode.id) connected.add(edge.to);
            if (edge.to === selectedNode.id) connected.add(edge.from);
        });
        return connected;
    }, [selectedNode, mapData]);

    const renderInitialView = () => (
        <div className="w-full max-w-2xl flex flex-col items-center animate-fade-in">
             <RoastingAvatar avatar={avatar} text="Let's see if we can make sense of this mess you call 'notes'." />
             <textarea 
                value={notes}
                onChange={e => setNotes(e.target.value)}
                placeholder="Paste your study material here..."
                className="w-full h-48 sm:h-64 my-4 bg-pixel-purple-mid text-pixel-purple-light p-3 border-2 border-pixel-black focus:outline-none focus:border-pixel-yellow placeholder:text-pixel-purple-light/50 resize-none"
             />
             {error && <p className="text-red-400 mb-2 text-center">{error}</p>}
             <PixelatedButton onClick={handleGenerateMap}>
                Generate Map
             </PixelatedButton>
        </div>
    );

    const renderLoadingView = () => (
        <div className="text-center text-pixel-yellow animate-pulse">
            <h2 className="text-3xl">Analyzing Connections...</h2>
            <p className="text-pixel-purple-light/80">My circuits are buzzing. Try not to rush me.</p>
        </div>
    );

    const renderMapView = () => (
        <div className="w-full h-full flex flex-col sm:flex-row gap-4">
            <div ref={containerRef} className="flex-grow relative h-96 sm:h-auto">
                <svg width="100%" height="100%" className="absolute inset-0">
                    <defs>
                        <radialGradient id="nodeGlow" cx="50%" cy="50%" r="50%">
                            <stop offset="0%" stopColor="rgba(255, 209, 102, 0.8)" />
                            <stop offset="100%" stopColor="rgba(255, 209, 102, 0)" />
                        </radialGradient>
                    </defs>
                    {/* Edges */}
                    {edgePaths.map(edge => (
                        <g key={edge.id}>
                            <path d={edge.path} strokeWidth="2" className={`transition-all duration-300 ${selectedNode && (relatedNodeIds.has(edge.from) || relatedNodeIds.has(edge.to)) ? 'stroke-pixel-yellow/80' : 'stroke-pixel-purple-light/30'}`} />
                            <text x={edge.labelPos.x} y={edge.labelPos.y} textAnchor="middle" dy="-4" className={`text-xs fill-pixel-purple-light/60 transition-opacity duration-300 ${selectedNode ? 'opacity-0' : 'opacity-100'}`}>{edge.label}</text>
                        </g>
                    ))}
                    {/* Nodes */}
                    {mapData?.nodes.map(node => {
                        const pos = nodePositions.get(node.id);
                        if (!pos) return null;
                        const isRelated = selectedNode && relatedNodeIds.has(node.id);
                        const isSelected = selectedNode?.id === node.id;
                        const radius = node.isCentral ? 16 : 12;
                        return (
                            <g key={node.id} transform={`translate(${pos.x}, ${pos.y})`} onClick={() => setSelectedNode(node)} className="cursor-pointer group">
                                {isRelated && <circle r={radius * 2} fill="url(#nodeGlow)" className="pointer-events-none animate-pulse" />}
                                <circle r={radius} className={`transition-all duration-300 ${isRelated ? 'fill-pixel-yellow' : 'fill-pixel-purple-light'} ${isSelected ? 'stroke-white' : 'stroke-pixel-black'} stroke-2`} />
                                <text textAnchor="middle" dy={radius + 14} className={`text-sm select-none transition-all duration-300 ${isRelated ? 'fill-white font-bold' : 'fill-pixel-purple-light/80'}`}>{node.label}</text>
                            </g>
                        );
                    })}
                </svg>
            </div>
             <div className={`w-full sm:w-64 flex-shrink-0 bg-pixel-purple-mid/50 border-2 border-pixel-black p-4 backdrop-blur-sm transition-all duration-500 transform ${selectedNode ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}`} style={{ boxShadow: '2px 2px 0px #000' }}>
                {selectedNode && (
                    <div className="text-pixel-purple-light">
                        <h3 className="text-xl text-pixel-yellow font-bold mb-2">{selectedNode.label}</h3>
                        <p className="text-sm">{selectedNode.summary}</p>
                    </div>
                )}
            </div>
        </div>
    );

    return (
        <div className="min-h-screen font-mono p-4 sm:p-6 flex flex-col items-center justify-center relative" 
             style={{
              backgroundColor: '#2c2a4a',
              backgroundImage: `radial-gradient(#4a476b 1px, transparent 1px), radial-gradient(#4a476b 1px, #2c2a4a 1px)`,
              backgroundSize: '20px 20px',
              backgroundPosition: '0 0, 10px 10px'
            }}>
             <div className="absolute top-4 left-4 z-20">
                <button onClick={mapData ? () => { setMapData(null); setSelectedNode(null); } : onBack} className="bg-pixel-yellow/80 text-black font-bold p-2 border-2 border-pixel-black">
                   {mapData ? 'Reset' : 'Back'}
                </button>
             </div>
             <div className="w-full h-[80vh] max-w-6xl flex items-center justify-center">
                {isLoading ? renderLoadingView() : (mapData ? renderMapView() : renderInitialView())}
             </div>
        </div>
    );
};

export default KnowledgeMapScreen;
