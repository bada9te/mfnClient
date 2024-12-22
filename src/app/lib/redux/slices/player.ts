import {Post} from "@/app/utils/graphql-requests/generated/schema";
import {createSlice} from "@reduxjs/toolkit";

export interface IPlayerSlice {
    isPlaying: boolean;
    isLoop: boolean;
    isMute: boolean;
    volume: number;
    post: Post | null;
}


const initialState: IPlayerSlice = {
    isPlaying: false,
    isLoop: false,
    isMute: false,
    volume: 0.3,
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
        },
        setVolume: (state, action) => {
            state.volume = action.payload;
        }
    },
});

export const {
    setIsPlaying,
    setPost,
    setIsLoop,
    setIsMute,
    setVolume,
} = playerSlice.actions;
export default playerSlice.reducer;
