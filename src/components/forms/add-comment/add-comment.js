import { useForm } from "react-hook-form";
import { Box, TextField, IconButton } from "@mui/material";
import { Send } from "@mui/icons-material";
import { useMutation, useReactiveVar } from "@apollo/client";
import { commentsContainerState } from "../../containers/comments-container/reactive";
import { COMMENT_CREATE_MUTATION } from "../../../graphql-requests/comments";
import { baseState } from "../../baseReactive";
import { useSnackbar } from "notistack";




const AddCommentForm = (props) => {
    const { register, handleSubmit, reset } = useForm();
    const [ createComment ] = useMutation(COMMENT_CREATE_MUTATION);
    
    const { user: currentUser } = useReactiveVar(baseState);
    const { postId, replyingTo, postOwnerId } = useReactiveVar(commentsContainerState);
    const { enqueueSnackbar } = useSnackbar();

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

        enqueueSnackbar("Creating comment...", { autoHideDuration: 1500 });
        createComment({
            variables: {
                input: {
                    ...commentData
                },
            },
        }).then(({data}) => {
            reset();
            enqueueSnackbar("Comment created", { autoHideDuration: 1500, variant: 'success' });
        }).catch(err => {
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