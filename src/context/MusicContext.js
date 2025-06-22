import React, { createContext, useContext, useReducer, useMemo, useCallback } from 'react';

const MusicContext = createContext();

const mockTracks = [
  { 
    id: 1, 
    name: "Blinding Lights", 
    artist: "The Weeknd", 
    album: "After Hours", 
    image: "https://picsum.photos/seed/1/300/300", 
    preview_url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3", 
    duration: 200, 
    genre: "Pop",
    album_cover: "https://picsum.photos/seed/1/300/300"
  },
  { 
    id: 2, 
    name: "Dance Monkey", 
    artist: "Tones and I", 
    album: "The Kids Are Coming", 
    image: "https://picsum.photos/seed/2/300/300", 
    preview_url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3", 
    duration: 210, 
    genre: "Pop",
    album_cover: "https://picsum.photos/seed/2/300/300"
  },
  { 
    id: 3, 
    name: "Shape of You", 
    artist: "Ed Sheeran", 
    album: "÷ (Divide)", 
    image: "https://picsum.photos/seed/3/300/300", 
    preview_url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3", 
    duration: 233, 
    genre: "Pop",
    album_cover: "https://picsum.photos/seed/3/300/300"
  },
  { 
    id: 4, 
    name: "Uptown Funk", 
    artist: "Mark Ronson ft. Bruno Mars", 
    album: "Uptown Special", 
    image: "https://picsum.photos/seed/4/300/300", 
    preview_url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3", 
    duration: 270, 
    genre: "Funk",
    album_cover: "https://picsum.photos/seed/4/300/300"
  },
  { 
    id: 5, 
    name: "Bohemian Rhapsody", 
    artist: "Queen", 
    album: "A Night at the Opera", 
    image: "https://picsum.photos/seed/15/300/300", 
    preview_url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3", 
    duration: 354, 
    genre: "Rock",
    album_cover: "https://picsum.photos/seed/15/300/300"
  },
  { 
    id: 6, 
    name: "Hotel California", 
    artist: "Eagles", 
    album: "Hotel California", 
    image: "https://picsum.photos/seed/16/300/300", 
    preview_url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3", 
    duration: 391, 
    genre: "Rock",
    album_cover: "https://picsum.photos/seed/16/300/300"
  },
  { 
    id: 7, 
    name: "Eye of the Tiger", 
    artist: "Survivor", 
    album: "Eye of the Tiger", 
    image: "https://picsum.photos/seed/17/300/300", 
    preview_url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3", 
    duration: 245, 
    genre: "Rock",
    album_cover: "https://picsum.photos/seed/17/300/300"
  },
  { 
    id: 8, 
    name: "Don't Stop Me Now", 
    artist: "Queen", 
    album: "Jazz", 
    image: "https://picsum.photos/seed/18/300/300", 
    preview_url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3", 
    duration: 212, 
    genre: "Rock",
    album_cover: "https://picsum.photos/seed/18/300/300"
  },
  { 
    id: 9, 
    name: "Stronger", 
    artist: "Kanye West", 
    album: "Graduation", 
    image: "https://picsum.photos/seed/19/300/300", 
    preview_url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3", 
    duration: 312, 
    genre: "Hip-Hop",
    album_cover: "https://picsum.photos/seed/19/300/300"
  },
  { 
    id: 10, 
    name: "Billie Jean", 
    artist: "Michael Jackson", 
    album: "Thriller", 
    image: "https://picsum.photos/seed/20/300/300", 
    preview_url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3", 
    duration: 294, 
    genre: "Pop",
    album_cover: "https://picsum.photos/seed/20/300/300"
  },
  { 
    id: 11, 
    name: "Sweet Child O' Mine", 
    artist: "Guns N' Roses", 
    album: "Appetite for Destruction", 
    image: "https://picsum.photos/seed/21/300/300", 
    preview_url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-11.mp3", 
    duration: 356, 
    genre: "Rock",
    album_cover: "https://picsum.photos/seed/21/300/300"
  },
  { 
    id: 12, 
    name: "Imagine", 
    artist: "John Lennon", 
    album: "Imagine", 
    image: "https://picsum.photos/seed/22/300/300", 
    preview_url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-12.mp3", 
    duration: 183, 
    genre: "Rock",
    album_cover: "https://picsum.photos/seed/22/300/300"
  }
];

