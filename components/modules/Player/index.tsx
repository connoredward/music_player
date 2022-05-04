import React, { useContext } from 'react';
import type { FC } from 'react';
import YouTube from 'react-youtube';

import { Context as SongContext } from 'store/song';

const opts = {
  height: '0',
  width: '0',
  playerVars: { autoplay: 1 },
} as any;

const Player: FC = () => {
  const { setEvent, onPlay, nextSong, currentSong } = useContext(SongContext);

  if (!currentSong?.videoId) return null;

  return (
    <YouTube
      videoId={currentSong?.videoId}
      opts={opts}
      onReady={(event) => setEvent(event.target)}
      onStateChange={(event) => setEvent(event.target)}
      onPlay={onPlay}
      onEnd={nextSong}
    />
  );
};
export default Player;
