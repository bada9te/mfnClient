import { MenuItem, Typography, Menu, IconButton } from "@mui/material";
import { Report, MoreVert, Reply, Delete } from "@mui/icons-material";
import { useState } from "react";
import { useTranslation } from "react-i18next";

const ChatMessageItemDropDown = props => {
    const { handleReply, handleDelete, canBeDeleted, handleReport } = props;
    const [ anchorElComment, setAnchorElComment ] = useState(null);
    const { t } = useTranslation("objects");

    // click
    const handleClick = (i) => {
        if (i === 'Reply') handleReply();
        else if (i === 'Delete') handleDelete();
        else if (i === 'Report') handleReport();
        handleCloseCommentMenu();
    }

    // menu
    const handleCloseCommentMenu = () => {
        setAnchorElComment(null);
    };

    return (
        <>
            <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElComment}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                keepMounted
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                open={Boolean(anchorElComment)}
                onClose={handleCloseCommentMenu}
            >
                <MenuItem onClick={() => handleClick('Reply')}>
                    <Typography textAlign="center" display="flex" alignItems="center">
                        <Reply sx={{mr: 1}}/>{t('comment.dropdown.reply')}
                    </Typography>
                </MenuItem>
                <MenuItem onClick={() => handleClick('Report')}>
                    <Typography textAlign="center" display="flex" alignItems="center">
                        <Report sx={{mr: 1}}/>{t('comment.dropdown.report')}
                    </Typography>
                </MenuItem>
                {
                    canBeDeleted
                    &&
                    <MenuItem onClick={() => handleClick('Delete')}>
                        <Typography textAlign="center" display="flex" alignItems="center">
                            <Delete sx={{mr: 1}}/>{t('comment.dropdown.delete')}
                        </Typography>
                    </MenuItem>
                }
            </Menu>

            <IconButton aria-label="post-dropdown" onClick={(e) => setAnchorElComment(e.currentTarget)}>
                { props.children }
            </IconButton>
        </>
    );
}

export default ChatMessageItemDropDown;