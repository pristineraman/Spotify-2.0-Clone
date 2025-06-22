import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { FaSearch } from 'react-icons/fa';
import TrackCard from '../components/TrackCard';
import PlaylistCard from '../components/PlaylistCard';
import AlbumCard from '../components/AlbumCard';
import ArtistCard from '../components/ArtistCard';
import { useMusic } from '../context/MusicContext';

const SearchContainer = styled.div`
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
`;

const SearchHeader = styled.div`
  margin-bottom: 30px;
`;

const SearchTitle = styled.h1`
  font-size: 32px;
  font-weight: bold;
  margin-bottom: 20px;
  color: white;
`;

const SearchBar = styled.div`
  position: relative;
  margin-bottom: 20px;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 16px 50px 16px 20px;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 25px;
  color: white;
  font-size: 16px;
  outline: none;
  transition: all 0.3s ease;
  
  &::placeholder {
    color: rgba(255, 255, 255, 0.6);
  }
  
  &:focus {
    background: rgba(255, 255, 255, 0.15);
    border-color: #1DB954;
    box-shadow: 0 0 0 2px rgba(29, 185, 84, 0.2);
  }
`;

const SearchIcon = styled.div`
  position: absolute;
  right: 20px;
  top: 50%;
  transform: translateY(-50%);
  color: rgba(255, 255, 255, 0.6);
  font-size: 18px;
`;

const FilterSection = styled.div`
  display: flex;
  gap: 15px;
  margin-bottom: 30px;
  flex-wrap: wrap;
`;

const FilterButton = styled.button`
  padding: 8px 16px;
  background: ${props => props.active ? '#1DB954' : 'rgba(255, 255, 255, 0.1)'};
  border: 1px solid ${props => props.active ? '#1DB954' : 'rgba(255, 255, 255, 0.2)'};
  border-radius: 20px;
  color: ${props => props.active ? 'white' : 'rgba(255, 255, 255, 0.8)'};
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 14px;
  
  &:hover {
    background: ${props => props.active ? '#1ed760' : 'rgba(255, 255, 255, 0.2)'};
    transform: translateY(-2px);
  }
`;

const ResultsSection = styled.div`
  margin-bottom: 40px;
`;

const ResultsHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const ResultsTitle = styled.h2`
  font-size: 24px;
  font-weight: 600;
  color: white;
`;

const ResultsCount = styled.span`
  font-size: 14px;
  color: rgba(255, 255, 255, 0.6);
`;

const ResultsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
`;

const NoResults = styled.div`
  text-align: center;
  padding: 60px 20px;
  color: rgba(255, 255, 255, 0.6);
`;

const NoResultsIcon = styled.div`
  font-size: 48px;
  margin-bottom: 20px;
  opacity: 0.5;
`;

const NoResultsText = styled.h3`
  font-size: 20px;
  margin-bottom: 10px;
  color: rgba(255, 255, 255, 0.8);
`;

const NoResultsSubtext = styled.p`
  font-size: 14px;
  color: rgba(255, 255, 255, 0.5);
`;

const RecentSearches = styled.div`
  margin-bottom: 30px;
`;

const RecentTitle = styled.h3`
  font-size: 18px;
  font-weight: 600;
  color: white;
  margin-bottom: 15px;
`;

const RecentTags = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
`;

const RecentTag = styled.button`
  padding: 6px 12px;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 15px;
  color: rgba(255, 255, 255, 0.8);
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 12px;
  
  &:hover {
    background: rgba(255, 255, 255, 0.2);
    color: white;
  }
`;

