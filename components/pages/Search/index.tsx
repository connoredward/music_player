import React, { useState, useEffect } from 'react';
import type { FC } from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import useSWR from 'swr';

const SearchCard = dynamic(() => import('components/modules/Cards/Search'));

const SearchPage: FC = () => {
  const router = useRouter();

  const [searched, setSearched] = useState(null);

  // Get accessToken and store as cookie.
  const { data } = useSWR('/api/spotify/token');

  useEffect(() => {
    if (router?.query?.search && data) {
      fetch(`/api/spotify/artist/${router?.query?.search}`)
        .then((res) => res.json())
        .then(({ tracks }) => {
          router.push({ pathname: '/', query: { search: router?.query?.search } });
          setSearched({
            ...tracks,
            items: tracks.items
              ?.filter(
                (value, index, self) =>
                  index === self.findIndex((t) => t.album.name === value.album.name)
              )
              .sort((a, b) => {
                // @ts-ignore
                return new Date(b.album.release_date) - new Date(a.album.release_date);
              }),
          });
        })
        .catch((err) => console.error(err));
    }
  }, [router?.query?.search, data]);

  if (!router?.query?.search || !searched) return null;

  return searched?.items?.map((item) => <SearchCard {...item} key={item?.id} />);
};

export default SearchPage;
