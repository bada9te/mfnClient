import { useEffect, useState } from "react";
import { Dialog, DialogActions, DialogContent, DialogTitle, IconButton, TextField } from "@mui/material";
import { Close, Send } from "@mui/icons-material";
import PostSelectContainer from "@/components/containers/post-select-container/post-select-container";
import { useReactiveVar } from "@apollo/client";
import { postSelectContainerState } from "@/components/containers/post-select-container/reactive";
import { postSelectModalState } from "./reactive";
import { useTranslation } from "react-i18next";


const PostSelectModal = props => {
    const { isMine, selectingFor } = useReactiveVar(postSelectContainerState);
    const { isShowing } = useReactiveVar(postSelectModalState);
    const [ query, setQuery ] = useState("");
    const { t } = useTranslation("modals");

    useEffect(() => {
        const timer = setTimeout(() => {
            if (query !== "") {
                postSelectContainerState({ 
                    ...postSelectContainerState(), 
                    query, 
                });
            }
        }, 750);

        return () => {
            clearTimeout(timer);
        }
    }, [query]);


    const handleClose = () => {
        postSelectModalState({...postSelectModalState(), isShowing: false})
    }


    return (
        <Dialog open={isShowing} onClose={handleClose} fullWidth fullScreen>
            <DialogTitle sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                {isMine ? t('select.post.mine') : t('select.post.opponent')}
                <IconButton sx={{ ml: 'auto' }} onClick={handleClose}>
                    <Close />
                </IconButton>
            </DialogTitle>

            <DialogContent dividers={true} sx={{p: 0}}>
                <PostSelectContainer/>
            </DialogContent>

            {
                selectingFor === "battle"
                &&
                <DialogActions>
                    <TextField margin="normal" required fullWidth id="title" label={t('select.post.query')} 
                        onInput={(e) => setQuery(e.target.value)}
                        InputProps={{
                            endAdornment: 
                                <IconButton type="submit">
                                    <Send />
                                </IconButton>
                        }}
                    />
                </DialogActions>
            }
        </Dialog>
    );
}

export default PostSelectModal;
