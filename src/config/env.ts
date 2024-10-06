const envCfg = {
    serverDomain: process.env.NEXT_PUBLIC_SERVER_DOMAIN,
    serverBase: process.env.NEXT_PUBLIC_SERVER_BASE,
    userIdCookieKey: process.env.NEXT_PUBLIC_USER_ID_COOKIE_KEY,
    userSessionCookieKey: process.env.NEXT_PUBLIC_SESSION_COOKIE_KEY,
    serverFilesEndpoint: process.env.NEXT_PUBLIC_SERVER_BASE_FILES,

    passportFacebookID: process.env.NEXT_PUBLIC_PASSPORT_FACEBOOK_ID,
    passportFacebookSECRET: process.env.NEXT_PUBLIC_PASSPORT_FACEBOOK_SECRET,

    passporttwitterKEY: process.env.NEXT_PUBLIC_PASSPORT_TWITTER_KEY,
    passportTwitterSECRET: process.env.NEXT_PUBLIC_PASSPORT_TWITTER_SECRET,

    passportGoogleID: process.env.NEXT_PUBLIC_PASSPORT_GOOGLE_ID,
    passportGoogleSECRET: process.env.NEXT_PUBLIC_PASSPORT_GOOGLE_SECRET,

    googleAuthURL:    process.env.NEXT_PUBLIC_GOOGLE_AUTH,
    twitterAuthURL:    process.env.NEXT_PUBLIC_TWITTER_AUTH,
    facebookAuthURL:    process.env.NEXT_PUBLIC_FACEBOOK_AUTH,

    rainbowkitId: process.env.NEXT_PUBLIC_RAINBOWKIT_ID,
    envType: process.env.NEXT_PUBLIC_ENV_TYPE,
}


export default envCfg;