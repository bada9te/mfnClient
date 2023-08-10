import { createSlice, current } from "@reduxjs/toolkit"
import { createComment } from "../../containers/comments-container/commentsContainerSlice";
import { switchPostInSaved, switchPostLike } from "../../containers/posts-container/postsContainerSlice";

const initialState = {
    isShowing: false,
    src: "",
    isPlaying: false,
    isMuted: false,
    loop: false,
    controlsLocked: true,
    isLoading: false,
    currentTrack: null,
}

const audioPlayerSlice = createSlice({
    name: 'audio-player',
    initialState: initialState,
    reducers: {
        setIsShowing: (state, action) => {
            state.isShowing = action.payload;
        },
        setSrc: (state, action) => {
            state.src = action.payload;
        },
        setIsPlaying: (state, action) => {
            state.isPlaying = action.payload;
        },
        setIsMuted: (state, action) => {
            state.isMuted = action.payload;
        },
        setLoop: (state, action) => {
            state.loop = action.payload;
        },
        setControlsLocked: (state, action) => {
            state.controlsLocked = action.payload;
        },
        setIsLoading: (state, action) => {
            state.isLoading = action.payload;
        },
        setCurrentTrack: (state, action) => {
            state.currentTrack = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(switchPostLike.fulfilled, (state, { meta }) => {
                console.log(meta.arg)
                if (state.currentTrack) {
                    const track = JSON.parse(JSON.stringify(current(state.currentTrack)));
                    const postId = meta.arg.postId;
                    const userId = meta.arg.userId;
    
                    if (track.id === postId) {
                        if (track.likedBy.indexOf(userId) === -1) {
                            track.likedBy.push(userId);
                        } else {
                            track.likedBy = track.likedBy.filter(id => id !== userId);
                        }
                    }
    
                    state.currentTrack = track;
                }
            })
            .addCase(switchPostInSaved.fulfilled, (state, { meta }) => {
                const track = JSON.parse(JSON.stringify(current(state.currentTrack)));
                const postId = meta.arg.postId;
                const userId = meta.arg.userId;

                if (track.id === postId) {
                    if (track.savedBy.indexOf(userId) === -1) {
                        track.savedBy.push(userId);
                    } else {
                        track.savedBy = track.savedBy.filter(id => id !== userId);
                    }
                }

                state.currentTrack = track;
            })
            .addCase(createComment.fulfilled, (state, { meta }) => {
                const track = JSON.parse(JSON.stringify(current(state.currentTrack)));
                const comment = meta.comment;
                const commentId = comment._id;
                const postId = comment.post;

                if (track.id === postId) {
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
                        const isReplyTo = comment.isReplyTo;
                        track.comments = track.comments.map(item => {
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
                    
                state.currentTrack = track;
            })
    }
});

const {reducer, actions} = audioPlayerSlice;

export default reducer;
export const {
    setIsShowing,
    setSrc,
    setIsPlaying,
    setIsMuted,
    setLoop,
    setControlsLocked,
    setIsLoading,
    setCurrentTrack,
} = actions;
