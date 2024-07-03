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
            state.post = action.payload;
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
