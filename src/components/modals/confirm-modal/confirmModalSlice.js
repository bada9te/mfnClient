import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    isShowing: false,
}




const confirmModalSlice = createSlice({
    name: 'confirm-modal',
    initialState: initialState,
    reducers: {
        setIsShowing: (state, action) => {
            state.isShowing = action.payload;
        },
    }
});

const {reducer, actions} = confirmModalSlice;

export default reducer;
export const {
    setIsShowing,
} = actions;