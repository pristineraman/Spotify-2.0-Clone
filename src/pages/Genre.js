import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { FaPlay, FaMusic, FaFilter } from 'react-icons/fa';
import TrackCard from '../components/TrackCard';
import AlbumCard from '../components/AlbumCard';
import ArtistCard from '../components/ArtistCard';

const GenreContainer = styled.div`
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
`;

const GenreHeader = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 30px;
  margin-bottom: 40px;
`;

const GenreIcon = styled.div`
  width: 200px;
  height: 200px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${props => props.gradient};
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  
  svg {
    font-size: 80px;
    color: white;
  }
`;

const GenreInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const GenreType = styled.span`
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  color: #1DB954;
  letter-spacing: 1px;
`;

const GenreName = styled.h1`
  font-size: 48px;
  font-weight: bold;
  color: white;
  margin: 0;
`;

const GenreDescription = styled.p`
  font-size: 16px;
  color: rgba(255, 255, 255, 0.7);
  margin: 0;
`;

const GenreStats = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  font-size: 14px;
  color: rgba(255, 255, 255, 0.6);
`;

const GenreStat = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const GenreActions = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 20px;
`;

const ActionButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 24px;
  background: ${props => props.primary ? '#1DB954' : 'rgba(255, 255, 255, 0.1)'};
  border: none;
  border-radius: 25px;
  color: white;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 14px;
  font-weight: 600;
  
  &:hover {
    background: ${props => props.primary ? '#1ed760' : 'rgba(255, 255, 255, 0.2)'};
    transform: translateY(-2px);
  }
  
  svg {
    font-size: 16px;
  }
`;

const FilterSection = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 30px;
  padding: 16px 20px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
`;

const FilterLabel = styled.span`
  font-size: 14px;
  font-weight: 600;
  color: white;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const FilterSelect = styled.select`
  padding: 8px 12px;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 6px;
  color: white;
  font-size: 14px;
  outline: none;
  cursor: pointer;
  
  option {
    background: #282828;
    color: white;
  }
`;

const ContentSection = styled.div`
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

const SectionCount = styled.span`
  font-size: 14px;
  color: rgba(255, 255, 255, 0.6);
