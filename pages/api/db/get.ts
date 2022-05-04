import type { NextApiRequest, NextApiResponse } from 'next';
import mongoose from 'mongoose';

import Model from 'utils/models/searched';

const get = async (req: NextApiRequest, res: NextApiResponse) => {
  mongoose.connect(process.env.MONGO_URI);
  return res.json(await Model.find());
};

export default get;
