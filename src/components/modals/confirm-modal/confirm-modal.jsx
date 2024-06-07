import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import Slide from '@mui/material/Slide';
import ConfirmContainer from '@/components/containers/confirm-container/confirm-container';
import { useMutation, useReactiveVar } from '@apollo/client/index.js';
import { POST_DELETE_BY_ID_MUTATION } from '@/utils/graphql-requests/posts';
import { COMMENT_DELETE_BY_ID_MUTATION } from '@/utils/graphql-requests/comments';
import { USER_DELETE_BY_ID_MUTATION } from '@/utils/graphql-requests/users';
import { confirmModalState } from './reactive';
import { confirmContainerState } from '@/components/containers/confirm-container/reactive';
import { useTranslation } from 'react-i18next';


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const ConfirmModal = (props) => {
    const confirmModal = useReactiveVar(confirmModalState);
    const { actionType, itemId } = useReactiveVar(confirmContainerState);

    const [ deleteTrack ] = useMutation(POST_DELETE_BY_ID_MUTATION);
    const [ deleteComment ] = useMutation(COMMENT_DELETE_BY_ID_MUTATION);
    const [ deleteUser ] = useMutation(USER_DELETE_BY_ID_MUTATION);
    const { t } = useTranslation("modals")

    const handleClose = (confirmed) => {
        confirmModalState({ ...confirmModal, isShowing: false });
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
            open={confirmModal.isShowing}
            TransitionComponent={Transition}
            keepMounted
            onClose={() => handleClose(false)}
            aria-describedby="alert-dialog-slide-description"
            PaperProps={{ sx: { borderRadius: 5 } }}
        >
            <ConfirmContainer/>
            <DialogActions>
                <Button onClick={() => handleClose(false)}>{t('confirm.cancel')}</Button>
                <Button onClick={() => handleClose(true)}>{t('confirm.ok')}</Button>
            </DialogActions>
        </Dialog>
    );
}

export default ConfirmModal;