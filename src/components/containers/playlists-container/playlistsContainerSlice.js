import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { httpGetPlaylistsByOwner } from "../../../requests/playlists";

const initialState = {
    playlists: [],
    isLoading: true,
}


export const fetchCurrentUserPlaylists = createAsyncThunk(
    'playlists-container/fetch',
    async(_, thunkApi) => {
        const userId = thunkApi.getState().base.user._id;
        return await httpGetPlaylistsByOwner(userId);
    }
);


const playlistsContainerSlice = createSlice({
    name: 'playlists-container',
    initialState,
    reducers: {
        setPlaylists: (state, action) => {
            state.playlists = action.payload;
        },
        setIsLoading: (state, action) => {
            state.isLoading = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            // fetch user playlists
            .addCase(fetchCurrentUserPlaylists.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchCurrentUserPlaylists.rejected, (state) => {
                state.playlists = [];
                state.isLoading = false;
            })
            .addCase(fetchCurrentUserPlaylists.fulfilled, (state, action) => {
                console.log(action.payload);
                state.playlists = action.payload.data.playlists;
                state.isLoading = false;
            })
    }
    
});

const {reducer, actions} = playlistsContainerSlice;

export default reducer;
export const {
    setPlaylists,
    setIsLoading,
} = actions;
