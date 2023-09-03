import logoImg from '../../../../images/logo.png';
import { useNavigate } from 'react-router-dom';
import { memo, useEffect, useState } from "react";

import {AppBar, IconButton, Avatar, Typography, Box, Toolbar, Tooltip, Menu, Container, useScrollTrigger, Slide } from '@mui/material';
import { Menu as MenuIcon } from '@mui/icons-material';
import TopBarUserMenu from './top-bar-user-menu/top-bar-user-menu';
import TopBarLeftMenuMin from './top-bar-left-menu-min/top-bar-left-menu-min';
import TopBarLeftMenu from './top-bar-left-menu/top-bar-left-menu';

import { useDispatch, useSelector } from "react-redux";
import userSocket from '../../../../socket/user/socket-user';

import UserSelectModal from '../../../modals/user-select-modal/user-select-modal';
import CommentsModal from '../../../modals/comments-modal/comments-modal';
import StyledBadge from "./styled-badge/styled-badge";
import { fetchUnreadNotifications } from '../../../containers/notifications-container/notificationsContainerSlice';
import ReportsModal from '../../../modals/report-modal/report-modal';
import ConfirmModal from '../../../modals/confirm-modal/confirm-modal';
import PropTypes from 'prop-types';
import PostSelectModal from '../../../modals/post-select-modal/post-select-modal';

function HideOnScroll(props) {
    const { children, window } = props;

    const leftBarIsShowing = useSelector(state => state.bottomBar.showLB);
    const rightBarIsShwoing = useSelector(state => state.bottomBar.showRB);
    const audioPlayerIsShowing = useSelector(state => state.audioPlayer.isShowing);
    // Note that you normally won't need to set the window ref as useScrollTrigger
    // will default to window.
    // This is only being set here because the demo is in an iframe.
    const trigger = useScrollTrigger({
      target: window ? window() : undefined,
    });
  
    return (
      <Slide appear={false} direction="down" in={!trigger || leftBarIsShowing || rightBarIsShwoing || audioPlayerIsShowing}>
        {children}
      </Slide>
    );
  }
  
  HideOnScroll.propTypes = {
    children: PropTypes.element.isRequired,
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    window: PropTypes.func,
  };



const Topbar = (props) => {
    const user = useSelector(state => state?.base?.user);
    const locations = useSelector(state => state?.base?.locations);
    const notifications = useSelector(state => state.notificationsContainer.notifications);
    const dispatch = useDispatch();


    const pages = ['Feed', 'Battles', 'Playlists'];
    const navigate = useNavigate();

    const handleNavigate = (where) => {
        handleCloseNavMenu();
        switch (where) {
            case 'Feed': 
                navigate('/');
                break;
            case 'Battles':
                navigate('/battles');
                break;
            case 'Playlists':
                navigate('/playlists');
                break;
            default: 
                break;
        }
    }


    const [anchorElNav, setAnchorElNav] = useState(null);
    const [anchorElUser, setAnchorElUser] = useState(null);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
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
            userSocket.on(`subscribed-on-${user._id}`, (data) => {
                dispatch(fetchUnreadNotifications());
            });
            userSocket.on(`user-${user._id}-post-was-liked`, (data) => {
                dispatch(fetchUnreadNotifications());
            });
            userSocket.on(`user-${user._id}-post-was-saved`, (data) => {
                dispatch(fetchUnreadNotifications());
            });
            userSocket.on(`post-shared-to-${user._id}`, (data) => {
                dispatch(fetchUnreadNotifications());
            });
    
            return () => {
                userSocket.off(`subscribed-on-${user._id}`);
                userSocket.off(`user-${user._id}-post-was-liked`);
                userSocket.off(`user-${user._id}-post-was-saved`);
                userSocket.off(`post-shared-to-${user._id}`);
            };
        }
    });

    

    return (
        <>
            <ConfirmModal/>
            <UserSelectModal/>
            <CommentsModal/>
            <ReportsModal/>
            <PostSelectModal/>

            <HideOnScroll {...props}>
                <AppBar sx={{height: 64, zIndex: (theme) => theme.zIndex.drawer + 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Container maxWidth="xl" >
                        <Toolbar disableGutters>
                            <Typography
                                variant="h6"
                                noWrap
                                component="a"
                                href="/"
                                sx={{ mr: 2, display: { xs: 'none', md: 'flex' }, fontFamily: 'monospace', fontWeight: 700, color: 'inherit', textDecoration: 'none', alignItems: 'center', }}
                            >
                                <Avatar alt="app logo" src={logoImg} sx={{mr: 1}}/>
                                MUSIC FROM NOTHING
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
                            
                            <Typography
                                variant="h6"
                                noWrap
                                component="a"
                                href=""
                                sx={{mr: 1,display: { xs: 'flex', md: 'none' },flexGrow: 1,fontFamily: 'monospace',fontWeight: 700,letterSpacing: '.3rem',color: 'inherit',textDecoration: 'none',}}
                            >
                                MFN
                            </Typography>
                            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                                <TopBarLeftMenu pages={pages} handleNavigate={handleNavigate}/>
                            </Box>
                            <Box sx={{ flexGrow: 0 }}>
                                <Tooltip title="Open settings">
                                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0, borderRadius: 7.5 }}>
                                        <Typography
                                            variant="h6"
                                            noWrap
                                            component="span"
                                            sx={{ mr: 1, display: { xs: 'none', md: 'flex' }, fontFamily: 'monospace', fontWeight: 700, color: 'white', textDecoration: 'none', alignItems: 'center',}}
                                        >
                                            { user && user?._id !== "" ? user?.nick : "Login" }
                                        </Typography>
                                        {
                                            notifications.length > 0 && notifications.find(i => i.checked === false)
                                            ?
                                            <StyledBadge
                                                overlap="circular"
                                                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                                                variant="dot"
                                                >
                                                <Avatar 
                                                    alt={user?.nick} 
                                                    src={user?.avatar !== "" ? `${locations?.images}/${user?.avatar}` : "NULL"} 
                                                />
                                            </StyledBadge>
                                            :
                                            <Avatar 
                                                alt={user?.nick} 
                                                src={user?.avatar !== "" ? `${locations?.images}/${user?.avatar}` : "NULL"} 
                                            />
                                        }
                                    </IconButton>
                                </Tooltip>

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
                                    <TopBarUserMenu handleCloseUserMenu={handleCloseUserMenu}/>
                                </Menu>
                            </Box>
                        </Toolbar>
                    </Container>
                </AppBar>
            </HideOnScroll>
        </>
    );
}


export default memo(Topbar);


