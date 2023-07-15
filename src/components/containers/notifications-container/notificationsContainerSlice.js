import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit"
import { httpCreateNotification, httpDeleteNotifcation, httpGetAllNotificationsWithReceiverId } from "../../../requests/notifications";

const initialState = {
    isLoading: false,
    notifications: [],
}

export const fetchNotifications = createAsyncThunk(
    'notifications-container/fetch',
    async(_, thunkApi) => {
        const userId = thunkApi.getState().base.user._id;
        return await httpGetAllNotificationsWithReceiverId(userId);
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
    },
    extraReducers: (builder) => {
        builder
            // fetch
            .addCase(fetchNotifications.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchNotifications.rejected, (state) => {
                state.isLoading = false;
                state.notifications = [];
            })
            .addCase(fetchNotifications.fulfilled, (state, action) => {
                const notifications = action.payload.data.notifications;
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
            });
    }
});

const {reducer, actions} = notificationsContainerSlice;

export default reducer;
export const {
    setIsLoading,
    addNotification,
    removeNotificationById,
} = actions;