const mockAlbums = [
  { 
    id: 1, 
    name: "Midnights", 
    artist: "Taylor Swift", 
    image: "https://picsum.photos/seed/9/300/300", 
    year: 2022, 
    genre: "Pop", 
    tracks: mockTracks.slice(0, 2) 
  },
  { 
    id: 2, 
    name: "Un Verano Sin Ti", 
    artist: "Bad Bunny", 
    image: "https://picsum.photos/seed/10/300/300", 
    year: 2022, 
    genre: "Latin", 
    tracks: mockTracks.slice(2, 4) 
  },
  { 
    id: 3, 
    name: "After Hours", 
    artist: "The Weeknd", 
    image: "https://picsum.photos/seed/1/300/300", 
    year: 2020, 
    genre: "Pop", 
    tracks: [mockTracks[0]] 
  },
  { 
    id: 4, 
    name: "Thriller", 
    artist: "Michael Jackson", 
    image: "https://picsum.photos/seed/20/300/300", 
    year: 1982, 
    genre: "Pop", 
    tracks: [mockTracks[9]] 
  },
  { 
    id: 5, 
    name: "Appetite for Destruction", 
    artist: "Guns N' Roses", 
    image: "https://picsum.photos/seed/21/300/300", 
    year: 1987, 
    genre: "Rock", 
    tracks: [mockTracks[10]] 
  }
];

const mockPlaylists = [
  { 
    id: 1, 
    name: "Chill Mix", 
    description: "Relax and unwind", 
    image: "https://picsum.photos/seed/11/300/300", 
    tracks: mockTracks.slice(0, 3) 
  },
  { 
    id: 2, 
    name: "Workout Hits", 
    description: "Get pumped", 
    image: "https://picsum.photos/seed/12/300/300", 
    tracks: [mockTracks[3], mockTracks[6], mockTracks[7], mockTracks[8]] 
  },
  { 
    id: 3, 
    name: "Classic Rock", 
    description: "Timeless rock classics", 
    image: "https://picsum.photos/seed/13/300/300", 
    tracks: [mockTracks[4], mockTracks[5], mockTracks[10], mockTracks[11]] 
  },
  { 
    id: 4, 
    name: "Pop Essentials", 
    description: "Essential pop hits", 
    image: "https://picsum.photos/seed/14/300/300", 
    tracks: [mockTracks[0], mockTracks[1], mockTracks[2], mockTracks[9]] 
  }
];

const mockArtists = [
    { id: 1, name: 'The Weeknd', image: 'https://picsum.photos/seed/1/300/300', genre: 'Pop' },
    { id: 2, name: 'Tones and I', image: 'https://picsum.photos/seed/2/300/300', genre: 'Pop' },
    { id: 3, name: 'Ed Sheeran', image: 'https://picsum.photos/seed/3/300/300', genre: 'Pop' },
    { id: 4, name: 'Mark Ronson', image: 'https://picsum.photos/seed/4/300/300', genre: 'Funk' },
    { id: 5, name: 'Queen', image: 'https://picsum.photos/seed/15/300/300', genre: 'Rock' },
    { id: 6, name: 'Eagles', image: 'https://picsum.photos/seed/16/300/300', genre: 'Rock' },
    { id: 7, name: 'Taylor Swift', image: 'https://picsum.photos/seed/9/300/300', genre: 'Pop' },
    { id: 8, name: 'Bad Bunny', image: 'https://picsum.photos/seed/10/300/300', genre: 'Latin' },
    { id: 9, name: 'Survivor', image: 'https://picsum.photos/seed/17/300/300', genre: 'Rock' },
    { id: 10, name: 'Kanye West', image: 'https://picsum.photos/seed/19/300/300', genre: 'Hip-Hop' },
    { id: 11, name: 'Michael Jackson', image: 'https://picsum.photos/seed/20/300/300', genre: 'Pop' },
    { id: 12, name: 'Guns N\' Roses', image: 'https://picsum.photos/seed/21/300/300', genre: 'Rock' },
    { id: 13, name: 'John Lennon', image: 'https://picsum.photos/seed/22/300/300', genre: 'Rock' }
];

