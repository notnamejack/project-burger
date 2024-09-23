import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {login, logout, register, setUser} from "./actions";


interface UserState {
	user: IUser | null,
	isAuthChecked: boolean
}

export interface IUser{
	name: string,
	email: string,
}

const initialState: UserState = {
    user: null,
    isAuthChecked: false
}

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setIsAuthChecked: (state, action) => {
            state.isAuthChecked = action.payload;
        }
    },
    selectors: {
        getUser: state => state.user,
        getIsAuthChecked: state => state.isAuthChecked,
    },
    extraReducers: (builder) => {
        builder
            .addCase(setUser, (state, action) => {
                state.user = action.payload || null;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.user = action.payload;
                state.isAuthChecked = true;
            })
            .addCase(register.fulfilled, (state, action) => {
                state.user = action.payload;
                state.isAuthChecked = true;
            })
            .addCase(logout.fulfilled, (state) => {
                state.user = null;
            })
    }
})

export const { setIsAuthChecked } = authSlice.actions;
export const { getIsAuthChecked, getUser } = authSlice.selectors;