import React from 'react';
import type { FC } from 'react';
import useSWR from 'swr';
import Image from 'next/image';
import { useRouter } from 'next/router';

import Card from 'components/modules/Cards/Album';

import styles from './styles.module.scss';

const FavouritesPage: FC = () => {
  const router = useRouter();
  const { data } = useSWR('/api/spotify/playlist');
  console.log(data);
  if (!data) return null;
  return (
    <div className={styles['favourites']}>
      <h4>Favourites</h4>
      <div className={styles['list']}>
        {data?.body?.tracks?.items?.map(({ track }) => (
          <div key={track?.id} className={styles['song']}>
            <button type="button" onClick={() => router.push(`?album=${track?.album?.id}`)}>
              <Image
                className={styles['song__cover']}
                alt={track?.album?.name}
                src={track?.album?.images?.[0]?.url}
                width={55}
                height={55}
                blurDataURL={track?.album?.images?.[2]?.url}
                placeholder="blur"
              />
            </button>
            <Card {...track} img={track?.album?.images?.[0]?.url} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default FavouritesPage;
