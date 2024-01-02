//import { useReactiveVar } from "@apollo/client";
import { Language } from "@mui/icons-material";
import { useState } from "react";
//import { baseState } from "../../baseReactive";
import { IconButton, Menu, MenuItem, Typography } from "@mui/material";



const TranslationDropdown = props => {
    const [ anchorElUser, setAnchorElUser ] = useState(null);
    //const { user: currentUser } = useReactiveVar(baseState);

    // click
    const handleClick = (i) => {
        //console.log(i);
        handleCloseUserMenu();
    }

    // menu
    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    return (
        <>
            <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
                keepMounted={false}
            >   

                <MenuItem onClick={() => handleClick('Report')}>
                    <Typography textAlign="center" display="flex" alignItems="center">
                        🇺🇸 English
                    </Typography>
                </MenuItem>
                <MenuItem onClick={() => handleClick('Report')}>
                    <Typography textAlign="center" display="flex" alignItems="center">
                        🇺🇦 Українська
                    </Typography>
                </MenuItem>
                <MenuItem onClick={() => handleClick('Report')}>
                    <Typography textAlign="center" display="flex" alignItems="center">
                        🇷🇺 Русский
                    </Typography>
                </MenuItem>
            </Menu>

            <IconButton aria-label="post-dropdown" color="white" onClick={(e) => setAnchorElUser(e.currentTarget)}>
                <Language/>
            </IconButton>
        </>
    );
}


export default TranslationDropdown;