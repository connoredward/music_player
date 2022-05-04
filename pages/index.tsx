import React from 'react';
import type { NextPage } from 'next';
import useSWR from 'swr';
import dynamic from 'next/dynamic';

import Nav from 'components/modules/Nav';

import styles from './styles.module.scss';

const SearchPage = dynamic(() => import('components/pages/Search'));

const Page: NextPage = () => {
  // Get accessToken and store as cookie.
  useSWR('/api/spotify/token');
  return (
    <div className={styles['page']}>
      <Nav />
      <SearchPage />
    </div>
  );
};
export default Page;
