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

                battles.forEach(battle => {
                    if (battle.post1._id === meta.arg.postId) {
                        if (battle.post1.likedBy.indexOf(meta.arg.userId) === -1) {
                            battle.post1.likedBy.push(meta.arg.userId);
                        } else {
                            battle.post1.likedBy = battle.post1.likedBy.filter(id => id !== meta.arg.userId);
                        }
                    } else if (battle.post2._id === meta.arg.postId) {
                        if (battle.post2.likedBy.indexOf(meta.arg.userId) === -1) {
                            battle.post2.likedBy.push(meta.arg.userId);
                        } else {
                            battle.post2.likedBy = battle.post2.likedBy.filter(id => id !== meta.arg.userId);
                        }
                    }
                });
                
                state.battles = battles;
            })
            
            // switch in saved
            .addCase(switchPostInSaved.fulfilled, (state, { meta }) => {
                const battles = JSON.parse(JSON.stringify(current(state.battles)));

                battles.forEach(battle => {
                    if (battle.post1._id === meta.arg.postId) {
                        if (battle.post1.savedBy.indexOf(meta.arg.userId) === -1) {
                            battle.post1.savedBy.push(meta.arg.userId);
                        } else {
                            battle.post1.savedBy = battle.post1.savedBy.filter(id => id !== meta.arg.userId);
                        }
                    } else if (battle.post2._id === meta.arg.postId) {
                        if (battle.post2.savedBy.indexOf(meta.arg.userId) === -1) {
                            battle.post2.savedBy.push(meta.arg.userId);
                        } else {
                            battle.post2.savedBy = battle.post2.savedBy.filter(id => id !== meta.arg.userId);
                        }
                    }
                });
                
                state.battles = battles;
            })

            // comment added
            .addCase(createComment.fulfilled, (state, action) => {
                const battles = JSON.parse(JSON.stringify(current(state.battles)));
                const postId = action.payload.data.comment.post;
                const commentId = action.payload.data.comment._id;

                battles.forEach(battle => {
                    if (battle.post1._id === postId) {
                        if (battle.post1.comments.indexOf(commentId) === -1) {
                            battle.post1.comments.push(commentId);
                        } else {
                            battle.post1.comments = battle.post1.comments.filter(id => id !== commentId);
                        }
                    } else if (battle.post2._id === postId) {
                        if (battle.post2.comments.indexOf(commentId) === -1) {
                            battle.post2.comments.push(commentId);
                        } else {
                            battle.post2.comments = battle.post2.comments.filter(id => id !== commentId);
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
} = actions;
