import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {login, logout, register, setUser} from "./actions";


interface UserState {
	user: IUser | null,
	isAuthChecked: boolean,
	loading: boolean,
	error: string | null
}

export interface IUser{
	name: string,
	email: string,
}

const initialState: UserState = {
    user: null,
    isAuthChecked: false,
	loading: false,
	error: null
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
        getLoading: state => state.loading,
        getError: state => state.error,
        getIsAuthChecked: state => state.isAuthChecked,
    },
    extraReducers: (builder) => {
        builder
            .addCase(setUser, (state, action) => {
                state.user = action.payload || null;
            })
            .addCase(login.pending, (state) => {
                state.loading = true;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.user = action.payload;
                state.loading = false;
                state.isAuthChecked = true;
            })
            .addCase(login.rejected, (state, action) => {
                state.error = action.error.message || null;
                state.loading = false;
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
export const { getIsAuthChecked, getUser, getLoading, getError } = authSlice.selectors;