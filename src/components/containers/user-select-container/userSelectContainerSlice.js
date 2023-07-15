import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { httpGetUsersByIds } from "../../../requests/users";



const initialState = {
    users: [],
    isLoading: true,
    selectType: 'postShare',
    sharedItem: null,
}


export const fetchUsers = createAsyncThunk(
    'user-select-contaiiner/fetch',
    async(_, thunkApi) => {
        const subscribersIds = thunkApi.getState().base.user.subscribedOn;
        return await httpGetUsersByIds(subscribersIds);
    }
);


const commentsContainerSlice = createSlice({
    name: 'user-select-container',
    initialState: initialState,
    reducers: {
        setUsers: (state, action) => {
            state.users = action.payload;
        },
        setIsLoading: (state, action) => {
            state.isLoading = action.payload;
        },
        setSelectType: (state, action) => {
            state.selectType = action.payload;
        },
        setSharedItem: (state, action) => {
            state.sharedItem = action.payload;
        }
    },
    extraReducers: builder => {
        builder
            .addCase(fetchUsers.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchUsers.rejected, (state) => {
                state.isLoading = false;
            })
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.users = action.payload.data.users;
                state.isLoading = false;
            });
    }

});


const {reducer, actions} = commentsContainerSlice;

export default reducer;
export const {
    setUsers,
    setIsLoading,
    setSelectType,
    setSharedItem,
} = actions;

