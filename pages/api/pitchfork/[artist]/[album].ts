import { JSDOM } from 'jsdom-deno';
import type { NextApiRequest, NextApiResponse } from 'next';
import mongoose from 'mongoose';

import Model from 'utils/models/reviews';

const get = async (req: NextApiRequest, res: NextApiResponse) => {
  mongoose.connect(process.env.MONGO_URI);
  const { artist, album } = req?.query as any;
  const db = await Model.findOne({ album });
  if (db) return res.json(db);

  const response = await fetch(`https://pitchfork.com/search/more/?query=${artist?.split(' ')[0]}&filter=albumreviews`)
    .then((r) => r.text());
  var dom = new JSDOM(response);

  const e = dom.window.document.querySelectorAll(".review__link");

  const allAlbum = Array.prototype.map.call(e, (t) => {
    return {
      text: t.querySelector('em')?.textContent ?? t.querySelector('h2')?.textContent,
      href: t.href,
    }
  });

  const albumExist = allAlbum.find(({ text }) => text.toLowerCase() === album?.toLowerCase())?.href ?? allAlbum.find(({ text }) => text.toLowerCase().includes(album.toLowerCase()))?.href;

  if (!albumExist) {
    return res.status(404).json({ message: 'no album review' });
  }

  const albumPage = await fetch(`https://pitchfork.com${albumExist}`)
    .then((r) => r.text());

  const pageDom = new JSDOM(albumPage);

  const el = pageDom.window.document.getElementsByTagName('script');

  const context = Array.prototype.map.call(el, (t) => {
    return {
      type: t.type,
      text: t.innerHTML,
      url: `https://pitchfork.com${allAlbum.find(({ text }) => text === album)?.href}`,
    };
  }).find(({ type }) => type === "application/ld+json");

  const parsed = JSON.parse(context?.text);

  const returnedVal = {
    ...context,
    best: albumPage?.includes('<div> <!-- -->Best New Music<!-- --> </div>'),
    rating: parsed.itemReviewed.review.reviewRating.ratingValue,
    text: parsed.itemReviewed.description,
    url: parsed.url,
  };

  Model.create({ ...returnedVal, album });
  return res.json(returnedVal);
};

export default get;
