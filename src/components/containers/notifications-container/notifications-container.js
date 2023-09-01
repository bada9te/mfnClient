import { Box, Button, Tab, Tabs } from "@mui/material";
import { unwrapResult } from "@reduxjs/toolkit";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import EnumNotifications from "../../enums/enum-notifications";
import { deleteManyNotifications, fetchReadNotifications, fetchUnreadNotifications, markManyNotificationsAsRead, setPage } from "./notificationsContainerSlice";
import * as Alert from "../../alerts/alerts";
import { Checklist, MarkAsUnread } from "@mui/icons-material";


function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
            <Box sx={{ p: 0 }}>
                {children}
            </Box>
        )}
      </div>
    );
}




const NotificationsContainer = props => {
    const [status, setStatus] = useState(0);
    const currentUserId = useSelector(state => state.base.user._id);
    const page = useSelector(state => state.notificationsContainer.page);
    const notifications = useSelector(state => state.notificationsContainer.notifications);
    const dispatch = useDispatch();


    const handleTabSwitch = (event, key) => {
        setStatus(key);
        if (key === 0) {
            dispatch(setPage("Unread"));
        } else if (key === 1) {
            dispatch(setPage("Read"));
        }
    }

    const handleDeleteAllClick = () => {
        if (notifications && notifications.length > 0) {
            dispatch(deleteManyNotifications(notifications.map(i => i._id)))
                .then(unwrapResult)
                .then(result => {
                    if (result.data.done) {
                        Alert.alertSuccess("Notifications removed");
                    }
                });
        }
    }

    const handleReadAllClick = () => {
        if (notifications && notifications.length > 0) {
            dispatch(markManyNotificationsAsRead(notifications.map(i => i._id)))
                .then(unwrapResult)
                .then(result => {
                    if (result.data.done) {
                        Alert.alertSuccess("Notifications marked as read");
                    }
                });
        }
    }

    
    useEffect(() => {
        if (currentUserId) {
            if (page === "Unread") dispatch(fetchUnreadNotifications());
            else if (page === "Read") dispatch(fetchReadNotifications());
        }
    }, [dispatch, currentUserId, page]);

    return (
        <Box>
            <Box sx={{ borderBottom: 1, borderColor: 'divider', my: 3 }}>
                <Tabs value={status} onChange={handleTabSwitch}>
                    <Tab icon={<MarkAsUnread/>} label="Unread" id="simple-tab-0" aria-controls="simple-tabpanel-0" />
                    <Tab icon={<Checklist/>} label="Read" id="simple-tab-1" aria-controls="simple-tabpanel-1"/>
                </Tabs>
            </Box>

            <TabPanel value={status} index={0}>
                <Button fullWidth onClick={handleReadAllClick}>Mark all notifications as read</Button>
                <EnumNotifications/>
            </TabPanel>
        
            <TabPanel value={status} index={1}>
                <Button fullWidth onClick={handleDeleteAllClick}>Delete all read notifications</Button>
                <EnumNotifications/>
            </TabPanel>
        </Box>
    );
}

export default NotificationsContainer;