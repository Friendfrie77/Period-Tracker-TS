import {createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type {previousPeriod} from "../../../types/types";

type localUser = {
    username: string | undefined;
    role: string | undefined;
    token: string | undefined;
    cycle: number | null | undefined;
    avgLength: number | null | undefined;
    periodStartDate: string | null | undefined;
    periodEndDate: string | null | undefined;
    daysTillPeriod: number | null | undefined;
    daysLeftPeriod: number | null | undefined;
    canBleed: boolean | undefined;
    isBleeding: boolean | undefined;
    previousPeriod: previousPeriod| null | undefined;
}

interface localUserState{
    localUser : localUser | null
}

const initialState: localUserState = {
    localUser: null
}

const localUserSlice = createSlice({
    name:'localUserSlice',
    initialState,
    reducers: {
        setLocalLogin: (state, action: PayloadAction<localUser>) =>{
            state.localUser = action.payload
        },
        setLocalToken: (state, action: PayloadAction<string>) =>{
            if(state.localUser){
                state.localUser.token = action.payload
            }
        },
        setLocalPrevPeriod: (state, action:PayloadAction<previousPeriod>) =>{
            if(state.localUser){
                state.localUser.previousPeriod = action.payload

            }
        }
    }
})

export const {setLocalLogin, setLocalToken, setLocalPrevPeriod} = localUserSlice.actions;
export default localUserSlice.reducer;
export type{localUser}