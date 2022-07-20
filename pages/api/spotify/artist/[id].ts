import type { NextApiRequest, NextApiResponse } from 'next';
import SpotifyWebApi from 'spotify-web-api-node';
import { parse } from 'cookie';

const artist = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;
  const cookie = parse(req?.headers?.cookie);

  const spotifyApi = new SpotifyWebApi({ accessToken: cookie?.accessToken });

  return res.json({
    artist: await spotifyApi.getArtist(id).catch((err) => {
      throw err;
    }),
    albums: await spotifyApi.getArtistAlbums(id).catch((err) => {
      throw err;
    }),
  });
};

export default artist;
