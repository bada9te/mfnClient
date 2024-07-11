import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export interface ICreateCommentState {
    isReplyTo?: string;
}

const initialState: ICreateCommentState = {
    isReplyTo: undefined,
};

export const createCommentSlice = createSlice({
    name: "create-comment",
    initialState,
    reducers: {
        setIsReplyTo: (state, action) => {
            state.isReplyTo = action.payload;
        }
    }
});

export const { setIsReplyTo } = createCommentSlice.actions;
export default createCommentSlice.reducer;