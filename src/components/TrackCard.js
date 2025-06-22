import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { FaPlay, FaHeart, FaRegHeart, FaEllipsisH } from 'react-icons/fa';
import { useMusic } from '../context/MusicContext';

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
`;

const TrackCardContainer = styled.div`
  background: rgba(255, 255, 255, 0.05);
  padding: 15px;
  border-radius: 8px;
  text-align: center;
  transition: all 0.3s ease;
  animation: ${fadeIn} 0.5s ease-out;
  position: relative;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
    transform: translateY(-5px);
  }
`;

const AlbumArt = styled.div`
  position: relative;
  margin-bottom: 15px;
  cursor: pointer;

  img {
    width: 100%;
    height: auto;
    border-radius: 6px;
    display: block;
  }
`;

const PlayOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0;
  transition: opacity 0.3s ease;
  border-radius: 6px;

  ${TrackCardContainer}:hover & {
    opacity: 1;
  }
`;

const PlayIcon = styled(FaPlay)`
  font-size: 28px;
`;

const TrackInfo = styled.div`
  text-align: left;
`;

const TrackName = styled.h4`
  font-size: 16px;
  font-weight: 500;
  color: white;
  margin: 0 0 5px 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const ArtistName = styled.p`
  font-size: 14px;
  color: rgba(255, 255, 255, 0.6);
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const ActionsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 15px;
`;

const LikeButton = styled.button`
  background: none;
  border: none;
  color: ${props => props.isLiked ? '#1DB954' : 'rgba(255, 255, 255, 0.6)'};
  font-size: 18px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    color: white;
    transform: scale(1.1);
  }
`;

const OptionsButton = styled(LikeButton)`
  position: relative;
`;

const DropdownMenu = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  background: #282828;
  border-radius: 4px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5);
  padding: 5px;
  z-index: 10;
  min-width: 180px;
`;

const DropdownItem = styled.button`
  background: none;
  border: none;
  color: white;
  padding: 10px 15px;
  width: 100%;
  text-align: left;
  font-size: 14px;
  cursor: pointer;

  &:hover {
    background: #333;
  }
`;

const PlaylistSubMenu = styled.div`
  position: absolute;
  top: 0;
  left: 100%;
  background: #282828;
  border-radius: 4px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.5);
  padding: 5px;
  z-index: 11;
  min-width: 180px;
`;


const TrackCard = ({ track, onPlay }) => {
  const { likedSongs, toggleLikedSong, playlists, addTrackToPlaylist } = useMusic();
  const [isOptionsOpen, setIsOptionsOpen] = useState(false);
  const [isPlaylistSubMenuOpen, setIsPlaylistSubMenuOpen] = useState(false);

  const isLiked = likedSongs.some(song => song.id === track.id);

  const handleAddToPlaylist = (playlistId) => {
    addTrackToPlaylist(playlistId, track);
    setIsOptionsOpen(false);
    setIsPlaylistSubMenuOpen(false);
  };

  return (
    <TrackCardContainer>
      <AlbumArt onClick={onPlay}>
        <img 
          src={track.image} 
          alt={track.name}
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/300x300/282828/ffffff?text=🎵';
          }}
        />
        <PlayOverlay>
          <PlayIcon />
        </PlayOverlay>
      </AlbumArt>
      <TrackInfo>
        <TrackName>{track.name}</TrackName>
        <ArtistName>{track.artist}</ArtistName>
      </TrackInfo>
      <ActionsContainer>
        <LikeButton isLiked={isLiked} onClick={() => toggleLikedSong(track)}>
          {isLiked ? <FaHeart /> : <FaRegHeart />}
        </LikeButton>
        <OptionsButton onClick={() => setIsOptionsOpen(!isOptionsOpen)} onBlur={() => setTimeout(() => setIsOptionsOpen(false), 200)}>
          <FaEllipsisH />
          {isOptionsOpen && (
            <DropdownMenu>
              <DropdownItem 
                onMouseEnter={() => setIsPlaylistSubMenuOpen(true)}
                onMouseLeave={() => setIsPlaylistSubMenuOpen(false)}
              >
                Add to Playlist
                {isPlaylistSubMenuOpen && (
                  <PlaylistSubMenu>
                    {playlists.length > 0 ? (
                      playlists.map(playlist => (
                        <DropdownItem key={playlist.id} onClick={() => handleAddToPlaylist(playlist.id)}>
                          {playlist.name}
                        </DropdownItem>
                      ))
                    ) : (
                      <DropdownItem disabled>No playlists</DropdownItem>
                    )}
                  </PlaylistSubMenu>
                )}
              </DropdownItem>
            </DropdownMenu>
          )}
        </OptionsButton>
      </ActionsContainer>
    </TrackCardContainer>
  );
};

export default TrackCard;