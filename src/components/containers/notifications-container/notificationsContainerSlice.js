import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit"
import { httpCreateNotification, httpDeleteManyNotifcations, httpDeleteNotifcation, httpGetAllReadNotificationsWithReceiverId, httpGetAllUnreadNotificationsWithReceiverId, httpMarkManyNotificationsAsRead, httpMarkNotificationAsRead } from "../../../requests/notifications";

const initialState = {
    isLoading: false,
    notifications: [],
    page: "Unread",
}


export const fetchUnreadNotifications = createAsyncThunk(
    'notifications-container/fetch-unread',
    async(_, thunkApi) => {
        const userId = thunkApi.getState().base.user._id;
        return await httpGetAllUnreadNotificationsWithReceiverId(userId);
    }
);

export const fetchReadNotifications = createAsyncThunk(
    'notifications-container/fetch-unread',
    async(_, thunkApi) => {
        const userId = thunkApi.getState().base.user._id;
        return await httpGetAllReadNotificationsWithReceiverId(userId);
    }
);

export const createNotification = createAsyncThunk(
    'notifications-container/create',
    async(notification, thunkApi) => {
        return await httpCreateNotification(notification);
    }
);

export const deleteNotification = createAsyncThunk(
    'notifications-container/delete',
    async(notificationId, thunkApi) => {
        return await httpDeleteNotifcation(notificationId);
    }
);

export const deleteManyNotifications = createAsyncThunk(
    'notifications-container/delete-many',
    async(ids) => {
        return await httpDeleteManyNotifcations(ids);
    }
);

export const markNotificationAsRead = createAsyncThunk(
    'notificatons-container/mark-as-read',
    async(notificationId, thunkApi) => {
        return await httpMarkNotificationAsRead(notificationId);
    }
);

export const markManyNotificationsAsRead = createAsyncThunk(
    'notificatons-container/mark-many-as-read',
    async(ids) => {
        return await httpMarkManyNotificationsAsRead(ids);
    }
);



const notificationsContainerSlice = createSlice({
    name: 'notifications-container',
    initialState: initialState,
    reducers: {
        setIsLoading: (state, action) => {
            state.isLoading = action.payload;
        },
        addNotification: (state, action) => {
            state.sthIsUnread = true;
            state.notifications.push(action.payload);
        },
        removeNotificationById: (state, action) => {
            const notifications = current(state.notifications);
            const notificationId = action.payload;

            state.notifications = notifications.filter(item => item._id !== notificationId);
        },
        setPage: (state, action) => {
            state.page = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            // fetch
            .addCase(fetchReadNotifications.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchReadNotifications.rejected, (state) => {
                state.isLoading = false;
                state.notifications = [];
            })
            .addCase(fetchReadNotifications.fulfilled, (state, action) => {
                const notifications = action.payload.data?.notifications;
                notifications.forEach((notification) => {
                    if (!notification.checked) {
                        state.sthIsUnread = true;
                    }
                });

                state.isLoading = false;
                state.notifications = notifications;
            })

            // delete
            .addCase(deleteNotification.fulfilled, (state, { meta }) => {
                const notifications = JSON.parse(JSON.stringify(current(state.notifications)));
                const notificationId = meta.arg;

                state.notifications = notifications.filter(notification => notification._id !== notificationId);
            })

            // delete many
            .addCase(markManyNotificationsAsRead.fulfilled, (state, { meta }) => {
                const notifications = JSON.parse(JSON.stringify(current(state.notifications)));
                const notificationIds = meta.arg;

                state.notifications = notifications.filter(notification => !notificationIds.includes(notification._id));
            })

            // mark as read
            .addCase(markNotificationAsRead.fulfilled, (state, { meta }) => {
                const notifications = JSON.parse(JSON.stringify(current(state.notifications)));
                const notificationId = meta.arg;

                state.notifications = notifications.filter(notification => notification._id !== notificationId);
            })

            // mark many as read
            .addCase(deleteManyNotifications.fulfilled, (state, { meta }) => {
                const notifications = JSON.parse(JSON.stringify(current(state.notifications)));
                const notificationIds = meta.arg;

                state.notifications = notifications.filter(notification => !notificationIds.includes(notification._id));
            })
    }
});

const {reducer, actions} = notificationsContainerSlice;

export default reducer;
export const {
    setIsLoading,
    addNotification,
    removeNotificationById,
    setPage,
} = actions;
