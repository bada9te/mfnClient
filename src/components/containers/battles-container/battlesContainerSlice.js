import { httpGetAllBattlesByStatus, httpMakeVote } from "../../../requests/battles";


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
                state.battles = action.payload.data.battles.battles;
                state.isLoading = false;
            })

            // votes
            .addCase(makeVote.fulfilled, (state, { meta }) => {
                battlesContainerSlice.caseReducers.socketAddVote(state, { payload: meta.arg });
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
