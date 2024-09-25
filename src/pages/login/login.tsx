import clsx from 'clsx';
import s from './login.module.scss';
import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { useNavigate } from 'react-router-dom';
import { useRef, useState } from 'react';
import { login } from '../../services/auth/actions';
import { useAppDispatch, useAppSelector } from '../../services/store';
import { getError, getLoading } from '../../services/auth/reducer';;


export function Login (){
    const dispatch = useAppDispatch();
	const loading = useAppSelector(getLoading);
	const error = useAppSelector(getError);

	const [email, setEmail] = useState<string>();
	const emailRef = useRef(null);

	const [password, setPassword] = useState<string>();
	const [isIcon, setIsIcon] = useState(false);
	const passwordRef = useRef<HTMLInputElement>(null);

	const navigate = useNavigate();

	const onClickRegister = () => {
		navigate('/register');
	}

	const onClickForgotPassword = () => {
		navigate('/forgot-password');
	}

	const onClick = () => {
		if(email && password){
			const form = {email, password};
			dispatch(login({form}));
		}
		else{
			setEmail('');
			setPassword('');
		}
	}
	return(
		<div className={clsx(s.container)}>
			<div className={clsx(s.body)}>
				<div className={clsx(s.input)}>
					<p className="text text_type_main-medium">
						Вход
					</p>
					<Input
						ref={emailRef}
						type={'email'}
						name={'email'}
						placeholder={'E-mail'}
						value={email || ''}
						onChange={e => setEmail(e.target.value)}
						error={email !== undefined ? email?.length === 0 : false}
						disabled={loading}
						errorText={'E-mail - не введён'}
						size={'default'}
						extraClass="ml-1"
						/>
					<Input
						ref={passwordRef}
						type={isIcon ? 'text' : 'password'}
						name={'password'}
						placeholder={'Пароль'}
						value={password || ''}
						onChange={e => setPassword(e.target.value)}
						onIconClick={() => setIsIcon(!isIcon)}
						icon={!isIcon ? 'ShowIcon' : 'HideIcon'}
						error={password !== undefined ? password?.length === 0 : false}
						disabled={loading}
						errorText={'Пароль - не введён'}
						size={'default'}
						extraClass="ml-1"
						/>
					{error && <p className="text text_type_main-default text_color_inactive">{error}</p>}
					<Button htmlType="button" type="primary" size="large" onClick={onClick} disabled={loading}>
						Войти
					</Button>
				</div>
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