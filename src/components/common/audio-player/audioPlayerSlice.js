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
            .addCase(createComment.fulfilled, (state, action) => {
                if (state.currentTrack) {
                    console.log(action.payload.data.comment)
                    const track = JSON.parse(JSON.stringify(current(state.currentTrack)));
                    const comment = action.payload.data.comment;
                    const commentId = comment._id;
                    const postId = comment.post;

                    if (track.base._id === postId) {
                        // if not a reply
                        if (!comment?.isReply) {
                            if (track.base.comments.indexOf(commentId) === -1) {
                                track.base.comments.push(commentId);
                            } else {
                                track.base.comments = track.base.comments.filter(id => id !== commentId);
                            }
                        }
                        // if reply 
                        else {
                            const isReplyTo = comment.isReplyTo;
                            track.comments = track.base.comments.map(item => {
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
                }
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
