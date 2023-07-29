import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    activePage: 1,
    maxPage: 1,
}


const paginationSlice = createSlice({
    name: 'pagination',
    initialState: initialState,
    reducers: {
        setActivePage: (state, action) => {
            state.activePage = action.payload;
        },
        setMaxPage: (state, action) => {
            state.maxPage = action.payload;
        }
    }
});

const { reducer, actions } = paginationSlice;

export default reducer;
export const {
    setActivePage,
    setMaxPage,
} = actions;