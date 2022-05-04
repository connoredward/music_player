import React from 'react';
import type { NextPage } from 'next';
import useSWR from 'swr';
import dynamic from 'next/dynamic';
import Head from 'next/head';

import Nav from 'components/modules/Nav';
import Controls from 'components/modules/Controls';
import Player from 'components/modules/Player';

import styles from './styles.module.scss';

const SearchPage = dynamic(() => import('components/pages/Search'));
const AlbumPage = dynamic(() => import('components/pages/Album'));
const QueuePage = dynamic(() => import('components/pages/Queue'));

const Page: NextPage = () => {
  // Get accessToken and store as cookie.
  useSWR('/api/spotify/token');
  return (
    <>
      <Head>
        <title>msuci_pl.</title>
      </Head>
      <div className={styles['page']}>
        <Nav />
        <SearchPage />
        <AlbumPage />
        <QueuePage />

        <Player />
        <Controls />
      </div>
    </>
  );
};
export default Page;
