
import { Delete, ExpandMore } from "@mui/icons-material";
import { Accordion, AccordionDetails, AccordionSummary, Avatar, Card, CardHeader, IconButton, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { addOrRemoveNotificationId } from "../../baseSlice";
import { deleteNotification } from "../../containers/notifications-container/notificationsContainerSlice";

const NotificationItem = props => {
    const {id, user, text, post, comment, createdAt} = props;
    const dispatch = useDispatch();


    const handleDelete = () => {
        dispatch(deleteNotification(id));
        dispatch(addOrRemoveNotificationId(id));
    }

    return (
        <>
            <Card sx={{mb: 3, boxShadow: 1, marginBottom: 1}}>
                <CardHeader
                    //onClick={handleCommentSelection}
                    avatar={
                        <Avatar
                            src={user[2]} 
                            sx={{bgcolor: "gray", boxShadow: 3}} 
                            aria-label="recipe"
                        />
                    }
                    title={user[1]}
                    subheader={createdAt}
                    action={
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
                                        <>
                                            POST NOTIFICATION
                                        </>
                                    );
                                } else if (comment !== null) {
                                    return (
                                        <>
                                            COMMENT NOTIFICATION
                                        </>
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