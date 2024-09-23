import clsx from 'clsx';
import s from './login.module.scss';
import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { useNavigate } from 'react-router-dom';
import { useRef, useState } from 'react';
import { login } from '../../services/auth/actions';
import { useAppDispatch } from '../../services/store';


export function Login (){
    const dispatch = useAppDispatch();

	const [email, setEmail] = useState('')
	const emailRef = useRef(null)

	const [password, setPassword] = useState('')
	const passwordRef = useRef(null)

	const navigate = useNavigate();

	const onClickRegister = () => {
		navigate('/register');
	}

	const onClickForgotPassword = () => {
		navigate('/forgot-password');
	}

	const onClick = () => {
		const form = {email: "capjack38@ya.ru", password: "qwaszX12@"};
		dispatch(login({form}));

		// {email: "capjack38@ya.ru", password: "qwaszX12@"}
	}

	return(
		<div className={clsx(s.container)}>
			<div className={clsx(s.body)}>
				<div className={clsx(s.input)}>
					<p className="text text_type_main-medium">
						Вход
					</p>
					<Input
						type={'email'}
						placeholder={'E-mail'}
						onChange={e => setEmail(e.target.value)}
						value={email}
						name={'name'}
						error={false}
						ref={emailRef}
						errorText={'Ошибка'}
						size={'default'}
						extraClass="ml-1"
						/>
					<Input
						type={'password'}
						placeholder={'Пароль'}
						onChange={e => setPassword(e.target.value)}
						icon={'ShowIcon'}
						value={password}
						name={'name'}
						error={false}
						ref={passwordRef}
						errorText={'Ошибка'}
						size={'default'}
						extraClass="ml-1"
						/>
					<Button htmlType="button" type="primary" size="large" onClick={onClick}>
						Войти
					</Button>
				</div>
				<div className={clsx(s.button)}>
					<p className="text text_type_main-default text_color_inactive">
						Вы — новый пользователь? <Button htmlType="button" type="secondary" size="medium" onClick={onClickRegister}>
							Зарегистрироваться
						</Button>
					</p>
					<p className="text text_type_main-default text_color_inactive">
						Забыли пароль? <Button htmlType="button" type="secondary" size="medium" onClick={onClickForgotPassword}>
							Восстановить пароль
						</Button>
					</p>
				</div>
			</div>
		</div>
	)
}