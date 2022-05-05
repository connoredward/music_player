import React, { useContext, useState } from 'react';
import type { FC } from 'react';
import Link from 'next/link';
import classNames from 'classnames';
import { MdClose } from 'react-icons/md';
import Image from 'next/image';

import Artists from 'components/modules/Artists';

import { Context as SongContext } from 'store/song';
import { Context as QueueStore } from 'store/queue';
import { Context as YoutubeContext } from 'store/youtube';

import styles from './styles.module.scss';

type Props = {
  album: {
    images: {
      url: string;
    }[];
    name: string;
    id: string;
  };
  name: string;
  artists: {
    name: string;
  }[];
};

const QueueCard: FC<Props> = (props) => {
  const { name, album, artists } = props;
  const [disabled, setDisabled] = useState(false);

  const { setCurrentSong, setCurrentAlbum, currentSong } = useContext(SongContext);
  const { deleteQueue, queue } = useContext(QueueStore);
  const { getId } = useContext(YoutubeContext);

  const searchSong = async () => {
    console.log(album);

    setDisabled(true);
    setCurrentSong({ ...props, videoId: await getId(`${artists?.[0]?.name} - ${name} song`) });
    setCurrentAlbum({ tracks: { items: queue } });
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
      <Link href={{ pathname: '/', query: { album: album?.id } }} prefetch={false} passHref>
        <a href="null" onClick={(e) => e.stopPropagation()}>
          <Image
            src={album?.images?.[1]?.url}
            alt={album?.name}
            width={70}
            height={70}
            objectFit="cover"
          />
        </a>
      </Link>

      <div>
        <span className={styles['card__song']}>{name}</span>
        <span className={styles['card__album']}>
          <Artists {...props} />
          &nbsp;-&nbsp;
          <Link href={{ pathname: '/', query: { album: album?.id } }} prefetch={false} passHref>
            <a href="null" onClick={(e) => e.stopPropagation()}>
              {album?.name}
            </a>
          </Link>
        </span>
      </div>

      <button type="button" onClick={deleteQueue(props)} className={styles['remove']}>
        <MdClose />
      </button>
    </button>
  );
};

export default QueueCard;
