import { httpGetAllBattlesByStatus, httpMakeVote } from "../../../requests/battles";
import { createComment } from "../comments-container/commentsContainerSlice";
import { switchPostInSaved, switchPostLike } from "../posts-container/postsContainerSlice";

const { createSlice, createAsyncThunk, current } = require("@reduxjs/toolkit")



const initialState = {
    battles: [],
    isLoading: true,
    page: "In Progress",
    posts: [],
}

export const fetchBattles = createAsyncThunk(
    'battles/fetch',
    async({activePage, status}) => {
        let skipCount = (activePage - 1) * 12;
        if (status === 0) {
            return await httpGetAllBattlesByStatus("running", skipCount)
        } else {
            return await httpGetAllBattlesByStatus("finished", skipCount)
        }
    }
);

export const makeVote = createAsyncThunk(
    'battles/vote',
    async({battleId, postNScore, voteCount, voterId}) => {
        return await httpMakeVote(battleId, postNScore, voteCount, voterId);
    }
);


const battlesContainerSlice = createSlice({
    name: 'battles',
    initialState: initialState,
    reducers: {
        setBattles: (state, action) => {
            state.battles = action.payload;
        },
        setIsLoading: (state, action) => {
            state.isLoading = action.payload;
        },
        setPage: (state, action) => {
            state.page = action.payload;
        },
        socketAddVote: (state, action) => {
            const battles = JSON.parse(JSON.stringify(current(state.battles)));

            battles.forEach(battle => {
                if (battle._id === action.payload.battleId) {
                    battle[action.payload.postNScore] += 1;
                    battle.votedBy.push(action.payload.voterId);
                }
            });

            state.battles = battles;
        },
        removeFromInProgress: (state, action) => {
            const battles = JSON.parse(JSON.stringify(current(state.battles)));

            state.battles = battles.filter(battle => battle._id !== action.payload);
        }
    },
    extraReducers: (builder) => {
        builder
            // fetch
            .addCase(fetchBattles.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchBattles.rejected, (state) => {
                state.battles = [];
                state.isLoading = false;
            })
            .addCase(fetchBattles.fulfilled, (state, action) => {
                state.battles = action.payload.data.battles;
                state.isLoading = false;
            })

            // votes
            .addCase(makeVote.fulfilled, (state, { meta }) => {
                battlesContainerSlice.caseReducers.socketAddVote(state, { payload: meta.arg });
            })

            // add or remove like
            .addCase(switchPostLike.fulfilled, (state, { meta }) => {
                const battles = JSON.parse(JSON.stringify(current(state.battles)));
                const postId = meta.arg.postId;
                const userId = meta.arg.userId;

                battles.forEach(battle => {
                    if (battle.post1._id === postId || battle.post2._id === postId) {
                        let postNumberStr = battle.post1._id === postId ? "post1" : "post2";

                        if (battle[postNumberStr].likedBy.indexOf(userId) === -1) {
                            battle[postNumberStr].likedBy.push(userId);
                        } else {
                            battle[postNumberStr].likedBy = battle[postNumberStr].likedBy.filter(id => id !== userId);
                        }
                    }
                });
                
                state.battles = battles;
            })
            
            // switch in saved
            .addCase(switchPostInSaved.fulfilled, (state, { meta }) => {
                const battles = JSON.parse(JSON.stringify(current(state.battles)));
                const postId = meta.arg.postId;
                const userId = meta.arg.userId;

                battles.forEach(battle => {
                    if (battle.post1._id === postId || battle.post2._id === postId) {
                        let postNumberStr = battle.post1._id === postId ? "post1" : "post2";

                        if (battle[postNumberStr].savedBy.indexOf(userId) === -1) {
                            battle[postNumberStr].savedBy.push(userId);
                        } else {
                            battle[postNumberStr].savedBy = battle[postNumberStr].savedBy.filter(id => id !== userId);
                        }
                    }
                });
                
                state.battles = battles;
            })

            // comment added
            .addCase(createComment.fulfilled, (state, action) => {
                const battles = JSON.parse(JSON.stringify(current(state.battles)));
                const comment = action.payload.comment;
                const commentId = comment._id;
                const postId = comment.post;
                //console.log('New comment', commentId)

                battles.forEach(battle => {
                    if (battle.post1._id === postId || battle.post2._id === postId) {
                        let postNumberStr = battle.post1._id === postId ? "post1" : "post2";

                        // comment is not a reply
                        if (!comment?.isReply) {
                            if (battle[postNumberStr].comments.indexOf(commentId) === -1) {
                                battle[postNumberStr].comments.push(commentId);
                            } else {
                                battle[postNumberStr].comments = battle[postNumberStr].comments.filter(id => id !== commentId);
                            }
                        } 
                        // comment is a reply
                        else {
                            const isReplyTo = comment.isReplyTo;
                            battle[postNumberStr].comments = battle[postNumberStr].comments.map(item => {
                                if (item._id === isReplyTo) {
                                    item.replies.push(commentId);
                                    return item;
                                }
                                return item;
                            });
                        }
                    }
                });
                
                state.battles = battles;
            })
    }
});

const { reducer, actions } = battlesContainerSlice;

export default reducer;
export const {
    setBattles,
    setIsLoading,
    setPage,
    socketAddVote,
    removeFromInProgress,
} = actions;
