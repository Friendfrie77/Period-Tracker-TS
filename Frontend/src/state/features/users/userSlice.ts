import {createSlice} from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

type  periodType = {
    startDate: string,
    endDate: string
}
type previousPeriod = periodType[]

type user = {
    username: string | undefined;
    id: number | undefined | 'localUser';
    role: 'user'| 'local'| 'demo' | undefined;
    email: string | undefined | 'localUser';
    token: string | undefined;
    cycle?: number | null | undefined;
    avgLength?: number | null | undefined;
    periodStartDate?: string | null | undefined;
    periodEndDate?: string | null | undefined;
    daysTillPeriod?: number | null | undefined;
    daysLeftPeriod?: number | null | undefined;
    canBleed?: boolean | undefined;
    isBleeding?: boolean | undefined;
    previousPeriod?: previousPeriod| null | undefined;
    notifications: boolean;
    emailNotifications: boolean;
}

const testUser:user = {
    username: 'John Doe',
    id: 123,
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
    previousPeriod: null,
    notifications: true,
    emailNotifications: true
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
        setToken: (state, action:PayloadAction<string>) =>{
            if(state.loginUser){
                state.loginUser.token = action.payload
            }
        },
        setPrevPeriod: (state, action:PayloadAction<previousPeriod>) =>{
            if(state.loginUser){
                state.loginUser.previousPeriod = action.payload
            }
        },
        setPeriodCycleLength: (state, action:PayloadAction<{cycle: number, avgLength: number|null|undefined}>) =>{
            if(state.loginUser){
                state.loginUser.cycle = action.payload.cycle;
                state.loginUser.avgLength = action.payload.avgLength;
            }
        },
        setCurrentPeriod: (state, action:PayloadAction<{startDate: string, endDate: string, canBleed: boolean, isBleeding: boolean}>) =>{
            if(state.loginUser){
                state.loginUser.periodStartDate = action.payload.startDate;
                state.loginUser.periodEndDate = action.payload.endDate;
                state.loginUser.canBleed = action.payload.canBleed;
                state.loginUser.isBleeding = action.payload.isBleeding;

            }
        },
        setEmailNotifications: (state, action:PayloadAction<{emailNotifications: boolean}>) =>{
            if(state.loginUser){
                state.loginUser.emailNotifications = action.payload.emailNotifications
            }
        },
        setPhoneNotifications: (state, action:PayloadAction<{notifications: boolean}>) =>{
            if(state.loginUser){
                state.loginUser.notifications = action.payload.notifications
            }
        }
    }
})

export const {setLogin, setLogout, setToken, setPrevPeriod, setPeriodCycleLength, setCurrentPeriod, setEmailNotifications, setPhoneNotifications} = userSlice.actions;
export default userSlice.reducer;
export {testUser};
export type{user}