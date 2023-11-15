import { useForm } from "react-hook-form";
import * as Alert from "../../alerts/alerts";
import { Box, TextField, IconButton } from "@mui/material";
import { Send } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { unwrapResult } from "@reduxjs/toolkit";
import userSocket from "../../../socket/user/socket-user";
import { useMutation, useReactiveVar } from "@apollo/client";
import { commentsContainerState } from "../../containers/comments-container/reactive";
import { COMMENT_CREATE_MUTATION } from "../../../graphql/comments";




const AddCommentForm = (props) => {
    const { register, handleSubmit, reset } = useForm();
    const dispatch = useDispatch();
    const currentUser = useSelector(state => state?.base?.user);
    const [createComment] = useMutation(COMMENT_CREATE_MUTATION);

    const { postId, replyingTo, postOwnerId } = useReactiveVar(commentsContainerState);
    const theme = useSelector(state => state.base.theme);


    const onSubmit = async(data) => {
        const commentData = {
            text: `@${replyingTo[1] === null ? '' : replyingTo[1]} ${data.Text}`,
            post: postId,
            owner: currentUser?._id,
        }

        if (replyingTo[0] !== null) {
            commentData.isReplyTo = replyingTo[0];
            commentData.isReply = true;
        }

        Alert.alertPromise("Creating comment...", "Comment added", "Can't add a comment", () => {
            return new Promise((resolve, reject) => {
                createComment({
                    variables: {
                        input: {
                            ...commentData
                        },
                    },
                })
                .then(result => {
                    if (true) {
                        console.log(result)
        
                        reset();
                        resolve();
                    } else {
                        reject();
                    }
                });
            });
        }, { theme });
    }

    return (
        <>
            <Box component='form' sx={{m: 1, width: '100%'}} onSubmit={handleSubmit(onSubmit)}>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="title"
                    label={replyingTo[1] === null ? "Your comment text" : `Replying to ${replyingTo[1]}`}
                    {...register("Text", {
                        required: true,
                    })}
                    InputProps={{
                        endAdornment: 
                            <IconButton type="submit">
                                <Send />
                            </IconButton>
                    }}
                />
            </Box>
                
        </>
    );
}

export default AddCommentForm;