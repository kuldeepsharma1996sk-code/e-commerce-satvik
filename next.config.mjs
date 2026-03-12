/** @type {import('next').NextConfig} */
const nextConfig = {
    // 1. Enable Static Export for GitHub Pages
    output: 'export',
    
    // 2. Set the Base Path so CSS and JS load from the correct folder
    basePath: '/e-commerce-satvik',
    assetPrefix: '/e-commerce-satvik/',
    
    // 3. Disable Image Optimization (Required for static hosting)
    images: {
        unoptimized: true,
    },
    
    // 4. Ensure trailing slashes for cleaner URLs
    trailingSlash: true,
};

export default nextConfig;
