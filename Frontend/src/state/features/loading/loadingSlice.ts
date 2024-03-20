import {createSlice} from "@reduxjs/toolkit";

type loadingStateType = {
    isLoading: boolean
}

const initialState: loadingStateType = {
    isLoading: false
}

const loadingSlice = createSlice({
    name: 'loadingSlice',
    initialState,
    reducers: {
        toggleLoading: (state) =>{
            state.isLoading = !state.isLoading
        }
    }
})

export const {toggleLoading} = loadingSlice.actions;
export default loadingSlice.reducer;