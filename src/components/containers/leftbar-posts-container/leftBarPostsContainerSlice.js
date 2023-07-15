import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { httpGetPostsByTitle } from "../../../requests/posts";


const initialState = {
    isLoading: true,
    postsData: null,
}

export const fetchPostsByTitle = createAsyncThunk(
    'left-bar-posts-container/fetch',
    async(query) => {
        return await httpGetPostsByTitle(query);
    }
);


const leftBarPostsContainer = createSlice({
    name: 'left-bar-posts-container',
    initialState: initialState,
    reducers: {
        setIsLoading: (state, action) => {
            state.isLoading = action.payload;
        },
        setPostsData: (state, action) => {
            state.postsData = action.payload;
        }
    }, 
    extraReducers: (builder) => {
        builder
            .addCase(fetchPostsByTitle.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchPostsByTitle.rejected, (state) => {
                state.isLoading = false;
            })
            .addCase(fetchPostsByTitle.fulfilled, (state, action) => {
                state.isLoading = false;
                state.postsData = action.payload.data.posts;
            })
    }
});


const {reducer, actions} = leftBarPostsContainer;

export default reducer;
export const  {
    setIsLoading,
    setPostsData,
} = actions;
