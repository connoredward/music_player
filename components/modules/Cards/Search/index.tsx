import React from 'react';
import type { FC } from 'react';
import { useRouter } from 'next/router';

import styles from './styles.module.scss';

type Props = {
  album: {
    name: string;
    id: string;
    images: {
      url: string;
    }[];
  };
  artists: {
    name: string;
  }[];
};

const Card: FC<Props> = ({ album, artists }) => {
  const router = useRouter();
  return (
    <div className={styles['card']} onClick={() => router.push(`/?album=${album?.id}`, null, { shallow: true })}>
      <div className={styles['content']}>
        <span className={styles['content__album']}>{album.name}</span>
        <span className={styles['content__artist']}>{artists[0].name}</span>
      </div>
      <div className={styles['album_cvr']} style={{ backgroundImage: `url(${album?.images[2]?.url})` }} />
    </div>
  );
};

export default Card;
