import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { httpDeleteAccount } from "../../../requests/users";

const initialState = {
    picture: null,
    avatarTitle: "Select image",
    backgroundTitle: "Select image",
}


export const deleteAccount = createAsyncThunk(
    'profile-card-form/delete-account', 
    async(_, thunkApi) => {
        const currentUser = thunkApi.getState().base.user;
        return await httpDeleteAccount(currentUser._id);
    }
);


const profileCardFormSlice = createSlice({
    name: 'profile-card-form',
    initialState: initialState,
    reducers: {
        setPicture: (state, action) => {
            state.picture = action.payload;
        },
        setAavatarTitle: (state, action) => {
            state.avatarTitle = action.payload;
        },
        setBackgroundTitle: (state, action) => {
            state.backgroundTitle = action.payload;
        }
    }
});

const {reducer, actions} = profileCardFormSlice;

export default reducer;
export const {
    setPicture,
    setAavatarTitle,
    setBackgroundTitle,
} = actions;