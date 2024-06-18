import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export interface IBottomBarState {
    tab: "tracks" | "new-post" | "player" | "people" | null;
}

const initialState: IBottomBarState = {
    tab: null,
};

export const bottomBarSlice = createSlice({
    name: "bottom-bar",
    initialState,
    reducers: {
        setTab: (state, action: PayloadAction<IBottomBarState["tab"]>) => {
            state.tab = action.payload;
        }
    }
});

export const { setTab } = bottomBarSlice.actions;
export default bottomBarSlice.reducer;

