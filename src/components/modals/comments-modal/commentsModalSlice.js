import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    isShowing: false,
}


const commentsModalSlice = createSlice({
    name: 'comments-modal-slice',
    initialState: initialState,
    reducers: {
        setIsShowing: (state, action) => {
            state.isShowing = action.payload;
        },
    },
});


const {reducer, actions} = commentsModalSlice;

export default reducer;
export const {
    setIsShowing,
} = actions;