import { JSDOM } from 'jsdom-deno';
import type { NextApiRequest, NextApiResponse } from 'next';
import mongoose from 'mongoose';

import Model from 'utils/models/reviews';

const get = async (req: NextApiRequest, res: NextApiResponse) => {
  mongoose.connect(process.env.MONGO_URI);
  const { artist, album } = req?.query as any;
  const db = await Model.findOne({ album });
  if (db) return res.json(db);

  const response = await fetch(
    `https://pitchfork.com/search/more/?query=${artist?.split(' ')[0]}&filter=albumreviews`
  ).then((r) => r.text());
  const linkPageDom = new JSDOM(response);

  const reviewLinks = linkPageDom.window.document.querySelectorAll('.review__link');

  const allAlbums = Array.prototype.map.call(reviewLinks, (t) => ({
    text: t.querySelector('em')?.textContent ?? t.querySelector('h2')?.textContent,
    href: t.href,
  }));

  const currentAlbum = allAlbums.find(
    ({ text }) =>
      text.toLowerCase() === album?.toLowerCase() ||
      text.toLowerCase().includes(album.toLowerCase())
  )?.href;

  if (!currentAlbum) return res.status(404).json({ message: 'no album review' });

  const albumPage = await fetch(`https://pitchfork.com${currentAlbum}`).then((r) => r.text());

  const pageDom = new JSDOM(albumPage);

  const el = pageDom.window.document.getElementsByTagName('script');

  const context = Array.prototype.map
    .call(el, ({ type, innerHTML }) => ({
      type,
      text: innerHTML,
      url: `https://pitchfork.com${allAlbums.find(({ text }) => text === album)?.href}`,
    }))
    ?.find(({ type }) => type === 'application/ld+json');

  const { url = '', itemReviewed } = JSON.parse(context?.text);

  const albumReview = {
    ...context,
    best: albumPage?.includes('<div> <!-- -->Best New Music<!-- --> </div>'),
    rating: itemReviewed?.review?.reviewRating?.ratingValue,
    text: itemReviewed?.description,
    url,
  };

  Model.create({ ...albumReview, album });
  return res.status(200).json(albumReview);
};

export default get;
