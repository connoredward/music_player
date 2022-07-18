import React, { useState, useContext } from 'react';

import { Context as YoutubeContext } from 'store/youtube';

export const Context = React.createContext(null) as any;

export const Store = ({ children }): any => {
  const { getId } = useContext(YoutubeContext);

  // Current playing song.
  const [currentSong, setCurrentSong] = useState(null);
  // Current album of current song playing.
  const [currentAlbum, setCurrentAlbum] = useState(null);
  // Current playing youtube event.
  const [event, setEvent] = useState(null);
  // Paused state for player bar play/pause cta.
  const [isPaused, setIsPaused] = useState(false);
  // Duration of song range.
  const [duration, setDuration] = useState(0);

  const pauseSong = () => {
    event.pauseVideo();
    setIsPaused(true);
  };

  const playSong = () => {
    if (currentSong) {
      event.playVideo();
      setIsPaused(false);
    }
  };

  const onPlay = () => {
    setDuration(event?.getDuration());
    playSong();
  };

  const prevSong = async () => {
    const prevIndex =
      currentAlbum?.tracks?.items?.findIndex(({ id }) => id === currentSong?.id) - 1;

    // If the index of prev so is less than 0 then nothing before or current song hasn't played more than 5 seconds then restart song.
    if (prevIndex < 0 || event.getCurrentTime() > 5) {
      event.seekTo(0);
    } else {
      const prevSong = currentAlbum?.tracks?.items[prevIndex];

      setCurrentSong({
        ...prevSong,
        img: currentAlbum?.images?.[0]?.url ?? prevSong?.img,
        albumId: currentAlbum?.id ?? prevSong?.albumId,
        videoId: await getId(
          `${currentAlbum?.artists?.[0]?.name ?? prevSong?.artists?.[0]?.name} - ${
            prevSong?.name
          } song`
        ),
      });
    }
  };

  const nextSong = async () => {
    const nextIndex =
      currentAlbum?.tracks?.items?.findIndex(({ id }) => id === currentSong?.id) + 1;

    // If the index of next so is greater than album then no next song in album
    // remove event, current song & album from state
    if (nextIndex >= currentAlbum?.tracks?.items?.length) {
      setEvent(null);
      setCurrentSong(null);
      setCurrentAlbum(null);
    } else {
      const nextSong = currentAlbum?.tracks?.items[nextIndex];

      setCurrentSong({
        ...nextSong,
        img: currentAlbum?.images?.[0]?.url ?? nextSong?.img,
        albumId: currentAlbum?.id ?? nextSong?.albumId,
        videoId: await getId(
          `${currentAlbum?.artists?.[0]?.name ?? nextSong?.artists?.[0]?.name} - ${
            nextSong?.name
          } song`
        ),
      });
    }
  };

  return (
    <Context.Provider
      value={{
        currentSong,
        setCurrentSong,

        currentAlbum,
        setCurrentAlbum,

        event,
        setEvent,

        onPlay,

        isPaused,

        duration,

        pauseSong,
        playSong,

        nextSong,
        prevSong,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default {
  Store,
  Context,
};
