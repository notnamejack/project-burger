import {createAction, createAsyncThunk} from "@reduxjs/toolkit";
import { api } from "../../utils/api";
import { IUser, setIsAuthChecked } from "./reducer";

export interface FormLogin{
	email: string,
	password: string
}

export interface FormRegister extends FormLogin{
	name: string
}

export interface FormReset{
	password: string,
	token: string
}

export const login = createAsyncThunk(
    "auth/login",
    async ({ form }: { form: FormLogin }) => {
        return api.login(form)
    }
);

export const register = createAsyncThunk(
    "auth/register",
    async ({ form }: { form: FormRegister }) => {
        return api.register(form)
    }
);

export const forgot = createAsyncThunk(
    "auth/forgot",
    async ({ email }: { email: string }) => {
        return api.forgot(email)
    }
);

export const reset = createAsyncThunk(
    "auth/reset",
    async ({ form }: { form: FormReset }) => {
        return api.reset(form)
    }
);

export const logout = createAsyncThunk(
    "auth/logout",
    async () => {
        return api.logout();
    }
)

export const setUser = createAction("auth/setUser");

export const checkUserAuth = createAsyncThunk(
    "auth/checkUserAuth",
    async (_, {dispatch} ) => {
        if (localStorage.getItem("accessToken")) {
            await api.getUser()
                .then(user => {dispatch(setUser(user))})
                .finally(() => dispatch(setIsAuthChecked(true)));
        } else {
            dispatch(setIsAuthChecked(true));
        }
    }
)

export const patchUser = createAsyncThunk(
    "auth/patchUser",
    async ({ form }: { form: FormRegister }) => {
        return api.patchUser(form)
    }
);