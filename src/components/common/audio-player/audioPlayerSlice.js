import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    isShowing: false,
    src: "",
    isPlaying: false,
    isMuted: false,
    loop: false,
    controlsLocked: true,
    isLoading: false,
    currentTrack: null,
}

const audioPlayerSlice = createSlice({
    name: 'audio-player',
    initialState: initialState,
    reducers: {
        setIsShowing: (state, action) => {
            state.isShowing = action.payload;
        },
        setSrc: (state, action) => {
            state.src = action.payload;
        },
        setIsPlaying: (state, action) => {
            state.isPlaying = action.payload;
        },
        setIsMuted: (state, action) => {
            state.isMuted = action.payload;
        },
        setLoop: (state, action) => {
            state.loop = action.payload;
        },
        setControlsLocked: (state, action) => {
            state.controlsLocked = action.payload;
        },
        setIsLoading: (state, action) => {
            state.isLoading = action.payload;
        },
        setCurrentTrack: (state, action) => {
            state.currentTrack = action.payload;
        }
    }
});

const {reducer, actions} = audioPlayerSlice;

export default reducer;
export const {
    setIsShowing,
    setSrc,
    setIsPlaying,
    setIsMuted,
    setLoop,
    setControlsLocked,
    setIsLoading,
    setCurrentTrack,
} = actions;
