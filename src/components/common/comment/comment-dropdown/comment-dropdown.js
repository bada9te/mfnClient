import { MenuItem, Typography, Menu, IconButton } from "@mui/material";
import { Report, MoreVert, Reply, Delete } from "@mui/icons-material";
import { useState } from "react";

const CommentDropDown = props => {
    const { handleReply, handleDelete, canBeDeleted } = props;
    const [anchorElComment, setAnchorElComment] = useState(null);

    // click
    const handleClick = (i) => {
        if (i === 'Reply') handleReply();
        else if (i === 'Delete') handleDelete();
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
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                open={Boolean(anchorElComment)}
                onClose={handleCloseCommentMenu}
            >
                <MenuItem onClick={() => handleClick('Reply')}>
                    <Typography textAlign="center" display="flex" alignItems="center">
                        <Reply sx={{mr: 1}}/>Reply
                    </Typography>
                </MenuItem>
                <MenuItem onClick={() => handleClick('Report')}>
                    <Typography textAlign="center" display="flex" alignItems="center">
                        <Report sx={{mr: 1}}/>Report
                    </Typography>
                </MenuItem>
                {
                    canBeDeleted
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

            <IconButton aria-label="post-dropdown" onClick={(e) => setAnchorElComment(e.currentTarget)}>
                <MoreVert/>
            </IconButton>
        </>
    );
}

export default CommentDropDown;