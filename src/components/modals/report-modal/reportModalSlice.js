import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    isShowing: false,
}


const reportModalSlice = createSlice({
    name: 'report-modal',
    initialState: initialState,
    reducers: {
        setIsShowing: (state, action) => {
            state.isShowing = action.payload;
        },
    },
});


const {reducer, actions} = reportModalSlice;

export default reducer;
export const {
    setIsShowing,
} = actions;
