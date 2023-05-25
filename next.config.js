/** @type {import('next').NextConfig} */
const nextConfig = {
  // reactStrictMode: true,
  env: {
    API_BASE_URL: process.env.API_URL,
    KOKAO_MAP_URL:process.env.KOKAO_MAP_URL
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'upload.wikimedia.org',
        hostname: 'dev-icarus.mufin.lol',
      },
    ],
  },
};

module.exports = nextConfig;
