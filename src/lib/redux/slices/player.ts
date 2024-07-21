import {Post} from "@/utils/graphql-requests/generated/schema";
import {createSlice} from "@reduxjs/toolkit";

export interface IPlayerSlice {
    isPlaying: boolean;
    isLoop: boolean;
    isMute: boolean;
    post: Post | null;
}


const initialState: IPlayerSlice = {
    isPlaying: false,
    isLoop: false,
    isMute: false,
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
        },
        setIsMute: (state, action) => {
            state.isMute = action.payload;
        }
    },
});

export const {
    setIsPlaying,
    setPost,
    setIsLoop,
    setIsMute,
} = playerSlice.actions;
export default playerSlice.reducer;
