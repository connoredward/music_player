import React from 'react';
import type { NextPage } from 'next';
import useSWR from 'swr';

const Page: NextPage = () => {
  // Get accessToken and store as cookie.
  useSWR('/api/spotify/token');
  return (
    <div>
      home
    </div>
  );
};
export default Page;
