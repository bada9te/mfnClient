const toastsConfig = (changes={}) => {
    // defaut config
    const config = {
        position: "top-right",
        autoClose: 1750,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
    }

    // get changes entries
    let entries = Object.entries(changes);

    // change config
    if (changes && entries.length > 0) {
        entries.forEach(([key, value]) => {
            config[key] = value;
        });
    }
    
    // return modified or default config
    return config;
}

export default toastsConfig;
