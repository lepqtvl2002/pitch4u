/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
  },
  images: {
    domains: ["api.pitch4u.me"],
  },
};

module.exports = nextConfig;
