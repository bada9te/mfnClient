import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import Slide from '@mui/material/Slide';
import * as Alert from "../../alerts/alerts";
import { useDispatch, useSelector } from 'react-redux';
import { setIsShowing as setConfirmModalIsShowing } from './confirmModalSlice';
import ConfirmContainer from '../../containers/confirm-container/confirm-container';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { POST_DELETE_BY_ID_MUTATION } from '../../../graphql/posts';
import { COMMENT_DELETE_BY_ID_MUTATION } from '../../../graphql/comments';
import { USER_DELETE_BY_ID_MUTATION } from '../../../graphql/users';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const ConfirmModal = (props) => {
    const isShowing = useSelector(state => state.confirmModal.isShowing);
    const actionType = useSelector(state => state.confirmContainer.actionType);
    const itemId = useSelector(state => state.confirmContainer.itemId);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [deleteTrack, {}] = useMutation(POST_DELETE_BY_ID_MUTATION);
    const [deleteComment, {}] = useMutation(COMMENT_DELETE_BY_ID_MUTATION);
    const [deleteUser, {}] = useMutation(USER_DELETE_BY_ID_MUTATION);

    const handleClose = (confirmed) => {
        dispatch(setConfirmModalIsShowing(false));
        if (confirmed) {
            switch (actionType) {
                case "delete-post":
                    deleteTrack({ variables: { _id: itemId } })
                        .then(result => {
                            console.log(result);
                        });
                    break;
                case "delete-comment":
                    deleteComment({ variables: { _id: itemId } })
                        .then(result => {
                            console.log(result);
                        });
                    break;
                case "delete-account":
                    deleteUser({ variables: { _id: itemId } })
                        .then(result => {
                            console.log(result);
                            //navigate('/logout')
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