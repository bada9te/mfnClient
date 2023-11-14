import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit"
import { httpGetPlaylistsByOwner, httpGetPublicAvailablePlaylists, httpSwitchTrackInPlaylist } from "../../../requests/playlists";
import { createComment } from "../comments-container/commentsContainerSlice";
import { switchPostInSaved, switchPostLike } from "../posts-container/postsContainerSlice";

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

            .addCase(createComment.fulfilled, (state, action) => {
                const plData = current(state.playlists);

                if (plData.length > 0) {
                    const playlists = JSON.parse(JSON.stringify(plData));
                    const comment = action.payload.data.comment;
                    const commentId = comment._id;
                    const postId = comment.post;

                    playlists.forEach(playlist => {
                        const index = playlist.tracks.map(i => i._id).indexOf(postId);
                        if (index !== -1) {
                            const track = playlist.tracks[index];

                            // if not a reply
                            if (!comment?.isReply) {
                                if (track.comments.indexOf(commentId) === -1) {
                                    track.comments.push(commentId);
                                } else {
                                    track.comments = track.comments.filter(id => id !== commentId);
                                }
                            }
                            // if reply 
                            else {
                                const commentIndex = track.comments.map(i => i._id).indexOf(comment.isReplyTo);
                                
                                if (commentIndex !== -1) {
                                    const trackComment = track.comments[commentIndex];

                                    if (trackComment.replies.indexOf(commentId) === -1) {
                                        trackComment.replies.push(commentId);
                                    } else {
                                        trackComment.replies = trackComment.replies.filter(id => id !== commentId);
                                    }
                                }
                            }

                            state.playlists = playlists;
                        }
                    });
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
