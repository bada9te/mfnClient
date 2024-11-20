const envCfg = {
    serverBase: process.env.NEXT_PUBLIC_SERVER_BASE,
    userIdCookieKey: process.env.NEXT_PUBLIC_USER_ID_COOKIE_KEY,

    googleAuthURL:    process.env.NEXT_PUBLIC_GOOGLE_AUTH,
    twitterAuthURL:    process.env.NEXT_PUBLIC_TWITTER_AUTH,
    facebookAuthURL:    process.env.NEXT_PUBLIC_FACEBOOK_AUTH,

    rainbowkitId: process.env.NEXT_PUBLIC_RAINBOWKIT_ID,
    envType: process.env.NEXT_PUBLIC_ENV_TYPE,

    filebase_FILE_SERVER_URL: process.env.FILE_SERVER_URL,
    filebase_FILEBASE_BUCKET: process.env.FILEBASE_BUCKET,
    filebase_FILEBASE_REGION: process.env.FILEBASE_REGION,
    filebase_FILEBASE_ACCESS_KEY: process.env.FILEBASE_ACCESS_KEY,
    filebase_FILEBASE_SECRET_KEY: process.env.FILEBASE_SECRET_KEY,
    filebase_FILEBASE_IPFS_GATEWAY: process.env.NEXT_PUBLIC_FILEBASE_IPFS_GATEWAY,
}


export default envCfg;