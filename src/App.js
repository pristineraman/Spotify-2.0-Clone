import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import styled from 'styled-components';
import Sidebar from './components/Sidebar';
import Player from './components/Player';
import ErrorBoundary from './components/ErrorBoundary';
import Home from './pages/Home';
import Search from './pages/Search';
import Library from './pages/Library';
import Playlist from './pages/Playlist';
import Album from './pages/Album';
import Genre from './pages/Genre';
import LikedSongs from './pages/LikedSongs';
import { MusicProvider, useMusic } from './context/MusicContext';
import './App.css';

const AppContainer = styled.div`
  display: flex;
  height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
`;

const MainContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const ContentArea = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 20px;
  background: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(10px);
`;

function AppContent() {
  const { 
    currentTrack, 
    isPlaying, 
    playTrack, 
    togglePlayPause, 
    nextTrack, 
    previousTrack 
  } = useMusic();

  return (
    <Router>
      <AppContainer>
        <Sidebar />
        <MainContent>
          <ContentArea>
            <Routes>
              <Route path="/" element={<Home playTrack={playTrack} />} />
              <Route path="/search" element={<Search playTrack={playTrack} />} />
              <Route path="/library" element={<Library playTrack={playTrack} />} />
              <Route path="/liked-songs" element={<LikedSongs playTrack={playTrack} />} />
              <Route path="/playlist/:id" element={<Playlist playTrack={playTrack} />} />
              <Route path="/album/:id" element={<Album playTrack={playTrack} />} />
              <Route path="/genre/:id" element={<Genre playTrack={playTrack} />} />
            </Routes>
          </ContentArea>
          <Player
            currentTrack={currentTrack}
            isPlaying={isPlaying}
            onPlayPause={togglePlayPause}
            onNext={nextTrack}
            onPrevious={previousTrack}
          />
        </MainContent>
      </AppContainer>
    </Router>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <MusicProvider>
        <AppContent />
      </MusicProvider>
    </ErrorBoundary>
  );
}

export default App; 