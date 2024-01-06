import { useEffect, useState } from "react";
import { Dialog, DialogActions, DialogContent, DialogTitle, IconButton, TextField } from "@mui/material";
import { Close, Send } from "@mui/icons-material";
import PostSelectContainer from "../../containers/post-select-container/post-select-container";
import { useReactiveVar } from "@apollo/client";
import { postSelectContainerState } from "../../containers/post-select-container/reactive";
import { postSelectModalState } from "./reactive";


const PostSelectModal = props => {
    const { isMine, selectingFor } = useReactiveVar(postSelectContainerState);
    const { isShowing } = useReactiveVar(postSelectModalState);
    const [ query, setQuery ] = useState("");


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
                {isMine ? "Select your track" : "Select opponent's track"}
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
                    <TextField margin="normal" required fullWidth id="title" label="Track name" 
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
