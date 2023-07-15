const { createSlice } = require("@reduxjs/toolkit")

const initialState = {
    searchQuery: "",
}


const leftBarPostsSlice = createSlice({
    name: 'left-bar-posts',
    initialState: initialState,
    reducers: {
        setSearchQuery: (state, action) => {
            state.searchQuery = action.payload;
        }
    }
});


const {reducer, actions} = leftBarPostsSlice;

export default reducer;
export const {
    setSearchQuery,
} = actions;