const initialState = {
  currentTrack: null,
  isPlaying: false,
  playlist: [],
  currentIndex: 0,
  volume: 0.7,
  repeat: 'none', // none, one, all
  shuffle: false,
  queue: [],
  likedSongs: [],
  playlists: mockPlaylists,
  albums: mockAlbums,
  artists: mockArtists,
  searchResults: [],
  recentSearches: [],
  userProfile: {
    name: 'Raman',
    email: 'user@example.com',
    avatar: 'https://picsum.photos/seed/18/150/150',
    premium: true
  }
};

const musicReducer = (state, action) => {
  switch (action.type) {
    case 'SET_CURRENT_TRACK':
      return { ...state, currentTrack: action.payload };
    
    case 'SET_PLAYING':
      return { ...state, isPlaying: action.payload };
    
    case 'SET_PLAYLIST':
      return { ...state, playlist: action.payload };
    
    case 'SET_CURRENT_INDEX':
      return { ...state, currentIndex: action.payload };
    
    case 'SET_VOLUME':
      return { ...state, volume: action.payload };
    
    case 'SET_REPEAT':
      return { ...state, repeat: action.payload };
    
    case 'TOGGLE_SHUFFLE':
      return { ...state, shuffle: !state.shuffle };
    
    case 'ADD_TO_QUEUE':
      return { ...state, queue: [...state.queue, action.payload] };
    
    case 'REMOVE_FROM_QUEUE':
      return { 
        ...state, 
        queue: state.queue.filter((_, index) => index !== action.payload) 
      };
    
    case 'CLEAR_QUEUE':
      return { ...state, queue: [] };
    
    case 'TOGGLE_LIKED_SONG':
      const isLiked = state.likedSongs.some(song => song.id === action.payload.id);
      if (isLiked) {
        return {
          ...state,
          likedSongs: state.likedSongs.filter(song => song.id !== action.payload.id)
        };
      } else {
        return {
          ...state,
          likedSongs: [...state.likedSongs, action.payload]
        };
      }
    
    case 'ADD_PLAYLIST':
      return { ...state, playlists: [...state.playlists, action.payload] };
    
    case 'ADD_TRACK_TO_PLAYLIST':
      return {
        ...state,
        playlists: state.playlists.map(p => 
          p.id === action.payload.playlistId 
            ? { ...p, tracks: [...p.tracks, action.payload.track] }
            : p
        )
      };
    
    case 'REMOVE_PLAYLIST':
      return {
        ...state,
        playlists: state.playlists.filter(playlist => playlist.id !== action.payload)
      };
    
    case 'SET_SEARCH_RESULTS':
      return { ...state, searchResults: action.payload };
    
    case 'ADD_RECENT_SEARCH':
      const newSearches = [action.payload, ...state.recentSearches.filter(s => s !== action.payload)].slice(0, 10);
      return { ...state, recentSearches: newSearches };
    
    case 'NEXT_TRACK':
      if (state.playlist.length === 0) return state;
      
      if (state.repeat === 'none' && state.currentIndex >= state.playlist.length - 1) {
        return {
          ...state,
          isPlaying: false,
        };
      }

      const nextIndex = (state.currentIndex + 1) % state.playlist.length;
      return {
        ...state,
        currentIndex: nextIndex,
        currentTrack: state.playlist[nextIndex]
      };
    
    case 'PREVIOUS_TRACK':
      if (state.playlist.length === 0) return state;
      const prevIndex = state.currentIndex === 0 ? state.playlist.length - 1 : state.currentIndex - 1;
      return {
        ...state,
        currentIndex: prevIndex,
        currentTrack: state.playlist[prevIndex]
      };
    
    default:
      return state;
  }
};

