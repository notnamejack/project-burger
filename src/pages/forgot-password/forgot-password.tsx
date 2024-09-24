import clsx from 'clsx';
import s from './forgot-password.module.scss';
import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../services/store';
import { useSelector } from 'react-redux';
import { getError, getLoading, getMessage } from '../../services/auth/reducer';
import { useEffect, useRef, useState } from 'react';
import { forgot } from '../../services/auth/actions';


export function ForgotPassword (){
    const dispatch = useAppDispatch();
	const loading = useSelector(getLoading);
	const message = useSelector(getMessage);
	const error = useSelector(getError);

	const [email, setEmail] = useState<string>();
	const emailRef = useRef(null);

	const navigate = useNavigate();

	useEffect(() => {
		if(message?.toLocaleLowerCase() === 'Reset email sent'.toLocaleLowerCase())
			navigate('/reset-password')
	}, [message])

	const onClickLogin = () => {
		navigate('/login');
	}

	const onClick = () => {
		if(email ){
			dispatch(forgot({email}));
		}
		else{
			setEmail('');
		}
	}

	return(
		<div className={clsx(s.container)}>
			<div className={clsx(s.body)}>
				<div className={clsx(s.input)}>
					<p className="text text_type_main-medium">
						Восстановление пароля
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
					{error && <p className="text text_type_main-default text_color_inactive">{error}</p>}
					<Button htmlType="button" type="primary" size="large" onClick={onClick} disabled={loading}>
						Восстановить
					</Button>
				</div>
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