import { FormControlLabel, Switch } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setTheme } from "../../baseSlice";

const ThemeSwitcher = props => {
    const dispatch = useDispatch();
    const theme = useSelector(state => state?.base?.theme);
    const currentUserId = useSelector(state => state?.base?.user?._id);

    const changeTheme = (e) => {
        dispatch(setTheme(e.target.checked ? 'dark' : 'light'));
        localStorage.setItem('mfnCurrentUser', JSON.stringify({id: currentUserId, theme: e.target.checked ? 'dark' : 'light'})); 
    }

    return (
        <>
            <FormControlLabel control={<Switch checked={theme === 'dark'} onChange={changeTheme} />} label="Dark mode" />
        </>
    );
}

export default ThemeSwitcher;