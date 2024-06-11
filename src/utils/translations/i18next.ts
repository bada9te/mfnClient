import i18next from "i18next";
import getCurrentLanguageFromLS from "@/utils/common-functions/getCurrentLanguageFromLS";

import enResources from "./en";
import ruResources from "./ru";
import uaResources from "./ua";
import {initReactI18next} from "react-i18next";

await i18next.use(initReactI18next).init({
    interpolation: { escapeValue: false },
    lng: getCurrentLanguageFromLS() as string,
    resources: {
        en: enResources,
        ru: ruResources,
        ua: uaResources,
    },
    fallbackLng: "en",
});


export default i18next;