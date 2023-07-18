import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import { httpAddComment, httpGetAllCommentsWithIds, httpRemoveCommentById } from "../../../requests/comments";


const initialState = {
    commentsData: [],
    commentsIds: [],
    replyingTo: [null, null],
    isLoading: true,
    postId: null,
    postOwnerId: null,
}


export const fetchComments = createAsyncThunk(
    'comments-conatiner/fetch',
    async({postId, commentsIds, postOwnerId}) => {
        return await httpGetAllCommentsWithIds(commentsIds);
    }
);

export const deleteComment = createAsyncThunk(
    'comments-conatiner/deleteComment',
    async(id) => {
        return await httpRemoveCommentById(id);
    }
);

export const createComment = createAsyncThunk(
    'comments-container/createComment',
    async({replyingId, comment, currentUser}) => {
        return await httpAddComment(comment);
    }
)




const commentsContainerSlice = createSlice({
    name: 'comments-container',
    initialState: initialState,
    reducers: {
        setCommentsData: (state, action) => {
            state.commentsData = action.payload;
        },
        setCommentsIds: (state, action) => {
            state.commentsIds = action.payload;
        },
        setReplyingTo: (state, action) => {
            state.replyingTo = [action.payload.commentId, action.payload.commentOwnerNick];
        },
        setIsShowing: (state, action) => {
            state.isShowing = action.payload;
        },
        addComment: (state, action) => {
            let replyingId = action.payload.replyingId;
            let comment = action.payload.comment;

            if (replyingId === null) {
                state.commentsIds.push(comment._id);
                state.commentsData.push(comment);
            } else {
                const commentsData = JSON.parse(JSON.stringify(state.commentsData));
                state.commentsData = commentsData.map((item) => {
                    if (item._id === replyingId) {
                        item.replies.push(comment);
                    }
                    return item;
                })
            }
        },
        setPostId: (state, action) => {
            state.postId = action.payload;
        },
        removeComment: (state, action) => {
            const id = action.payload;
            let commentsData = current(state.commentsData);
            const comment = commentsData.find(item => item._id === id);
            
            if (comment?.isReply) {
                state.commentsData = commentsData.map((item) => {
                    item.replies.filter(item => item._id !== comment._id);
                    return item;
                });
            } else {
                state.commentsIds = current(state.commentsIds).filter(iid => iid !== comment._id);
                state.commentsData = current(state.commentsData).filter(item => item._id !== comment._id);
            }
        }
    },
    extraReducers: (builder) => {
        builder
            // fetch
            .addCase(fetchComments.pending, (state, { meta }) => {
                state.postOwnerId = meta.arg.postOwnerId;
                state.postId = meta.arg.postId;
                state.commentsIds = meta.arg.commentsIds;
                state.isLoading = true;
            })
            .addCase(fetchComments.rejected, (state) => {
                state.isLoading = false;
            })
            .addCase(fetchComments.fulfilled, (state, action) => {
                state.isLoading = false;
                state.commentsData = action.payload.data.comments;
            })

            // remove
            .addCase(deleteComment.fulfilled, (state, { meta }) => {
                commentsContainerSlice.caseReducers.removeComment(state, {payload: meta.arg});
            })

            // create
            .addCase(createComment.fulfilled, (state, action) => {
                const comment = action.payload.data.comment;
                const currentUser = action.meta.arg.currentUser;

                comment.replies = [];
                comment.owner = {
                    _id: currentUser._id, 
                    nick: currentUser.nick, 
                    avatar: currentUser.avatar,
                };

                commentsContainerSlice.caseReducers.addComment(state, {
                    payload: {
                        replyingId: action.meta.arg.replyingId,
                        comment: comment,
                    }
                });
            })
    }
});


const {reducer, actions} = commentsContainerSlice;

export default reducer;
export const {
    setCommentsData,
    setCommentsIds,
    setReplyingTo,
    setIsShowing,
    addComment,
    removeComment,
    setPostId,
} = actions;

