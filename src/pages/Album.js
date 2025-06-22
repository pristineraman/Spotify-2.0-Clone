import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { FaPlay, FaHeart, FaEllipsisH, FaClock, FaMusic } from 'react-icons/fa';

const AlbumContainer = styled.div`
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
`;

const AlbumHeader = styled.div`
  display: flex;
  gap: 30px;
  margin-bottom: 40px;
  align-items: flex-end;
`;

const AlbumImage = styled.img`
  width: 200px;
  height: 200px;
  border-radius: 12px;
  object-fit: cover;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
`;

const AlbumInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const AlbumType = styled.span`
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  color: #1DB954;
  letter-spacing: 1px;
`;

const AlbumName = styled.h1`
  font-size: 48px;
  font-weight: bold;
  color: white;
  margin: 0;
`;

const AlbumArtist = styled.p`
  font-size: 18px;
  color: rgba(255, 255, 255, 0.7);
  margin: 0;
`;

const AlbumMeta = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  font-size: 14px;
  color: rgba(255, 255, 255, 0.6);
`;

const AlbumStats = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const AlbumActions = styled.div`
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

const Album = ({ playTrack }) => {
  const { id } = useParams();
  const [album, setAlbum] = useState(null);
  const [tracks, setTracks] = useState([]);

  useEffect(() => {
    // Simulate loading album data
    setAlbum({
      id: id,
      name: "Midnights",
      artist: "Taylor Swift",
      image: "https://picsum.photos/seed/9/400/400",
      tracks: 13,
      duration: 3600, // 1 hour in seconds
      year: 2022,
      genre: "Pop"
    });

    setTracks([
      {
        id: 1,
        name: "Lavender Haze",
        artist: "Taylor Swift",
        album: "Midnights",
        image: "https://picsum.photos/seed/14/300/300",
        preview_url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3",
        duration: 202
      },
      {
        id: 2,
        name: "Maroon",
        artist: "Taylor Swift",
        album: "Midnights",
        image: "https://picsum.photos/seed/15/300/300",
        preview_url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3",
        duration: 218
      },
      {
        id: 3,
        name: "Anti-Hero",
        artist: "Taylor Swift",
        album: "Midnights",
        image: "https://picsum.photos/seed/16/300/300",
        preview_url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3",
        duration: 200
      },
      {
        id: 4,
        name: "Snow on the Beach",
        artist: "Taylor Swift ft. Lana Del Rey",
        album: "Midnights",
        image: "https://picsum.photos/seed/17/300/300",
        preview_url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3",
        duration: 256
      },
      {
        id: 5,
        name: "You're on Your Own, Kid",
        artist: "Taylor Swift",
        album: "Midnights",
        image: "https://picsum.photos/seed/18/300/300",
        preview_url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3",
        duration: 194
      },
      {
        id: 6,
        name: "Midnight Rain",
        artist: "Taylor Swift",
        album: "Midnights",
        image: "https://picsum.photos/seed/19/300/300",
        preview_url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3",
        duration: 174
      },
      {
        id: 7,
        name: "Question...?",
        artist: "Taylor Swift",
        album: "Midnights",
        image: "https://picsum.photos/seed/20/300/300",
        preview_url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-11.mp3",
        duration: 210
      },
      {
        id: 8,
        name: "Vigilante Shit",
        artist: "Taylor Swift",
        album: "Midnights",
        image: "https://picsum.photos/seed/21/300/300",
        preview_url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-12.mp3",
        duration: 164
      },
      {
        id: 9,
        name: "Bejeweled",
        artist: "Taylor Swift",
        album: "Midnights",
        image: "https://picsum.photos/seed/22/300/300",
        preview_url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-13.mp3",
        duration: 194
      },
      {
        id: 10,
        name: "Labyrinth",
        artist: "Taylor Swift",
        album: "Midnights",
        image: "https://picsum.photos/seed/23/300/300",
        preview_url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-14.mp3",
        duration: 247
      },
      {
        id: 11,
        name: "Karma",
        artist: "Taylor Swift",
        album: "Midnights",
        image: "https://picsum.photos/seed/24/300/300",
        preview_url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-15.mp3",
        duration: 204
      },
      {
        id: 12,
        name: "Sweet Nothing",
        artist: "Taylor Swift",
        album: "Midnights",
        image: "https://picsum.photos/seed/25/300/300",
        preview_url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-16.mp3",
        duration: 188
      },
      {
        id: 13,
        name: "Mastermind",
        artist: "Taylor Swift",
        album: "Midnights",
        image: "https://picsum.photos/seed/26/300/300",
        preview_url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
        duration: 191
      }
    ]);
  }, [id]);

  const handlePlayAlbum = () => {
    if (tracks.length > 0) {
      playTrack(tracks[0], tracks, 0);
    }
  };

  const handlePlayTrack = (track, index) => {
    playTrack(track, tracks, index);
  };

  if (!album) {
    return <div>Loading...</div>;
  }

  return (
    <AlbumContainer>
      <AlbumHeader>
        <AlbumImage src={album.image} alt={album.name} />
        <AlbumInfo>
          <AlbumType>Album</AlbumType>
          <AlbumName>{album.name}</AlbumName>
          <AlbumArtist>{album.artist}</AlbumArtist>
          <AlbumMeta>
            <AlbumStats>
              <FaMusic />
              {album.tracks} songs
            </AlbumStats>
            <AlbumStats>
              <FaClock />
              {formatDuration(album.duration)}
            </AlbumStats>
            <AlbumStats>
              {album.year} • {album.genre}
            </AlbumStats>
          </AlbumMeta>
          <AlbumActions>
            <ActionButton primary onClick={handlePlayAlbum}>
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
          </AlbumActions>
        </AlbumInfo>
      </AlbumHeader>

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
    </AlbumContainer>
  );
};

export default Album; 