/** @type {import('next').NextConfig} */

const nextConfig = {
    reactStrictMode: false,
    crossOrigin: "use-credentials",
    env: {
        serverDomain: process.env.NEXT_PUBLIC_SERVER_DOMAIN,
        serverBase: process.env.NEXT_PUBLIC_SERVER_BASE,
        userIdCookieKey: process.env.NEXT_PUBLIC_USER_ID_COOKIE_KEY,
        userSessionCookieKey: process.env.NEXT_PUBLIC_SESSION_COOKIE_KEY,
        serverFilesEndpoint: process.env.NEXT_PUBLIC_SERVER_BASE_FILES,

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
