import type { NextConfig } from 'next';
// /** @type {import('next').NextConfig} */

const nextConfig: NextConfig = {
    // const nextConfig = {
    /* config options here */
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'quick-capybara-655.convex.cloud',
                port: '',
                pathname: '/api/storage/**',
            },
        ],
    },
};

export default nextConfig;
