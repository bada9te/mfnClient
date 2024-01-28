import { useReactiveVar } from "@apollo/client";
import { chatCreateModalState } from "./reactive";
import { useTranslation } from "react-i18next";
import { useTheme } from "@emotion/react";
import { Dialog, DialogContent, DialogTitle, IconButton, useMediaQuery } from "@mui/material";
import { Close } from "@mui/icons-material";
import CreateChatForm from "../../forms/chat-create/chat-create";

const ChatCreateModal = props => {
    const chatModal = useReactiveVar(chatCreateModalState);
    const { t } = useTranslation("modals");
    
    const handleClose = () => {
        chatCreateModalState({ ...chatModal, isShowing: false });
    }

    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'))

    return (
        <Dialog 
            open={chatModal.isShowing} 
            scroll='paper' 
            fullWidth 
            maxWidth='md' 
            sx={{zIndex: (theme) => theme.zIndex.drawer + 1}}
            fullScreen={Boolean(fullScreen)}
            PaperProps={{ sx: { borderRadius: {sm: 0, md: 5} } }}
        >
            <DialogTitle sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                    {t('create_chat.title')}
                    <IconButton sx={{ ml: 'auto' }} onClick={handleClose}>
                        <Close />
                    </IconButton>
                </DialogTitle>
            <DialogContent dividers={true}>
                <CreateChatForm/>
            </DialogContent>
        </Dialog>
    );
}

export default ChatCreateModal;