import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    isShowing: false,
    
}


const userSelectModalSlice = createSlice({
    name: 'user-select-modal-slice',
    initialState: initialState,
    reducers: {
        setIsShowing: (state, action) => {
            state.isShowing = action.payload;
        },
    },
});


const {reducer, actions} = userSelectModalSlice;

export default reducer;
export const {
    setIsShowing,
} = actions;