import type { NextApiRequest, NextApiResponse } from 'next';
import SpotifyWebApi from 'spotify-web-api-node';
import { parse } from 'cookie';

const getAlbum = (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;
  const cookie = parse(req?.headers?.cookie);

  const spotifyApi = new SpotifyWebApi({ accessToken: cookie?.accessToken });

  return spotifyApi
    .getAlbum(id)
    .then((data) => res.json(data.body))
    .catch((err) => {
      throw err;
    });
};

export default getAlbum;
