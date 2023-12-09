import { Delete, ExpandMore, TaskAlt } from "@mui/icons-material";
import { Accordion, AccordionDetails, AccordionSummary, Avatar, Box, Button, Card, CardHeader, IconButton, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { commentsContainerState } from "../../containers/comments-container/reactive";
import { commentsModalState } from "../../modals/comments-modal/reactive";


const NotificationItem = props => {
    const {id, user, text, post, comment, createdAt, checked} = props;
    const navigate = useNavigate();

    const handleDelete = () => {
        //dispatch(deleteNotification(id));
    }

    const hadleMarkAsRead = () => {
        //dispatch(markNotificationAsRead(id));
    }

    const handleOpenComment = (commentId) => {
        commentsModalState({ ...commentsModalState(), isShowing: false });
        commentsContainerState({ 
            ...commentsContainerState(), 
            commentsIds: [commentId], 
            postId: post._id,
            postOwnerId: post.owner._id,
        })
    }

    const handleOpenPost = (trackId, ownerId) => {
        navigate(`/app/track/${trackId}`, {state: {trackId: trackId, ownerId: ownerId}});
    }

    return (
        <>
            <Card sx={{mb: 3, boxShadow: 1, marginBottom: 1}}>
                <CardHeader
                    //onClick={handleCommentSelection}
                    avatar={
                        <Avatar
                            src={user[2].endsWith('/') ? "NULL" : user[2]} 
                            sx={{bgcolor: "gray", boxShadow: 3}} 
                            aria-label="recipe"
                        />
                    }
                    title={user[1]}
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
                                                <Button variant="outlined" onClick={handleOpenComment}>Show related comment</Button>
                                                <Button variant="outlined" onClick={() => handleOpenPost(post._id, post.owner._id)}>Open related post</Button>
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

export default NotificationItem;