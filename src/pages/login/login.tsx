import clsx from 'clsx';
import s from './login.module.scss';
import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { useNavigate } from 'react-router-dom';
import { useCallback, useState } from 'react';
import { IFormLogin, login } from '../../services/auth/actions';
import { useAppDispatch, useAppSelector } from '../../services/store';
import { getError, getLoading, setError } from '../../services/auth/reducer';;


export function Login (){
    const dispatch = useAppDispatch();
	const loading = useAppSelector(getLoading);
	const error = useAppSelector(getError);

	const [form, setForm] = useState<IFormLogin>({
        email: undefined,
		password: undefined
    })

	const [isIcon, setIsIcon] = useState(false);

	const navigate = useNavigate();

	const onClickRegister = () => {
		navigate('/register');
		dispatch(setError());
	}

	const onClickForgotPassword = () => {
		navigate('/forgot-password');
		dispatch(setError());
	}

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({
      	...form,
          [e.target.name]: e.target.value
        });
    }

	const formSubmit = useCallback(
	(e: React.ChangeEvent<HTMLFormElement>) => {
		e.preventDefault();
		if(form.email && form.password){
			dispatch(login({form}));
		}
		form.email === undefined && setForm({ ...form, email: '' });
		form.password === undefined && setForm({ ...form, password: '' });
	}, [form]);

	return(
		<div className={clsx(s.container)}>
			<div className={clsx(s.body)}>
				<form className={clsx(s.input)} onSubmit={formSubmit}>
					<p className="text text_type_main-medium">
						Вход
					</p>
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
						extraClass="ml-1"
						/>
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
					{error && <p className="text text_type_main-default text_color_inactive">{error}</p>}
					<Button htmlType="submit" type="primary" size="large" disabled={loading}>
						Войти
					</Button>
				</form>
				<div className={clsx(s.button)}>
					<p className="text text_type_main-default text_color_inactive">
						Вы — новый пользователь? <Button htmlType="button" type="secondary" size="medium" onClick={onClickRegister} disabled={loading}>
							Зарегистрироваться
						</Button>
					</p>
					<p className="text text_type_main-default text_color_inactive">
						Забыли пароль? <Button htmlType="button" type="secondary" size="medium" onClick={onClickForgotPassword} disabled={loading}>
							Восстановить пароль
						</Button>
					</p>
				</div>
			</div>
		</div>
	)
}