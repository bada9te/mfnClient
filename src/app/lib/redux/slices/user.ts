import { Post } from "@/app/utils/graphql-requests/generated/schema";
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
        likedPosts: string[];
        savedPosts: string[];
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
        },
        switchPostInLiked: (state, action) => {
            const posts = JSON.parse(JSON.stringify(state.user?.likedPosts));

            if (posts.includes(action.payload._id)) {
                state.user && (state.user.likedPosts = posts.filter((i: string) => i !== action.payload._id))
            } else {
                posts.push(action.payload._id);
                state.user && (state.user.likedPosts = posts);
            }
        },
        switchPostInSaved: (state, action) => {
            const posts = JSON.parse(JSON.stringify(state.user?.savedPosts));


            if (posts.includes(action.payload._id)) {
                state.user && (state.user.savedPosts = posts.filter((i: string) => i !== action.payload._id))
            } else {
                posts.push(action.payload._id);
                state.user && (state.user.savedPosts = posts);
            }
        }
    }
});

export const { 
    setUser, 
    setUserAvatar, 
    setUserBackground, 
    setUnreadNotificationsCount,
    switchPostInLiked,
    switchPostInSaved,
} = userSlice.actions;
export default userSlice.reducer;