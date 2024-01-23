import i18next from "i18next";


i18next.init({
    interpolation: { escapeValue: false },
    lng: JSON.parse(localStorage.getItem(process.env.REACT_APP_LANGUAGE_VAR_NAME))?.language || 'en',                              
    resources: {
        en: {
            bars:       require("./en/bars.json"),
            containers: require("./en/containers.json"),
            forms:      require("./en/forms.json"),
            modals:     require("./en/modals.json"),
            objects:    require("./en/objects.json"),
            pages:      require("./en/pages.json"),
        },
        ru: {
            bars:       require("./ru/bars.json"),
            containers: require("./ru/containers.json"),
            forms:      require("./ru/forms.json"),
            modals:     require("./ru/modals.json"),
            objects:    require("./ru/objects.json"),
            pages:      require("./ru/pages.json"),
        },
        ua: {
            bars:       require("./ua/bars.json"),
            containers: require("./ua/containers.json"),
            forms:      require("./ua/forms.json"),
            modals:     require("./ua/modals.json"),
            objects:    require("./ua/objects.json"),
            pages:      require("./ua/pages.json"),
        },
    },
});


export default i18next;