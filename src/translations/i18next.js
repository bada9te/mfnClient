import i18next from "i18next";

// en
import enLogin      from "./en/login.json";
import enLogout     from "./en/logout.json";
import enPlaylists  from "./en/playlists.json";
import enPostUpload from "./en/post-upload.json";
import enPosts      from "./en/posts.json";
import enProfile    from "./en/profile.json";
import enRegister   from "./en/register.json";
import enSupport    from "./en/support.json";
import enWelcome    from "./en/welcome.json";
 
i18next.init({
    interpolation: { escapeValue: false },
    lng: 'en',                              
    resources: {
        en: {
            bars:       require("./en/bars.json"),
            battles:    require("./en/battles.json"),
            login:      enLogin,
            logout:     enLogout,
            playlists:  enPlaylists,
            postUpload: enPostUpload,
            posts:      enPosts,
            profile:    enProfile,
            register:   enRegister,
            support:    enSupport,
            welcome:    enWelcome,
        },
    },
});


export default i18next;