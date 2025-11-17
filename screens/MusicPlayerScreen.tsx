import React, { useState, FormEvent, useEffect } from 'react';
import PixelatedContainer from '../components/common/PixelatedContainer';

interface MusicPlayerScreenProps {
  onBack: () => void;
}

interface Track {
  id: number;
  name: string;
}

const MusicPlayerScreen: React.FC<MusicPlayerScreenProps> = ({ onBack }) => {
  const [tracks, setTracks] = useState<Track[]>(() => {
    const savedTracks = localStorage.getItem('music_tracks');
    return savedTracks ? JSON.parse(savedTracks) : [{ id: 1, name: "Lofi Beats to Procrastinate To" }];
  });
  const [newTrackName, setNewTrackName] = useState('');
  const [nowPlaying, setNowPlaying] = useState<string>(tracks[0]?.name || 'Silence...');

  useEffect(() => {
    localStorage.setItem('music_tracks', JSON.stringify(tracks));
  }, [tracks]);

  const handleAddTrack = (e: FormEvent) => {
    e.preventDefault();
    if (newTrackName.trim() === '') return;
    const newTrack: Track = {
      id: Date.now(),
      name: newTrackName,
    };
    setTracks([...tracks, newTrack]);
    setNewTrackName('');
  };

  const handleDeleteTrack = (id: number) => {
    setTracks(tracks.filter(track => track.id !== id));
  };

  return (
    <div className="min-h-screen font-mono p-4 sm:p-6 flex flex-col items-center" 
         style={{
          backgroundColor: '#2c2a4a',
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='10' height='10' viewBox='0 0 10 10' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='10' height='10' fill='%232c2a4a'/%3E%3Crect x='8' y='2' width='1' height='1' fill='%234a476b'/%3E%3Crect x='3' y='7' width='1' height='1' fill='%234a476b'/%3E%3C/svg%3E")`
        }}
    >
      <div className="w-full max-w-md flex-grow flex flex-col">
        <PixelatedContainer title="Study Jams">
          {/* Screen Display */}
          <div className="bg-pixel-blue-dark border-2 border-pixel-black p-4 mb-4 text-center">
            <p className="text-xs text-pixel-blue-light/50">NOW PLAYING:</p>
            <p className="text-lg text-white truncate">{nowPlaying}</p>
          </div>

          {/* Controls */}
          <div className="flex justify-center items-center gap-4 mb-4">
            <button className="text-3xl text-pixel-purple-light hover:text-white">|◄</button>
            <button className="text-5xl text-pixel-purple-light hover:text-white">►</button>
            <button className="text-3xl text-pixel-purple-light hover:text-white">►|</button>
          </div>

          <div className="flex-grow overflow-y-auto space-y-2 pr-2 border-t-2 border-pixel-black/20 pt-4">
            {tracks.map(track => (
              <div key={track.id} className="flex items-center gap-3 bg-pixel-purple-dark p-2 border border-pixel-black/50">
                <button onClick={() => setNowPlaying(track.name)} className="text-pixel-yellow text-xl">♪</button>
                <span className="flex-grow text-pixel-purple-light">{track.name}</span>
                <button onClick={() => handleDeleteTrack(track.id)} className="text-pixel-purple-light/50 hover:text-red-500 font-bold text-lg px-2">×</button>
              </div>
            ))}
          </div>
          
          <form onSubmit={handleAddTrack} className="flex gap-2 mt-4 border-t-2 border-pixel-black/20 pt-4">
            <input 
                type="text"
                value={newTrackName}
                onChange={(e) => setNewTrackName(e.target.value)}
                placeholder="Add a new track..."
                className="flex-grow bg-pixel-purple-dark text-pixel-purple-light p-2 border-2 border-pixel-black focus:outline-none focus:border-pixel-yellow placeholder:text-pixel-purple-light/50"
            />
            <button type="submit" className="bg-pixel-yellow text-deep-sienna font-bold p-2 border-2 border-pixel-black transform active:translate-x-0.5 active:translate-y-0.5" style={{ boxShadow: '2px 2px 0px #000' }}>
                +
            </button>
          </form>
        </PixelatedContainer>

        <div className="w-full flex flex-col items-center justify-end h-24 mt-4">
          <button 
              onClick={onBack}
              className="w-full max-w-sm bg-pixel-yellow text-deep-sienna font-bold text-lg py-3 px-8 border-2 border-pixel-black 
                         transform active:translate-x-1 active:translate-y-1 transition-all duration-100 ease-in-out
                         hover:bg-yellow-300"
              style={{ boxShadow: '4px 4px 0px #000000' }}
              >
              Back to Hub
          </button>
        </div>
      </div>
    </div>
  );
};

export default MusicPlayerScreen;
