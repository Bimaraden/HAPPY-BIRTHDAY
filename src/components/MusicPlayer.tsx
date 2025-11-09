import { useState, useEffect, useRef, useCallback } from 'react';
import { Play, Pause, SkipForward, SkipBack, Volume2, VolumeX, ChevronDown } from 'lucide-react';

interface Song {
  id: number;
  title: string;
  artist: string;
  url: string;
}

interface MusicPlayerProps {
  songs: Song[];
}

function MusicPlayer({ songs }: MusicPlayerProps) {
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const [showPlaylist, setShowPlaylist] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const currentSong = songs[currentSongIndex];

  useEffect(() => {
    setIsPlaying(true);
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.play().catch(error => {
        console.error("Playback failed:", error);
        setIsPlaying(false);
      });
    } else {
      audio.pause();
    }
  }, [isPlaying, currentSongIndex]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const changeToNextSong = useCallback((nextIndex: number) => {
    setTimeout(() => {
      setCurrentSongIndex(nextIndex);
      setIsPlaying(true);
    }, 1000); // Changed from 2000 to 1000 for 1 second delay
  }, []);

  const handleEnded = () => {
    if (currentSongIndex < songs.length - 1) {
      setIsPlaying(false); // Stop current song
      changeToNextSong(currentSongIndex + 1);
    } else {
      setIsPlaying(false);
      changeToNextSong(0); // Go back to first song
    }
  };

  const playNext = () => {
    if (songs.length === 0) return;
    setIsPlaying(false); // Stop current song
    const nextIndex = (currentSongIndex + 1) % songs.length;
    changeToNextSong(nextIndex);
  };

  const playPrevious = () => {
    if (songs.length === 0) return;
    setIsPlaying(false); // Stop current song
    const prevIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    changeToNextSong(prevIndex);
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const percent = (e.clientX - rect.left) / rect.width;
    const newTime = percent * duration;
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
    }
  };

  const handleSelectSong = (index: number) => {
    setCurrentSongIndex(index);
    setIsPlaying(true);
  };

  const formatTime = (time: number) => {
    if (!time || isNaN(time)) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  if (songs.length === 0) {
    return null;
  }

  return (
    <div className="mb-12">
      <audio
        ref={audioRef}
        src={currentSong.url}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={handleEnded}
      />

      <div className="max-w-2xl mx-auto">
        <div className="bg-gradient-to-b from-gray-900 via-gray-800 to-gray-700 rounded-3xl text-white overflow-hidden shadow-2xl">
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-sm font-bold text-gray-300 uppercase tracking-wider">
                Sedang Diputar
              </h2>
              <button
                onClick={() => setShowPlaylist(!showPlaylist)}
                className="text-gray-400 hover:text-white transition-colors"
                title={showPlaylist ? 'Sembunyikan Playlist' : 'Tampilkan Playlist'}
              >
                <ChevronDown
                  className={`w-5 h-5 transition-transform ${
                    showPlaylist ? 'rotate-180' : ''
                  }`}
                />
              </button>
            </div>

            <div className="text-center mb-6">
              <div className="text-6xl mb-4 animate-pulse">🎵</div>
              <h3 className="text-2xl font-bold text-white truncate">
                {currentSong.title}
              </h3>
              <p className="text-sm text-gray-400 truncate mt-2">
                {currentSong.artist}
              </p>
            </div>

            <div
              className="bg-gray-700 h-1.5 rounded-full mb-3 cursor-pointer hover:bg-pink-500 transition-colors group"
              onClick={handleProgressClick}
            >
              <div
                className="bg-gradient-to-r from-pink-400 to-purple-400 h-full rounded-full transition-all group-hover:bg-pink-500"
                style={{
                  width: duration ? `${(currentTime / duration) * 100}%` : '0%',
                }}
              />
            </div>

            <div className="flex items-center justify-between text-xs text-gray-400 mb-6">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>

            <div className="flex items-center justify-center gap-6 mb-6">
              <button
                onClick={playPrevious}
                className="p-2 hover:bg-gray-600 rounded-full transition-colors"
                title="Previous"
              >
                <SkipBack className="w-6 h-6" />
              </button>

              <button
                onClick={togglePlayPause}
                className="p-4 bg-gradient-to-r from-pink-400 to-purple-400 hover:from-pink-500 hover:to-purple-500 rounded-full transition-all transform hover:scale-110 shadow-lg"
                title={isPlaying ? 'Pause' : 'Play'}
              >
                {isPlaying ? (
                  <Pause className="w-7 h-7 fill-white" />
                ) : (
                  <Play className="w-7 h-7 fill-white ml-0.5" />
                )}
              </button>

              <button
                onClick={playNext}
                className="p-2 hover:bg-gray-600 rounded-full transition-colors"
                title="Next"
              >
                <SkipForward className="w-6 h-6" />
              </button>
            </div>

            <div className="flex items-center justify-center gap-3 px-4 py-3 bg-gray-700/50 rounded-lg">
              {volume > 0 ? (
                <Volume2 className="w-4 h-4 flex-shrink-0" />
              ) : (
                <VolumeX className="w-4 h-4 flex-shrink-0" />
              )}
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={volume}
                onChange={(e) => setVolume(parseFloat(e.target.value))}
                className="w-full h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer accent-pink-400"
              />
            </div>
          </div>

          {showPlaylist && (
            <div className="border-t border-gray-700 bg-gray-800/50 p-4">
              <h4 className="text-xs font-bold text-gray-300 mb-3 uppercase tracking-wider">
                Playlist ({songs.length})
              </h4>
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {songs.map((song, index) => (
                  <div
                    key={song.id}
                    onClick={() => handleSelectSong(index)}
                    className={`p-3 rounded-lg cursor-pointer transition-all ${
                      index === currentSongIndex
                        ? 'bg-gradient-to-r from-pink-400 to-purple-400 text-white'
                        : 'bg-gray-700 text-gray-200 hover:bg-gray-600'
                    }`}
                  >
                    <div className="flex items-start gap-2">
                      <span className="text-xs font-bold flex-shrink-0 w-5">
                        {index + 1}
                      </span>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-sm truncate">
                          {song.title}
                        </p>
                        <p className="text-xs opacity-75 truncate">
                          {song.artist}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default MusicPlayer;
