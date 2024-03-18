import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type user ={
    userName: string;
    userid: number;
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
    previodPeriod:[{
        startDate: string,
        endDate: string
    }] | null;
    notifications: boolean;
}

const testUser:user = {
    userName: 'John Doe',
    userid: 123,
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
type userState = {
    loginUser : user | null;
}

const initialState: userState = {
    loginUser: testUser
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
    }
})

export const {setLogin, setLogout} = userSlice.actions;
export default userSlice.reducer;
export {testUser};