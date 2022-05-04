import React from 'react';
import type { AppProps } from 'next/app';
import { SWRConfig } from 'swr';

import { Store as SongStore } from 'store/song';
import { Store as YoutubeStore } from 'store/youtube';
import { Store as QueueStore } from 'store/queue';

import './global.scss';

export const MyApp = ({ Component, pageProps }: AppProps) => {
  const localStorageProvider = () => {
    if (typeof window !== 'undefined') {
      const map = new Map(JSON.parse(localStorage.getItem('app-cache') || '[]'));
      window.addEventListener('beforeunload', () => {
        const appCache = JSON.stringify(Array.from(map.entries()));
        localStorage.setItem('app-cache', appCache);
      });
      return map;
    }
    return new Map();
  };
  return (
    <SWRConfig
      value={{
        provider: localStorageProvider,
        fetcher: (resource, init) => fetch(resource, init).then((res) => res.json()),
      }}
    >
      <QueueStore>
        <YoutubeStore>
          <SongStore>
            <Component {...pageProps} />
          </SongStore>
        </YoutubeStore>
      </QueueStore>
    </SWRConfig>
  );
};

export default MyApp;
