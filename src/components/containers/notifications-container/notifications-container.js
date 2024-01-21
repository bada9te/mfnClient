import { Box, Button, Tab, Tabs } from "@mui/material";
import { useEffect, useState } from "react";
import EnumNotifications from "../../enums/enum-notifications";
import { Checklist, MarkAsUnread } from "@mui/icons-material";
import { useLazyQuery, useMutation, useReactiveVar } from "@apollo/client";
import { baseState } from "../../baseReactive";
import { DELETE_NOTIFICATIONS_MUTATION, MARK_NOTIFICATIONS_AS_READ_MUTATION, NOTIFICATIONS_QUERY } from "../../../utils/graphql-requests/notifications";
import { useSnackbar } from "notistack";
import { useTranslation } from "react-i18next";
import TabPanel from "../../common/tab-panel/tab-panel";



const NotificationsContainer = props => {
    const [status, setStatus] = useState(0);

    const { user: currentUser } = useReactiveVar(baseState);
    const [ getNotifications, { data, loading } ] = useLazyQuery(NOTIFICATIONS_QUERY, {
        variables: {
            receiverId: currentUser._id,
            checked: status === 0 ? false : true,
        },
        pollInterval: 15000,
    });
    const [ deleteNotificationsByIds ] = useMutation(DELETE_NOTIFICATIONS_MUTATION);
    const [ markNotificationsAsReadByIds ] = useMutation(MARK_NOTIFICATIONS_AS_READ_MUTATION);
    const { enqueueSnackbar } = useSnackbar();
    const { t } = useTranslation("containers");

    const handleTabSwitch = (event, key) => {
        setStatus(key);
    }

    const handleDeleteAllClick = async() => {
        if (data?.notifications && data?.notifications.length > 0) {
            enqueueSnackbar(t('notifications.snack.pending'), { autoHideDuration: 1500 });
            await deleteNotificationsByIds({ variables: { ids: data.notifications.map(i => i._id) } })
                .then(() => {
                    enqueueSnackbar(t('notifications.snack.success'), { autoHideDuration: 1500, variant: 'success' });
                }).catch(() => {
                    enqueueSnackbar(t('notifications.snack.error'), { autoHideDuration: 3000, variant: 'error' });
                });
        }
    }

    const handleReadAllClick = async() => {
        if (data?.notifications && data?.notifications.length > 0) {
            enqueueSnackbar(t('notifications.snack.pending'), { autoHideDuration: 1500 });
            await markNotificationsAsReadByIds({ variables: { ids: data.notifications.map(i => i._id) } })
                .then(() => {
                    enqueueSnackbar(t('notifications.snack.success'), { autoHideDuration: 1500, variant: 'success' });
                }).catch(() => {
                    enqueueSnackbar(t('notifications.snack.error'), { autoHideDuration: 3000, variant: 'error' });
                });
        }
    }

    useEffect(() => {
        if (currentUser._id !== "") {
            getNotifications()
        }
    }, [currentUser._id, getNotifications]);

    

    return (
        <Box sx={{width: '100%', height: '100vh'}}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider', mt: 1.2 }}>
                <Tabs value={status} onChange={handleTabSwitch} variant="fullWidth">
                    <Tab icon={<MarkAsUnread/>} label={t('notifications.unread')} id="simple-tab-0" aria-controls="simple-tabpanel-0" />
                    <Tab icon={<Checklist/>} label={t('notifications.read')} id="simple-tab-1" aria-controls="simple-tabpanel-1"/>
                </Tabs>
            </Box>

            <TabPanel value={status} index={0}>
                { !loading && <Button sx={{ borderRadius: 0 }} variant="contained" fullWidth onClick={handleReadAllClick}>{t('notifications.mark_as_read')}</Button> }
                <EnumNotifications notifications={data?.notifications || []} loading={loading}/>
            </TabPanel>
        
            <TabPanel value={status} index={1}>
                { !loading && <Button sx={{ borderRadius: 0 }} variant="contained" fullWidth onClick={handleDeleteAllClick}>{t('notifications.delete_all')}</Button> }
                <EnumNotifications notifications={data?.notifications || []} loading={loading}/>
            </TabPanel>
        </Box>
    );
}

export default NotificationsContainer;