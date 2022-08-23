import React from 'react';
import type { FC } from 'react';
import useSWR from 'swr';

import Card from 'components/modules/Cards/Favourite';

import styles from './styles.module.scss';

const FavouritesPage: FC = () => {
  const { data } = useSWR('/api/spotify/playlist');
  if (!data) return null;
  return (
    <div className={styles['favourites']}>
      <h4>Favourites</h4>
      <div className={styles['list']}>
        {data?.body?.tracks?.items?.map(({ track }) => (
          <Card key={track.id} {...track} favourites={data?.body} />
        ))}
      </div>
    </div>
  );
};

export default FavouritesPage;
