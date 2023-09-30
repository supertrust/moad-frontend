const hostnames = [
  "upload.wikimedia.org",
  "dev-icarus.mufin.lol",
  "dev-backend.icarus.mufin.lol",
];
/** @type {import('next').NextConfig} */
const nextConfig = {
  // reactStrictMode: true,
  env: {
    API_BASE_URL: process.env.API_URL,
    KOKAO_MAP_URL: process.env.KOKAO_MAP_URL,
    GOOGLE_MAP_API_KEY: process.env.GOOGLE_MAP_API_KEY,
    GOOGLE_MAP_SECART_KEY: process.env.GOOGLE_MAP_SECART_KEY,
    KAKAO_MAP_API_KEY: process.env.KAKAO_MAP_API_KEY,
    KAKAO_REST_API_KEY: process.env.KAKAO_REST_API_KEY,
  },
  images: {
    remotePatterns: hostnames.map((hostname) => ({
      protocol: "https",
      hostname,
    })),
  },
};

module.exports = nextConfig;
