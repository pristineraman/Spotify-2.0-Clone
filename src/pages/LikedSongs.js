import React from 'react';
import styled from 'styled-components';
import { useMusic } from '../context/MusicContext';
import TrackCard from '../components/TrackCard';
import { FaHeart } from 'react-icons/fa';

const LikedSongsContainer = styled.div`
  padding: 20px;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 30px;
`;

const IconWrapper = styled.div`
  background: linear-gradient(135deg, #FF6B6B, #FF8E8E);
  width: 120px;
  height: 120px;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  
  svg {
    font-size: 60px;
    color: white;
  }
`;

const HeaderInfo = styled.div``;

const PageTitle = styled.h1`
  font-size: 48px;
  font-weight: bold;
`;

const PageSubtitle = styled.p`
  font-size: 14px;
  color: rgba(255, 255, 255, 0.8);
  margin-top: 8px;
`;

const TracksGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
`;

const EmptyMessage = styled.div`
  text-align: center;
  padding: 50px;
  color: rgba(255, 255, 255, 0.7);
  
  h2 {
    font-size: 24px;
    margin-bottom: 10px;
  }
`;

const LikedSongs = ({ playTrack }) => {
  const { likedSongs } = useMusic();

  return (
    <LikedSongsContainer>
      <Header>
        <IconWrapper>
          <FaHeart />
        </IconWrapper>
        <HeaderInfo>
          <PageSubtitle>PLAYLIST</PageSubtitle>
          <PageTitle>Liked Songs</PageTitle>
          <PageSubtitle>{likedSongs.length} songs</PageSubtitle>
        </HeaderInfo>
      </Header>

      {likedSongs.length > 0 ? (
        <TracksGrid>
          {likedSongs.map((track, index) => (
            <TrackCard 
              key={track.id} 
              track={track} 
              onPlay={() => playTrack(track, likedSongs, index)} 
            />
          ))}
        </TracksGrid>
      ) : (
        <EmptyMessage>
          <h2>No liked songs yet.</h2>
          <p>Click the heart icon on a song to add it to this playlist.</p>
        </EmptyMessage>
      )}
    </LikedSongsContainer>
  );
};

export default LikedSongs; 