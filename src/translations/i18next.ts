import i18next from "i18next";
import getCurrentLanguageFromLS from "../utils/common-functions/getCurrentLanguageFromLS";

import enResources from "./en";
import ruResources from "./ru";
import uaResources from "./ua";

i18next.init({
    interpolation: { escapeValue: false },
    lng: getCurrentLanguageFromLS(),                             
    resources: {
        en: enResources,
        ru: ruResources,
        ua: uaResources,
    },
});


export default i18next;