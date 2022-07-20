import React from 'react';
import type { NextPage } from 'next';
import useSWR from 'swr';
import dynamic from 'next/dynamic';
import Head from 'next/head';

import SideBar from 'components/modules/SideBar';
import Nav from 'components/modules/Nav';
import HomePage from 'components/pages/Home';
import Player from 'components/modules/Player';

import styles from './styles.module.scss';

const SearchPage = dynamic(() => import('components/pages/Search'));
const AlbumPage = dynamic(() => import('components/pages/Album'));
const QueuePage = dynamic(() => import('components/pages/Queue'));
const ArtistPage = dynamic(() => import('components/pages/Artist'));

const Page: NextPage = () => {
  // Get accessToken and store as cookie.
  useSWR('/api/spotify/token');
  return (
    <>
      <Head>
        <title>msuci_pl.</title>
      </Head>

      <div className={styles['page']}>
        <SideBar />
        <div className={styles['content']}>
          <Nav />
          <HomePage />
          <AlbumPage />
          <ArtistPage />
        </div>

        <Player />
      </div>
    </>
  );
};
export default Page;
