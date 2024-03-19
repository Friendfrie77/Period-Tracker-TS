import {createSlice } from "@reduxjs/toolkit";

type modalStateType = {
    loginModal: boolean,
    registerModal: boolean
}

const initialState: modalStateType = {
    loginModal: false,
    registerModal: false
}

const modalSlice = createSlice({
    name: 'modalSlice',
    initialState,
    reducers: {
        toggleLogin : (state) =>{
            state.loginModal = !state.loginModal
        },
        toggleRegister : (state) =>{
            state.registerModal = !state.registerModal
        }
    }
})

export const {toggleLogin, toggleRegister} = modalSlice.actions;
export default modalSlice.reducer;