import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    isShowing: false,
    imageType: "avatar",
}


const commentsModalSlice = createSlice({
    name: 'image-cropper-modal-slice',
    initialState: initialState,
    reducers: {
        setIsShowing: (state, action) => {
            state.isShowing = action.payload;
        },
        setImageType: (state, action) => {
            state.imageType = action.payload;
        }
    },
});


const {reducer, actions} = commentsModalSlice;

export default reducer;
export const {
    setIsShowing,
    setImageType,
} = actions;