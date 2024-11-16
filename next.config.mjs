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
                protocol: 'https',
                hostname: 'gateway.pinata.cloud'
            },
            {
                protocol: 'https',
                hostname: 'emerald-careful-anaconda-210.mypinata.cloud'
            },
            {
                protocol: 'https',
                hostname: 'influential-blue-mockingbird.myfilebase.com'
            },
            {
                protocol: 'http',
                hostname: 'localhost',
            },
        ],
    }
};

export default nextConfig;
