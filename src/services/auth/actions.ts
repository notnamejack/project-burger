import { createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../../utils/api';
import { IUser, setIsAuthChecked, setUser } from './reducer';

export interface IFormForgot {
	email: string | undefined;
}
export interface IFormLogin extends IFormForgot {
	password: string | undefined;
}

export interface IFormRegister extends IFormLogin {
	name: string | undefined;
}

export interface IFormReset {
	password: string | undefined;
	token: string | undefined;
}

export const login = createAsyncThunk(
	'auth/login',
	async (form: IFormLogin) => {
		return api.login<IUser>(form);
	}
);

export const register = createAsyncThunk(
	'auth/register',
	async (form: IFormRegister) => {
		return api.register<IUser>(form);
	}
);

export const forgot = createAsyncThunk(
	'auth/forgot',
	async (form: IFormForgot) => {
		return api.forgot(form);
	}
);

export const reset = createAsyncThunk(
	'auth/reset',
	async (form: IFormReset) => {
		return api.reset(form);
	}
);

export const logout = createAsyncThunk('auth/logout', api.logout);

export const checkUserAuth = createAsyncThunk(
	'auth/checkUserAuth',
	async (_, { dispatch }) => {
		if (localStorage.getItem('accessToken')) {
			await api
				.getUser()
				.then((user) => {
					dispatch(setUser(user));
				})
				.finally(() => dispatch(setIsAuthChecked(true)));
		} else {
			dispatch(setIsAuthChecked(true));
		}
	}
);

export const patchUser = createAsyncThunk(
	'auth/patchUser',
	async (form: IFormRegister) => {
		return api.patchUser(form);
	}
);
