import React, { useEffect, useContext } from 'react';
import type { FC } from 'react';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import useSWR from 'swr';
import Image from 'next/image';

import Review from 'components/modules/Review';
import Layout from 'components/layout/Cols';

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
    <div className={styles['album']}>
      <div className={styles['header']}>
        <Image
          src={data?.images[1]?.url}
          width={120}
          height={120}
          placeholder="blur"
          blurDataURL={data?.images[1]?.url}
          alt={data?.name}
          className={styles['header__img']}
        />
        <div className={styles['header__content']}>
          <span className={styles['header__album']}>{data?.name}</span>
          <span className={styles['header__artist']}>
            {data?.artists?.map(({ name }) => name)?.join(', ')}
          </span>
        </div>
        <Review {...data} />
      </div>

      <Layout>
        <div className={styles['list']}>
          {data?.tracks?.items?.map((item) => (
            <Card
              {...item}
              img={data?.images[0]?.url}
              albumId={data?.id}
              key={item?.id}
              album={data}
            />
          ))}
        </div>
      </Layout>
    </div>
  );
};

export default AlbumPage;
