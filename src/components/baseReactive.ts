import { makeVar } from "@apollo/client";
import { PaletteMode } from "@mui/material";
import {cfg} from "@/config";

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
    theme:    JSON.parse(localStorage.getItem(cfg.themeVarName) as string)?.theme       || ('light' && localStorage.setItem(cfg.themeVarName, JSON.stringify({ theme: 'light' }))),
    language: JSON.parse(localStorage.getItem(cfg.languageVarName) as string)?.language || ('en' && localStorage.setItem(cfg.languageVarName, JSON.stringify({ language: 'en' }))),
    locations: {
        images: `${cfg.serverBase}/files`,
        audios: `${cfg.serverBase}/files`,
        others: `${cfg.serverBase}/files`,
    },
});