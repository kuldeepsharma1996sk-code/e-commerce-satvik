const nextConfig = {
  // Remove basePath and assetPrefix for Vercel
  images: {
    unoptimized: true, // Keep this for now to ensure images load
  },
};

export default nextConfig;
