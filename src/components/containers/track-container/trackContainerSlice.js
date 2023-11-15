import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit"
import { switchPostLike, switchPostInSaved } from "../posts-container/postsContainerSlice";
import { httpGetPostById } from "../../../requests/posts";

const initialState = {
    inspectingPost: null,
    isLoading: true,
}

export const fetchInspectingPost = createAsyncThunk(
    'track-view/fetch',
    async(trackId) => {
        return await httpGetPostById(trackId);
    }
);


const trackContainer = createSlice({
    name: 'track-view',
    initialState: initialState,
    reducers: {
        setInspectingPost: (state, action) => {
            state.inspectingPost = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchInspectingPost.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchInspectingPost.rejected, (state) => {
                state.isLoading = false;
            })
            .addCase(fetchInspectingPost.fulfilled, (state, action) => {
                state.inspectingPost = action.payload.data.post;
                state.isLoading = false;
            })
    }
});

const {reducer, actions} = trackContainer;

export default reducer;
export const {
    setInspectingPost,
} = actions;
