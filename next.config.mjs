/** @type {import('next').NextConfig} */
const nextConfig = {
  // Disable Image Optimization (Required for Vercel/Static compatibility)
  images: {
    unoptimized: true,
  },
  
  // Clean URL handling without subfolder basePath
};

export default nextConfig;
