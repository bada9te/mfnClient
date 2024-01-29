import { Button, Dialog, DialogContent, DialogTitle, IconButton, useMediaQuery, useTheme } from "@mui/material";
import { Close } from "@mui/icons-material";
import UserSelectContainer from "../../containers/user-select-container/user-select-container";
import { useReactiveVar } from "@apollo/client";
import { userSelectModalState } from "./reactive";
import { useTranslation } from "react-i18next";
import { useSnackbar } from "notistack";
import { userSelectContainerState } from "../../containers/user-select-container/reactive";


const UserSelectModal = props => {
    const userSelectModal = useReactiveVar(userSelectModalState);
    const { selectType, sharedItem: sharedItemId, checked } = useReactiveVar(userSelectContainerState);
    const { t } = useTranslation("modals");
    const { enqueueSnackbar } = useSnackbar();
    
    const handleClose = () => {
        userSelectModalState({...userSelectModal, isShowing: false});
    }
    
    const theme = useTheme();
    const fullscreen = useMediaQuery(theme.breakpoints.down('md'));

    const handleUserSelect = () => {
        enqueueSnackbar(t('select.user.snack.pending'), { autoHideDuration: 1500 });
        const promises = [];
        if (selectType === 'postShare') {
            checked.forEach(userId => {
                promises.push(() => {
                    // code (send post to the chat)
                })
            })
        }

        Promise.all(promises)
            .then(() => {
                enqueueSnackbar(t('select.user.snack.success'), { autoHideDuration: 1500, variant: 'success' });
            }).catch(() => {
                enqueueSnackbar(t('select.user.snack.error'), { autoHideDuration: 3000, variant: 'error' });
            });
        userSelectModalState({ ...userSelectModal, isShowing: false })
    }

    return (
        <Dialog 
            open={userSelectModal.isShowing} 
            scroll='paper' fullWidth 
            maxWidth='sm' 
            PaperProps={{ sx: { borderRadius: {sm: 0, md: 5} } }}
            fullScreen={Boolean(fullscreen)}
        >
            <DialogTitle sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                {t('select.user.title')}
                <IconButton sx={{ ml: 'auto' }} onClick={handleClose}>
                    <Close />
                </IconButton>
            </DialogTitle>
            <DialogContent dividers={true}>
                <UserSelectContainer except={[]}/>
                <Button variant="contained" fullWidth onClick={handleUserSelect}>Confirm</Button>
            </DialogContent>
        </Dialog>
    );
}


export default UserSelectModal;
