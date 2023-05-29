const hostnames = ["upload.wikimedia.org", "dev-icarus.mufin.lol"];
/** @type {import('next').NextConfig} */
const nextConfig = {
  // reactStrictMode: true,
  env: {
    API_BASE_URL: process.env.API_URL,
    KOKAO_MAP_URL: process.env.KOKAO_MAP_URL,
  },
  images: {
    remotePatterns: hostnames.map((hostname) => ({
      protocol: "https",
      hostname,
    })),
  },
};

module.exports = nextConfig;
