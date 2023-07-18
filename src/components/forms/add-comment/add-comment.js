import { useForm } from "react-hook-form";
import * as Alert from "../../alerts/alerts";
import { Box, TextField, IconButton } from "@mui/material";
import { Send } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { createComment } from "../../containers/comments-container/commentsContainerSlice";
import { unwrapResult } from "@reduxjs/toolkit";
import userSocket from "../../../socket/user/socket-user";




const AddCommentForm = (props) => {
    const { register, handleSubmit } = useForm();
    const dispatch = useDispatch();
    const currentUser = useSelector(state => state?.base?.user);
    const postId = useSelector(state => state.commentsContainer.postId);
    const replyingTo = useSelector(state => state.commentsContainer.replyingTo);


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

        dispatch(createComment({
            replyingId: replyingTo[0],
            comment: commentData,
            currentUser: currentUser,
        }))
        .then(unwrapResult)
        .then(result => {
            if (result.data.done) {
                //handleCommentAdding(result.data.comment.isReplyTo || null, result.data.comment);
                Alert.alertSuccess("Comment added");
                
                userSocket.emit("post-add-comment", {
                    sender: currentUser,
                    post: postId,
                    comment: result.data.comment._id,
                    receiver: replyingTo[0] === null ? null : replyingTo[0],
                    text: `${currentUser.nick} commented your post.`
                });

            } else {
                Alert.alertError("Can't add a comment");
            }
        });


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