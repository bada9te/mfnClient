import { useReactiveVar } from "@apollo/client";
import { FormControlLabel, Switch } from "@mui/material";
import { baseState } from "../../baseReactive";
import { useTranslation } from "react-i18next";
import {cfg} from "@/config";


export default  function ThemeSwitcher() {
    const { theme } = useReactiveVar(baseState);
    const { t } = useTranslation("bars");

    const changeTheme = (e: React.ChangeEvent<HTMLInputElement>) => {
        baseState({
            ...baseState(),
            theme: e.target.checked ? 'dark' : 'light',
        });
        localStorage.setItem(cfg.themeVarName as string, JSON.stringify({ theme: e.target.checked ? 'dark' : 'light' }));
    }

    return (
        <FormControlLabel control={<Switch checked={theme === 'dark'} onChange={changeTheme} />} label={t('topbar.dark_mode')} />
    );
}
