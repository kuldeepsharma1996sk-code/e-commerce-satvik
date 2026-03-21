/** @type {import('next').NextConfig} */
const nextConfig = {
  // Absolutely NO basePath or assetPrefix here
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;
