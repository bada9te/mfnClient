import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { httpGetPlaylistsByOwner, httpGetPublicavailablePlaylists } from "../../../requests/playlists";

const initialState = {
    playlists: [],
    isLoading: true,
    page: "Explore",
}


export const fetchCurrentUserPlaylists = createAsyncThunk(
    'playlists-container/fetch',
    async(_, thunkApi) => {
        const userId = thunkApi.getState().base.user._id;
        return await httpGetPlaylistsByOwner(userId);
    }
);

export const fetchPublicAvailablePlaylists = createAsyncThunk(
    'playlists-container/explore',
    async(activePage) => {
        let skipCount = (activePage - 1) * 12;
        return await httpGetPublicavailablePlaylists(skipCount);
    }
)


const playlistsContainerSlice = createSlice({
    name: 'playlists-container',
    initialState,
    reducers: {
        setPlaylists: (state, action) => {
            state.playlists = action.payload;
        },
        setIsLoading: (state, action) => {
            state.isLoading = action.payload;
        },
        setPage: (state, action) => {
            state.page = action.payload;
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
                state.playlists = action.payload.data.playlists;
                state.isLoading = false;
            })

            // fetch public available
            .addCase(fetchPublicAvailablePlaylists.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchPublicAvailablePlaylists.rejected, (state) => {
                state.playlists = [];
                state.isLoading = false;
            })
            .addCase(fetchPublicAvailablePlaylists.fulfilled, (state, action) => {
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
    setPage,
} = actions;