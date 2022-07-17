import React from 'react';
import type { FC } from 'react';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import Image from 'next/image';

import styles from './styles.module.scss';

const Card: FC = () => {
  const router = useRouter();
  const { data } = useSWR(`/api/spotify/artist/${router?.query?.search}`);
  if (!data?.albums) return null;
  const tracks = data?.albums?.body?.tracks?.items
    ?.filter(
      (value, index, self) => index === self.findIndex((t) => t.album.name === value.album.name)
    )
    // @ts-ignore
    ?.sort(
      ({ album: { release_date: a } }, { album: { release_date: b } }) => new Date(b) - new Date(a)
    );
  return (
    <>
      <span>Searched:</span>
      {tracks?.map(({ album, artists, id }) => (
        <div
          onClick={() => router.push(`/?album=${album?.id}`, null, { shallow: true })}
          className={styles['card']}
          key={id}
        >
          <div className={styles['content']}>
            <span className={styles['content__album']}>{album.name}</span>
            <span className={styles['content__artist']}>{artists[0].name}</span>
          </div>
          <Image
            alt={album?.name}
            src={album?.images[2]?.url}
            width={70}
            height={70}
            placeholder="blur"
            blurDataURL={album?.images[2]?.url}
          />
        </div>
      ))}
    </>
  );
};

export default Card;
