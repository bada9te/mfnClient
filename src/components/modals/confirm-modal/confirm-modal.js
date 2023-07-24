import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import * as Alert from "../../alerts/alerts";
import { useDispatch, useSelector } from 'react-redux';
import { setIsShowing as setConfirmModalIsShowing } from './confirmModalSlice';
import { deleteTrack } from '../../containers/posts-container/postsContainerSlice';
import { unwrapResult } from '@reduxjs/toolkit';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const ConfirmModal = (props) => {
    const isShowing = useSelector(state => state.confirmModal.isShowing);
    const actionType = useSelector(state => state.confirmModal.actionType);
    const itemId = useSelector(state => state.confirmModal.itemId);
    const text = useSelector(state => state.confirmModal.text);
    const dispatch = useDispatch();

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
                // todo add comment delete case
                default:
                    break;
            }
        }
    }

    return (
        <Dialog
            open={isShowing}
            TransitionComponent={Transition}
            keepMounted
            onClose={() => handleClose(false)}
            aria-describedby="alert-dialog-slide-description"
        >
            <DialogTitle>Confirm your action</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-slide-description">
                    {text}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
            <Button onClick={() => handleClose(false)}>Cancel</Button>
            <Button onClick={() => handleClose(true)}>I confirm</Button>
            </DialogActions>
        </Dialog>
    );
}

export default ConfirmModal;