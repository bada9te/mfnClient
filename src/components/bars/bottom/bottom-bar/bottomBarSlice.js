import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    showRB: false,
    showLB: false,
    showAduioPlayer: false,
    value: '',
}

const bottomBarSlice = createSlice({
    name: 'bottom-bar',
    initialState: initialState,
    reducers: {
        setShowRB: (state, action) => {
            state.showRB = action.payload;
        },
        setShowLB: (state, action) => {
            state.showLB = action.payload;
        },
        setShowAudioPlayer: (state, action) => {
            state.showAduioPlayer = action.payload;
        },
        setValue: (state, action) => {
            state.value = action.payload;
        }
    }
});


const {reducer, actions} = bottomBarSlice;

export default reducer;
export const {
    setShowLB,
    setShowRB,
    setShowAudioPlayer,
    setValue
} = actions;