import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { 
  FaPlay, 
  FaPause, 
  FaStepForward, 
  FaStepBackward,
  FaVolumeUp,
  FaVolumeMute,
  FaRandom,
  FaRedo,
  FaHeart,
  FaEllipsisH,
  FaList
} from 'react-icons/fa';
import { useMusic } from '../context/MusicContext';
import Queue from './Queue';

const PlayerContainer = styled.div`
  height: 90px;
  background: rgba(0, 0, 0, 0.9);
  backdrop-filter: blur(10px);
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  position: relative;
`;

const TrackInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  flex: 1;
  max-width: 300px;
`;

const TrackImage = styled.img`
  width: 56px;
  height: 56px;
  border-radius: 4px;
  object-fit: cover;
`;

const TrackDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const TrackName = styled.div`
  font-weight: 600;
  font-size: 14px;
  color: white;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const TrackArtist = styled.div`
  font-size: 12px;
  color: rgba(255, 255, 255, 0.7);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Controls = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  flex: 1;
`;

const ControlButtons = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const ControlButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: ${props => props.primary ? '#1DB954' : 'transparent'};
  color: ${props => props.primary ? 'white' : 'rgba(255, 255, 255, 0.8)'};
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: ${props => props.primary ? '#1ed760' : 'rgba(255, 255, 255, 0.1)'};
    transform: scale(1.1);
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }
  
  svg {
    font-size: ${props => props.primary ? '14px' : '16px'};
  }
`;

const ProgressContainer = styled.div`
  width: 100%;
  max-width: 400px;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const TimeDisplay = styled.div`
  font-size: 11px;
  color: rgba(255, 255, 255, 0.7);
  min-width: 40px;
`;

const ProgressBar = styled.div`
  flex: 1;
  height: 4px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 2px;
  cursor: pointer;
  position: relative;
  
  &:hover {
    background: rgba(255, 255, 255, 0.3);
  }
`;

const ProgressFill = styled.div`
  height: 100%;
  background: #1DB954;
  border-radius: 2px;
  width: ${props => props.progress}%;
  transition: width 0.1s ease;
`;

const VolumeControls = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  flex: 1;
  justify-content: flex-end;
  max-width: 300px;
`;

const VolumeButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: transparent;
  color: rgba(255, 255, 255, 0.8);
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(255, 255, 255, 0.1);
    color: white;
  }
  
  svg {
    font-size: 16px;
  }
`;

const VolumeSlider = styled.input`
  width: 100px;
  height: 4px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 2px;
  outline: none;
  cursor: pointer;
  
  &::-webkit-slider-thumb {
    appearance: none;
    width: 12px;
    height: 12px;
    background: #1DB954;
    border-radius: 50%;
    cursor: pointer;
  }
  
  &::-moz-range-thumb {
    width: 12px;
    height: 12px;
    background: #1DB954;
    border-radius: 50%;
    cursor: pointer;
    border: none;
  }
`;

