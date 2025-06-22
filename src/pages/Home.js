import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import TrackCard from '../components/TrackCard';
import PlaylistCard from '../components/PlaylistCard';
import AlbumCard from '../components/AlbumCard';
import { useMusic } from '../context/MusicContext';
import { useNavigate } from 'react-router-dom';

const HomeContainer = styled.div`
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
`;

const Header = styled.div`
  margin-bottom: 40px;
`;

const WelcomeText = styled.h1`
  font-size: 32px;
  font-weight: bold;
  margin-bottom: 8px;
  background: linear-gradient(45deg, #1DB954, #1ed760);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const Subtitle = styled.p`
  font-size: 16px;
  color: rgba(255, 255, 255, 0.7);
  margin-bottom: 20px;
`;

const Section = styled.section`
  margin-bottom: 40px;
`;

const SectionTitle = styled.h2`
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 20px;
  color: white;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
`;

const FeaturedSection = styled.div`
  background: linear-gradient(135deg, rgba(29, 185, 84, 0.1), rgba(30, 215, 96, 0.1));
  border-radius: 16px;
  padding: 30px;
  margin-bottom: 40px;
  border: 1px solid rgba(29, 185, 84, 0.2);
`;

const FeaturedTitle = styled.h2`
  font-size: 28px;
  font-weight: bold;
  margin-bottom: 20px;
  color: #1DB954;
`;

const FeaturedGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
`;

const GenreSection = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 15px;
  margin-bottom: 30px;
`;

const GenreCard = styled(motion.div)`
  background: linear-gradient(135deg, ${props => props.color1}, ${props => props.color2});
  border-radius: 12px;
  padding: 20px;
  cursor: pointer;
  transition: all 0.3s ease;
  text-align: center;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  }
`;

const GenreName = styled.h3`
  font-size: 16px;
  font-weight: 600;
  color: white;
  margin-bottom: 8px;
`;

const GenreCount = styled.p`
  font-size: 12px;
  color: rgba(255, 255, 255, 0.8);
`;

const LoadingSpinner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
  color: rgba(255, 255, 255, 0.6);
  
  &::after {
    content: '';
    width: 20px;
    height: 20px;
    border: 2px solid rgba(255, 255, 255, 0.3);
    border-top: 2px solid white;
    border-radius: 50%;
    animation: spin 1s linear infinite;
    margin-left: 10px;
  }
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const ErrorMessage = styled.div`
  text-align: center;
  padding: 40px 20px;
  color: #ff6b6b;
  background: rgba(255, 107, 107, 0.1);
  border-radius: 8px;
  margin: 20px 0;
