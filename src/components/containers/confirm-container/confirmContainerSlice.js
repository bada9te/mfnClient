import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    itemId: "",
    title: "",
    text: "",
    actionType: "",
}


const confirmContainerSlice = createSlice({
    name: 'confirm-container',
    initialState: initialState,
    reducers: {
        setItemId: (state, action) => {
            state.itemId = action.payload;
        },
        setTitle: (state, action) => {
            state.title = action.payload;
        },
        setText: (state, action) => {
            state.text = action.payload;
        },
        setActionType: (state, action) => {
            state.actionType = action.payload;
        }
    }
});

const {reducer, actions} = confirmContainerSlice;

export default reducer;
export const {
    setItemId,
    setText,
    setTitle,
    setActionType,
} = actions;