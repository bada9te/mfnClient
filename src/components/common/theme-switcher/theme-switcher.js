import { useReactiveVar } from "@apollo/client";
import { FormControlLabel, Switch } from "@mui/material";
import { baseState } from "../../baseReactive";


const ThemeSwitcher = props => {
    const { user: currentUser, theme } = useReactiveVar(baseState);

    const changeTheme = (e) => {
        baseState({
            ...baseState(),
            theme: e.target.checked ? 'dark' : 'light',
        });
        localStorage.setItem('mfnCurrentUser', JSON.stringify({id: currentUser._id, theme: e.target.checked ? 'dark' : 'light'})); 
    }

    return (
        <FormControlLabel control={<Switch checked={theme === 'dark'} onChange={changeTheme} />} label="Dark mode" />
    );
}

export default ThemeSwitcher;