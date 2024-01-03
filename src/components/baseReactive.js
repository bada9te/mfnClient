import { makeVar } from "@apollo/client";

const themeVAR = process.env.REACT_APP_THEME_VAR_NAME;
const languageVAR = process.env.REACT_APP_LANGUAGE_VAR_NAME;

export const baseState = makeVar({
    user: {
        _id:          '',
        email:        '',
        nickname:     '',
        description:  '',
        aboutMe:      '',
        avatar:       '',
        background:   '',
        subscribers:  [],
        subscribedOn: [],
    },
    theme:    JSON.parse(localStorage.getItem(themeVAR))?.theme       || ('light' && localStorage.setItem(themeVAR, JSON.stringify({ theme: 'light' }))),
    language: JSON.parse(localStorage.getItem(languageVAR))?.language || ('en' && localStorage.setItem(languageVAR, JSON.stringify({ language: 'en' }))),
    locations: {
        images: `${process.env.REACT_APP_SERVER_BASE}/uploads/images`,
        audios: `${process.env.REACT_APP_SERVER_BASE}/uploads/audios`,
        others: `${process.env.REACT_APP_SERVER_BASE}/uploads/others`,
    },
});