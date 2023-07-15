const { createSlice } = require("@reduxjs/toolkit")

const initialState = {
    searchQuery: "",
}


const rightBarUsersSlice = createSlice({
    name: 'right-bar-users',
    initialState: initialState,
    reducers: {
        setSearchQuery: (state, action) => {
            state.searchQuery = action.payload;
        }
    }
});


const {reducer, actions} = rightBarUsersSlice;

export default reducer;
export const {
    setSearchQuery,
} = actions;