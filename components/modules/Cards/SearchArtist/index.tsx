import React from 'react';
import type { FC } from 'react';
import useSWR from 'swr';
import { useRouter } from 'next/router';
import Image from 'next/image';

import styles from './styles.module.scss';

const SearchArtists: FC = () => {
  const router = useRouter();
  const { data } = useSWR(`/api/spotify/search/${router?.query?.search}`);
  if (!data) return null;
  const artists = data?.artists?.body?.artists?.items
    ?.sort(({ followers: { total: a } }, { followers: { total: b } }) => b - a)
    ?.slice(0, 3);
  return (
    <>
      <span>Artists</span>
      <div className={styles['artists']}>
        {artists?.map(({ id, name, images }) => (
          <button
            key={id}
            type="button"
            onClick={() => router.push(`/?artist=${id}`, null, { shallow: true })}
          >
            <Image
              alt={name}
              src={images?.[1]?.url}
              width={150}
              height={120}
              placeholder="blur"
              blurDataURL={images?.[1]?.url}
              objectFit="cover"
              className={styles['artists__img']}
            />
            <span>{name}</span>
          </button>
        ))}
      </div>
    </>
  );
};

export default SearchArtists;
