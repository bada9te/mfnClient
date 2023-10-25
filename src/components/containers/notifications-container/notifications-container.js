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
    const isLoading = useSelector(state => state.notificationsContainer.isLoading);
    const theme = useSelector(state => state.base.theme);
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
            Alert.alertPromise('Pending...', 'Notifications removed', 'Error occured', () => {
                return new Promise((resolve, reject) => {
                    dispatch(deleteManyNotifications(notifications.map(i => i._id)))
                        .then(unwrapResult)
                        .then(result => {
                            if (result.data.done) {
                                resolve();
                            } else {
                                reject();
                            }
                        });
                });
            }, {theme});
        }
    }

    const handleReadAllClick = () => {
        if (notifications && notifications.length > 0) {
            Alert.alertPromise('Pending...', 'Notifications marked as read', 'Error occured', () => {
                return new Promise((resolve, reject) => {
                    dispatch(markManyNotificationsAsRead(notifications.map(i => i._id)))
                        .then(unwrapResult)
                        .then(result => {
                            if (result.data.done) {
                                resolve();
                            } else {
                                reject();
                            }
                        });
                });
            }, {theme});
        }
    }

    
    useEffect(() => {
        if (currentUserId) {
            if (page === "Unread") dispatch(fetchUnreadNotifications());
            else if (page === "Read") dispatch(fetchReadNotifications());
        }
    }, [dispatch, currentUserId, page]);

    return (
        <Box sx={{width: '100%', height: '100vh'}}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider', mt: 1.2 }}>
                <Tabs value={status} onChange={handleTabSwitch} variant="fullWidth">
                    <Tab icon={<MarkAsUnread/>} label="Unread" id="simple-tab-0" aria-controls="simple-tabpanel-0" />
                    <Tab icon={<Checklist/>} label="Read" id="simple-tab-1" aria-controls="simple-tabpanel-1"/>
                </Tabs>
            </Box>

            <TabPanel value={status} index={0}>
                { !isLoading && <Button fullWidth onClick={handleReadAllClick}>Mark all notifications as read</Button> }
                <EnumNotifications/>
            </TabPanel>
        
            <TabPanel value={status} index={1}>
                { !isLoading && <Button fullWidth onClick={handleDeleteAllClick}>Delete all read notifications</Button> }
                <EnumNotifications/>
            </TabPanel>
        </Box>
    );
}

export default NotificationsContainer;