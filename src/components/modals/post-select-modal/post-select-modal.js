import { useEffect } from "react";
import { Dialog, DialogActions, DialogContent, DialogTitle, IconButton, TextField } from "@mui/material";
import { Close, Send } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { fetchByTitle, fetchSavedPosts, setQuery } from "../../containers/post-select-container/postSelectContainerSlice";
import PostSelectContainer from "../../containers/post-select-container/post-select-container";
import { setIsShowing } from "./postSelectModalSlice";


const PostSelectModal = props => {
    const query = useSelector(state => state.postSelectContainer.query);
    const isMine = useSelector(state => state.postSelectContainer.isMine);
    const isShowing = useSelector(state => state.postSelectModal.isShowing);
    const selectingFor = useSelector(state => state.postSelectContainer.selectingFor);
    const dispatch = useDispatch();


    useEffect(() => {
        const timer = setTimeout(() => {
            if (query !== "") {
                dispatch(fetchByTitle())
            }
        }, 750);

        return () => {
            clearTimeout(timer);
        }
    }, [query, dispatch]);


    return (
        <>
            <Dialog open={isShowing} onClose={() => dispatch(setIsShowing(false))} 
            fullWidth fullScreen>
                <DialogTitle sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                    {isMine ? "Select your track" : "Select opponent's track"}
                    <IconButton sx={{ ml: 'auto' }} onClick={() => dispatch(setIsShowing(false))}>
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
                            onInput={(e) => dispatch(setQuery(e.target.value))}
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
        </>
    );
}

export default PostSelectModal;
