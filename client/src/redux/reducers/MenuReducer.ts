import { PayloadAction, createSlice } from '@reduxjs/toolkit'

const initialState: MenuState = {
    isLoading: false,
    menuKey: 'file'
}

export interface MenuState {
    isLoading: boolean,
    menuKey: MenyKeyType,
}

export type MenyKeyType = 'file' | 'check' | 'grammar' | 'analytic' | 'report' | 'account' | 'group'


export const headers = {
    "Content-Type": "application/json",

};

export const menuSlice = createSlice({
    name: "menu",
    initialState,
    reducers: {
        select: (state, action: PayloadAction<MenyKeyType>) => {
            state.menuKey = action.payload
        },

    },
})

export const { select } = menuSlice.actions
export default menuSlice.reducer