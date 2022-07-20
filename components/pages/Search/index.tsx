import React, { useEffect, useContext } from 'react';
import type { FC } from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import useSWR from 'swr';

import { Context as LoaderContext } from 'store/loader';

const SearchArtists = dynamic(() => import('components/modules/Cards/SearchArtist'));
const SearchCard = dynamic(() => import('components/modules/Cards/Search'));

const SearchPage: FC = () => {
  const { setIsLoading } = useContext(LoaderContext);
  const router = useRouter();
  const { data } = useSWR(`/api/spotify/search/${router?.query?.search}`);

  useEffect(() => {
    setIsLoading(!data);
  }, [data]);

  if (!router?.query?.search) return null;

  return (
    <>
      <SearchArtists />
      <SearchCard />
    </>
  );
};

export default SearchPage;
