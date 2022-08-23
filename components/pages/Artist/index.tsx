import React from 'react';
import type { FC } from 'react';
import useSWR from 'swr';
import { useRouter } from 'next/router';
import Image from 'next/image';

import AlbumCard from 'components/modules/Cards/Search';

import styles from './styles.module.scss';

const ArtistPage: FC = () => {
  const router = useRouter();
  const { data } = useSWR(`/api/spotify/artist/${router?.query?.artist}`);
  if (!data || !router?.query?.artist) return null;
  return (
    <div>
      <header>
        <Image
          src={data?.artist?.body?.images?.[0]?.url}
          width={150}
          height={150}
          alt={data?.artist?.body?.name}
          placeholder="blur"
          blurDataURL={data?.artist?.body?.images?.[0]?.url}
        />
        <div>
          <span>{data?.artist?.body?.name}</span>
          <span>{data?.artist?.body?.followers?.total}</span>
        </div>
      </header>

      <div>
        {data?.albums?.body?.items
          ?.reduce((acc, cur) => {
            if (acc.find((i) => i.name.includes(cur.name) || cur.name.includes(i.name))) return acc;
            return [...acc, cur];
          }, [])
          ?.sort(
            // @ts-ignore
            ({ release_date: a }, { release_date: b }) => new Date(b) - new Date(a)
          )
          ?.map((album) => (
            <button
              onClick={() => router.push(`/?album=${album?.id}`)}
              key={album?.id}
              type="button"
            >
              <Image
                src={album?.images?.[0]?.url}
                alt={album?.name}
                width={80}
                height={80}
                placeholder="blur"
                blurDataURL={album?.images?.[0]?.url}
              />
            </button>
          ))}
      </div>
    </div>
  );
};

export default ArtistPage;
