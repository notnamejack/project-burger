
import { forgot, IFormForgot, IFormLogin, IFormRegister, IFormReset, login, logout, patchUser, register, reset } from "./actions";
import { authSlice, getError, getIsAuthChecked, getLoading, getMessage, getUser, initialState, IUser, setError, setIsAuthChecked, setUser } from "./reducer";

const user:IUser = {
	name: "name",
	email: "email"
}

describe("Сheck user", () => {
	it('Should return the initial state', () => {
        expect(authSlice.reducer(undefined, {type: ""})).toEqual(initialState);
    });

	it('Auth checked (true)', () => {
		expect(authSlice.reducer(initialState, setIsAuthChecked(true))).toEqual({
			...initialState,
			isAuthChecked: true
		});
	});

	it('Delete error', () => {
		expect(authSlice.reducer({
			...initialState,
			error: "Ошибка"
		}, setError())).toEqual(initialState);
	});

	it('Set user', () => {
		expect(authSlice.reducer(initialState, setUser(user))).toEqual({...initialState, user: user});
	});

	describe("Сheck selector", () => {
		it('Select isAuthChecked', () => {
		  expect(getIsAuthChecked({auth: {...initialState, isAuthChecked: true}})).toEqual(true);
		});
		it('Select loading', () => {
		  expect(getLoading({auth: {...initialState, loading: true}})).toEqual(true);
		});
		it('Select error', () => {
		  expect(getError({auth: {...initialState, error: "Тестовая ошибка"}})).toEqual("Тестовая ошибка");
		});
		it('Select message', () => {
		  expect(getMessage({auth: {...initialState, message: "Password successfully reset"}})).toEqual("Password successfully reset");
		});
		it('Select user', () => {
		  expect(getUser({auth: {...initialState, user: user}})).toEqual(user);
		});
	});
	// тест авторизация
	describe("Сheck login user", () => {
		it('Pending login', () => {
			expect(authSlice.reducer(initialState, login.pending('', {} as IFormLogin ))).toEqual({...initialState, loading: true});
		});

		it('Fulfilled login', () => {
			expect(authSlice.reducer(initialState, login.fulfilled(user, '', {} as IFormLogin))).toEqual({...initialState, user: user, isAuthChecked: true});
		});

		it('Rejected login', () => {
			const message = 'email or password are incorrect';
			expect(authSlice.reducer(initialState, login.rejected(new Error(message),'', {} as IFormLogin))).toEqual({...initialState, error: message});
		});

		it('Rejected login (message undefined)', () => {
			expect(authSlice.reducer(initialState, login.rejected( new Error(undefined) ,'', {} as IFormLogin))).toEqual({...initialState, error: null});
		});
	});

	// тест регистрация
	describe("Сheck register user", () => {
		it('Pending register', () => {
			expect(authSlice.reducer(initialState, register.pending('', {} as IFormRegister ))).toEqual({...initialState, loading: true});
		});

		it('Fulfilled register', () => {
			expect(authSlice.reducer(initialState, register.fulfilled(user, '', {} as IFormRegister))).toEqual({...initialState, user: user, isAuthChecked: true});
		});

		it('Rejected register', () => {
			const message = 'ошибка при создание';
			expect(authSlice.reducer(initialState, register.rejected(new Error(message),'', {} as IFormRegister))).toEqual({...initialState, error: message});
		});

		it('Rejected register (message undefined)', () => {
			expect(authSlice.reducer(initialState, register.rejected( new Error(undefined) ,'', {} as IFormRegister))).toEqual({...initialState, error: null});
		});
	});

	// тест сброс пароля
	describe("Сheck forgot user", () => {
		it('Pending forgot', () => {
			expect(authSlice.reducer(initialState, forgot.pending('', {} as IFormForgot ))).toEqual({...initialState, loading: true});
		});

		it('Fulfilled forgot', () => {
			const message = 'Reset email sent'
			expect(authSlice.reducer(initialState, forgot.fulfilled(message, '', {} as IFormForgot))).toEqual({...initialState, message: message, isAuthChecked: true});
		});

		it('Rejected forgot', () => {
			const message = 'ошибка при сбросе пароля';
			expect(authSlice.reducer(initialState, forgot.rejected(new Error(message),'', {} as IFormForgot))).toEqual({...initialState, error: message});
		});

		it('Rejected forgot (message undefined)', () => {
			expect(authSlice.reducer(initialState, forgot.rejected( new Error(undefined) ,'', {} as IFormForgot))).toEqual({...initialState, error: null});
		});
	});

	// тест перезапись пароля
	describe("Сheck reset user", () => {
		it('Pending reset', () => {
			expect(authSlice.reducer(initialState, reset.pending('', {} as IFormReset ))).toEqual({...initialState, loading: true});
		});

		it('Fulfilled reset', () => {
			const message = 'Password successfully reset'
			expect(authSlice.reducer(initialState, reset.fulfilled(message, '', {} as IFormReset))).toEqual({...initialState, message: message, isAuthChecked: true});
		});

		it('Rejected reset', () => {
			const message = 'ошибка при перезаписи пароля';
			expect(authSlice.reducer(initialState, reset.rejected(new Error(message),'', {} as IFormReset))).toEqual({...initialState, error: message});
		});

		it('Rejected reset (message undefined)', () => {
			expect(authSlice.reducer(initialState, reset.rejected( new Error(undefined) ,'', {} as IFormReset))).toEqual({...initialState, error: null});
		});
	});

	// тест обновления информации о пользователи
	describe("Сheck reset user", () => {
		it('Pending patchUser', () => {
			expect(authSlice.reducer(initialState, patchUser.pending('', {} as IFormRegister ))).toEqual({...initialState, loading: true});
		});

		it('Fulfilled patchUser', () => {
			expect(authSlice.reducer(initialState, patchUser.fulfilled(user, '', {} as IFormRegister))).toEqual({...initialState, user: user, isAuthChecked: true});
		});

		it('Rejected patchUser', () => {
			const message = 'ошибка обновления';
			expect(authSlice.reducer(initialState, patchUser.rejected(new Error(message),'', {} as IFormRegister))).toEqual({...initialState, error: message});
		});

		it('Rejected patchUser (message undefined)', () => {
			expect(authSlice.reducer(initialState, patchUser.rejected( new Error(undefined) ,'', {} as IFormRegister))).toEqual({...initialState, error: null});
		});
	})

	it('Fulfilled logout', () => {
		expect(authSlice.reducer(initialState, logout.fulfilled('', ''))).toEqual({...initialState, user: null});
	});
});

