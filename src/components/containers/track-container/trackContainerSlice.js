import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit"
import { switchPostLike, switchPostInSaved } from "../posts-container/postsContainerSlice";
import { httpGetPostById } from "../../../requests/posts";
import { createComment } from "../comments-container/commentsContainerSlice";

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
            .addCase(createComment.fulfilled, (state, action) => {
                if (state.inspectingPost) {
                    const commentId = action.payload.data.comment._id;
                    const postId = action.payload.data.comment.post;

                    const post = JSON.parse(JSON.stringify(current(state.inspectingPost)));
                    if (post._id === postId) {
                        if (post.comments.indexOf(commentId) === -1) {
                            post.comments.push(commentId);
                        } else {
                            post.comments = post.comments.filter(id => id !== commentId);
                        }
                    }
                    state.inspectingPost = post;
                }
            })
    }
});

const {reducer, actions} = trackContainer;

export default reducer;
export const {
    setInspectingPost,
} = actions;
