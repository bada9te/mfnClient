import AddCommentForm from "@/components/forms/add-comment/add-comment";

import { Dialog, DialogActions, DialogContent, DialogTitle, IconButton, useMediaQuery, useTheme } from "@mui/material";
import { Close } from "@mui/icons-material";
import CommentsContainer from "@/components/containers/comments-container/comments-container";
import { useReactiveVar } from "@apollo/client/index.js";
import { commentsModalState } from "./reactive";
import { useTranslation } from "react-i18next";


const CommentsModal = props => {
    const commentsModal = useReactiveVar(commentsModalState);
    const { t } = useTranslation("modals");
    
    const handleClose = () => {
        commentsModalState({ ...commentsModal, isShowing: false });
    }

    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'))

    return (
        <Dialog 
            open={commentsModal.isShowing} 
            scroll='paper' 
            fullWidth 
            maxWidth='md' 
            sx={{zIndex: (theme) => theme.zIndex.drawer + 1}}
            fullScreen={Boolean(fullScreen)}
            PaperProps={{ sx: { borderRadius: {sm: 0, md: 5} } }}
        >
            <DialogTitle sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                    {t('comments.title')}
                    <IconButton sx={{ ml: 'auto' }} onClick={handleClose}>
                        <Close />
                    </IconButton>
                </DialogTitle>
            <DialogContent dividers={true} sx={{m: 0, p: 2, backgroundColor: '#1c94a4'}}>
                <CommentsContainer/>
            </DialogContent>
            <DialogActions>
                <AddCommentForm/>
            </DialogActions>
        </Dialog>
    );
}


export default CommentsModal;
