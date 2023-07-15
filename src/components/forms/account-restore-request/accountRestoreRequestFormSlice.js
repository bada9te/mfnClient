import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { httpPrepareAccountToRestore } from "../../../requests/users";

const initialState = {
    isLoading: false,
    user: null,
}

export const prepareToRestore = createAsyncThunk(
    'account-restore-request/prepare',
    async({email, type}) => {
        return await httpPrepareAccountToRestore(email, type);
    }
);

const accountRestoreRequestFormSlice = createSlice({
    name: 'account-restore-request',
    initialState: initialState,
    extraReducers: builder => {
        builder
            .addCase(prepareToRestore.fulfilled, (state, action) => {
                state.isLoading = false;
                if (action.payload.data.done) {
                    state.user = action.payload.data.user;
                }
            })
            .addCase(prepareToRestore.rejected, (state) => {
                state.isLoading = false;
            })
    }
});

const {reducer, actions} = accountRestoreRequestFormSlice;

export default reducer;