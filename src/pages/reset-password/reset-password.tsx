import clsx from 'clsx';
import s from './reset-password.module.scss';
import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { useAppDispatch, useAppSelector } from '../../services/store';
import { getError, getLoading, getMessage, setError } from '../../services/auth/reducer';
import { useCallback, useEffect, useState } from 'react';
import { IFormReset, reset } from '../../services/auth/actions';
import { useNavigate } from 'react-router-dom';
import { useForm } from '../../hook/useForm';

export function ResetPassword (){
    const dispatch = useAppDispatch();
	const loading = useAppSelector(getLoading);
	const message = useAppSelector(getMessage);
	const error = useAppSelector(getError);

	const {form, handleInputChange, setForm} = useForm<IFormReset>({
		password: undefined,
		token: undefined
	});

	const [isIcon, setIsIcon] = useState(false);

	const navigate = useNavigate();

	useEffect(() => {
		if(message?.toLocaleLowerCase() === 'Password successfully reset'.toLocaleLowerCase())
			navigate('/login')
	}, [message])

	const onClickLogin = () => {
		navigate('/login');
		dispatch(setError());
	}

	const formSubmit = useCallback(
	(e: React.ChangeEvent<HTMLFormElement>) => {
		e.preventDefault();
		if(form.token && form.password){
			dispatch(reset(form));
		}
		form.token === undefined && setForm({ ...form, token: '' });
		form.password === undefined && setForm({ ...form, password: '' });
	}, [form]);

	return(
		<div className={clsx(s.container)}>
			<div className={clsx(s.body)}>
				<form className={clsx(s.input)} onSubmit={formSubmit}>
					<p className="text text_type_main-medium">
						Восстановление пароля
					</p>
					<Input
						type={isIcon ? 'text' : 'password'}
						name={'password'}
						placeholder={'Пароль'}
						value={form.password || ''}
						onChange={handleInputChange}
						onIconClick={() => setIsIcon(!isIcon)}
						icon={!isIcon ? 'ShowIcon' : 'HideIcon'}
						error={form.password !== undefined ? form.password?.length === 0 : false}
						disabled={loading}
						errorText={'Пароль - не введён'}
						size={'default'}
						extraClass="ml-1"
						/>
					<Input
						type={'text'}
						name={'token'}
						placeholder={'Введите код из письма'}
						value={form.token || ''}
						onChange={handleInputChange}
						error={form.token !== undefined ? form.token?.length === 0 : false}
						disabled={loading}
						errorText={'Код из письма не введён'}
						size={'default'}
						extraClass="ml-1"
						/>
					{error && <p className="text text_type_main-default text_color_inactive">{error}</p>}
					<Button htmlType="submit" type="primary" size="large" disabled={loading}>
						Сохранить
					</Button>
				</form>
				<div className={clsx(s.button)}>
					<p className="text text_type_main-default text_color_inactive">
						Вспомнили пароль? <Button htmlType="button" type="secondary" size="medium" onClick={onClickLogin} disabled={loading}>
							Войти
						</Button>
					</p>
				</div>
			</div>
		</div>
	)
}