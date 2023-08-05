import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import Slide from '@mui/material/Slide';
import * as Alert from "../../alerts/alerts";
import { useDispatch, useSelector } from 'react-redux';
import { setIsShowing as setConfirmModalIsShowing } from './confirmModalSlice';
import { deleteTrack, updateCommentsSocket } from '../../containers/posts-container/postsContainerSlice';
import { unwrapResult } from '@reduxjs/toolkit';
import ConfirmContainer from '../../containers/confirm-container/confirm-container';
import { deleteComment } from '../../containers/comments-container/commentsContainerSlice';
import userSocket from '../../../socket/user/socket-user';
import { deleteAccount } from '../../forms/profile-card/profileCardFormSlice';
import { useNavigate } from 'react-router-dom';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const ConfirmModal = (props) => {
    const isShowing = useSelector(state => state.confirmModal.isShowing);
    const actionType = useSelector(state => state.confirmContainer.actionType);
    const itemId = useSelector(state => state.confirmContainer.itemId);
    const dispatch = useDispatch();
    const navigate = useNavigate();


    const handleClose = (confirmed) => {
        dispatch(setConfirmModalIsShowing(false));
        if (confirmed) {
            switch (actionType) {
                case "delete-post":
                    dispatch(deleteTrack(itemId))
                    .then(unwrapResult)
                    .then(result => {
                        if (result.data.done) {
                            Alert.alertSuccess('Post deleted');
                        }
                    });
                    break;
                case "delete-comment":
                    dispatch(deleteComment(itemId))
                    .then(unwrapResult)
                    .then(result => {
                        if (result.data.done) {
                            dispatch(updateCommentsSocket({
                                comment: result.data.comment
                            }));
                            
                            userSocket.emit("post-remove-comment", {
                                postId: result.data.comment.post,
                                comment: result.data.comment,
                            });
                        }
                    });
                    break;
                case "delete-account":
                    dispatch(deleteAccount())
                        .then(unwrapResult)
                        .then(result => {
                            if (result.data.done) {
                                navigate('/logout')
                            }
                        });
                    break;
                default:
                    break;
            }
        }
    }

    return (
        <Dialog
            sx={{zIndex: 10}}
            open={isShowing}
            TransitionComponent={Transition}
            keepMounted
            onClose={() => handleClose(false)}
            aria-describedby="alert-dialog-slide-description"
        >
            <ConfirmContainer/>
            <DialogActions>
                <Button onClick={() => handleClose(false)}>Cancel</Button>
                <Button onClick={() => handleClose(true)}>I confirm</Button>
            </DialogActions>
        </Dialog>
    );
}

export default ConfirmModal;