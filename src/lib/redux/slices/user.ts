import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export interface IUserState {
    user?: {
        _id: string;
        avatar: string;
        background: string;
        createdAt: string;
        description: string;
        local?: {
            email: string;
            password: string;
        };
        facebook?: {
            id: string;
            token: string;
            name: string;
        };
        twitter?: {
            id: string;
            token: string;
            name: string;
        };
        google?: {
            id: string;
            token: string;
            email: string;
            name: string;
        };
        nick: string;
        subscribedOn: string[];
        subscribers: string[];
        updatedAt: string;
        verified: boolean;
    };
    unreadNotifications: number;
}

const initialState: IUserState = {
    user: undefined,
    unreadNotifications: 0,
};

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<IUserState["user"]>) => {
            state.user = action.payload;
        },
        setUserAvatar: (state, action) => {
            state.user && (state.user.avatar = action.payload);
        },
        setUserBackground: (state, action) => {
            state.user && (state.user.background = action.payload);
        },
        setUnreadNotificationsCount: (state, action) => {
            state.unreadNotifications = action.payload;
        }
    }
});

export const { 
    setUser, 
    setUserAvatar, 
    setUserBackground, 
    setUnreadNotificationsCount
} = userSlice.actions;
export default userSlice.reducer;