const Player = ({ currentTrack, isPlaying, onPlayPause, onNext, onPrevious }) => {
  const { 
    volume, 
    setVolume, 
    repeat, 
    setRepeat, 
    shuffle, 
    toggleShuffle, 
    playlist, 
    currentIndex,
    toggleLikedSong,
    likedSongs
  } = useMusic();
  
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isQueueOpen, setIsQueueOpen] = useState(false);
  const audioRef = useRef(null);

  const isLiked = currentTrack ? likedSongs.some(song => song.id === currentTrack.id) : false;

  useEffect(() => {
    if (currentTrack) {
      setCurrentTime(0);
      setDuration(0);
      setError(null);
      setIsLoading(true);
    }
  }, [currentTrack]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        const playPromise = audioRef.current.play();
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              setIsLoading(false);
            })
            .catch(error => {
              console.error("Audio playback failed:", error);
              setError("Failed to play audio");
              setIsLoading(false);
            });
        }
      } else {
        audioRef.current.pause();
        setIsLoading(false);
      }
    }
  }, [isPlaying, currentTrack]);

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleEnded = () => {
    if (repeat === 'one') {
      if (audioRef.current) {
        audioRef.current.currentTime = 0;
        audioRef.current.play();
      }
    } else {
      onNext();
    }
  };

  const handleProgressClick = (e) => {
    if (audioRef.current && duration) {
      const rect = e.currentTarget.getBoundingClientRect();
      const percent = (e.clientX - rect.left) / rect.width;
      const newTime = percent * duration;
      audioRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
  };

  const formatTime = (time) => {
    if (isNaN(time)) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleToggleLike = () => {
    if (currentTrack) {
      toggleLikedSong(currentTrack);
    }
  };

  const handlePlayTrack = (track, playlist, index) => {
    // This would be handled by the parent component
    // Implementation would go here
  };

  const handleRemoveTrack = (index) => {
    // This would be handled by the parent component
    // Implementation would go here
  };

  const handleAudioError = () => {
    setError("Failed to load audio");
    setIsLoading(false);
  };

  const handleAudioLoadStart = () => {
    setIsLoading(true);
    setError(null);
  };

  const handleAudioCanPlay = () => {
    setIsLoading(false);
    setError(null);
  };

  if (!currentTrack) {
    return (
      <PlayerContainer>
        <div style={{ color: 'rgba(255, 255, 255, 0.6)', textAlign: 'center', width: '100%' }}>
          No track selected
        </div>
      </PlayerContainer>
    );
  }

  return (
    <>
      <audio
        ref={audioRef}
        src={currentTrack.preview_url}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={e => setDuration(e.target.duration)}
        onEnded={handleEnded}
        onError={handleAudioError}
        onLoadStart={handleAudioLoadStart}
        onCanPlay={handleAudioCanPlay}
        preload="metadata"
      />
      <PlayerContainer>
        <TrackInfo>
          <TrackImage 
            src={currentTrack.image || currentTrack.album?.images?.[0]?.url} 
            alt={currentTrack.name}
            onError={(e) => {
              e.target.src = 'https://via.placeholder.com/56x56/282828/ffffff?text=🎵';
            }}
          />
          <TrackDetails>
            <TrackName>{currentTrack.name}</TrackName>
            <TrackArtist>{currentTrack.artist || currentTrack.artists?.map(a => a.name).join(', ')}</TrackArtist>
          </TrackDetails>
          <VolumeButton onClick={handleToggleLike}>
            <FaHeart style={{ color: isLiked ? '#1DB954' : 'rgba(255, 255, 255, 0.8)' }} />
          </VolumeButton>
        </TrackInfo>

        <Controls>
          <ControlButtons>
            <ControlButton onClick={toggleShuffle} style={{ color: shuffle ? '#1DB954' : 'rgba(255, 255, 255, 0.8)' }}>
              <FaRandom />
            </ControlButton>
            <ControlButton onClick={onPrevious} disabled={playlist.length <= 1}>
              <FaStepBackward />
            </ControlButton>
            <ControlButton primary onClick={onPlayPause} disabled={isLoading}>
              {isLoading ? (
                <div style={{ width: '14px', height: '14px', border: '2px solid transparent', borderTop: '2px solid white', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
              ) : isPlaying ? (
                <FaPause />
              ) : (
                <FaPlay />
              )}
            </ControlButton>
            <ControlButton onClick={onNext} disabled={playlist.length <= 1}>
              <FaStepForward />
            </ControlButton>
            <ControlButton 
              onClick={() => setRepeat(repeat === 'none' ? 'all' : repeat === 'all' ? 'one' : 'none')}
              style={{ color: repeat !== 'none' ? '#1DB954' : 'rgba(255, 255, 255, 0.8)' }}
            >
              <FaRedo />
            </ControlButton>
          </ControlButtons>
          
          <ProgressContainer>
            <TimeDisplay>{formatTime(currentTime)}</TimeDisplay>
            <ProgressBar onClick={handleProgressClick}>
              <ProgressFill progress={(currentTime / duration) * 100 || 0} />
            </ProgressBar>
            <TimeDisplay>{formatTime(duration)}</TimeDisplay>
          </ProgressContainer>
          
          {error && (
            <div style={{ color: '#ff6b6b', fontSize: '12px', marginTop: '4px' }}>
              {error}
            </div>
          )}
        </Controls>

        <VolumeControls>
          <VolumeButton onClick={() => setVolume(volume === 0 ? 0.5 : 0)}>
            {volume === 0 ? <FaVolumeMute /> : <FaVolumeUp />}
          </VolumeButton>
          <VolumeSlider
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={handleVolumeChange}
          />
          <VolumeButton onClick={() => setIsQueueOpen(!isQueueOpen)}>
            <FaList />
          </VolumeButton>
          <VolumeButton>
            <FaEllipsisH />
          </VolumeButton>
        </VolumeControls>
      </PlayerContainer>

      <Queue
        isOpen={isQueueOpen}
        onClose={() => setIsQueueOpen(false)}
        playlist={playlist}
        currentIndex={currentIndex}
        onPlayTrack={handlePlayTrack}
        onRemoveTrack={handleRemoveTrack}
      />
    </>
  );
};

export default Player; 