import React, { useState, useContext } from 'react';
import type { FC } from 'react';
import classNames from 'classnames';
import { MdQueue } from 'react-icons/md';

import Artists from 'components/modules/Artists';

import { Context as SongContext } from 'store/song';
import { Context as QueueStore } from 'store/queue';
import { Context as YoutubeContext } from 'store/youtube';

import styles from './styles.module.scss';

type Props = {
  name: string;
  artists: {
    name: string;
  }[];
  album: any;
};

const Card: FC<Props> = (props) => {
  const { name, artists, album } = props;
  const [disabled, setDisabled] = useState(false);

  const { setCurrentSong, setCurrentAlbum, currentSong } = useContext(SongContext);
  const { addQueue } = useContext(QueueStore);
  const { getId } = useContext(YoutubeContext);

  const searchSong = async () => {
    setDisabled(true);
    setCurrentSong({ ...props, videoId: await getId(`${artists?.[0]?.name} - ${name} song`) });
    setCurrentAlbum(album);
    setTimeout(() => setDisabled(false), 1000);
  };

  return (
    <button
      className={classNames(
        styles['card'],
        styles[name === currentSong?.name ? 'card--active' : '']
      )}
      disabled={disabled}
      onClick={searchSong}
      type="button"
    >
      <span className={styles['card__song']}>{name}</span> &nbsp;- &nbsp;
      <Artists {...props} className={styles['card__artists']} />
      {/* <button type="button" onClick={addQueue(props)} className={styles['queue']}>
        <MdQueue />
      </button> */}
    </button>
  );
};

export default Card;
