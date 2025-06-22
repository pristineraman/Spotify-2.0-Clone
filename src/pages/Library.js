import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FaPlus, FaHeart, FaMusic, FaClock } from 'react-icons/fa';
import TrackCard from '../components/TrackCard';
import PlaylistCard from '../components/PlaylistCard';
import CreatePlaylistModal from '../components/CreatePlaylistModal';
import { useMusic } from '../context/MusicContext';

const LibraryContainer = styled.div`
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
`;

const Header = styled.div`
  margin-bottom: 40px;
`;

const Title = styled.h1`
  font-size: 32px;
  font-weight: bold;
  margin-bottom: 8px;
  color: white;
`;

const Subtitle = styled.p`
  font-size: 16px;
  color: rgba(255, 255, 255, 0.7);
  margin-bottom: 20px;
`;

const TabContainer = styled.div`
  display: flex;
  gap: 20px;
  margin-bottom: 30px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
`;

const Tab = styled.button`
  padding: 12px 24px;
  background: ${props => props.active ? '#1DB954' : 'transparent'};
  border: none;
  border-radius: 8px 8px 0 0;
  color: ${props => props.active ? 'white' : 'rgba(255, 255, 255, 0.7)'};
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: ${props => props.active ? '600' : '400'};
  
  &:hover {
    background: ${props => props.active ? '#1ed760' : 'rgba(255, 255, 255, 0.1)'};
    color: white;
  }
`;

const Section = styled.section`
  margin-bottom: 40px;
`;

const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const SectionTitle = styled.h2`
  font-size: 24px;
  font-weight: 600;
  color: white;
`;

const CreateButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  background: #1DB954;
  border: none;
  border-radius: 20px;
  color: white;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 14px;
  
  &:hover {
    background: #1ed760;
    transform: translateY(-2px);
  }
  
  svg {
    font-size: 12px;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
`;

const LikedSongsCard = styled.div`
  background: linear-gradient(135deg, #450af5, #c4efd9);
  border-radius: 12px;
  padding: 20px;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  }
`;

const LikedSongsContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const LikedSongsTitle = styled.h3`
  font-size: 18px;
  font-weight: 600;
  color: white;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const LikedSongsCount = styled.p`
  font-size: 14px;
  color: rgba(255, 255, 255, 0.8);
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 60px 20px;
  color: rgba(255, 255, 255, 0.6);
`;

const EmptyIcon = styled.div`
  font-size: 48px;
  margin-bottom: 20px;
  opacity: 0.5;
`;

const EmptyText = styled.h3`
  font-size: 20px;
  margin-bottom: 10px;
  color: rgba(255, 255, 255, 0.8);
`;

const EmptySubtext = styled.p`
  font-size: 14px;
  color: rgba(255, 255, 255, 0.5);
`;

const Library = ({ playTrack }) => {
  const { likedSongs, playlists, addPlaylist } = useMusic();
  const [activeTab, setActiveTab] = useState('playlists');
  const [recentlyPlayed, setRecentlyPlayed] = useState([]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  useEffect(() => {
    // Simulate loading recently played
    setRecentlyPlayed([
      {
        id: 1,
        name: "Blinding Lights",
        artist: "The Weeknd",
        album: "After Hours",
        image: "https://picsum.photos/seed/1/300/300",
        preview_url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3",
        duration: 391
      }
    ]);
  }, []);

  const handleCreatePlaylist = (playlist) => {
    addPlaylist(playlist);
  };

  const tabs = [
    { id: 'playlists', label: 'Playlists', icon: <FaMusic /> },
    { id: 'liked', label: 'Liked Songs', icon: <FaHeart /> },
    { id: 'recent', label: 'Recently Played', icon: <FaClock /> }
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'playlists':
        return (
          <Section>
            <SectionHeader>
              <SectionTitle>Your Playlists</SectionTitle>
              <CreateButton onClick={() => setIsCreateModalOpen(true)}>
                <FaPlus />
                Create Playlist
              </CreateButton>
            </SectionHeader>
            <Grid>
              <LikedSongsCard onClick={() => { /* Navigate to liked songs page */ }}>
                <LikedSongsContent>
                  <LikedSongsTitle><FaHeart /> Liked Songs</LikedSongsTitle>
                  <LikedSongsCount>{likedSongs.length} songs</LikedSongsCount>
                </LikedSongsContent>
              </LikedSongsCard>
              {playlists.map(playlist => (
                <PlaylistCard key={playlist.id} playlist={playlist} />
              ))}
            </Grid>
          </Section>
        );

      case 'liked':
        return (
          <Section>
            <SectionHeader>
              <SectionTitle>Liked Songs</SectionTitle>
            </SectionHeader>
            <Grid>
              <LikedSongsCard>
                <LikedSongsContent>
                  <LikedSongsTitle>
                    <FaHeart />
                    Liked Songs
                  </LikedSongsTitle>
                  <LikedSongsCount>{likedSongs.length} songs</LikedSongsCount>
                </LikedSongsContent>
              </LikedSongsCard>
              {likedSongs.map((song, index) => (
                <TrackCard key={song.id} track={song} onPlay={() => playTrack(song, likedSongs, index)} />
              ))}
            </Grid>
          </Section>
        );

      case 'recent':
        return (
          <Section>
            <SectionHeader>
              <SectionTitle>Recently Played</SectionTitle>
            </SectionHeader>
            {recentlyPlayed.length > 0 ? (
              <Grid>
                {recentlyPlayed.map((track, index) => (
                  <TrackCard key={track.id} track={track} onPlay={() => playTrack(track, recentlyPlayed, index)} />
                ))}
              </Grid>
            ) : (
              <EmptyState>
                <EmptyIcon>⏰</EmptyIcon>
                <EmptyText>No recently played tracks</EmptyText>
                <EmptySubtext>Start listening to music to see your history</EmptySubtext>
              </EmptyState>
            )}
          </Section>
        );

      default:
        return null;
    }
  };

  return (
    <LibraryContainer>
      <Header>
        <Title>Your Library</Title>
        <Subtitle>Access your playlists, liked songs, and listening history</Subtitle>
      </Header>

      <TabContainer>
        {tabs.map((tab) => (
          <Tab
            key={tab.id}
            active={activeTab === tab.id}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.icon} {tab.label}
          </Tab>
        ))}
      </TabContainer>

      {renderContent()}

      <CreatePlaylistModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onCreatePlaylist={handleCreatePlaylist}
      />
    </LibraryContainer>
  );
};

export default Library; 