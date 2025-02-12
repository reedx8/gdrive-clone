/** @type {import('next').NextConfig} */
const nextConfig = {
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

module.exports = nextConfig;
