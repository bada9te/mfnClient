import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    reportingItemId: null,
}


const reportFormSlice = createSlice({
    name: 'report-form',
    initialState: initialState,
    reducers: {
        setReportingItemId: (state, action) => {
            state.reportingItemId = action.payload;
        }
    }
});


const {reducer, actions} = reportFormSlice;

export default reducer;
export const {
    setReportingItemId,
} = actions;
