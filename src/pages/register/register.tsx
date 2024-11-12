import clsx from 'clsx';
import s from './register.module.scss';
import {
	Button,
	Input,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../services/store';
import { getError, getLoading, setError } from '../../services/auth/reducer';
import { useCallback, useState } from 'react';
import { IFormRegister, register } from '../../services/auth/actions';
import { useForm } from '../../hook/useForm';

export function Register() {
	const dispatch = useAppDispatch();
	const loading = useAppSelector(getLoading);
	const error = useAppSelector(getError);

	const { form, handleInputChange, setForm } = useForm<IFormRegister>({
		name: undefined,
		email: undefined,
		password: undefined,
	});

	const [isIcon, setIsIcon] = useState(false);

	const navigate = useNavigate();

	const onClickLogin = () => {
		navigate('/login');
		dispatch(setError());
	};

	const formSubmit = useCallback(
		(e: React.ChangeEvent<HTMLFormElement>) => {
			e.preventDefault();
			if (form.email && form.password && form.name) {
				dispatch(register(form));
			}
			form.email === undefined && setForm({ ...form, email: '' });
			form.name === undefined && setForm({ ...form, name: '' });
			form.password === undefined && setForm({ ...form, password: '' });
		},
		[form]
	);

	return (
		<div className={clsx(s.container)}>
			<div className={clsx(s.body)}>
				<form className={clsx(s.input)} onSubmit={formSubmit}>
					<p className='text text_type_main-medium'>Регистрация</p>
					<Input
						type={'text'}
						name={'name'}
						placeholder={'Имя'}
						value={form.name || ''}
						onChange={handleInputChange}
						error={form.name !== undefined ? form.name?.length === 0 : false}
						disabled={loading}
						errorText={'Имя - не введёно'}
						size={'default'}
						extraClass='ml-1'
					/>
					<Input
						type={'email'}
						name={'email'}
						placeholder={'E-mail'}
						value={form.email || ''}
						onChange={handleInputChange}
						error={form.email !== undefined ? form.email?.length === 0 : false}
						disabled={loading}
						errorText={'E-mail - не введён'}
						size={'default'}
						extraClass='ml-1'
					/>
					<Input
						type={isIcon ? 'text' : 'password'}
						name={'password'}
						placeholder={'Пароль'}
						value={form.password || ''}
						onChange={handleInputChange}
						onIconClick={() => setIsIcon(!isIcon)}
						icon={!isIcon ? 'ShowIcon' : 'HideIcon'}
						error={
							form.password !== undefined ? form.password?.length === 0 : false
						}
						disabled={loading}
						errorText={'Пароль - не введён'}
						size={'default'}
						extraClass='ml-1'
					/>
					{error && (
						<p className='text text_type_main-default text_color_inactive'>
							{error}
						</p>
					)}
					<Button
						htmlType='submit'
						type='primary'
						size='large'
						disabled={loading}>
						Зарегистрироваться
					</Button>
				</form>
				<div className={clsx(s.button)}>
					<p className='text text_type_main-default text_color_inactive'>
						Уже зарегистрированы?{' '}
						<Button
							htmlType='button'
							type='secondary'
							size='medium'
							onClick={onClickLogin}
							disabled={loading}>
							Войти
						</Button>
					</p>
				</div>
			</div>
		</div>
	);
}
