const envCfg = {
    serverDomain: process.env.NEXT_PUBLIC_SERVER_DOMAIN,
    serverBase: process.env.NEXT_PUBLIC_SERVER_BASE,
    userIdCookieKey: process.env.NEXT_PUBLIC_USER_ID_COOKIE_KEY,

    googleAuthURL:    process.env.NEXT_PUBLIC_GOOGLE_AUTH,
    twitterAuthURL:    process.env.NEXT_PUBLIC_TWITTER_AUTH,
    facebookAuthURL:    process.env.NEXT_PUBLIC_FACEBOOK_AUTH,

    rainbowkitId: process.env.NEXT_PUBLIC_RAINBOWKIT_ID,
    envType: process.env.NEXT_PUBLIC_ENV_TYPE,

    pinataJWT: process.env.PINATA_JWT,
    IPFSGateway: process.env.NEXT_PUBLIC_IPFS_GATEWAY_URL,
}


export default envCfg;