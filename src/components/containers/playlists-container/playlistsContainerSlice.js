import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit"
import { httpGetPlaylistsByOwner, httpGetPublicAvailablePlaylists, httpSwitchTrackInPlaylist } from "../../../requests/playlists";


const initialState = {
    playlists: [],
    isLoading: true,
    page: "Explore",
    //targetTrack: null,
    targetPlaylist: null,
}


export const fetchCurrentUserPlaylists = createAsyncThunk(
    'playlists-container/fetch-user-playlists',
    async(activePage, thunkApi) => {
        let skipCount = (activePage - 1) * 12;
        const userId = thunkApi.getState().base.user._id;
        return await httpGetPlaylistsByOwner(userId, skipCount);
    }
);

export const fetchPublicAvailablePlaylists = createAsyncThunk(
    'playlists-container/explore',
    async(activePage) => {
        let skipCount = (activePage - 1) * 12;
        return await httpGetPublicAvailablePlaylists(skipCount);
    }
);

export const switchTrackInPlaylist = createAsyncThunk(
    'playlists-container/switch-track',
    async(track, thunkApi) => {
        const playlistId = thunkApi.getState().playlistsContainer.targetPlaylist;
        return await httpSwitchTrackInPlaylist(playlistId, track.base._id);
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
        },
        setPage: (state, action) => {
            state.page = action.payload;
        },
        setTargetTrack: (state, action) => {
            state.targetTrack = action.payload;
        },
        setTargetPlaylist: (state, action) => {
            state.targetPlaylist = action.payload;
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

            // switch track in playlist
            .addCase(switchTrackInPlaylist.fulfilled, (state, action) => {
                const playlistFromPayload = action.payload.data.playlist;
                const plData = current(state.playlists);

                if (plData.length > 0) {
                    
                    const playlists = JSON.parse(JSON.stringify(plData));
                    const playlistId = playlistFromPayload._id;

                    const playlistIndex = playlists.map(i => i._id).indexOf(playlistId);

                    if (playlistIndex !== -1) {
                        playlists[playlistIndex].tracks = playlistFromPayload.tracks;
                    }

                    state.playlists = playlists;
                }
            })
    }
    
});

const {reducer, actions} = playlistsContainerSlice;

export default reducer;
export const {
    setPlaylists,
    setIsLoading,
    setPage,
    setTargetTrack,
    setTargetPlaylist,
} = actions;
