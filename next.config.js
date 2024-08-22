// configure all the allowed host
const hostnames = [
  "upload.wikimedia.org",
  "dev-icarus.mufin.lol",
  "dev-backend.icarus.mufin.lol",
  "dev-static.icarus.mufin.lol",
  process.env.STATIC_IMAGE_HOST,
  process.env.API_URL?.replace('https://', '').replace('http://', '') || "",
  "dev-api.moad.live",
  "dev-static.moad.live"
];
/** @type {import('next').NextConfig} */
const nextConfig = {
  // reactStrictMode: true,
  env: {
    API_URL: process.env.API_URL,
    KOKAO_MAP_URL: process.env.KOKAO_MAP_URL,
    KAKAO_MAP_API_KEY: process.env.KAKAO_MAP_API_KEY,
    KAKAO_REST_API_KEY: process.env.KAKAO_REST_API_KEY,
    STATIC_IMAGE_HOST: process.env.STATIC_IMAGE_HOST
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
};

module.exports = nextConfig;
