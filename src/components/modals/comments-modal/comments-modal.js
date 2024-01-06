import AddCommentForm from "../../forms/add-comment/add-comment";

import { Dialog, DialogActions, DialogContent, DialogTitle, IconButton, useMediaQuery, useTheme } from "@mui/material";
import { Close } from "@mui/icons-material";
import CommentsContainer from "../../containers/comments-container/comments-container";
import { useReactiveVar } from "@apollo/client";
import { commentsModalState } from "./reactive";
import { useTranslation } from "react-i18next";


const CommentsModal = props => {
    const commentsModal = useReactiveVar(commentsModalState);
    const { t } = useTranslation("comments");
    
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
                    {t('comments.modal.title')}
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
