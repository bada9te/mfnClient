import {Post} from "@/utils/graphql-requests/generated/schema";
import {createSlice} from "@reduxjs/toolkit";

export interface IPlayerSlice {
    post: Post | null;
    isPlaying: boolean;
}


const initialState: IPlayerSlice = {
    isPlaying: false,
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
        }
    },
});

export const { setIsPlaying, setPost } = playerSlice.actions;
export default playerSlice.reducer;
