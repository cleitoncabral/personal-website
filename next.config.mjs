/** @type {import('next').NextConfig} */
const nextConfig = {
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
  reactStrictMode: true,
  env: {
    API: process.env.API,
    PHOTO_DELETE: process.env.PHOTO_DELETE
  }
};

export default nextConfig;
