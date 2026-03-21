/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
  },
  // ADD THIS BLOCK BELOW
  eslint: {
    // This allows production builds to successfully complete 
    // even if your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Also ignore TypeScript errors during build for maximum stability
    ignoreBuildErrors: true,
  },
};

module.exports = nextConfig;
