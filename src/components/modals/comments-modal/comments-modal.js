import AddCommentForm from "../../forms/add-comment/add-comment";

import { Dialog, DialogActions, DialogContent, DialogTitle, IconButton } from "@mui/material";
import { Close } from "@mui/icons-material";
import CommentsContainer from "../../containers/comments-container/comments-container";
import { useReactiveVar } from "@apollo/client";
import { commentsModalState } from "./reactive";


const CommentsModal = props => {
    const commentsModal = useReactiveVar(commentsModalState);
    
    const handleClose = () => {
        commentsModalState({ ...commentsModal, isShowing: false });
    }

    return (
        <Dialog open={commentsModal.isShowing} scroll='paper' fullWidth maxWidth='sm' sx={{zIndex: 9}}>
            <DialogTitle sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                    Comments
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
