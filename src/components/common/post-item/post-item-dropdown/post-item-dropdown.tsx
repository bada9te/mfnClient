import { MenuItem, Typography, Menu, IconButton } from "@mui/material";
import { Report, Download, Share, MoreVert, Delete } from "@mui/icons-material";
import { useState } from "react";
import { useReactiveVar } from "@apollo/client";
import { baseState } from "@/components/baseReactive";
import { useTranslation } from "react-i18next";

export default function PostItemDropDown(props: {
    owner: string;
    handlers: {
        audioDownload: () => void;
        shareTrack: () => void;
        reportTrack: () => void;
        deleteTrack: () => void;
    };
    downloadsAllowed: boolean;
}) {
    const { owner, handlers, downloadsAllowed } = props;
    const [ anchorElUser, setAnchorElUser ] = useState<null | (EventTarget & HTMLButtonElement)>(null);
    const { user: currentUser } = useReactiveVar(baseState);
    const { t } = useTranslation("objects");

    // click
    const handleClick = (i: string) => {
        //console.log(i);
        if (i === 'Download') {
            handlers.audioDownload();
        } else if (i === 'Share') {
            handlers.shareTrack();
        } else if (i === 'Report') {
            handlers.reportTrack();
        } else if (i === 'Delete') {
            handlers.deleteTrack();
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
                keepMounted={false}
            >   
                {
                    currentUser && currentUser._id !== ""
                    &&
                    <MenuItem onClick={() => handleClick('Share')}>
                        <Typography textAlign="center" display="flex" alignItems="center">
                            <Share sx={{mr: 1}}/>{t('post.dropdown.share')}
                        </Typography>
                    </MenuItem>
                }
                {
                    downloadsAllowed
                    &&
                    <MenuItem onClick={() => handleClick('Download')}>
                        <Typography textAlign="center" display="flex" alignItems="center">
                            <Download sx={{mr: 1}}/>{t('post.dropdown.download')}
                        </Typography>
                    </MenuItem>
                }
                <MenuItem onClick={() => handleClick('Report')}>
                    <Typography textAlign="center" display="flex" alignItems="center">
                        <Report sx={{mr: 1}}/>{t('post.dropdown.report')}
                    </Typography>
                </MenuItem>
                {
                    currentUser && owner === currentUser._id
                    &&
                    <MenuItem onClick={() => handleClick('Delete')}>
                        <Typography textAlign="center" display="flex" alignItems="center">
                            <Delete sx={{mr: 1}}/>{t('post.dropdown.delete')}
                        </Typography>
                    </MenuItem>
                }
            </Menu>

            <IconButton aria-label="post-dropdown" onClick={(e) => setAnchorElUser(e.currentTarget)}>
                <MoreVert/>
            </IconButton>
        </>
    );
}