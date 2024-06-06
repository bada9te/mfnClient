export * from "./categories/config";

const {
    VITE_THEME_VAR_NAME,
    VITE_LANGUAGE_VAR_NAME,
    VITE_SERVER_BASE,

    VITE_GOOGLE_AUTH,
    VITE_GOOGLE_CONNECT,
    VITE_GOOGLE_UNLINK,

    VITE_TWITTER_AUTH,
    VITE_TWITTER_CONNECT,
    VITE_TWITTER_UNLINK,

    VITE_FACEBOOK_AUTH,
    VITE_FACEBOOK_CONNECT,
    VITE_FACEBOOK_UNLINK,
} = import.meta.env;

export const cfg = {
    serverBase: VITE_SERVER_BASE,
    themeVarName: VITE_THEME_VAR_NAME,
    languageVarName: VITE_LANGUAGE_VAR_NAME,

    googleAuthURL: VITE_GOOGLE_AUTH,
    googleConnectURL: VITE_GOOGLE_CONNECT,
    googleUnlinkURL: VITE_GOOGLE_UNLINK,

    twitterAuthURL: VITE_TWITTER_AUTH,
    twitterConnectURL: VITE_TWITTER_CONNECT,
    twitterUnlinkURL: VITE_TWITTER_UNLINK,

    facebookAuthURL: VITE_FACEBOOK_AUTH,
    facebookConnectURL: VITE_FACEBOOK_CONNECT,
    facebookUnlinkURL: VITE_FACEBOOK_UNLINK,
};