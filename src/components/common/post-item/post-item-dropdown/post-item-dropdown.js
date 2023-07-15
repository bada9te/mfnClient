import { MenuItem, Typography, Menu, IconButton } from "@mui/material";
import { Report, Download, Share, MoreVert } from "@mui/icons-material";
import { useState } from "react";

const PostItemDropDown = props => {
    const { downloadsAllowed, handleAudioDownload, handleShareTrack } = props;
    const [anchorElUser, setAnchorElUser] = useState(null);

    // click
    const handleClick = (i) => {
        //console.log(i);
        if (i === 'Download') {
            handleAudioDownload();
        } else if (i === 'Share') {
            handleShareTrack();
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
                keepMounted
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
            >   
                <MenuItem onClick={() => handleClick('Share')}>
                    <Typography textAlign="center" display="flex" alignItems="center">
                        <Share sx={{mr: 1}}/>Share
                    </Typography>
                </MenuItem>
                {
                    downloadsAllowed
                    ?
                    <MenuItem onClick={() => handleClick('Download')}>
                        <Typography textAlign="center" display="flex" alignItems="center">
                            <Download sx={{mr: 1}}/>Download
                        </Typography>
                    </MenuItem>
                    :
                    null
                }
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

export default PostItemDropDown;