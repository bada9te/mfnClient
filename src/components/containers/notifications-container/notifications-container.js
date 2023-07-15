import { Box, Stack, Typography } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../../common/spinner/Spinner";
import EnumNotifications from "../../enums/enum-notifications";
import { fetchNotifications } from "./notificationsContainerSlice";

const NotificationsContainer = props => {
    const isLoading = useSelector(state => state.notificationsContainer.isLoading);
    const notifications = useSelector (state => state.notificationsContainer.notifications);
    const currentUserId = useSelector(state => state.base.user._id);
    const dispatch = useDispatch();

    
    useEffect(() => {
        if (currentUserId) {
            dispatch(fetchNotifications());
        }
    }, [dispatch, currentUserId]);

    return (
        <>
            {
                (() => {
                    if (isLoading) {
                        return (
                            <Box sx={{minHeight: '88vh', display: 'flex', alignItems: 'center'}}>
                                <Spinner/>
                            </Box>
                        );
                    } else if (notifications?.length === 0) {
                        return (
                            <Box sx={{minHeight: '88vh', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                                <Typography sx={{textAlign: 'center', fontSize: 16}}>No notifications yet</Typography>
                            </Box>
                        );
                    } else {
                        return (
                            <Box sx={{ width: '100%', py: 4 }}>
                                <Stack spacing={1} direction="column" useFlexGap>
                                    <EnumNotifications/>
                                </Stack>
                            </Box>
                        );
                    }
                })()
            }
        </>
    );
}

export default NotificationsContainer;