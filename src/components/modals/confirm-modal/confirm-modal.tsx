import ConfirmContainer from '@/components/containers/confirm-container/confirm-container';
import { useReactiveVar } from '@apollo/client/index.js';

import { confirmModalState } from './reactive';
import { confirmContainerState } from '@/components/containers/confirm-container/reactive';
import { useTranslation } from 'react-i18next';
import {useMediaQuery, useTheme, DialogActions, Dialog, Button} from "@mui/material";
import {
    useCommentDeleteByIdMutation,
    usePostDeleteByIdMutation,
    useUserDeleteByIdMutation
} from "@/utils/graphql-requests/generated/schema";



const ConfirmModal = () => {
    const confirmModal = useReactiveVar(confirmModalState);
    const { actionType, itemId } = useReactiveVar(confirmContainerState);


    const [ deleteTrack ] = usePostDeleteByIdMutation();
    const [ deleteComment ] = useCommentDeleteByIdMutation();
    const [ deleteUser ] = useUserDeleteByIdMutation();
    const { t } = useTranslation("modals")

    const theme = useTheme();
    const fullscreen = useMediaQuery(theme.breakpoints.down('md'));

    const handleClose = (confirmed: boolean) => {
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
            open={confirmModal.isShowing}
            scroll='paper'
            fullWidth
            maxWidth='sm'
            PaperProps={{ sx: { borderRadius: {sm: 0, md: 5} } }}
            fullScreen={Boolean(fullscreen)}
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