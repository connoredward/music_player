const withImages = require('next-images');
const withPlugins = require('next-compose-plugins');

module.exports = withPlugins([[withImages]], {
  publicRuntimeConfig: {
    api_key: process.env.YOUTUBE_API_KEY,
  },
  images: {
    domains: ['i.scdn.co', 'e-cdns-images.dzcdn.net'],
  },
});
