import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {login, logout, register, forgot, setUser, reset, patchUser} from "./actions";


interface UserState {
	user: IUser | null,
	message: string | null,
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
	message: null,
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
        getMessage: state => state.message,
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
				state.error = null;
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
            .addCase(register.pending, (state) => {
                state.loading = true;
				state.error = null;
            })
            .addCase(register.fulfilled, (state, action) => {
                state.user = action.payload;
                state.loading = false;
                state.isAuthChecked = true;
            })
            .addCase(register.rejected, (state, action) => {
                state.error = action.error.message || null;
                state.loading = false;
            })
            .addCase(forgot.pending, (state) => {
                state.loading = true;
                state.message = null;
				state.error = null;
            })
            .addCase(forgot.fulfilled, (state, action) => {
                state.message = action.payload;
                state.loading = false;
                state.isAuthChecked = true;
            })
            .addCase(forgot.rejected, (state, action) => {
                state.error = action.error.message || null;
                state.loading = false;
            })
            .addCase(reset.pending, (state) => {
                state.loading = true;
                state.message = null;
				state.error = null;
            })
            .addCase(reset.fulfilled, (state, action) => {
                state.message = action.payload;
                state.loading = false;
                state.isAuthChecked = true;
            })
            .addCase(reset.rejected, (state, action) => {
                state.error = action.error.message || null;
                state.loading = false;
            })
            .addCase(patchUser.pending, (state) => {
                state.loading = true;
				state.error = null;
            })
            .addCase(patchUser.fulfilled, (state, action) => {
                state.user = action.payload;
                state.loading = false;
                state.isAuthChecked = true;
            })
            .addCase(patchUser.rejected, (state, action) => {
                state.error = action.error.message || null;
                state.loading = false;
            })
            .addCase(logout.fulfilled, (state) => {
                state.user = null;
            })
    }
})

export const { setIsAuthChecked } = authSlice.actions;
export const { getIsAuthChecked, getUser, getLoading, getMessage, getError } = authSlice.selectors;