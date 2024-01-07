import { Dialog, DialogContent, DialogTitle, IconButton, useMediaQuery, useTheme } from "@mui/material";
import { Close } from "@mui/icons-material";
import UserSelectContainer from "../../containers/user-select-container/user-select-container";
import { useReactiveVar } from "@apollo/client";
import { userSelectModalState } from "./reactive";
import { useTranslation } from "react-i18next";


const UserSelectModal = props => {
    const userSelectModal = useReactiveVar(userSelectModalState);
    const { t } = useTranslation("modals");
    
    const handleClose = () => {
        userSelectModalState({...userSelectModal, isShowing: false});
    }
    
    const theme = useTheme();
    const fullscreen = useMediaQuery(theme.breakpoints.down('md'));

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
                <UserSelectContainer/>
            </DialogContent>
        </Dialog>
    );
}


export default UserSelectModal;
