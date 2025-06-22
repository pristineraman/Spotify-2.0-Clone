import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { FaPlay, FaHeart, FaEllipsisH, FaClock, FaMusic } from 'react-icons/fa';

const PlaylistContainer = styled.div`
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
`;

const PlaylistHeader = styled.div`
  display: flex;
  gap: 30px;
  margin-bottom: 40px;
  align-items: flex-end;
`;

const PlaylistImage = styled.img`
  width: 200px;
  height: 200px;
  border-radius: 12px;
  object-fit: cover;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
`;

const PlaylistInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const PlaylistType = styled.span`
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  color: #1DB954;
  letter-spacing: 1px;
`;

const PlaylistName = styled.h1`
  font-size: 48px;
  font-weight: bold;
  color: white;
  margin: 0;
`;

const PlaylistDescription = styled.p`
  font-size: 16px;
  color: rgba(255, 255, 255, 0.7);
  margin: 0;
`;

const PlaylistMeta = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  font-size: 14px;
  color: rgba(255, 255, 255, 0.6);
`;

const PlaylistStats = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const PlaylistActions = styled.div`
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

const TracksSection = styled.div`
  margin-bottom: 40px;
`;

const TracksHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding: 0 16px;
`;

const TracksTitle = styled.h2`
  font-size: 24px;
  font-weight: 600;
  color: white;
`;

const TracksCount = styled.span`
  font-size: 14px;
  color: rgba(255, 255, 255, 0.6);
`;

const TracksList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const TrackItem = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 12px 16px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }
`;

const TrackNumber = styled.span`
  font-size: 14px;
  color: rgba(255, 255, 255, 0.6);
  min-width: 30px;
`;

const TrackImage = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 4px;
  object-fit: cover;
`;

const TrackDetails = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const TrackName = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: white;
`;

const TrackArtist = styled.div`
  font-size: 12px;
  color: rgba(255, 255, 255, 0.7);
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
  
  ${TrackItem}:hover & {
    opacity: 1;
  }
`;

const TrackActionButton = styled.button`
  width: 32px;
  height: 32px;
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
    font-size: 12px;
  }
`;

const formatDuration = (seconds) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
};

const Playlist = ({ playTrack }) => {
  const { id } = useParams();
  const [playlist, setPlaylist] = useState(null);
  const [tracks, setTracks] = useState([]);

  useEffect(() => {
    // Simulate loading playlist data
    setPlaylist({
      id: id,
      name: "Today's Top Hits",
      description: "The hottest tracks right now. Global hits and the latest in music.",
      image: "https://picsum.photos/seed/5/400/400",
      tracks: 50,
      duration: 7200, // 2 hours in seconds
      followers: "2.5M",
      createdBy: "Spotify"
    });

    setTracks([
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
      },
      {
        id: 4,
        name: "Uptown Funk",
        artist: "Mark Ronson ft. Bruno Mars",
        album: "Uptown Special",
        image: "https://picsum.photos/seed/4/300/300",
        preview_url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
        duration: 270
      }
    ]);
  }, [id]);

  const handlePlayPlaylist = () => {
    if (tracks.length > 0) {
      playTrack(tracks[0], tracks, 0);
    }
  };

  const handlePlayTrack = (track, index) => {
    playTrack(track, tracks, index);
  };

  if (!playlist) {
    return <div>Loading...</div>;
  }

  return (
    <PlaylistContainer>
      <PlaylistHeader>
        <PlaylistImage src={playlist.image} alt={playlist.name} />
        <PlaylistInfo>
          <PlaylistType>Playlist</PlaylistType>
          <PlaylistName>{playlist.name}</PlaylistName>
          <PlaylistDescription>{playlist.description}</PlaylistDescription>
          <PlaylistMeta>
            <PlaylistStats>
              <FaMusic />
              {playlist.tracks} songs
            </PlaylistStats>
            <PlaylistStats>
              <FaClock />
              {formatDuration(playlist.duration)}
            </PlaylistStats>
            <PlaylistStats>
              {playlist.followers} followers
            </PlaylistStats>
          </PlaylistMeta>
          <PlaylistActions>
            <ActionButton primary onClick={handlePlayPlaylist}>
              <FaPlay />
              Play
            </ActionButton>
            <ActionButton>
              <FaHeart />
              Save
            </ActionButton>
            <ActionButton>
              <FaEllipsisH />
              More
            </ActionButton>
          </PlaylistActions>
        </PlaylistInfo>
      </PlaylistHeader>

      <TracksSection>
        <TracksHeader>
          <TracksTitle>Tracks</TracksTitle>
          <TracksCount>{tracks.length} songs</TracksCount>
        </TracksHeader>
        <TracksList>
          {tracks.map((track, index) => (
            <TrackItem key={track.id} onClick={() => handlePlayTrack(track, index)}>
              <TrackNumber>{index + 1}</TrackNumber>
              <TrackImage src={track.image} alt={track.name} />
              <TrackDetails>
                <TrackName>{track.name}</TrackName>
                <TrackArtist>{track.artist}</TrackArtist>
              </TrackDetails>
              <TrackDuration>{formatDuration(track.duration)}</TrackDuration>
              <TrackActions>
                <TrackActionButton>
                  <FaHeart />
                </TrackActionButton>
                <TrackActionButton>
                  <FaEllipsisH />
                </TrackActionButton>
              </TrackActions>
            </TrackItem>
          ))}
        </TracksList>
      </TracksSection>
    </PlaylistContainer>
  );
};

export default Playlist; 