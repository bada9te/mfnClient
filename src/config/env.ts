const envCfg = {
    me: process.env.NEXT_PUBLIC_ME,
    serverDomain: process.env.NEXT_PUBLIC_SERVER_DOMAIN,
    serverBase: process.env.NEXT_PUBLIC_SERVER_BASE,
    userIdCookieKey: process.env.NEXT_PUBLIC_USER_ID_COOKIE_KEY,
    serverFilesEndpoint: process.env.NEXT_PUBLIC_SERVER_BASE_FILES,

    googleAuthURL:    process.env.NEXT_PUBLIC_GOOGLE_AUTH,
    twitterAuthURL:    process.env.NEXT_PUBLIC_TWITTER_AUTH,
    facebookAuthURL:    process.env.NEXT_PUBLIC_FACEBOOK_AUTH,

    rainbowkitId: process.env.NEXT_PUBLIC_RAINBOWKIT_ID,
    envType: process.env.NEXT_PUBLIC_ENV_TYPE,
}


export default envCfg;