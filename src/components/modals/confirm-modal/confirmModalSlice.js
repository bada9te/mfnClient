import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    isShowing: false,
    itemId: "",
    text: "",
    actionType: "",
}




const confirmModalSlice = createSlice({
    name: 'confirm-modal',
    initialState: initialState,
    reducers: {
        setIsShowing: (state, action) => {
            state.isShowing = action.payload;
        },
        setItemId: (state, action) => {
            state.itemId = action.payload;
        },
        setText: (state, action) => {
            state.text = action.payload;
        },
        setActionType: (state, action) => {
            state.actionType = action.payload;
        }
    }
});

const {reducer, actions} = confirmModalSlice;

export default reducer;
export const {
    setIsShowing,
    setItemId,
    setText,
    setActionType,
} = actions;