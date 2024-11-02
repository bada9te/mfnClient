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
                protocol: 'http',
                hostname: 'localhost',
            },
        ],
    }
};

export default nextConfig;
