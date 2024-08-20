/** @type {import('next').NextConfig} */

const nextConfig = {
    reactStrictMode: false,
    crossOrigin: "use-credentials",
    images: {
        domains: ['avatar.vercel.sh', 'localhost'],
    }
};

export default nextConfig;
