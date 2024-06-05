import { useReactiveVar } from "@apollo/client";
import { Delete, ExpandMore, TaskAlt } from "@mui/icons-material";
import { Accordion, AccordionDetails, AccordionSummary, Avatar, Box, Button, Card, CardHeader, IconButton, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { NOTIFICATIONS_QUERY } from "@/utils/graphql-requests/notifications";
import { commentsContainerState } from "@/components/containers/comments-container/reactive";
import { commentsModalState } from "@/components/modals/comments-modal/reactive";
import { useSnackbar } from "notistack";
import { baseState } from "@/components/baseReactive";
import { Comment, Post, useNotificationDeleteByIdMutation, useNotificationMarkAsReadByIdMutation } from "@/utils/graphql-requests/generated/schema";


export default function NotificationItem(props: {
    id: string;
    user: {
        _id: string;
        nick: string;
        avatar: string;
    };
    text: string;
    post: Post;
    comment: Comment;
    createdAt: string;
    checked: boolean;
}) {
    const {id, user, text, post, comment, createdAt, checked} = props;
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();
    const { user: currentUser } = useReactiveVar(baseState);
    const q = { query: NOTIFICATIONS_QUERY, variables: { receiverId: currentUser._id, checked } };
    const [ notificationDelete ] = useNotificationDeleteByIdMutation({
        variables: { _id: id },
        refetchQueries: [q]
    });

    const [ notificationMarkAsRead ] = useNotificationMarkAsReadByIdMutation({
        variables: { _id: id },
        refetchQueries: [q]
    });

    const handleDelete = () => {
        enqueueSnackbar("Deleting notification...", { autoHideDuration: 1500 });
        notificationDelete()
            .then(() => {
                enqueueSnackbar("Notification removed.", { autoHideDuration: 1500, variant: 'success' });
            }).catch(() => {
                enqueueSnackbar("Can't delete notification.", { autoHideDuration: 3000, variant: 'error' });
            });
    }

    const hadleMarkAsRead = () => {
        enqueueSnackbar("Marking notification as read...", { autoHideDuration: 1500 });
        notificationMarkAsRead()
            .then(() => {
                enqueueSnackbar("Notification marked as read.", { autoHideDuration: 1500, variant: 'success' });
            }).catch(() => {
                enqueueSnackbar("Can't mark notification as read.", { autoHideDuration: 3000, variant: 'error' });
            });
    }

    const handleOpenComment = (commentId: string) => {
        commentsModalState({ ...commentsModalState(), isShowing: false });
        commentsContainerState({ 
            ...commentsContainerState(), 
            commentsIds: [commentId], 
            postId: post._id,
            postOwnerId: post.owner._id,
        });
    }

    const handleOpenPost = (trackId: string, ownerId: string) => {
        navigate(`/app/track/${trackId}`, {state: {trackId: trackId, ownerId: ownerId}});
    }

    return (
        <>
            <Card sx={{mb: 3, boxShadow: 1, marginBottom: 1}}>
                <CardHeader
                    //onClick={handleCommentSelection}
                    avatar={
                        <Avatar
                            src={user.avatar.endsWith('/') ? "NULL" : user.avatar} 
                            sx={{bgcolor: "gray", boxShadow: 3}} 
                            aria-label="recipe"
                        />
                    }
                    title={user.nick}
                    subheader={createdAt}
                    action={
                        !checked
                        ?
                        <IconButton onClick={hadleMarkAsRead}>
                            <TaskAlt/>
                        </IconButton>
                        :
                        <IconButton onClick={handleDelete}>
                            <Delete/>
                        </IconButton>
                    }
                />
                <Accordion>
                    <AccordionSummary expandIcon={<ExpandMore/>}>
                        <Typography>{text}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        {
                            (() => {
                                if (post !== null) {
                                    return (
                                        <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                                            <Typography>{post.title}, by {post.owner.nick}</Typography>
                                            <Button variant="outlined" onClick={() => handleOpenPost(post._id, post.owner._id)}>Open related post</Button>
                                        </Box>
                                    );
                                } else if (comment !== null) {
                                    return (
                                        <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                                            <Typography>{comment.text}</Typography>
                                            <Box sx={{display: 'flex', alignItems: 'center'}}>
                                                <Button variant="outlined" onClick={() => handleOpenComment(comment._id)}>Show related comment</Button>
                                                <Button variant="outlined" onClick={() => handleOpenPost(comment.post._id, comment.post.owner._id)}>Open related post</Button>
                                            </Box>
                                        </Box>
                                    );
                                }
                            })()
                        }
                    </AccordionDetails>
                </Accordion>
            </Card>
        </>
    );
}