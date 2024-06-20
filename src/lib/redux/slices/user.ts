import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export interface IUserState {
    user: any;
}

const initialState: IUserState = {
    user: null,
};

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<IUserState>) => {
            state.user = action.payload;
        }
    }
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;