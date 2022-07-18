import React, { useContext } from 'react';
import type { FC } from 'react';
import classNames from 'classnames';
import Image from 'next/image';
import { FaPause, FaPlay, FaStepBackward, FaStepForward } from 'react-icons/fa';

import SongTimeline from 'components/modules/Timeline';

import { Context as SongContext } from 'store/song';

import styles from './styles.module.scss';

const Controls: FC = () => {
  const { isPaused, pauseSong, playSong, prevSong, nextSong } = useContext(SongContext);

  return (
    <div className={styles['controls']}>
      <div className={styles['controls__ctas']}>
        <button type="button" onClick={prevSong}>
          <FaStepBackward />
        </button>
        {isPaused ? (
          <button className={styles['play']} type="button" onClick={playSong}>
            <FaPlay />
          </button>
        ) : (
          <button className={styles['pause']} type="button" onClick={pauseSong}>
            <FaPause />
          </button>
        )}
        <button type="button" onClick={nextSong}>
          <FaStepForward />
        </button>
      </div>
    </div>
  );
};

const Bar: FC = () => {
  const { currentSong } = useContext(SongContext);
  if (!currentSong) return null;
  return (
    <div className={classNames(styles['playing'], styles[currentSong ? 'controls--active' : ''])}>
      <Image
        className={styles['playing__album']}
        src={currentSong?.img}
        alt={currentSong?.album}
        width={300}
        height={150}
        placeholder="blur"
        blurDataURL={currentSong?.img}
        objectFit="cover"
        objectPosition="center"
        layout="responsive"
      />

      <span className={styles['playing__name']}>{currentSong?.name}</span>
      <span className={styles['playing__artist']}>{currentSong?.artists?.[0]?.name}</span>

      <SongTimeline />

      <Controls />
    </div>
  );
};

export default Bar;
