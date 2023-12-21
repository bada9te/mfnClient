import { Box, Button, Tab, Tabs } from "@mui/material";
import { useEffect, useState } from "react";
import EnumNotifications from "../../enums/enum-notifications";
import { Checklist, MarkAsUnread } from "@mui/icons-material";
import { useLazyQuery, useReactiveVar } from "@apollo/client";
import { baseState } from "../../baseReactive";
import { NOTIFICATIONS_QUERY } from "../../../graphql-requests/notifications";
import { useSnackbar } from "notistack";


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

    const { user: currentUser } = useReactiveVar(baseState);
    const [getNotifications, { data, loading }] = useLazyQuery(NOTIFICATIONS_QUERY, {
        variables: {
            receiverId: currentUser._id,
            checked: status === 0 ? false : true,
        },
        pollInterval: 15000,
    });
    const { enqueueSnackbar } = useSnackbar();

    const handleTabSwitch = (event, key) => {
        setStatus(key);
    }

    const handleDeleteAllClick = () => {
        if (data?.notifications && data?.notifications.length > 0) {
            enqueueSnackbar("Pending...", { autoHideDuration: 1500 });
            /*
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
                    resolve();
                });
            }, {theme});
            */
            console.log("DELETE_ALL");
        }
    }

    const handleReadAllClick = () => {
        if (data?.notifications && data?.notifications.length > 0) {
            enqueueSnackbar("Pending...", { autoHideDuration: 1500 });
            /*
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
                        
                    resolve();
                });
            }, {theme});
            */
            console.log("READ_ALL");
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
                    <Tab icon={<MarkAsUnread/>} label="Unread" id="simple-tab-0" aria-controls="simple-tabpanel-0" />
                    <Tab icon={<Checklist/>} label="Read" id="simple-tab-1" aria-controls="simple-tabpanel-1"/>
                </Tabs>
            </Box>

            <TabPanel value={status} index={0}>
                { !loading && <Button fullWidth onClick={handleReadAllClick}>Mark all notifications as read</Button> }
                <EnumNotifications notifications={data?.notifications || []} loading={loading}/>
            </TabPanel>
        
            <TabPanel value={status} index={1}>
                { !loading && <Button fullWidth onClick={handleDeleteAllClick}>Delete all read notifications</Button> }
                <EnumNotifications notifications={data?.notifications || []} loading={loading}/>
            </TabPanel>
        </Box>
    );
}

export default NotificationsContainer;