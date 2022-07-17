import React, { useEffect, useContext } from 'react';
import type { FC } from 'react';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import useSWR from 'swr';

import Review from 'components/modules/Review';

import { Context as LoaderContext } from 'store/loader';

import styles from './styles.module.scss';

const Card = dynamic(() => import('components/modules/Cards/Album'));

const AlbumPage: FC = () => {
  const { setIsLoading } = useContext(LoaderContext);
  const router = useRouter();

  const { data } = useSWR(`/api/spotify/album/${router?.query?.album}`);

  useEffect(() => {
    setIsLoading(!data);
  }, [data]);

  if (!router?.query?.album || !data) return null;

  return (
    <div>
      <div className={styles['header']}>
        <div className={styles['header__content']}>
          <span className={styles['header__artist']}>{data?.artists?.map(({ name }) => name)}</span>
          <span className={styles['header__album']}>{data?.name}</span>

          <Review {...data} />
        </div>
        <img src={data?.images[1]?.url} />
      </div>

      <div>
        {data?.tracks?.items?.map((item) => (
          <Card
            {...item}
            img={data?.images[2]?.url}
            albumId={data?.id}
            key={item?.id}
            album={data}
          />
        ))}
      </div>
    </div>
  );
};

export default AlbumPage;
