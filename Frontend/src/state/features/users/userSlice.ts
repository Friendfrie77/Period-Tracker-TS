import {createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";


type  periodType = {
    startDate: string,
    endDate: string
}
type previodPeriodType = periodType[]

type user = {
    userName: string;
    userId: number;
    role: string;
    email: string;
    token: string;
    cycle: number | null;
    avgLength: number | null;
    periodStartDate: string | null;
    periodEndDate: string | null;
    daysTillPeriod: number | null;
    daysLeftPeriod: number | null;
    canBleed: boolean;
    isBleeding: boolean;
    previodPeriod: previodPeriodType| null;
    notifications: boolean;
}

const testUser:user = {
    userName: 'John Doe',
    userId: 123,
    role: 'user',
    email: 'john@example.com',
    token: 'some-token',
    cycle: null,
    avgLength: null,
    periodStartDate: null,
    periodEndDate: null,
    daysTillPeriod: null,
    daysLeftPeriod: null,
    canBleed: false,
    isBleeding: false,
    previodPeriod: null,
    notifications: true
};
interface userState {
    loginUser : user | null;
}

const initialState: userState = {
    loginUser: null
}

const userSlice = createSlice({
    name: 'userSlice',
    initialState,
    reducers: {
        setLogin: (state, action: PayloadAction<user>) =>{
            state.loginUser = action.payload;
        },
        setLogout: (state) =>{
            state.loginUser = null;
        },
        setPreviodPeriod: (state, action:PayloadAction<previodPeriodType>) =>{
            if(state.loginUser){
                state.loginUser.previodPeriod = action.payload
            }
        }
    }
})

export const {setLogin, setLogout, setPreviodPeriod} = userSlice.actions;
export default userSlice.reducer;
export {testUser};
export type{user}