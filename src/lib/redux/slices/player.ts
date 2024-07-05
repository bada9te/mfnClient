import {Post} from "@/utils/graphql-requests/generated/schema";
import {createSlice} from "@reduxjs/toolkit";

export interface IPlayerSlice {
    post: Post | null;
    isLoop: boolean;
    isPlaying: boolean;
}


const initialState: IPlayerSlice = {
    isPlaying: false,
    isLoop: false,
    post: null
};


export const playerSlice = createSlice({
    name: "player",
    initialState,
    reducers: {
        setIsPlaying: (state, action) => {
            state.isPlaying = action.payload;
        },
        setPost: (state, action) => {
            if (action.payload === null) {
                state.post = action.payload;
                state.isPlaying = false;
            } else {
                if (action.payload._id !== state.post?._id) {
                    state.post = action.payload;
                }
                state.isPlaying = true;
            }
        },
        setIsLoop: (state, action) => {
            state.isLoop = action.payload;
        }
    },
});

export const {
    setIsPlaying,
    setPost,
    setIsLoop,
} = playerSlice.actions;
export default playerSlice.reducer;
