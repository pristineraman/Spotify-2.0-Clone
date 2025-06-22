import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { 
  FaHome, 
  FaSearch, 
  FaMusic, 
  FaHeart, 
  FaSpotify
} from 'react-icons/fa';
import { useMusic } from '../context/MusicContext';

const SidebarContainer = styled.div`
  width: 250px;
  background: rgba(0, 0, 0, 0.9);
  backdrop-filter: blur(10px);
  padding: 20px;
  display: flex;
  flex-direction: column;
  height: 100vh;
  border-right: 1px solid rgba(255, 255, 255, 0.1);
`;

const Logo = styled(Link)`
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 30px;
  color: #1DB954;
  text-decoration: none;
  
  svg {
    font-size: 32px;
  }
`;

const NavSection = styled.nav`
  margin-bottom: 20px;
`;

const NavItem = styled(Link)`
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 12px 10px;
  color: ${({ active }) => (active ? 'white' : 'rgba(255, 255, 255, 0.7)')};
  font-weight: ${({ active }) => (active ? 'bold' : '500')};
  background: ${({ active }) => (active ? 'rgba(255, 255, 255, 0.1)' : 'transparent')};
  transition: all 0.3s ease;
  border-radius: 6px;
  text-decoration: none;
  
  &:hover {
    color: white;
    background: rgba(255, 255, 255, 0.1);
  }
  
  svg {
    font-size: 20px;
  }
`;

const SectionTitle = styled.h3`
  font-size: 12px;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: rgba(255, 255, 255, 0.5);
  margin: 25px 0 15px 10px;
`;

const PlaylistSection = styled.div`
  flex: 1;
  overflow-y: auto;
  
  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.2);
    border-radius: 3px;
  }
`;

const PlaylistItem = styled(Link)`
  display: block;
  padding: 8px 10px;
  color: rgba(255, 255, 255, 0.7);
  font-size: 14px;
  border-radius: 4px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-decoration: none;

  &:hover {
    color: white;
    background: rgba(255, 255, 255, 0.1);
  }
`;

const UserProfile = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 20px 10px;
  margin-top: 15px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
`;

const Avatar = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
`;

const UserName = styled.span`
  font-size: 14px;
  font-weight: 600;
  color: white;
`;

const Sidebar = () => {
  const location = useLocation();
  const { userProfile, playlists } = useMusic();
  const isActive = (path) => location.pathname.startsWith(path);

  return (
    <SidebarContainer>
      <div>
        <Logo to="/">
          <FaSpotify />
          Spotify 2.0
        </Logo>

        <NavSection>
          <NavItem to="/" active={location.pathname === '/'}>
            <FaHome />
            Home
          </NavItem>
          <NavItem to="/search" active={isActive('/search')}>
            <FaSearch />
            Search
          </NavItem>
          <NavItem to="/library" active={isActive('/library')}>
            <FaMusic />
            Your Library
          </NavItem>
        </NavSection>

        <NavSection>
          <NavItem to="/liked-songs" active={isActive('/liked-songs')}>
            <FaHeart />
            Liked Songs
          </NavItem>
        </NavSection>
      </div>

      <PlaylistSection>
        <SectionTitle>Playlists</SectionTitle>
        {playlists.map(playlist => (
          <PlaylistItem key={playlist.id} to={`/playlist/${playlist.id}`}>
            {playlist.name}
          </PlaylistItem>
        ))}
      </PlaylistSection>
      
      <UserProfile>
        <Avatar src={userProfile.avatar} alt={userProfile.name} />
        <UserName>{userProfile.name}</UserName>
      </UserProfile>
    </SidebarContainer>
  );
};

export default Sidebar; 