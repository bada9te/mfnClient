import { useReactiveVar } from "@apollo/client";
import { FormControlLabel, Switch } from "@mui/material";
import { baseState } from "../../baseReactive";
import { useTranslation } from "react-i18next";


const ThemeSwitcher = props => {
    const { theme } = useReactiveVar(baseState);
    const { t } = useTranslation("common");

    const changeTheme = (e) => {
        baseState({
            ...baseState(),
            theme: e.target.checked ? 'dark' : 'light',
        });
        localStorage.setItem(process.env.REACT_APP_THEME_VAR_NAME, JSON.stringify({ theme: e.target.checked ? 'dark' : 'light' })); 
    }

    return (
        <FormControlLabel control={<Switch checked={theme === 'dark'} onChange={changeTheme} />} label={t('topbar.dark_mode')} />
    );
}

export default ThemeSwitcher;