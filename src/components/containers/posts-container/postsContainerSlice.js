import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    posts: [],
    isLoading: true,
    maxCountPerPage: 12,
    maxPage: 1,
    activePage: 1,
    error: null,
}


const postsContainerSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        setPosts: (state, action) => {
            state.posts = action.payload;
        },
        setIsLoading: (state, action) => {
            state.isLoading = action.payload;
        },
        setMaxCountPerPage: (state, action) => {
            state.maxCountPerPage = action.payload;
        },
        setMaxPage: (state, action) => {
            state.maxPage = action.payload;
        },
        setActivePage: (state, action) => {
            state.activePage = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
        },
    },
});

const { actions, reducer } = postsContainerSlice;

export default reducer;
export const {
    setPosts,
    setIsLoading,
    setMaxCountPerPage,
    setMaxPage,
    setActivePage,
    setError,
} = actions;