`;

const Home = ({ playTrack }) => {
  const { userProfile, allTracks, allPlaylists, allAlbums } = useMusic();
  const [featuredTracks, setFeaturedTracks] = useState([]);
  const [recentPlaylists, setRecentPlaylists] = useState([]);
  const [trendingAlbums, setTrendingAlbums] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const genres = [
    { name: 'Pop', color1: '#ff6b6b', color2: '#ffa500', count: allTracks.filter(t => t.genre === 'Pop').length },
    { name: 'Rock', color1: '#4ecdc4', color2: '#44a08d', count: allTracks.filter(t => t.genre === 'Rock').length },
    { name: 'Hip-Hop', color1: '#45b7d1', color2: '#96c93d', count: allTracks.filter(t => t.genre === 'Hip-Hop').length },
    { name: 'Funk', color1: '#f39c12', color2: '#e67e22', count: allTracks.filter(t => t.genre === 'Funk').length },
    { name: 'Latin', color1: '#e74c3c', color2: '#c0392b', count: allTracks.filter(t => t.genre === 'Latin').length },
    { name: 'Electronic', color1: '#9b59b6', color2: '#8e44ad', count: allTracks.filter(t => t.genre === 'Electronic').length }
  ];

  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        // Featured tracks (first 4 tracks)
        setFeaturedTracks(allTracks.slice(0, 4));

        // Recent playlists (first 4 playlists)
        setRecentPlaylists(allPlaylists.slice(0, 4));

        // Trending albums (first 4 albums)
        setTrendingAlbums(allAlbums.slice(0, 4));
        
        setIsLoading(false);
      } catch (err) {
        console.error('Error loading home data:', err);
        setError('Failed to load content. Please try again.');
        setIsLoading(false);
      }
    };

    loadData();
  }, [allTracks, allPlaylists, allAlbums]);

  const handleGenreClick = (genreName) => {
    navigate(`/genre/${genreName.toLowerCase()}`);
  };

  const handleTrackPlay = (track) => {
    if (playTrack) {
      playTrack(track, featuredTracks, featuredTracks.findIndex(t => t.id === track.id));
    }
  };

  const handlePlaylistClick = (playlist) => {
    navigate(`/playlist/${playlist.id}`);
  };

  const handleAlbumClick = (album) => {
    navigate(`/album/${album.id}`);
  };

  if (isLoading) {
    return (
      <HomeContainer>
        <Header>
          <WelcomeText>Welcome back, {userProfile.name}!</WelcomeText>
          <Subtitle>What would you like to listen to today?</Subtitle>
        </Header>
        <LoadingSpinner>Loading your music...</LoadingSpinner>
      </HomeContainer>
    );
  }

  if (error) {
    return (
      <HomeContainer>
        <Header>
          <WelcomeText>Welcome back, {userProfile.name}!</WelcomeText>
          <Subtitle>What would you like to listen to today?</Subtitle>
        </Header>
        <ErrorMessage>
          <h3>Oops! Something went wrong</h3>
          <p>{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            style={{
              background: '#1DB954',
              color: 'white',
              border: 'none',
              padding: '10px 20px',
              borderRadius: '20px',
              cursor: 'pointer',
              marginTop: '10px'
            }}
          >
            Try Again
          </button>
        </ErrorMessage>
      </HomeContainer>
    );
  }

  return (
    <HomeContainer>
      <Header>
        <WelcomeText>Welcome back, {userProfile.name}!</WelcomeText>
        <Subtitle>What would you like to listen to today?</Subtitle>
      </Header>

      <Section>
        <SectionTitle>Browse by Genre</SectionTitle>
        <GenreSection>
          {genres.map((genre, index) => (
            <GenreCard
              key={genre.name}
              color1={genre.color1}
              color2={genre.color2}
              onClick={() => handleGenreClick(genre.name)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <GenreName>{genre.name}</GenreName>
              <GenreCount>{genre.count} tracks</GenreCount>
            </GenreCard>
          ))}
        </GenreSection>
      </Section>

      <FeaturedSection>
        <FeaturedTitle>Featured Tracks</FeaturedTitle>
        <FeaturedGrid>
          {featuredTracks.map((track, index) => (
            <motion.div
              key={track.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <TrackCard track={track} onPlay={() => handleTrackPlay(track)} />
            </motion.div>
          ))}
        </FeaturedGrid>
      </FeaturedSection>

      <Section>
        <SectionTitle>Recent Playlists</SectionTitle>
        <Grid>
          {recentPlaylists.map((playlist, index) => (
            <motion.div
              key={playlist.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <PlaylistCard 
                playlist={playlist} 
                onClick={() => handlePlaylistClick(playlist)}
              />
            </motion.div>
          ))}
        </Grid>
      </Section>

      <Section>
        <SectionTitle>Trending Albums</SectionTitle>
        <Grid>
          {trendingAlbums.map((album, index) => (
            <motion.div
              key={album.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <AlbumCard 
                album={album} 
                onClick={() => handleAlbumClick(album)}
              />
            </motion.div>
          ))}
        </Grid>
      </Section>
    </HomeContainer>
  );
};

export default Home; 