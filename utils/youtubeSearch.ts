import search from 'youtube-search';
import getConfig from 'next/config';

const { publicRuntimeConfig: config } = getConfig();

const options = {
  maxResults: 1,
  key: config.api_key,
};

const youtubeSearch = async (props) => {
  const res = await new Promise((res, rej) => {
    search(props, options, (err, response) => {
      if (err || !response) {
        console.error(err);
        return rej();
      }
      res(response[0]?.id);
    });
  });
  return res;
};

export default youtubeSearch;
