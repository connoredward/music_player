import React from 'react';
import type { FC } from 'react';
import useSWR from 'swr';
import { useRouter } from 'next/router';
import Image from 'next/image';

import styles from './styles.module.scss';

const TrendingArtists: FC = () => {
  const router = useRouter();
  const { data } = useSWR('/api/deezer/charts');
  if (!data) return null;
  return (
    <div className={styles['trending']}>
      <h3>Trending Artists</h3>
      {data?.artists?.data?.splice(0, 3)?.map(({ name, picture_medium }) => (
        <button key={name} type="button" onClick={() => router.push(`?search=${name}`)}>
          <Image
            src={picture_medium}
            width={45}
            height={45}
            objectFit="cover"
            placeholder="blur"
            alt={name}
            blurDataURL={picture_medium}
            className={styles['trending__img']}
          />
          <span>{name}</span>
        </button>
      ))}
      <button
        className={styles['trending__more']}
        type="button"
        onClick={() => console.log('more')}
      >
        See More
      </button>
    </div>
  );
};

export default TrendingArtists;
