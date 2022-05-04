import React, { createContext, FC } from 'react';
import type { ReactNode } from 'react';
import useSWR from 'swr';

import youtubeSearch from 'utils/youtubeSearch';

type Props = {
  children?: ReactNode;
};

export const Context = createContext(null) as any;

export const Store: FC<Props> = ({ children }): any => {
  const { data, mutate } = useSWR('/api/db/get');

  const getId = async (args) => {
    const song = data?.find(({ searchedValue, videoId }) => searchedValue === args && videoId);
    if (song) return song?.videoId;

    const videoId = await youtubeSearch(args);

    fetch('/api/db/add', {
      method: 'POST',
      body: JSON.stringify({ searchedValue: args, videoId }),
    })
      .then((res) => res.json())
      .then((body) => mutate(body));

    return videoId;
  };

  return (
    <Context.Provider
      value={{
        getId,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default {
  Store,
  Context,
};
