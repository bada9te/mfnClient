import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { httpCancelAction, httpValidateAction } from "../../../requests/moderations";
import { httpRestoreAccount } from "../../../requests/users";

const initialState = {
    actionIsValid: false,
    isLoading: true,
}

export const checkUserVerifyTokenById = createAsyncThunk(
    'account-restore-form/validate',
    async({userId, actionId, verifyToken, type}) => {
        return await httpValidateAction(userId, actionId, verifyToken, type);
    }
);

export const restoreAccount = createAsyncThunk(
    'account-restore-form/restore',
    async({userId, actionId, verifyToken, newValue, type}) => {
        return await httpRestoreAccount(userId, actionId, verifyToken, newValue, type);
    }
);

export const cancelAccountRestoring = createAsyncThunk(
    'account-restore-form/cancel',
    async({userId, actionId, verifyToken, type}) => {
        return await httpCancelAction(userId, actionId, verifyToken, type);
    }
)

const accountRestoreFormSlice = createSlice({
    name: 'account-restore-form',
    initialState: initialState,
    extraReducers: builder => {
        builder
            // verify
            .addCase(checkUserVerifyTokenById.fulfilled, (state, action) => {
                state.isLoading = false;
                if (action.payload.data.done && action.payload.data.action) {
                    state.actionIsValid = true;
                } else {
                    state.actionIsValid = false;
                }
            })
            .addCase(checkUserVerifyTokenById.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(checkUserVerifyTokenById.rejected, (state) => {
                state.isLoading = false;
            })

            // restore
            .addCase(restoreAccount.fulfilled, (state, action) => {
                state.isLoading = false;
            })
            .addCase(restoreAccount.pending, (state, action) => {
                state.isLoading = true;
            })
            .addCase(restoreAccount.rejected, (state, action) => {
                state.isLoading = false;
            })
    }
});

const {reducer} = accountRestoreFormSlice;

export default reducer;