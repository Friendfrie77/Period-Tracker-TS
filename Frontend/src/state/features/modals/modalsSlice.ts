import {createSlice } from "@reduxjs/toolkit";

type modalStateType = {
    loginModal: boolean,
    registerModal: boolean,
    showNav: boolean,
    localModal: boolean
}

const initialState: modalStateType = {
    loginModal: false,
    registerModal: false,
    showNav: true,
    localModal: false
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
        },
        toggleLocal : (state) =>{
            state.localModal = !state.localModal
        }
    }
})

export const {toggleLogin, toggleRegister, toggleNav, toggleLocal} = modalSlice.actions;
export default modalSlice.reducer;