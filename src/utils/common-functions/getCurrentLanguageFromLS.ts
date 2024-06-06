import {cfg} from "@/config";

const getCurrentLanguageFromLS = () => {
    return JSON.parse(localStorage.getItem(cfg.languageVarName) as string)?.language || 'en';
}

export default getCurrentLanguageFromLS;