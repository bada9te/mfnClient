import i18next from "i18next";

 
i18next.init({
    interpolation: { escapeValue: false },
    lng: 'en',                              
    resources: {
        en: {
            bars:       require("./en/bars.json"),
            containers: require("./en/containers.json"),
            forms:      require("./en/forms.json"),
            modals:     require("./en/modals.json"),
            objects:    require("./en/objects.json"),
            pages:      require("./en/pages.json"),
        },
    },
});


export default i18next;