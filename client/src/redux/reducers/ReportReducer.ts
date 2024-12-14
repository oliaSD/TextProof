import { PayloadAction, createSlice } from '@reduxjs/toolkit'



const initialState: CheckState = {
    isLoading: false,
    reportId: -1
}

export interface CheckState {
    isLoading: boolean,
    reportId: number,
}


export const headers = {
    "Content-Type": "application/json",

};

export const reportSlice = createSlice({
    name: "report",
    initialState,
    reducers: {
        select: (state, action: PayloadAction<number>) => {
            state.reportId = action.payload
        },

    },
})

export const { select } = reportSlice.actions
export default reportSlice.reducer