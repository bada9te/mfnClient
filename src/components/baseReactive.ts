import { makeVar } from "@apollo/client";
import { PaletteMode } from "@mui/material";

const themeVAR = process.env.REACT_APP_THEME_VAR_NAME;
const languageVAR = process.env.REACT_APP_LANGUAGE_VAR_NAME;

export type TUserInitialState = {
    _id:          string;
    local: {
        email:    string;
    },
    facebook: {
        email:    string;
    },
    twitter: {
        email:    string;
    },
    google: {
        email:    string;
    },
    nick:         string;
    description:  string;
    aboutMe:      string;
    avatar:       string;
    background:   string;
    subscribers:  [],
    subscribedOn: [],
};

export const userInitialState: TUserInitialState = {
    _id:          '',
    local: {
        email:    '',
    },
    facebook: {
        email:    '',
    },
    twitter: {
        email:    '',
    },
    google: {
        email:    '',
    },
    nick:         '',
    description:  '',
    aboutMe:      '',
    avatar:       '',
    background:   '',
    subscribers:  [],
    subscribedOn: [],
};

export const baseState = makeVar<{
    user: TUserInitialState;
    theme:    PaletteMode;
    language: string;
    locations: {
        images: string;
        audios: string;
        others: string;
    },
}>({
    user: userInitialState,
    theme:    JSON.parse(localStorage.getItem(themeVAR as string) as string)?.theme       || ('light' && localStorage.setItem(themeVAR as string, JSON.stringify({ theme: 'light' }))),
    language: JSON.parse(localStorage.getItem(languageVAR as string) as string)?.language || ('en' && localStorage.setItem(languageVAR as string, JSON.stringify({ language: 'en' }))),
    locations: {
        images: `${process.env.REACT_APP_SERVER_BASE}/uploads/images`,
        audios: `${process.env.REACT_APP_SERVER_BASE}/uploads/audios`,
        others: `${process.env.REACT_APP_SERVER_BASE}/uploads/others`,
    },
});