import logoImg from '../../../../images/icons/logo.png';
import { useNavigate } from 'react-router-dom';
import { memo, useEffect, useState } from "react";
import {AppBar, IconButton, Avatar, Typography, Box, Toolbar, Tooltip, Menu, Container, useScrollTrigger, Slide } from '@mui/material';
import { Menu as MenuIcon } from '@mui/icons-material';
import TopBarUserMenu from './top-bar-user-menu/top-bar-user-menu';
import TopBarLeftMenuMin from './top-bar-left-menu-min/top-bar-left-menu-min';
import TopBarLeftMenu from './top-bar-left-menu/top-bar-left-menu';
import StyledBadge from "./styled-badge/styled-badge";
import PropTypes from 'prop-types';
import { useLazyQuery, useReactiveVar } from '@apollo/client';
import { audioPlayerState } from '../../../common/audio-player/reactive';
import { bottomBarState } from '../../bottom/bottom-bar/reactive';
import { baseState } from '../../../baseReactive';
import { NOTIFICATIONS_QUERY } from '../../../../graphql/notifications';


function HideOnScroll(props) {
    const { children, window } = props;
    const {showRB: rightBarIsShwoing, showLB: leftBarIsShowing} = useReactiveVar(bottomBarState);
    const {isShowing: audioPlayerIsShowing} = useReactiveVar(audioPlayerState);

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
    const { user, locations } = useReactiveVar(baseState);
    //const notifications = useSelector(state => state.notificationsContainer.notifications);

    const [getUnreadNotifications, { data }] = useLazyQuery(NOTIFICATIONS_QUERY, {
        variables: {
            receiverId: user._id,
            checked: false,
        },
        pollInterval: 15000
    });

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
            getUnreadNotifications();
        }
    }, [user]);

    

    return (
        
            <HideOnScroll {...props}>
                <AppBar component="nav" sx={{height: 64, zIndex: (theme) => theme.zIndex.drawer + 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
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
                                    <TopBarUserMenu 
                                        handleCloseUserMenu={handleCloseUserMenu}
                                        notifications={data?.notifications || []}
                                    />
                                </Menu>
                            </Box>
                        </Toolbar>
                    </Container>
                </AppBar>
            </HideOnScroll>
        
    );
}


export default memo(Topbar);


