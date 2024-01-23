const getCurrentLanguageFromLS = () => {
    return JSON.parse(localStorage.getItem(process.env.REACT_APP_LANGUAGE_VAR_NAME))?.language || 'en';
}

export default getCurrentLanguageFromLS;