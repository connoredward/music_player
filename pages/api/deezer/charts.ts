import type { NextApiRequest, NextApiResponse } from 'next';
import DeezerPublicApi from 'deezer-public-api';
const deezer = new DeezerPublicApi();

const getCharts = (req: NextApiRequest, res: NextApiResponse) => {
  deezer.chart(10).then((result) => {
    return res.json(result);
  });
};

export default getCharts;
