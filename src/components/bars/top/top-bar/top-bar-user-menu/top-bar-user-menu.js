import { MenuItem, Typography } from "@mui/material";
import { Person, Logout, ContactSupport, BookmarkAdded, Settings, Notifications, Login } from '@mui/icons-material';
import ThemeSwitcher from "../../../../common/theme-switcher/theme-switcher";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import StyledBadge from "../styled-badge/styled-badge";
import { useReactiveVar } from "@apollo/client";
import { baseState } from "../../../../baseReactive";



const TopBarUserMenu = props => {
    const {handleCloseUserMenu, notifications} = props;
    const items = ['Profile', 'Notifications', 'Edit profile', 'Saved posts', 'Support', 'Logout'];
    const itemsNL = ['Login', 'Support'];
    const navigate = useNavigate();
    const { user: currentUser } = useReactiveVar(baseState);

    const handleNavigate = (where) => {
        handleCloseUserMenu();
        switch (where) {
            case 'Profile':
                navigate(`/app/profile/${currentUser?._id}`);
                break;
            case 'Notifications':
                navigate(`/app/notifications/`);
                break;
            case 'Edit profile':
                navigate('/app/profile-edit');
                break;
            case 'Saved posts':
                navigate('/app/saved');
                break;
            case 'Support':
                navigate('/app/support');
                break;
            case 'Logout':
                navigate('/app/logout');
                break;
            case 'Login':
                navigate('/app/login');
                break;
            default:
                break;
        }
    }


    return (
        <>
            {
                currentUser && currentUser._id !== ""
                ?
                items.map((item, key) => {
                    return (
                        <MenuItem onClick={() => handleNavigate(item)} key={key}>
                            <Typography variant="div" textAlign="center" display="flex" alignItems="center">
                                {
                                    (() => {
                                        switch(item) {
                                            case 'Profile':
                                                return (<Person sx={{mr: 1}}/>);
                                            case 'Notifications':
                                                if (notifications.length > 0 && notifications.find(i => i.checked === false)) 
                                                    return (
                                                        <StyledBadge
                                                            overlap="circular"
                                                            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                                                            variant="dot"
                                                            >
                                                            <Notifications sx={{mr: 1}}/>
                                                        </StyledBadge>
                                                    );
                                                return (<Notifications sx={{mr: 1}}/>);
                                            case 'Edit profile':
                                                return (<Settings sx={{mr: 1}}/>);
                                            case 'Saved posts':
                                                return (<BookmarkAdded sx={{mr: 1}}/>);
                                            case 'Support':
                                                return (<ContactSupport sx={{mr: 1}}/>);
                                            case 'Logout':
                                                return (<Logout sx={{mr: 1}}/>);
                                            default:
                                                break;
                                        } 
                                    })()
                                }
                                {item}
                            </Typography>
                        </MenuItem>
                    );
                })
                :
                itemsNL.map((item, key) => {
                    return (
                        <MenuItem onClick={() => handleNavigate(item)} key={key}>
                            <Typography variant="div" textAlign="center" display="flex" alignItems="center">
                                {
                                    (() => {
                                        switch(item) {
                                            case 'Support':
                                                return (<ContactSupport sx={{mr: 1}}/>);
                                            case 'Login':
                                                return (<Login sx={{mr: 1}}/>);
                                            default:
                                                break;
                                        } 
                                    })()
                                }
                                {item}
                            </Typography>
                        </MenuItem>
                    );
                })
            }
            <MenuItem>
                <Typography textAlign="center" display="flex" alignItems="center">
                    <ThemeSwitcher/>
                </Typography>
            </MenuItem>
            
        </>
    );
}

export default TopBarUserMenu;