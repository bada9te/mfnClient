import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { httpGetUsersByNickname } from "../../../requests/users";



const initialState = {
    isLoading: true,
    usersData: [],
}

export const fetchUsersByNick = createAsyncThunk(
    'right-bar-users-container/fetch',
    async(query) => {
        return await httpGetUsersByNickname(query);
    }
);


const rightBarUsersContainer = createSlice({
    name: 'right-bar-users-container',
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
            .addCase(fetchUsersByNick.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchUsersByNick.rejected, (state) => {
                state.isLoading = false;
            })
            .addCase(fetchUsersByNick.fulfilled, (state, action) => {
                state.isLoading = false;
                state.usersData = action.payload.data.users;
            })
    }
});


const {reducer, actions} = rightBarUsersContainer;

export default reducer;
export const  {
    setIsLoading,
    setPostsData,
} = actions;
