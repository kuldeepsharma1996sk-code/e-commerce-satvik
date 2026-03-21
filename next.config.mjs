/** @type {import('next').NextConfig} */
const nextConfig = {
    // Disable Image Optimization (Required for compatibility)
    images: {
        unoptimized: true,
    },
    
    // Ensure trailing slashes for cleaner URLs
    trailingSlash: true,
};

export default nextConfig;
