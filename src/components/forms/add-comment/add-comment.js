import { useForm } from "react-hook-form";
import { Box, TextField, IconButton, Tooltip } from "@mui/material";
import { Reply, Send } from "@mui/icons-material";
import { useMutation, useReactiveVar } from "@apollo/client";
import { commentsContainerState, replyingToNull } from "../../containers/comments-container/reactive";
import { COMMENTS_BY_POST_ID, COMMENTS_REPLIES_BY_COMMENT_ID, COMMENT_CREATE_MUTATION } from "../../../graphql-requests/comments";
import { baseState } from "../../baseReactive";
import { useSnackbar } from "notistack";




const AddCommentForm = (props) => {
    const { register, handleSubmit, reset } = useForm();
    const [ createComment ] = useMutation(COMMENT_CREATE_MUTATION);
    const { user: currentUser } = useReactiveVar(baseState);
    const { postId, replyingTo } = useReactiveVar(commentsContainerState);
    const { enqueueSnackbar } = useSnackbar();

    const cancelReply = () => {
        commentsContainerState({...commentsContainerState(), replyingTo: replyingToNull});
    }


    const onSubmit = async(data) => {
        const commentData = {
            text: data.Text,
            post: postId,
            owner: currentUser?._id,
            receiver: replyingTo.userId,
        }

        commentData.isReply = false;
        if (replyingTo.commentId !== null) {
            commentData.isReplyTo = replyingTo.commentId;
            commentData.isReply = true;
        }

        enqueueSnackbar("Creating comment...", { autoHideDuration: 1500 });
        createComment({
            variables: {
                input: {
                    ...commentData
                },
            },
            update: (cache, { data }) => {
                // updating replies
                if (replyingTo.commentId !== null) {
                    const cachedData = cache.readQuery({ query: COMMENTS_REPLIES_BY_COMMENT_ID, variables: { _id: replyingTo.commentId } });
                    cache.writeQuery({
                        query: COMMENTS_REPLIES_BY_COMMENT_ID,
                        variables: { _id: replyingTo.commentId },
                        data: {
                            commentReplies: cachedData?.commentReplies ? [...cachedData.commentReplies, data.commentCreate] : [data.commentCreate]
                        }
                    });
                } 
                // updating main comments
                else {
                    const cachedData = cache.readQuery({ query: COMMENTS_BY_POST_ID, variables: { _id: postId } });
                    cache.writeQuery({
                        query: COMMENTS_BY_POST_ID,
                        variables: { _id: postId },
                        data: {
                            commentsByPostId: [...cachedData.commentsByPostId, data.commentCreate]
                        }
                    });
                }
            }
        }).then(({data}) => {
            reset();
            enqueueSnackbar("Comment created", { autoHideDuration: 1500, variant: 'success' });
        }).catch(err => {
            console.error(err)
            enqueueSnackbar("Can't create the comment", { autoHideDuration: 3000, variant: 'error' });
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
                    label={replyingTo.commentId === null ? "Your comment text" : `Replying to ${replyingTo.userNick}`}
                    {...register("Text", {
                        required: true,
                    })}
                    InputProps={{
                        endAdornment: 
                            <IconButton type="submit">
                                <Send />
                            </IconButton>,
                        startAdornment: 
                            replyingTo.commentId 
                            && 
                            <Tooltip title="Cancel reply">
                                <IconButton type="submit" onClick={cancelReply}>
                                    <Reply />
                                </IconButton>
                            </Tooltip>
                    }}
                    
                />
            </Box>
                
        </>
    );
}

export default AddCommentForm;