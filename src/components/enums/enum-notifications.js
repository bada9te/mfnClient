import { useReactiveVar } from "@apollo/client";
import { Box, Stack, Typography } from "@mui/material";
import getTimeSince from "../../utils/common-functions/getTimeSince";
import { baseState } from "../baseReactive";
import NotificationItem from "../common/notification-item/notification-item";
import { SpinnerLinear } from "../common/spinner/Spinner";

const EnumNotifications = props => {
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
                                        notifications.map((notification, key) => {
                                            return (
                                                <NotificationItem
                                                    key={key}
                                                    id={notification._id}
                                                    user={[
                                                        notification.sender?._id || "", 
                                                        notification.sender?.nick || "Deleted User", 
                                                        notification.sender?.avatar ? `${locations?.images}/${notification.sender?.avatar}` : "NULL",
                                                    ]}
                                                    text={notification.text}
                                                    comment={notification.comment}
                                                    post={notification.post}
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

export default EnumNotifications;