/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};

module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
    nextConfig,
  },
  env: {
    TOKEN_ADDRESS_VAR: process.env.TOKEN_ADDRESS,
  }
};
