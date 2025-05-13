/** @type {import('next').NextConfig} */
const { i18n } = require('./next-i18n.config.js')

module.exports = {
  swcMinify: true,
  reactStrictMode: true,
  env: {
    API: process.env.NEXT_PUBLIC_API,
    PHOTO_DELETE: process.env.NEXT_PUBLIC_PHOTO_DELETE
  },
  images: {
    remotePatterns: [
    {
      protocol: "https",
      hostname: "i.postimg.cc",
    },
    {
      protocol: "https",
      hostname: "i.ibb.co",
    },
    ],
  },
  i18n,
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        fs: false,
      };
    }
  
    return config;
  },
}
