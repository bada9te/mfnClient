import { MenuItem, Typography, Menu, IconButton } from "@mui/material";
import { Report, Share, MoreVert, Delete } from "@mui/icons-material";
import { useState } from "react";
import { useReactiveVar } from "@apollo/client";
import { baseState } from "../../../baseReactive";

const PlaylistDropdown = props => {
    const { owner, handlers } = props;
    const [ anchorElUser, setAnchorElUser ] = useState(null);
    const { user: currentUser } = useReactiveVar(baseState);

    // click
    const handleClick = (i) => {
        if (i === 'Share') {
            handlers.sharePlaylist();
        } else if (i === 'Report') {
            handlers.reportPlaylist();
        } else if (i === 'Delete') {
            handlers.deletePlaylist();
        }
        
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
            >   
                {
                    currentUser._id === owner._id
                    &&
                    <MenuItem onClick={() => handleClick('Delete')}>
                        <Typography textAlign="center" display="flex" alignItems="center">
                            <Delete sx={{mr: 1}}/>Delete
                        </Typography>
                    </MenuItem>
                }
                
                <MenuItem onClick={() => handleClick('Share')}>
                    <Typography textAlign="center" display="flex" alignItems="center">
                        <Share sx={{mr: 1}}/>Share
                    </Typography>
                </MenuItem>
                
                <MenuItem onClick={() => handleClick('Report')}>
                    <Typography textAlign="center" display="flex" alignItems="center">
                        <Report sx={{mr: 1}}/>Report
                    </Typography>
                </MenuItem>
            </Menu>

            <IconButton aria-label="post-dropdown" onClick={(e) => setAnchorElUser(e.currentTarget)}>
                <MoreVert/>
            </IconButton>
        </>
    );
}

export default PlaylistDropdown;