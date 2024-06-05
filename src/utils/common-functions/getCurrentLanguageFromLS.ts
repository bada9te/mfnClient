const getCurrentLanguageFromLS = () => {
    return JSON.parse(localStorage.getItem(process.env.REACT_APP_LANGUAGE_VAR_NAME as string) as string)?.language || 'en';
}

export default getCurrentLanguageFromLS;