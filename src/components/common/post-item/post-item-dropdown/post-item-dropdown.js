import { MenuItem, Typography, Menu, IconButton } from "@mui/material";
import { Report, Download, Share, MoreVert, Delete } from "@mui/icons-material";
import { useState } from "react";
import { useSelector } from "react-redux";

const PostItemDropDown = props => {
    const { owner, downloadsAllowed, handleAudioDownload, handleShareTrack, handleReportTrack, handleDeleteTrack } = props;
    const [anchorElUser, setAnchorElUser] = useState(null);
    const currentUser = useSelector(state => state.base.user);

    // click
    const handleClick = (i) => {
        //console.log(i);
        if (i === 'Download') {
            handleAudioDownload();
        } else if (i === 'Share') {
            handleShareTrack();
        } else if (i === 'Report') {
            handleReportTrack();
        } else if (i === 'Delete') {
            handleDeleteTrack();
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
                {
                    currentUser && currentUser._id !== ""
                    ?
                    <MenuItem onClick={() => handleClick('Share')}>
                        <Typography textAlign="center" display="flex" alignItems="center">
                            <Share sx={{mr: 1}}/>Share
                        </Typography>
                    </MenuItem>
                    :
                    null
                }
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
                {
                    owner === currentUser._id
                    ?
                    <MenuItem onClick={() => handleClick('Delete')}>
                        <Typography textAlign="center" display="flex" alignItems="center">
                            <Delete sx={{mr: 1}}/>Delete
                        </Typography>
                    </MenuItem>
                    :
                    null
                }
            </Menu>

            <IconButton aria-label="post-dropdown" onClick={(e) => setAnchorElUser(e.currentTarget)}>
                <MoreVert/>
            </IconButton>
        </>
    );
}

export default PostItemDropDown;