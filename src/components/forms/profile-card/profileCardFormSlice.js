import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    picture: null,
    avatarTitle: "Select image",
    backgroundTitle: "Select image",
}


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