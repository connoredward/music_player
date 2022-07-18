import React from 'react';
import type { FC } from 'react';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';

import Layout from 'components/layout/Cols';
import FavoriteCard from 'components/modules/Favourites/Card';

import styles from './styles.module.scss';

const TrendingArtists = dynamic(() => import('components/modules/TrendingArtists'), { ssr: false });
const TrendingAlbums = dynamic(() => import('components/modules/TrendingAlbums'), { ssr: false });
const SearchContent = dynamic(() => import('components/pages/Search'));
const PlaylistPage = dynamic(() => import('components/pages/Favourites'));

const HomePage: FC = () => {
  const router = useRouter();
  if (
    Object.keys(router?.query)?.length > 0 &&
    !router?.query?.search &&
    !Object.keys(router?.query).includes('favourites')
  )
    return null;

  return (
    <div className={styles['home']}>
      <h2>Home</h2>
      <Layout SideContent={<TrendingArtists />}>
        {Object.keys(router?.query)?.length === 0 && (
          <>
            <FavoriteCard />
            <TrendingAlbums />
          </>
        )}

        {Object.keys(router?.query).includes('favourites') && <PlaylistPage />}

        {/* Displayed if router.query.search exists */}
        <SearchContent />
      </Layout>
    </div>
  );
};

export default HomePage;
