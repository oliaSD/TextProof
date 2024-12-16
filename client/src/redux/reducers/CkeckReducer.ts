import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { Check } from '../interface/Check';



const initialState: CheckState = {
    isLoading: false,
    checks: []
}

export interface CheckState {
    isLoading: boolean,
    checks: Check[],
}


export const headers = {
    "Content-Type": "application/json",

};

export const checkSlice = createSlice({
    name: "check",
    initialState,
    reducers: {
        add: (state, action: PayloadAction<Check>) => {
            state.checks.push(action.payload)
        },
        update: (state, action: PayloadAction<Check>) => {
            let c = state.checks.find(check => check.paperId === action.payload.paperId)
            // = action.payload.percentage
        },
        set: (state, action: PayloadAction<Check[]>) => {
            state.checks = action.payload
        },
        updatePercentage: (state, action: PayloadAction<Check[]>) => {
            state.checks = action.payload
            // state.checks.forEach(check => {
            //     check.percentage = action.payload.find(e => e.paperId === check.paperId)?.percentage!
            // })
        },

    },
})

export const { add, update, set,updatePercentage } = checkSlice.actions
export default checkSlice.reducer