`;

const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
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

// Genre data with gradients and colors
const genreData = {
  pop: {
    name: "Pop",
    description: "Catchy melodies and mainstream hits",
    gradient: "linear-gradient(135deg, #FF6B6B, #FF8E8E)",
    tracks: 150,
    albums: 45,
    artists: 30
  },
  rock: {
    name: "Rock",
    description: "Electric guitars and powerful rhythms",
    gradient: "linear-gradient(135deg, #4ECDC4, #6EE7DF)",
    tracks: 200,
    albums: 60,
    artists: 40
  },
  hiphop: {
    name: "Hip Hop",
    description: "Rhythmic beats and lyrical flow",
    gradient: "linear-gradient(135deg, #45B7D1, #67C9E1)",
    tracks: 180,
    albums: 55,
    artists: 35
  },
  electronic: {
    name: "Electronic",
    description: "Synthesizers and digital sounds",
    gradient: "linear-gradient(135deg, #96CEB4, #B8E0C8)",
    tracks: 120,
    albums: 35,
    artists: 25
  },
  rnb: {
    name: "R&B",
    description: "Smooth vocals and soulful melodies",
    gradient: "linear-gradient(135deg, #FFEAA7, #FFF2C7)",
    tracks: 90,
    albums: 25,
    artists: 20
  },
  country: {
    name: "Country",
    description: "Storytelling and acoustic instruments",
    gradient: "linear-gradient(135deg, #DDA0DD, #E5B8E5)",
    tracks: 80,
    albums: 20,
    artists: 15
  },
  jazz: {
    name: "Jazz",
    description: "Improvisation and complex harmonies",
    gradient: "linear-gradient(135deg, #FFB347, #FFD700)",
    tracks: 60,
    albums: 15,
    artists: 12
  },
  classical: {
    name: "Classical",
    description: "Orchestral masterpieces and timeless compositions",
    gradient: "linear-gradient(135deg, #87CEEB, #B0E0E6)",
    tracks: 100,
    albums: 30,
    artists: 18
  }
};

// Mock data for different content types
const mockData = {
  tracks: [
    {
      id: 1,
      name: "Blinding Lights",
      artist: "The Weeknd",
      album: "After Hours",
      image: "https://picsum.photos/seed/1/300/300",
      preview_url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
      duration: 200
    },
    {
      id: 2,
      name: "Dance Monkey",
      artist: "Tones and I",
      album: "The Kids Are Coming",
      image: "https://picsum.photos/seed/2/300/300",
      preview_url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
      duration: 210
    },
    {
      id: 3,
      name: "Shape of You",
      artist: "Ed Sheeran",
      album: "÷ (Divide)",
      image: "https://picsum.photos/seed/3/300/300",
      preview_url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
      duration: 233
    }
  ],
  albums: [
    {
      id: 1,
      name: "Midnights",
      artist: "Taylor Swift",
      image: "https://picsum.photos/seed/9/300/300",
      year: 2022
    },
    {
      id: 2,
      name: "Un Verano Sin Ti",
      artist: "Bad Bunny",
      image: "https://picsum.photos/seed/10/300/300",
      year: 2022
    },
    {
      id: 3,
      name: "Harry's House",
      artist: "Harry Styles",
      image: "https://picsum.photos/seed/11/300/300",
      year: 2022
    }
  ],
  artists: [
    {
      id: 1,
      name: "The Weeknd",
      image: "https://picsum.photos/seed/21/300/300",
      followers: "45.2M"
    },
    {
      id: 2,
      name: "Taylor Swift",
      image: "https://picsum.photos/seed/22/300/300",
      followers: "52.1M"
    },
    {
      id: 3,
      name: "Bad Bunny",
      image: "https://picsum.photos/seed/23/300/300",
      followers: "38.7M"
    }
  ]
};

const Genre = ({ playTrack }) => {
  const { genreId } = useParams();
  const [activeFilter, setActiveFilter] = useState('tracks');
  const [genre, setGenre] = useState(null);
  const [content, setContent] = useState([]);

  useEffect(() => {
    // Simulate loading genre data
    const genreInfo = genreData[genreId] || genreData.pop;
    setGenre(genreInfo);
    
    // Load content based on active filter
    setContent(mockData[activeFilter] || []);
  }, [genreId, activeFilter]);

  const handlePlayGenre = () => {
    if (content.length > 0 && activeFilter === 'tracks') {
      playTrack(content[0], content, 0);
    }
  };

  const renderContent = () => {
    if (content.length === 0) {
      return (
        <EmptyState>
          <EmptyIcon>🎵</EmptyIcon>
          <EmptyText>No {activeFilter} found</EmptyText>
          <EmptySubtext>Try adjusting your filters</EmptySubtext>
        </EmptyState>
      );
    }

    return (
      <ContentGrid>
        {activeFilter === 'tracks' && 
          content.map((track, index) => (
            <TrackCard 
              key={track.id} 
              track={track} 
              onPlay={() => playTrack(track, content, index)} 
            />
          ))
        }
        {activeFilter === 'albums' && 
          content.map((album) => (
            <AlbumCard key={album.id} album={album} />
          ))
        }
        {activeFilter === 'artists' && 
          content.map((artist) => (
            <ArtistCard key={artist.id} artist={artist} />
          ))
        }
      </ContentGrid>
    );
  };

  if (!genre) {
    return <div>Loading...</div>;
  }

  return (
    <GenreContainer>
      <GenreHeader>
        <GenreIcon gradient={genre.gradient}>
          <FaMusic />
        </GenreIcon>
        <GenreInfo>
          <GenreType>Genre</GenreType>
          <GenreName>{genre.name}</GenreName>
          <GenreDescription>{genre.description}</GenreDescription>
          <GenreStats>
            <GenreStat>
              <FaMusic />
              {genre.tracks} tracks
            </GenreStat>
            <GenreStat>
              <FaMusic />
              {genre.albums} albums
            </GenreStat>
            <GenreStat>
              <FaMusic />
              {genre.artists} artists
            </GenreStat>
          </GenreStats>
          <GenreActions>
            <ActionButton primary onClick={handlePlayGenre}>
              <FaPlay />
              Play {genre.name}
            </ActionButton>
          </GenreActions>
        </GenreInfo>
      </GenreHeader>

      <FilterSection>
        <FilterLabel>
          <FaFilter />
          Filter by:
        </FilterLabel>
        <FilterSelect 
          value={activeFilter} 
          onChange={(e) => setActiveFilter(e.target.value)}
        >
          <option value="tracks">Tracks</option>
          <option value="albums">Albums</option>
          <option value="artists">Artists</option>
        </FilterSelect>
      </FilterSection>

      <ContentSection>
        <SectionHeader>
          <SectionTitle>Top {activeFilter.charAt(0).toUpperCase() + activeFilter.slice(1)}</SectionTitle>
          <SectionCount>{content.length} {activeFilter}</SectionCount>
        </SectionHeader>
        {renderContent()}
      </ContentSection>
    </GenreContainer>
  );
};

export default Genre; 