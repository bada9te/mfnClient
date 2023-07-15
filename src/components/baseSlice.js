import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import { httpLogin } from "../requests/auth";
import { httpGetUserById } from "../requests/users";
import { handleSubscribtion } from "./common/profile/profile-card/profileCardSlice";
import notificationsContainerSlice from "./containers/notifications-container/notificationsContainerSlice";

const initialState = {
    user: {
        _id: '',
        email: '',
        nickname: '',
        description: '',
        aboutMe: '',
        phone: '',
        avatar: '',
        background: '',
        subscribers: [],
        subscribedOn: [],
        notifications: [],
    },
    theme: JSON.parse(localStorage.getItem('mfnCurrentUser'))?.theme || 'light',
    locations: {
        images: `${process.env.REACT_APP_API_URL}/uploads/images`,
        audios: `${process.env.REACT_APP_API_URL}/uploads/audios`,
        others: `${process.env.REACT_APP_API_URL}/uploads/others`,
    },
};

export const login = createAsyncThunk(
    'base/login',
    async(data) => {
        try {
            return await httpLogin(data);
        } catch (err) {
            throw new Error(err.response.data.error)
        }
    }
);

export const id = createAsyncThunk(
    'base/id',
    async(id) => {
        return await httpGetUserById(id);
    }
);

const baseSlice = createSlice({
    name: 'base',
    initialState: initialState,
    reducers: {
        init: (state, action) => { 
            state.base = action.payload; 
        },
        updateUser: (state, action) => {
            state.user = action.payload;
        },
        logoutUser: (state) => {
            state.user = null;
        },
        updateLocations: (state, action) => {
            state.locations = action.payload;
        },
        setTheme: (state, action) => {
            state.theme = action.payload;
        },
        setCurrenUserIsFollowedOn: (state, action) => {
            state.user.following = action.payload;
        },
        updatePartOfUser: (state, action) => {
            state.user[action.payload.what] = action.payload.value;
        },
        addOrRemoveNotificationId: (state, action) => {
            const id = action.payload;
            const notifications = JSON.parse(JSON.stringify(current(state.user.notifications)));

            if (!notifications.includes(id)) {
                state.user.notifications.push(id);
            } else {
                notifications.splice(notifications.indexOf(id), 1);
                state.user.notifications = notifications;
            }
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.fulfilled, (state, action) => {
                if (action.payload.data.user.verified) {
                    state.user = action.payload.data.user;
                }
            })
            .addCase(id.fulfilled, (state, action) => {
                state.user = action.payload.data.user;
            })

            // subscribe on user handllers
            .addCase(handleSubscribtion.fulfilled, (state, action) => {
                const profileOwnerId = action.meta.arg.profileOwnerId;
                const user = JSON.parse(JSON.stringify(state.user));

                if (!user.subscribedOn.includes(profileOwnerId)) {
                    user.subscribedOn.push(profileOwnerId);
                } else {
                    user.subscribedOn.splice(user.subscribedOn.indexOf(profileOwnerId), 1)
                }

                state.user = user;
            })
    }
})


const { actions, reducer } = baseSlice;

export default reducer;
export const {
    init,
    updateUser,
    logoutUser,
    updateLocations,
    setTheme,
    setCurrenUserIsFollowedOn,
    updatePartOfUser,
    addOrRemoveNotificationId,
} = actions;
