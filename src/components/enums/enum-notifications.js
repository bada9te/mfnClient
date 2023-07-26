import { Box, Stack, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import getTimeSince from "../../common-functions/getTimeSince";
import NotificationItem from "../common/notification-item/notification-item";
import { SpinnerCircular } from "../common/spinner/Spinner";

const EnumNotifications = props => {
    const notifications = useSelector(state => state.notificationsContainer.notifications);
    const locations = useSelector(state => state.base.locations);
    const isLoading = useSelector(state => state.notificationsContainer.isLoading);
    const page = useSelector(state => state.notificationsContainer.page);

    return (
        <>
            {
                (() => {
                    if (isLoading) {
                        return (
                            <Box sx={{minHeight: '70vh', display: 'flex', alignItems: 'center'}}>
                                <SpinnerCircular/>
                            </Box>
                        );
                    } else if (notifications?.length === 0) {
                        return (
                            <Box sx={{minHeight: '70vh', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                                <Typography sx={{textAlign: 'center', fontSize: 16}}>No notifications yet</Typography>
                            </Box>
                        );
                    } else {
                        return (
                            <Box sx={{ width: '100%', py: 4 }}>
                                <Stack spacing={1} direction="column" useFlexGap>
                                    {
                                        notifications.map((notification, key) => {
                                            
                                            return (
                                                <NotificationItem
                                                    key={key}
                                                    id={notification._id}
                                                    user={[
                                                        notification.sender._id, 
                                                        notification.sender.nick, 
                                                        `${locations?.images}/${notification.sender.avatar}`,
                                                    ]}
                                                    text={notification.text}
                                                    comment={notification.comment}
                                                    post={notification.post}
                                                    createdAt={getTimeSince(new Date(notification.createdAt)) + ' ago'}
                                                    page={page}
                                                />
                                            );
                                        })
                                    }
                                </Stack>
                            </Box>
                        );
                    }
                })()
            }
        </>
    );
}

export default EnumNotifications;