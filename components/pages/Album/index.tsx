import React, { useEffect, useState } from 'react';
import type { FC } from 'react';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';

import Review from 'components/modules/Review'

import styles from './styles.module.scss';

const Card = dynamic(() => import('components/modules/Cards/Album'));

const AlbumPage: FC = () => {
  const router = useRouter();

  const [album, setAlbum] = useState(null);

  useEffect(() => {
    if (router?.query?.album) {
      fetch(`/api/spotify/album/${router?.query?.album}`)
        .then((res) => res.json())
        .then((body) => setAlbum(body))
        .catch((err) => console.error(err));
    } else {
      setAlbum(null);
    }
  }, [router?.query?.album]);

  if (!router?.query?.album || !album) return <div />;

  return (
    <div>
      <div className={styles['header']}>
        <div className={styles['header__content']}>
          <span className={styles['header__artist']}>{album?.artists?.map(({ id, name }) => (name))}</span>
          <span className={styles['header__album']}>{album?.name}</span>

          <Review {...album} />

        </div>
        <img src={album?.images[1]?.url} />
      </div>

      <div>
        {album?.tracks?.items?.map((item) => (
          <Card {...item} img={album?.images[2]?.url} albumId={album?.id} key={item?.id} album={album} />
        ))}
      </div>
    </div>
  );
};

export default AlbumPage;
