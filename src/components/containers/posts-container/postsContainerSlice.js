import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import { httpGetAllPostsWithOwnerId, httpGetUserSavedPosts, httpGetAllPosts, httpSwitchLike, httpSwitchPostInSaved } from "../../../requests/posts";
import { createComment } from "../comments-container/commentsContainerSlice";


const initialState = {
    posts: [],
    isLoading: true,
}

export const fetchPosts = createAsyncThunk(
    'posts/fetch',
    async({activePage, payload, type}, thunkApi) => {
        let skipCount = (activePage - 1) * 12;
        switch (type) {
            case "all":
                return await httpGetAllPosts(skipCount);
            case "savedOnly":
                return await httpGetUserSavedPosts(payload, skipCount);
            case "byOwnerId":
                return await httpGetAllPostsWithOwnerId(payload, skipCount);
            default: 
                break;
        }
    }
);

export const switchPostLike = createAsyncThunk(
    'posts/switch-like',
    async({postId, userId}, thunkApi) => {
        return await httpSwitchLike(userId, postId);
    }
);

export const switchPostInSaved = createAsyncThunk(
    'posts/switch-save',
    async({postId, userId}, thunkApi) => {
        return await httpSwitchPostInSaved(userId, postId);
    }
);




const postsContainerSlice = createSlice({
    name: 'posts',
    initialState: initialState,
    reducers: {
        setPosts: (state, action) => {
            state.posts = action.payload;
        },
        setIsLoading: (state, action) => {
            state.isLoading = action.payload;
        },
        updateCommentsSocket: (state, action) => {
            const posts = JSON.parse(JSON.stringify(current(state.posts)));
            const comment = action.payload.comment;
            const commentId = comment._id;

            //console.log('New comment', commentId)
            posts.forEach(item => {
                if (item._id === action.payload.comment.post) {
                    // if not a reply
                    if (!comment?.isReply) {
                        if (item.comments.indexOf(commentId) === -1) {
                            item.comments.push(commentId);
                        } else {
                            item.comments = item.comments.filter(id => id !== commentId);
                        }
                    }
                    // if reply 
                    else {
                        const isReplyTo = comment.isReplyTo;
                        item.comments = item.comments.map(item => {
                            if (item._id === isReplyTo) {
                                if (item.replies.indexOf(commentId) === -1) {
                                    item.replies.push(commentId);
                                } else {
                                    item.replies = item.replies.filter(id => id !== commentId);
                                }
                                return item;
                            }
                            return item;
                        });
                    }
                }
            });
            state.posts = posts;
        },
        updateLikesSocket: (state, action) => {
            const posts = JSON.parse(JSON.stringify(current(state.posts)));
            posts.forEach(item => {
                if (item._id === action.payload.postId) {
                    if (item.likedBy.indexOf(action.payload.userId) === -1) {
                        item.likedBy.push(action.payload.userId);
                    } else {
                        item.likedBy = item.likedBy.filter(id => id !== action.payload.userId);
                    }
                }
            });
            state.posts = posts;
        },
        updateSavesSocket: (state, action) => {
            const posts = JSON.parse(JSON.stringify(current(state.posts)));
            posts.forEach(item => {
                if (item._id === action.payload.postId) {
                    if (item.savedBy.indexOf(action.payload.userId) === -1) {
                        item.savedBy.push(action.payload.userId);
                    } else {
                        item.savedBy = item.savedBy.filter(id => id !== action.payload.userId);
                    }
                }
            });
            state.posts = posts;
        }
    },
    extraReducers: (builder) => {
        builder
            // default fetch
            .addCase(fetchPosts.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchPosts.rejected, (state) => {
                state.posts = [];
                state.isLoading = false;
            })
            .addCase(fetchPosts.fulfilled, (state, action) => {
                state.posts = action.payload.data.posts;
                state.isLoading = false;
            }) 

            // add or remove like
            .addCase(switchPostLike.fulfilled, (state, { meta }) => {
                postsContainerSlice.caseReducers.updateLikesSocket(state, { payload: meta.arg });
            })
            
            // switch in saved
            .addCase(switchPostInSaved.fulfilled, (state, { meta }) => {
                postsContainerSlice.caseReducers.updateSavesSocket(state, { payload: meta.arg });
            })

            // comment added
            .addCase(createComment.fulfilled, (state, action) => {
                postsContainerSlice.caseReducers.updateCommentsSocket(state, { payload: action.payload.data });
            })
    }
})

const { actions, reducer } = postsContainerSlice;

export default reducer;
export const {
    setPosts,
    setIsLoading,
    setCurrentPage,
    updateLikesSocket,
    updateSavesSocket,
    updateCommentsSocket,
} = actions;
