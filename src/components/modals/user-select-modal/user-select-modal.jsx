import { Dialog, DialogContent, DialogTitle, IconButton, useMediaQuery, useTheme } from "@mui/material";
import { Close } from "@mui/icons-material";
import { useReactiveVar } from "@apollo/client/index.js";
import { userSelectModalState } from "./reactive";
import UserSelectContainerShare from "@/components/containers/user-select-share-container/user-select-share-container";
import { useTranslation } from "react-i18next";


const UserSelectModal = props => {
    const userSelectModal = useReactiveVar(userSelectModalState);
    
    const handleClose = () => {
        userSelectModalState({...userSelectModal, isShowing: false});
    }

    const theme = useTheme();
    const fullscreen = useMediaQuery(theme.breakpoints.down('md'));
    const { t } = useTranslation("modals");

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
                <UserSelectContainerShare/>
            </DialogContent>
        </Dialog>
    );
}


export default UserSelectModal;
