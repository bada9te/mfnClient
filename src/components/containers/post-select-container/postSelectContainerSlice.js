import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit"
import { httpGetPostsByTitle } from "../../../requests/posts";
import { createComment } from "../comments-container/commentsContainerSlice";
import { switchPostInSaved, switchPostLike } from "../posts-container/postsContainerSlice";

const initialState = {
    isMine: true,
    query: "",
    isLoading: false,
    posts: [],
}


export const fetchByTitle = createAsyncThunk(
    'post-select-container/fetchByTitle',
    async(_, thunkApi) => {
        const currentState = thunkApi.getState();
        const currentUserId = currentState.base.user._id;
        const query = currentState.postSelectContainer.query;
        const isMine = currentState.postSelectContainer.isMine;

        return await httpGetPostsByTitle(query, isMine, currentUserId);
    }
);


const postSelectContainerSlice = createSlice({
    name: 'post-select-container',
    initialState: initialState,
    reducers: {
        setIsMine: (state, action) => {
            state.isMine = action.payload;
        },
        setQuery: (state, action) => {
            state.query = action.payload;
        },
        setIsLoading: (state, action) => {
            state.isLoading = action.payload;
        },
        setPosts: (state, action) => {
            state.posts = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            // fetch by title
            .addCase(fetchByTitle.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchByTitle.rejected, (state) => {
                state.isLoading = false;
            })
            .addCase(fetchByTitle.fulfilled, (state, action) => {
                state.posts = action.payload.data.posts;
                state.isLoading = false;
            })

            // add or remove like
            .addCase(switchPostLike.fulfilled, (state, { meta }) => {
                const posts = JSON.parse(JSON.stringify(current(state.posts)));
                posts.forEach(item => {
                    if (item._id === meta.arg.postId) {
                        if (item.likedBy.indexOf(meta.arg.userId) === -1) {
                            item.likedBy.push(meta.arg.userId);
                        } else {
                            item.likedBy = item.likedBy.filter(id => id !== meta.arg.userId);
                        }
                    }
                });
                state.posts = posts;
            })
            
            // switch in saved
            .addCase(switchPostInSaved.fulfilled, (state, { meta }) => {
                const posts = JSON.parse(JSON.stringify(current(state.posts)));
                posts.forEach(item => {
                    if (item._id === meta.arg.postId) {
                        if (item.savedBy.indexOf(meta.arg.userId) === -1) {
                            item.savedBy.push(meta.arg.userId);
                        } else {
                            item.savedBy = item.savedBy.filter(id => id !== meta.arg.userId);
                        }
                    }
                });
                state.posts = posts;
            })

            // comment added
            .addCase(createComment.fulfilled, (state, action) => {
                const posts = JSON.parse(JSON.stringify(current(state.posts)));
                const commentId = action.payload.data.comment._id;
                //console.log('New comment', commentId)
                posts.forEach(item => {
                    if (item._id === action.payload.data.comment.post) {
                        if (item.comments.indexOf(commentId) === -1) {
                            item.comments.push(commentId);
                        } else {
                            item.comments = item.comments.filter(id => id !== commentId);
                        }
                    }
                });
                state.posts = posts;
            })
    }
})

const {reducer, actions} = postSelectContainerSlice;

export default reducer;
export const {
    setIsLoading,
    setIsMine,
    setIsShowing,
    setPosts,
    setQuery,
} = actions;