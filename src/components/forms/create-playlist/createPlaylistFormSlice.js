import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { httpCreatePlaylist } from "../../../requests/playlists";


const initialState = {
    title: "title",
    publicAccess: false,
}

export const createPlaylist = createAsyncThunk(
    'create-playlist-form/create',
    async(_, thunkApi) => {
        const currentState = thunkApi.getState();

        return await httpCreatePlaylist(currentState.base.user._id, currentState.createPlaylistForm.title, currentState.createPlaylistForm.publicAccess);
    }
);

const createPlaylistFormSlice = createSlice({
    name: 'create-playlist-form',
    initialState: initialState,
    reducers: {
        setTitle: (state, action) => {
            state.title = action.payload;
        },
        setPublicAccess: (state, action) => {
            state.publicAccess = action.payload;
        }
    },
})

const {reducer, actions} = createPlaylistFormSlice;

export default reducer;
export const {
    setTitle,
    setPublicAccess,
} = actions;