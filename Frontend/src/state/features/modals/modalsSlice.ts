import {createSlice } from "@reduxjs/toolkit";

type modalStateType = {
    loginModal: boolean,
    registerModal: boolean,
    showNav: boolean,
    localModal: boolean,
    localModalSettings: boolean
}

const initialState: modalStateType = {
    loginModal: false,
    registerModal: false,
    showNav: true,
    localModal: false,
    localModalSettings: false
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
        },
        toggleLocalModalSettings : (state) =>{
            state.localModalSettings = !state.localModalSettings
        }
    }
})

export const {toggleLogin, toggleRegister, toggleNav, toggleLocal, toggleLocalModalSettings} = modalSlice.actions;
export default modalSlice.reducer;