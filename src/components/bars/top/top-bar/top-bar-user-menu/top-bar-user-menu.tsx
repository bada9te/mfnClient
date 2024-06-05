import { Menu, MenuItem, Typography } from "@mui/material";
import { Person, Logout, ContactSupport, BookmarkAdded, Settings, Notifications, Login, Language, Wallet } from '@mui/icons-material';
import ThemeSwitcher from "@/components/common/theme-switcher/theme-switcher";
import { useNavigate } from "react-router-dom";
import StyledBadge from "../styled-badge/styled-badge";
import { useReactiveVar } from "@apollo/client";
import { baseState } from "@/components/baseReactive";
import { languageSelectModalState } from "@/components/modals/language-select-modal/reactive";
import { useTranslation } from "react-i18next";
import { Notification } from "@/utils/graphql-requests/generated/schema";
import { walletConnectModalState } from "@/components/modals/wallet-modal/reactive";



export default function TopBarUserMenu(props: {
    handleCloseUserMenu: () => void;
    notifications: Notification[];
    anchorElUser: (EventTarget & HTMLButtonElement) | null
}) {
    const { handleCloseUserMenu, notifications, anchorElUser } = props;
    const items = ['Profile', 'Wallet', 'Notifications', 'Edit_profile', 'Saved_posts', 'Support', 'Language', 'Logout'];
    const itemsNL = ['Log_in', 'Support', 'Language'];
    const navigate = useNavigate();
    const { user: currentUser } = useReactiveVar(baseState);
    const { t } = useTranslation("bars");

    const handleNavigate = (where: string) => {
        handleCloseUserMenu();
        switch (where) {
            case 'Profile':
                navigate(`/app/profile/${currentUser?._id}`);
                break;
            case 'Notifications':
                navigate(`/app/notifications/`);
                break;
            case 'Edit_profile':
                navigate('/app/profile-edit');
                break;
            case 'Saved_posts':
                navigate('/app/saved');
                break;
            case 'Support':
                navigate('/app/support');
                break;
            case 'Logout':
                navigate('/app/logout');
                break;
            case 'Log_in':
                navigate('/app/login');
                break;
            case 'Language': 
                languageSelectModalState({ isShowing: true });
                break;
            case 'Wallet': 
                walletConnectModalState({ isShowing: true });
                break;
            default:
                break;
        }
    }


    return (
        <Menu
            sx={{ mt: '45px' }}
            id="menu-appbar"
            anchorEl={anchorElUser}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
        >   
            {
                currentUser && currentUser._id !== ""
                ?
                items.map((item, key) => {
                    return (
                        <MenuItem onClick={() => handleNavigate(item)} key={key}>
                            <Typography component="div" textAlign="center" display="flex" alignItems="center">
                                {
                                    (() => {
                                        switch(item) {
                                            case 'Profile':
                                                return (<Person sx={{mr: 1}}/>);
                                            case 'Wallet':
                                                return (<Wallet sx={{mr: 1}}/>);
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
                                            case 'Edit_profile':
                                                return (<Settings sx={{mr: 1}}/>);
                                            case 'Saved_posts':
                                                return (<BookmarkAdded sx={{mr: 1}}/>);
                                            case 'Support':
                                                return (<ContactSupport sx={{mr: 1}}/>);
                                            case 'Language':
                                                return (<Language sx={{mr: 1}}/>);
                                            case 'Logout':
                                                return (<Logout sx={{mr: 1}}/>);
                                            default:
                                                break;
                                        } 
                                    })()
                                }
                                {t(`topbar.${item.toLowerCase()}`)}
                            </Typography>
                        </MenuItem>
                    );
                })
                :
                itemsNL.map((item, key) => {
                    return (
                        <MenuItem onClick={() => handleNavigate(item)} key={key}>
                            <Typography component="div" textAlign="center" display="flex" alignItems="center">
                                {
                                    (() => {
                                        switch(item) {
                                            case 'Support':
                                                return (<ContactSupport sx={{mr: 1}}/>);
                                            case 'Language':
                                                return (<Language sx={{mr: 1}}/>);
                                            case 'Log_in':
                                                return (<Login sx={{mr: 1}}/>);
                                            default:
                                                break;
                                        } 
                                    })()
                                }
                                {t(`topbar.${item.toLowerCase()}`)}
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
        </Menu>
    );
}