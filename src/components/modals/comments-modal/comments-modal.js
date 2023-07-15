import AddCommentForm from "../../forms/add-comment/add-comment";
import { useEffect } from "react";
import userSocket from "../../../socket/user/socket-user";

import { Dialog, DialogActions, DialogContent, DialogTitle, IconButton } from "@mui/material";
import { Close } from "@mui/icons-material";
import CommentsContainer from "../../containers/comments-container/comments-container";
import { useDispatch, useSelector } from "react-redux";
import { addComment, removeComment } from "../../containers/comments-container/commentsContainerSlice";
import { setIsShowing } from "./commentsModalSlice";


const CommentsModal = props => {
    const dispatch = useDispatch();
    const postId = useSelector(state => state.commentsContainer.postId);
    const isShowing = useSelector(state => state.commentsModal.isShowing);
    

    const handleClose = () => {
        dispatch(setIsShowing(false));
    }

    // socket
    useEffect(() => {
        userSocket.on(`post-${postId}-was-commented`, (data) => {
            addComment(data.isReplyTo, data.comment);
        });

        userSocket.on(`post-${postId}-was-uncommented`, (data) => {
            removeComment(data.comment);
        });

        return () => {
            userSocket.off(`post-${postId}-was-commented`);
            userSocket.off(`post-${postId}-was-uncommented`);
        };
    }, [postId]);

    

    return (
        <Dialog open={isShowing} scroll='paper' fullWidth maxWidth='sm'>
            <DialogTitle sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                    Comments
                    <IconButton sx={{ ml: 'auto' }} onClick={handleClose}>
                        <Close />
                    </IconButton>
                </DialogTitle>
            <DialogContent dividers={true}>
                <CommentsContainer/>
            </DialogContent>
            <DialogActions>
                <AddCommentForm/>
            </DialogActions>
        </Dialog>
    );
}


export default CommentsModal;
