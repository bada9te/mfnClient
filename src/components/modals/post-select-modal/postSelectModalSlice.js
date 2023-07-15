import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    isShowing: false,
}


const postSelectModalSlice = createSlice({
    name: 'post-select-modal',
    initialState: initialState,
    reducers: {
        setIsShowing: (state, action) => {
            state.isShowing = action.payload;
        },
    },
});


const {reducer, actions} = postSelectModalSlice;

export default reducer;
export const {
    setIsShowing,
} = actions;
