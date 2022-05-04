import type { NextApiRequest, NextApiResponse } from 'next';
import SpotifyWebApi from 'spotify-web-api-node';
import { serialize, parse } from 'cookie';

const token = (req: NextApiRequest, res: NextApiResponse) => {
  const cookie = parse(req?.headers?.cookie || '');

  if (cookie?.accessToken) return res.status(200).json({ message: 'AccessToken found!' });

  const spotifyApi = new SpotifyWebApi({
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
  });

  return spotifyApi
    .clientCredentialsGrant()
    .then((data) => {
      res
        .setHeader(
          'Set-Cookie',
          serialize('accessToken', data.body.access_token, {
            path: '/',
            maxAge: data?.body?.expires_in,
          })
        )
        .status(200)
        .end();
    })
    .catch((err) => {
      throw err;
    });
};

export default token;
