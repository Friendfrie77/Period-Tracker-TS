import {createSlice} from "@reduxjs/toolkit";

const initialState : {
    user: string | null,
    userId: number | null,
} = {
    user: null,
    userId: null,
    role: null,
    email: null, 
}