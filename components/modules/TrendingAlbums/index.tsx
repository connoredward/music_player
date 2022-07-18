import React from 'react';
import type { FC } from 'react';
import useSWR from 'swr';
import { useRouter } from 'next/router';
import Image from 'next/image';

import styles from './styles.module.scss';

const TrendingAlbums: FC = () => {
  const router = useRouter();
  const { data } = useSWR('/api/deezer/charts');
  if (!data) return null;
  return (
    <div className={styles['albums']}>
      <header>
        <h4>Trending Albums</h4>
        <button type="button" onClick={() => console.log('more')}>
          See More
        </button>
      </header>

      <div className={styles['list']}>
        {data?.albums?.data?.map(({ id, artist, cover_medium, title }) => (
          <button key={id} type="button" onClick={() => router.push(`/?search=${title}`)}>
            <Image
              alt={title}
              src={cover_medium}
              width={55}
              height={55}
              placeholder="blur"
              blurDataURL={cover_medium}
              objectFit="cover"
              className={styles['albums__cover']}
            />
            <div>
              <span className={styles['albums__title']}>{title}</span>
              <span className={styles['albums__name']}>{artist?.name}</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default TrendingAlbums;
