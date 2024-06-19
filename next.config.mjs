/** @type {import('next').NextConfig} */

const nextConfig = {
    env: {
        serverBase: process.env.NEXT_PUBLIC_SERVER_BASE,

        googleAuthURL:    process.env.NEXT_PUBLIC_GOOGLE_AUTH,
        googleConnectURL: process.env.NEXT_PUBLIC_GOOGLE_CONNECT,
        googleUnlinkURL:  process.env.NEXT_PUBLIC_GOOGLE_UNLINK,

        twitterAuthURL:    process.env.NEXT_PUBLIC_TWITTER_AUTH,
        twitterConnectURL: process.env.NEXT_PUBLIC_TWITTER_CONNECT,
        twitterUnlinkURL:  process.env.NEXT_PUBLIC_TWITTER_UNLINK,

        facebookAuthURL:    process.env.NEXT_PUBLIC_FACEBOOK_AUTH,
        facebookConnectURL: process.env.NEXT_PUBLIC_FACEBOOK_CONNECT,
        facebookUnlinkURL:  process.env.NEXT_PUBLIC_FACEBOOK_UNLINK,
    }
};

export default nextConfig;
