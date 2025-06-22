import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaPlay } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useMusic } from '../context/MusicContext';

const Card = styled(motion.div)`
  background: rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 16px;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  
  &:hover {
    background: rgba(255, 255, 255, 0.15);
    transform: translateY(-5px);
  }
`;

const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 1;
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 12px;
`;

const AlbumImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
  
  ${Card}:hover & {
    transform: scale(1.05);
  }
`;

const PlayButton = styled(motion.button)`
  position: absolute;
  bottom: 8px;
  right: 8px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #1DB954;
  border: none;
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transform: scale(0.8);
  transition: all 0.3s ease;
  
  ${Card}:hover & {
    opacity: 1;
    transform: scale(1);
  }
  
  &:hover {
    background: #1ed760;
    transform: scale(1.1);
  }
  
  svg {
    font-size: 14px;
  }
`;

const AlbumInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const AlbumName = styled.h3`
  font-size: 14px;
  font-weight: 600;
  color: white;
  margin-bottom: 4px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const AlbumArtist = styled.p`
  font-size: 12px;
  color: rgba(255, 255, 255, 0.7);
  margin-bottom: 4px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const AlbumYear = styled.p`
  font-size: 11px;
  color: rgba(255, 255, 255, 0.5);
`;

const AlbumCard = ({ album, onClick }) => {
  const navigate = useNavigate();
  const { playTrack } = useMusic();

  const handleClick = () => {
    if (onClick) {
      onClick(album);
    } else {
      navigate(`/album/${album.id}`);
    }
  };

  const handlePlay = (e) => {
    e.stopPropagation();
    if (album.tracks && album.tracks.length > 0) {
      playTrack(album.tracks[0], album.tracks, 0);
    }
  };

  const handleImageError = (e) => {
    e.target.src = 'https://via.placeholder.com/300x300/282828/ffffff?text=🎵';
  };

  const hasTracks = album.tracks && album.tracks.length > 0;

  return (
    <Card
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={handleClick}
    >
      <ImageContainer>
        <AlbumImage 
          src={album.image} 
          alt={album.name}
          onError={handleImageError}
        />
        {hasTracks && (
          <PlayButton
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handlePlay}
          >
            <FaPlay />
          </PlayButton>
        )}
      </ImageContainer>
      
      <AlbumInfo>
        <AlbumName>{album.name}</AlbumName>
        <AlbumArtist>{album.artist}</AlbumArtist>
        <AlbumYear>{album.year}</AlbumYear>
      </AlbumInfo>
    </Card>
  );
};

export default AlbumCard; 