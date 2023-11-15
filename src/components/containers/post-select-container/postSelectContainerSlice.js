import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit"
import { httpGetPostsByTitle, httpGetUserSavedPosts } from "../../../requests/posts";


const initialState = {
    isMine: true,
    selectingFor: "battle",
    initiator: null,
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

export const fetchSavedPosts = createAsyncThunk(
    'post-select-container/fetchSaved',
    async(_, thunkApi) => {
        const currentUserId = thunkApi.getState().base.user._id;

        return await httpGetUserSavedPosts(currentUserId);
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
        },
        setSelectingFor: (state, action) => {
            state.selectingFor = action.payload;
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

            // fetch saved posts
            .addCase(fetchSavedPosts.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchSavedPosts.rejected, (state) => {
                state.isLoading = false;
            })
            .addCase(fetchSavedPosts.fulfilled, (state, action) => {
                state.posts = action.payload.data.posts;
                state.isLoading = false;
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
    setSelectingFor,
} = actions;