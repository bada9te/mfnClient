import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit"
import { httpCreateBattle } from "../../../requests/battles";


const initialState = {
    title: "title",
    post1: null,
    post2: null,
}

export const createBattle = createAsyncThunk(
    'create-battle-form/create',
    async(_, thunkApi) => {
        const currentState = thunkApi.getState();
        const title = currentState.createBattleForm.title;
        const post1Id = currentState.createBattleForm.post1.base._id;
        const post2Id = currentState.createBattleForm.post2.base._id;

        return await httpCreateBattle(title, post1Id, post2Id);
    }
);

const createBattleFormSlice = createSlice({
    name: 'create-battle-form',
    initialState: initialState,
    reducers: {
        setTitle: (state, action) => {
            state.title = action.payload;
        },
        setPost1: (state, action) => {
            state.post1 = action.payload;
        },
        setPost2: (state, action) => {
            state.post2 = action.payload;
        }
    },
});

const {reducer, actions} = createBattleFormSlice;

export default reducer;
export const {
    setTitle,
    setPost1,
    setPost2,
} = actions;