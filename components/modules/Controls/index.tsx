import React, { useContext } from 'react';
import type { FC } from 'react';
import { useRouter } from 'next/router';
import classNames from 'classnames';
import dynamic from 'next/dynamic';

import SongTimeline from 'components/modules/Timeline';
import Artists from 'components/modules/Artists';

import { Context as SongContext } from 'store/song';

import {
  MdPauseCircleOutline,
  MdPlayCircleOutline,
  MdSkipNext,
  MdSkipPrevious,
} from 'react-icons/md';

import styles from './styles.module.scss';

const Volume = dynamic(() => import('components/modules/Volume'));
const AddQueue = dynamic(() => import('components/modules/Queue'), { ssr: false });

const CurrentPlaying: FC = () => {
  const { currentSong } = useContext(SongContext);
  const router = useRouter();

  if (!currentSong) return null;

  return (
    <div className={styles['current']}>
      <div>
        <div
          onClick={() => router.push({ pathname: '/', query: { album: currentSong?.albumId } })}
          className={styles['current__album']}
          style={{ background: `url(${currentSong?.img})` }}
        />
        <div className={styles['song']}>
          <p>{currentSong?.name}</p>
          <Artists {...currentSong} />
        </div>
      </div>
    </div>
  );
};

const Controls: FC = () => {
  const { isPaused, pauseSong, playSong, prevSong, nextSong } = useContext(SongContext);
  return (
    <div className={styles['controller_wrapper']}>
      <div className={styles['controller_buttons']}>
        <MdSkipPrevious onClick={prevSong} />

        {isPaused
          ? <MdPlayCircleOutline onClick={playSong} />
          : <MdPauseCircleOutline onClick={pauseSong} />
        }

        <MdSkipNext onClick={nextSong} />
      </div>

      <SongTimeline />
    </div>
  );
};

const Bar: FC = () => {
  const { currentSong } = useContext(SongContext);
  return (
    <div className={classNames(styles['bar'], styles[currentSong ? 'bar--active' : ''])}>
      <div className={styles['bar__content']}>

        <CurrentPlaying />

        <Controls />

        <div className={styles['other_controls']}>
          <Volume />
          <AddQueue />
        </div>
      </div>

    </div>
  );
}

export default Bar;