const Search = ({ playTrack }) => {
  const { recentSearches, addRecentSearch, allTracks, allAlbums, allPlaylists, allArtists } = useMusic();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchResults, setSearchResults] = useState({
    tracks: [],
    albums: [],
    playlists: [],
    artists: []
  });
  const [isSearching, setIsSearching] = useState(false);

  const filters = [
    { id: 'all', label: 'All' },
    { id: 'tracks', label: 'Tracks' },
    { id: 'albums', label: 'Albums' },
    { id: 'playlists', label: 'Playlists' },
    { id: 'artists', label: 'Artists' }
  ];

  const handleSearch = useCallback((query) => {
    setIsSearching(true);

    const lowerCaseQuery = query.toLowerCase();
    const filteredTracks = allTracks.filter(
      track =>
        track.name.toLowerCase().includes(lowerCaseQuery) ||
        track.artist.toLowerCase().includes(lowerCaseQuery)
    );
    const filteredAlbums = allAlbums.filter(
      album =>
        album.name.toLowerCase().includes(lowerCaseQuery) ||
        album.artist.toLowerCase().includes(lowerCaseQuery)
    );
    const filteredPlaylists = allPlaylists.filter(
      playlist =>
        playlist.name.toLowerCase().includes(lowerCaseQuery)
    );
    const filteredArtists = allArtists.filter(
      artist =>
        artist.name.toLowerCase().includes(lowerCaseQuery)
    );

    setSearchResults({
      tracks: filteredTracks,
      albums: filteredAlbums,
      playlists: filteredPlaylists,
      artists: filteredArtists,
    });
    setIsSearching(false);
    
    if (query.trim()) {
      addRecentSearch(query.trim());
    }
  }, [allTracks, allAlbums, allPlaylists, allArtists, addRecentSearch]);

  useEffect(() => {
    if (searchQuery.trim() !== '') {
      const timeoutId = setTimeout(() => {
        handleSearch(searchQuery);
      }, 300); // Debounce search

      return () => clearTimeout(timeoutId);
    } else {
      setSearchResults({
        tracks: [],
        albums: [],
        playlists: [],
        artists: [],
      });
    }
  }, [searchQuery, handleSearch]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    handleSearch(searchQuery);
  };

  const handleFilterChange = (filter) => {
    setActiveFilter(filter);
    if (searchQuery.trim()) {
      handleSearch(searchQuery);
    }
  };

  const handleRecentSearch = (search) => {
    setSearchQuery(search);
    handleSearch(search);
  };

  const renderResults = () => {
    if (isSearching) {
      return (
        <NoResults>
          <NoResultsIcon>🔍</NoResultsIcon>
          <NoResultsText>Searching...</NoResultsText>
        </NoResults>
      );
    }

    const allResults = [
      ...searchResults.tracks, 
      ...searchResults.albums, 
      ...searchResults.playlists, 
      ...searchResults.artists
    ];

    if (allResults.length === 0 && searchQuery.trim()) {
      return (
        <NoResults>
          <NoResultsIcon>🎵</NoResultsIcon>
          <NoResultsText>No results found for "{searchQuery}"</NoResultsText>
          <NoResultsSubtext>Try adjusting your search terms or filters</NoResultsSubtext>
        </NoResults>
      );
    }

    if (allResults.length === 0) {
      return null;
    }
    
    const filterMap = {
      tracks: (item, index) => <TrackCard key={`track-${item.id}`} track={item} onPlay={() => playTrack(item, searchResults.tracks, index)} />,
      albums: (item) => <AlbumCard key={`album-${item.id}`} album={item} />,
      playlists: (item) => <PlaylistCard key={`playlist-${item.id}`} playlist={item} />,
      artists: (item) => <ArtistCard key={`artist-${item.id}`} artist={item} />
    };

    return (
      <ResultsSection>
        {Object.keys(searchResults).map(category => {
          if ((activeFilter === 'all' || activeFilter === category) && searchResults[category].length > 0) {
            return (
              <div key={category}>
                <ResultsHeader>
                  <ResultsTitle>{category.charAt(0).toUpperCase() + category.slice(1)}</ResultsTitle>
                  <ResultsCount>{searchResults[category].length} results</ResultsCount>
                </ResultsHeader>
                <ResultsGrid>
                  {searchResults[category].map((item, index) => filterMap[category](item, index))}
                </ResultsGrid>
              </div>
            );
          }
          return null;
        })}
      </ResultsSection>
    );
  };

  return (
    <SearchContainer>
      <SearchHeader>
        <SearchTitle>Search</SearchTitle>
        <form onSubmit={handleSearchSubmit}>
          <SearchBar>
            <SearchInput
              type="text"
              placeholder="Search for tracks, albums, playlists, or artists..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <SearchIcon>
              <FaSearch />
            </SearchIcon>
          </SearchBar>
        </form>
        
        <FilterSection>
          {filters.map((filter) => (
            <FilterButton
              key={filter.id}
              active={activeFilter === filter.id}
              onClick={() => handleFilterChange(filter.id)}
            >
              {filter.label}
            </FilterButton>
          ))}
        </FilterSection>
      </SearchHeader>

      {recentSearches.length > 0 && !searchQuery.trim() && (
        <RecentSearches>
          <RecentTitle>Recent Searches</RecentTitle>
          <RecentTags>
            {recentSearches.slice(0, 8).map((search, index) => (
              <RecentTag key={index} onClick={() => handleRecentSearch(search)}>
                {search}
              </RecentTag>
            ))}
          </RecentTags>
        </RecentSearches>
      )}

      {renderResults()}
    </SearchContainer>
  );
};

export default Search; 