export const MusicProvider = ({ children }) => {
  const [state, dispatch] = useReducer(musicReducer, initialState);

  const playTrack = useCallback((track, playlist, index) => {
    dispatch({ type: 'SET_CURRENT_TRACK', payload: track });
    if (playlist) {
      dispatch({ type: 'SET_PLAYLIST', payload: playlist });
      dispatch({ type: 'SET_CURRENT_INDEX', payload: index });
    } else {
      dispatch({ type: 'SET_PLAYLIST', payload: [track] });
      dispatch({ type: 'SET_CURRENT_INDEX', payload: 0 });
    }
    dispatch({ type: 'SET_PLAYING', payload: true });
  }, []);

  const togglePlayPause = useCallback(() => {
    dispatch({ type: 'SET_PLAYING', payload: !state.isPlaying });
  }, [state.isPlaying]);

  const nextTrack = useCallback(() => {
    dispatch({ type: 'NEXT_TRACK' });
  }, []);

  const previousTrack = useCallback(() => {
    dispatch({ type: 'PREVIOUS_TRACK' });
  }, []);

  const setVolume = useCallback((volume) => {
    dispatch({ type: 'SET_VOLUME', payload: volume });
  }, []);

  const setRepeat = useCallback((repeat) => {
    dispatch({ type: 'SET_REPEAT', payload: repeat });
  }, []);

  const toggleShuffle = useCallback(() => {
    dispatch({ type: 'TOGGLE_SHUFFLE' });
  }, []);

  const addToQueue = useCallback((track) => {
    dispatch({ type: 'ADD_TO_QUEUE', payload: track });
  }, []);

  const removeFromQueue = useCallback((index) => {
    dispatch({ type: 'REMOVE_FROM_QUEUE', payload: index });
  }, []);

  const clearQueue = useCallback(() => {
    dispatch({ type: 'CLEAR_QUEUE' });
  }, []);

  const toggleLikedSong = useCallback((song) => {
    dispatch({ type: 'TOGGLE_LIKED_SONG', payload: song });
  }, []);

  const addPlaylist = useCallback((playlist) => {
    dispatch({ type: 'ADD_PLAYLIST', payload: playlist });
  }, []);

  const addTrackToPlaylist = useCallback((playlistId, track) => {
    dispatch({ type: 'ADD_TRACK_TO_PLAYLIST', payload: { playlistId, track } });
  }, []);

  const removePlaylist = useCallback((playlistId) => {
    dispatch({ type: 'REMOVE_PLAYLIST', payload: playlistId });
  }, []);

  const setSearchResults = useCallback((results) => {
    dispatch({ type: 'SET_SEARCH_RESULTS', payload: results });
  }, []);

  const addRecentSearch = useCallback((search) => {
    dispatch({ type: 'ADD_RECENT_SEARCH', payload: search });
  }, []);

  const value = useMemo(() => ({
    ...state,
    playTrack,
    togglePlayPause,
    nextTrack,
    previousTrack,
    setVolume,
    setRepeat,
    toggleShuffle,
    addToQueue,
    removeFromQueue,
    clearQueue,
    toggleLikedSong,
    addPlaylist,
    addTrackToPlaylist,
    removePlaylist,
    setSearchResults,
    addRecentSearch,
    allTracks: mockTracks,
    allPlaylists: state.playlists,
    allAlbums: state.albums,
    allArtists: state.artists,
  }), [
    state, 
    playTrack, 
    togglePlayPause, 
    nextTrack, 
    previousTrack, 
    setVolume, 
    setRepeat, 
    toggleShuffle, 
    addToQueue, 
    removeFromQueue, 
    clearQueue, 
    toggleLikedSong, 
    addPlaylist, 
    addTrackToPlaylist,
    removePlaylist, 
    setSearchResults, 
    addRecentSearch
  ]);

  return (
    <MusicContext.Provider value={value}>
      {children}
    </MusicContext.Provider>
  );
};

export const useMusic = () => {
  const context = useContext(MusicContext);
  if (!context) {
    throw new Error('useMusic must be used within a MusicProvider');
  }
  return context;
}; 