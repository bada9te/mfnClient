/** @type {import('next').NextConfig} */

const nextConfig = {
    reactStrictMode: false,
    crossOrigin: "use-credentials",
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'avatar.vercel.sh',
            },
            {
                protocol: 'https',
                hostname: 'dev-server-nestjs-development.up.railway.app',
            },
            {
                protocol: 'https',
                hostname: 'server-nestjs-production-bcf6.up.railway.app',
            },
            {
                protocol: 'https',
                hostname: 'api.musicfromnothing.app'
            },
            {
                protocol: 'http',
                hostname: 'localhost',
            },
        ],
    }
};

export default nextConfig;
