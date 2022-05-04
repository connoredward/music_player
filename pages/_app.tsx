import React from 'react';
import type { AppProps } from 'next/app';
import { SWRConfig } from 'swr';

import './global.scss';

export const MyApp = ({ Component, pageProps }: AppProps) => {
  const localStorageProvider = () => {
    if (typeof window !== 'undefined') {
      const map = new Map(JSON.parse(localStorage.getItem('app-cache') || '[]'))
      window.addEventListener('beforeunload', () => {
        const appCache = JSON.stringify(Array.from(map.entries()))
        localStorage.setItem('app-cache', appCache)
      })
      return map
    }
    return new Map();
  };
  return (
    <SWRConfig
      value={{
        provider: localStorageProvider,
        fetcher: (resource, init) => fetch(resource, init).then(res => res.json()),
      }}
    >
      <Component {...pageProps} />
    </SWRConfig>
  );
};

export default MyApp;
