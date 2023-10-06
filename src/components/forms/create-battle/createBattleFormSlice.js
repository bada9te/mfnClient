import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit"
import { httpCreateBattle } from "../../../requests/battles";
import { switchPostInSaved, switchPostLike } from "../../containers/posts-container/postsContainerSlice";

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
        const post1Id = currentState.createBattleForm.post1._id;
        const post2Id = currentState.createBattleForm.post2._id;

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
    extraReducers: (builder) => {
        builder
            // like or dislike
            .addCase(switchPostLike.fulfilled, (state, { meta }) => {
                let posts = [];

                if (state.post1 !== null) posts.push(current(state.post1));
                if (state.post2 !== null) posts.push(current(state.post2));
                
                posts = JSON.parse(JSON.stringify(posts));

                posts.forEach(item => {
                    if (item.base._id === meta.arg.postId) {
                        if (item.base.likedBy.indexOf(meta.arg.userId) === -1) {
                            item.base.likedBy.push(meta.arg.userId);
                        } else {
                            item.base.likedBy = item.base.likedBy.filter(id => id !== meta.arg.userId);
                        }
                    }
                });

                if (state.post1 !== null) state.post1 = posts[0];
                if (state.post2 !== null) state.post2 = posts[1];
            })

            // switch in saved
            .addCase(switchPostInSaved.fulfilled, (state, { meta }) => {
                let posts = [];

                if (state.post1 !== null) posts.push(current(state.post1));
                if (state.post2 !== null) posts.push(current(state.post2));
                
                posts = JSON.parse(JSON.stringify(posts));
                
                posts.forEach(item => {
                    if (item.base._id === meta.arg.postId) {
                        if (item.base.savedBy.indexOf(meta.arg.userId) === -1) {
                            item.base.savedBy.push(meta.arg.userId);
                        } else {
                            item.base.savedBy = item.base.savedBy.filter(id => id !== meta.arg.userId);
                        }
                    }
                });

                if (state.post1 !== null) state.post1 = posts[0];
                if (state.post2 !== null) state.post2 = posts[1];
            })
    }
})

const {reducer, actions} = createBattleFormSlice;

export default reducer;
export const {
    setTitle,
    setPost1,
    setPost2,
} = actions;