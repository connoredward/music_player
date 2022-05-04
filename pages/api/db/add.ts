import type { NextApiRequest, NextApiResponse } from 'next';
import mongoose from 'mongoose';

import Model from 'utils/models/searched';

const add = async (req: NextApiRequest, res: NextApiResponse) => {
  mongoose.connect(process.env.MONGO_URI);
  await Model.create(JSON.parse(req?.body));

  return res.json(await Model.find());
};

export default add;
