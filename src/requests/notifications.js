import axios from "axios";


const API_URL = process.env.REACT_APP_API_URL;

const httpCreateNotification = async(notification) => {
    const response = await axios.post(`${API_URL}/notifications/create`, { 
        notification: notification,
    });
    return response;
}

const httpDeleteNotifcation = async(id) => {
    const response = await axios.post(`${API_URL}/notifications/delete`, {
        id: id,
    });
    return response;
}

const httpMarkNotificationAsRead = async(id) => {
    const response = await axios.post(`${API_URL}/notifications/mark-as-read`, {
        id: id,
    });
    return response;
}

const httpGetAllUnreadNotificationsWithReceiverId = async(id) => {
    const response = await axios.get(`${API_URL}/notifications/get-all-unread`, {
        params: {
            receiverId: id,
        },
    });
    return response;
}

const httpGetAllReadNotificationsWithReceiverId = async(id) => {
    const response = await axios.get(`${API_URL}/notifications/get-all-read`, {
        params: {
            receiverId: id,
        },
    });
    return response;
}

const httpGetAllNotificationsByIds = async(ids) => {
    const response = await axios.get(`${API_URL}/notifications/ids`, {
        params: {
            ids: ids,
        },
    });
    return response;
}


export {
    httpCreateNotification,
    httpDeleteNotifcation,
    httpMarkNotificationAsRead,
    httpGetAllUnreadNotificationsWithReceiverId,
    httpGetAllReadNotificationsWithReceiverId,
    httpGetAllNotificationsByIds,
}