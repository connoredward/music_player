import type { NextApiRequest, NextApiResponse } from 'next';
import SpotifyWebApi from 'spotify-web-api-node';
import { parse } from 'cookie';

const search = async (req: NextApiRequest, res: NextApiResponse) => {
  const cookie = parse(req?.headers?.cookie);

  const spotifyApi = new SpotifyWebApi({ accessToken: cookie?.accessToken });

  return res.json(
    await spotifyApi.getPlaylist('5MabRiBL4bN40zSGwicJrk').catch((err) => {
      throw err;
    })
  );
};

export default search;
