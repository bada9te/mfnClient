import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export interface IUserState {
    user: {
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
            email: string;
            name: string;
        };
        twitter?: {
            id: string;
            token: string;
            email: string;
            displayName: string;
            username: string;
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
    } | null;
}

const initialState: IUserState = {
    user: null,
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
        }
    }
});

export const { setUser, setUserAvatar, setUserBackground } = userSlice.actions;
export default userSlice.reducer;