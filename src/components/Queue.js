import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaPlay, FaTrash } from 'react-icons/fa';

const QueueContainer = styled(motion.div)`
  position: fixed;
  top: 0;
  right: 0;
  width: 400px;
  height: 100vh;
  background: #282828;
  border-left: 1px solid rgba(255, 255, 255, 0.1);
  z-index: 1000;
  display: flex;
  flex-direction: column;
`;

const QueueHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
`;

const QueueTitle = styled.h2`
  font-size: 18px;
  font-weight: bold;
  color: white;
  margin: 0;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: rgba(255, 255, 255, 0.6);
  cursor: pointer;
  font-size: 18px;
  padding: 8px;
  border-radius: 50%;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(255, 255, 255, 0.1);
    color: white;
  }
`;

const QueueInfo = styled.div`
  padding: 16px 20px;
  background: rgba(255, 255, 255, 0.05);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
`;

const QueueStats = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
  color: rgba(255, 255, 255, 0.7);
`;

const QueueTabs = styled.div`
  display: flex;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
`;

const QueueTab = styled.button`
  flex: 1;
  padding: 12px 16px;
  background: none;
  border: none;
  color: ${props => props.active ? 'white' : 'rgba(255, 255, 255, 0.6)'};
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  border-bottom: 2px solid ${props => props.active ? '#1DB954' : 'transparent'};
  
  &:hover {
    color: white;
  }
`;

const QueueList = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 0;
`;

const QueueItem = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 20px;
  cursor: pointer;
  transition: all 0.3s ease;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  
  &:hover {
    background: rgba(255, 255, 255, 0.05);
  }
  
  ${props => props.isPlaying && `
    background: rgba(29, 185, 84, 0.1);
    border-left: 3px solid #1DB954;
  `}
`;

const TrackImage = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 4px;
  object-fit: cover;
`;

const TrackInfo = styled.div`
  flex: 1;
  min-width: 0;
`;

const TrackName = styled.div`
  font-size: 14px;
  font-weight: 600;
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

const TrackDuration = styled.div`
  font-size: 12px;
  color: rgba(255, 255, 255, 0.6);
  min-width: 50px;
  text-align: right;
`;

const TrackActions = styled.div`
  display: flex;
  gap: 8px;
  opacity: 0;
  transition: opacity 0.3s ease;
  
  ${QueueItem}:hover & {
    opacity: 1;
  }
`;

const ActionButton = styled.button`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  border: none;
  color: rgba(255, 255, 255, 0.8);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(255, 255, 255, 0.2);
    color: white;
  }
  
  svg {
    font-size: 10px;
  }
`;

const EmptyQueue = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 200px;
  color: rgba(255, 255, 255, 0.6);
  text-align: center;
`;

const EmptyIcon = styled.div`
  font-size: 48px;
  margin-bottom: 16px;
  opacity: 0.5;
`;

const EmptyText = styled.h3`
  font-size: 16px;
  margin-bottom: 8px;
  color: rgba(255, 255, 255, 0.8);
`;

const EmptySubtext = styled.p`
  font-size: 14px;
  color: rgba(255, 255, 255, 0.5);
`;

const formatDuration = (seconds) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
};

const Queue = ({ isOpen, onClose, playlist, currentIndex, onPlayTrack, onRemoveTrack }) => {
  const [activeTab, setActiveTab] = useState('queue');

  const handlePlayTrack = (track, index) => {
    onPlayTrack(track, playlist, index);
  };

  const handleRemoveTrack = (index) => {
    onRemoveTrack(index);
  };

  const renderQueueContent = () => {
    if (!playlist || playlist.length === 0) {
      return (
        <EmptyQueue>
          <EmptyIcon>🎵</EmptyIcon>
          <EmptyText>Queue is empty</EmptyText>
          <EmptySubtext>Add songs to start listening</EmptySubtext>
        </EmptyQueue>
      );
    }

    return (
      <QueueList>
        {playlist.map((track, index) => (
          <QueueItem
            key={`${track.id}-${index}`}
            isPlaying={index === currentIndex}
            onClick={() => handlePlayTrack(track, index)}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <TrackImage src={track.image} alt={track.name} />
            <TrackInfo>
              <TrackName>{track.name}</TrackName>
              <TrackArtist>{track.artist}</TrackArtist>
            </TrackInfo>
            <TrackDuration>{formatDuration(track.duration)}</TrackDuration>
            <TrackActions>
              <ActionButton onClick={(e) => {
                e.stopPropagation();
                handlePlayTrack(track, index);
              }}>
                <FaPlay />
              </ActionButton>
              <ActionButton onClick={(e) => {
                e.stopPropagation();
                handleRemoveTrack(index);
              }}>
                <FaTrash />
              </ActionButton>
            </TrackActions>
          </QueueItem>
        ))}
      </QueueList>
    );
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <QueueContainer
          initial={{ x: 400 }}
          animate={{ x: 0 }}
          exit={{ x: 400 }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        >
          <QueueHeader>
            <QueueTitle>Queue</QueueTitle>
            <CloseButton onClick={onClose}>
              <FaTimes />
            </CloseButton>
          </QueueHeader>

          <QueueInfo>
            <QueueStats>
              <span>{playlist ? playlist.length : 0} songs</span>
              <span>
                {playlist ? 
                  formatDuration(playlist.reduce((total, track) => total + track.duration, 0)) 
                  : '0:00'
                }
              </span>
            </QueueStats>
          </QueueInfo>

          <QueueTabs>
            <QueueTab 
              active={activeTab === 'queue'} 
              onClick={() => setActiveTab('queue')}
            >
              Queue
            </QueueTab>
            <QueueTab 
              active={activeTab === 'history'} 
              onClick={() => setActiveTab('history')}
            >
              History
            </QueueTab>
          </QueueTabs>

          {activeTab === 'queue' && renderQueueContent()}
          {activeTab === 'history' && (
            <EmptyQueue>
              <EmptyIcon>⏰</EmptyIcon>
              <EmptyText>No listening history</EmptyText>
              <EmptySubtext>Your recently played tracks will appear here</EmptySubtext>
            </EmptyQueue>
          )}
        </QueueContainer>
      )}
    </AnimatePresence>
  );
};

export default Queue; 