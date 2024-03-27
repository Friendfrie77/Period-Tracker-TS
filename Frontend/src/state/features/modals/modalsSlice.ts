import {createSlice } from "@reduxjs/toolkit";

type modalStateType = {
    loginModal: boolean,
    registerModal: boolean,
    showNav: boolean
}

const initialState: modalStateType = {
    loginModal: false,
    registerModal: false,
    showNav: true
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
        },
        toggleNav : (state) =>{
            state.showNav = !state.showNav
        }
    }
})

export const {toggleLogin, toggleRegister, toggleNav} = modalSlice.actions;
export default modalSlice.reducer;