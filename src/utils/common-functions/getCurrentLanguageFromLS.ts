import {cfg} from "@/config";

const getCurrentLanguageFromLS = () => {
    //return JSON.parse(localStorage.getItem(cfg.languageVarName) as string)?.language || 'en';
    return 'en';
}

export default getCurrentLanguageFromLS;