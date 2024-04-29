import { useReactiveVar } from "@apollo/client";
import { Box, Stack, Typography } from "@mui/material";
import getTimeSince from "../../utils/common-functions/getTimeSince";
import { baseState } from "../baseReactive";
import NotificationItem from "../common/notification-item/notification-item";
import { SpinnerLinear } from "../common/spinner/Spinner";
import { Comment, NotificationsQuery, Post } from "utils/graphql-requests/generated/schema";

export default function EnumNotifications(props: {
    loading: boolean;
    notifications: NotificationsQuery["notifications"];
}) {
    const { notifications, loading } = props;
    const { locations }  = useReactiveVar(baseState);

    return (
        <>
            {
                (() => {
                    if (loading) {
                        return (
                            <SpinnerLinear/>
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
                                        notifications?.map((notification, key) => {
                                            return (
                                                <NotificationItem
                                                    key={key}
                                                    id={notification._id}
                                                    user={{
                                                        _id: notification.sender?._id || "", 
                                                        nick: notification.sender?.nick || "Deleted User", 
                                                        avatar: notification.sender?.avatar ? `${locations?.images}/${notification.sender?.avatar}` : "NULL",
                                                    }}
                                                    text={notification.text}
                                                    comment={notification.comment as Comment}
                                                    post={notification.post as Post}
                                                    createdAt={getTimeSince(new Date(+notification.createdAt)) + ' ago'}
                                                    checked={notification.checked}
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

