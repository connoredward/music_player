import type { NextApiRequest, NextApiResponse } from 'next';
import SpotifyWebApi from 'spotify-web-api-node';
import { parse } from 'cookie';

const search = (req: NextApiRequest, res: NextApiResponse) => {
  const { artist } = req.query;
  const cookie = parse(req?.headers?.cookie);

  const spotifyApi = new SpotifyWebApi({ accessToken: cookie?.accessToken });

  spotifyApi.searchTracks(`artist:${artist}`)
    .then((data) => res.json(data.body))
    .catch((err) => {
      throw err;
    });
};

export default search;
