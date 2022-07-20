import type { NextApiRequest, NextApiResponse } from 'next';
import SpotifyWebApi from 'spotify-web-api-node';
import { parse } from 'cookie';

const search = async (req: NextApiRequest, res: NextApiResponse) => {
  const { search } = req.query;
  const cookie = parse(req?.headers?.cookie);

  const spotifyApi = new SpotifyWebApi({ accessToken: cookie?.accessToken });

  return res.json({
    artists: await spotifyApi.searchArtists(search).catch((err) => {
      throw err;
    }),
    albums: await spotifyApi.searchTracks(`artist:${search}`).catch((err) => {
      throw err;
    }),
  });
};

export default search;
