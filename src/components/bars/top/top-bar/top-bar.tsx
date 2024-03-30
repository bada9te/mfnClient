import logoImg from 'assets/icons/logo.png';
import { useNavigate } from 'react-router-dom';
import React, { memo, useEffect, useState } from "react";
import {AppBar, IconButton, Avatar, Typography, Box, Toolbar, Tooltip, Menu, Container, useScrollTrigger, Slide } from '@mui/material';
import { Menu as MenuIcon } from '@mui/icons-material';
import TopBarUserMenu from './top-bar-user-menu/top-bar-user-menu';
import TopBarLeftMenuMin from './top-bar-left-menu-min/top-bar-left-menu-min';
import TopBarLeftMenu from './top-bar-left-menu/top-bar-left-menu';
import StyledBadge from "./styled-badge/styled-badge";
import { useLazyQuery, useReactiveVar } from '@apollo/client';
import { baseState } from 'components/baseReactive';
import { NOTIFICATIONS_QUERY } from 'utils/graphql-requests/notifications';
import { useTranslation } from 'react-i18next';




export default memo(function Topbar() {
    const { user, locations } = useReactiveVar(baseState);
    const [ getUnreadNotifications, { data } ] = useLazyQuery(NOTIFICATIONS_QUERY);
    const { t } = useTranslation("bars");
 
    const pages = ['Feed', 'Battles', 'Playlists', 'Categories'];
    user._id?.length && pages.push('Chats');
    const navigate = useNavigate();

    const handleNavigate = (where: string) => {
        handleCloseNavMenu();
        switch (where) {
            case 'Feed': 
                navigate('/app');
                break;
            default:
                navigate(`/app/${where.toLowerCase()}`) 
                break;
        }
    }


    const [anchorElNav, setAnchorElNav] = useState<(EventTarget & HTMLButtonElement) | null>(null);
    const [anchorElUser, setAnchorElUser] = useState<(EventTarget & HTMLButtonElement) | null>(null);

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    // current user socket notifications
    useEffect(() => {
        if (user && user._id !== "") {
            getUnreadNotifications({
                variables: {
                    receiverId: user._id,
                    checked: false,
                },
                pollInterval: 15000
            });
        }
    }, [user, getUnreadNotifications]);

    

    return (
            <AppBar component="nav" sx={{
                height: 65, 
                zIndex: (theme) => theme.zIndex.drawer + 1, 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
            }}>
                <Container >
                    <Toolbar disableGutters>
                        <Avatar alt="app logo" src={logoImg} sx={{mr: 1, display: { xs: 'none', md: 'flex' }}}/>
                        <Typography
                            variant="h6"
                            noWrap
                            component="a"
                            href="/"
                            sx={{ 
                                mr: 2,
                                display: { xs: 'none', md: 'flex' }, 
                                fontWeight: 600, 
                                color: 'inherit', 
                                textDecoration: 'none', 
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}
                        >
                            {t("topbar.title")}
                        </Typography>

                        <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                            <IconButton
                                size="large"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleOpenNavMenu}
                                color="inherit"
                            >
                            <MenuIcon />
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorElNav}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'left',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'left',
                                }}
                                open={Boolean(anchorElNav)}
                                onClose={handleCloseNavMenu}
                                sx={{ display: { xs: 'block', md: 'none' } }}
                            >
                                <TopBarLeftMenuMin pages={pages} handleNavigate={handleNavigate}/>
                            </Menu>
                        </Box>
                        
                        <Avatar alt="app logo" src={logoImg} sx={{mr: 1, display: { xs: 'flex', md: 'none' }}}/>
                        <Typography
                            variant="h6"
                            noWrap
                            component="a"
                            href=""
                            sx={{mr: 1,display: { xs: 'flex', md: 'none' }, flexGrow: 1, fontWeight: 600, letterSpacing: '.1rem', color: 'inherit', textDecoration: 'none' }}
                        >
                            MFN
                        </Typography>
                        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                            <TopBarLeftMenu pages={pages} handleNavigate={handleNavigate}/>
                        </Box>
                        <Box sx={{ flexGrow: 0 }}>
                            <Tooltip title="Open settings">
                                <IconButton color='secondary' onClick={handleOpenUserMenu} sx={{ borderRadius: 7.5 }}>
                                    <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                                    <Typography
                                        variant="h6"
                                        noWrap
                                        component="span"
                                        sx={{ 
                                            mr: 1, 
                                            display: { xs: 'none', md: 'flex' }, 
                                            fontWeight: 600, 
                                            color: 'white', 
                                            textDecoration: 'none', 
                                        }}
                                    >
                                        { user && user?._id !== "" ? user?.nick : t('topbar.log_in') }
                                    </Typography>
                                    {
                                        data?.notifications.length > 0
                                        ?
                                        <StyledBadge
                                            overlap="circular"
                                            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                                            variant="dot"
                                            >
                                            <Avatar 
                                                sx={{ boxShadow: 5 }}
                                                alt={user?.nick} 
                                                src={user?.avatar !== "" ? `${locations?.images}/${user?.avatar}` : "NULL"} 
                                            />
                                        </StyledBadge>
                                        :
                                        <Avatar 
                                            sx={{ boxShadow: 5 }}
                                            alt={user?.nick} 
                                            src={user?.avatar !== "" ? `${locations?.images}/${user?.avatar}` : "NULL"} 
                                        />
                                    }
                                    </Box>
                                </IconButton>
                            </Tooltip>

                            <TopBarUserMenu 
                                handleCloseUserMenu={handleCloseUserMenu}
                                notifications={data?.notifications || []}
                                anchorElUser={anchorElUser}
                            />
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
    );
});
