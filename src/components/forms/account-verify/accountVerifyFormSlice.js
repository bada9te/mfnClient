import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { httpGetUserById, httpVerifyAccount } from "../../../requests/users";

const initialState = {
    actionIsValid: false,
    isLoading: true,
    code: '',
}

export const checkUserVerifyById = createAsyncThunk(
    'account-verify-form/validate',
    async(userId) => {
        return await httpGetUserById(userId);
    }
);

export const verifyAccount = createAsyncThunk(
    'account-verify-form/verify',
    async({userId, actionId, verifyToken}) => {
        return await httpVerifyAccount(userId, actionId, verifyToken);
    }
);

const accountVerifyFormSlice = createSlice({
    name: 'account-restore-form',
    initialState: initialState,
    extraReducers: builder => {
        builder
            // verify
            .addCase(checkUserVerifyById.fulfilled, (state, action) => {
                state.isLoading = false;
                if (action.payload.data.done && !action.payload.data.user.verified) {
                    state.actionIsValid = true;
                } else {
                    state.actionIsValid = false;
                }
            })
            .addCase(checkUserVerifyById.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(checkUserVerifyById.rejected, (state) => {
                state.isLoading = false;
            })

            // restore
            .addCase(verifyAccount.fulfilled, (state, action) => {
                state.isLoading = false;
                //console.log(action.payload.data)
            })
            .addCase(verifyAccount.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(verifyAccount.rejected, (state) => {
                state.isLoading = false;
            })
    }
});

const {reducer} = accountVerifyFormSlice;

export default reducer;