import clsx from 'clsx';
import s from './register.module.scss';
import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../services/store';
import { useSelector } from 'react-redux';
import { getError, getLoading } from '../../services/auth/reducer';
import { useRef, useState } from 'react';
import { register } from '../../services/auth/actions';


export function Register (){
    const dispatch = useAppDispatch();
	const loading = useSelector(getLoading);
	const error = useSelector(getError);

	const [name, setName] = useState<string>();
	const nameRef = useRef(null);

	const [email, setEmail] = useState<string>();
	const emailRef = useRef(null);

	const [password, setPassword] = useState<string>();
	const [isIcon, setIsIcon] = useState(false);
	const passwordRef = useRef<HTMLInputElement>(null);

	const navigate = useNavigate();

	const onClickLogin = () => {
		navigate('/login');
	}

	const onClick = () => {
		if(email && password && name){
			const form = {email, password, name};
			dispatch(register({form}));
		}
		else{
			setName('');
			setEmail('');
			setPassword('');
		}
	}

	return(
		<div className={clsx(s.container)}>
			<div className={clsx(s.body)}>
				<div className={clsx(s.input)}>
					<p className="text text_type_main-medium">
						Регистрация
					</p>
					<Input
						ref={nameRef}
						type={'text'}
						name={'name'}
						placeholder={'Имя'}
						value={name || ''}
						onChange={e => setName(e.target.value)}
						error={name !== undefined ? name?.length === 0 : false}
						disabled={loading}
						errorText={'Имя - не введёно'}
						size={'default'}
						extraClass="ml-1"
						/>
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
						Зарегистрироваться
					</Button>
				</div>
				<div className={clsx(s.button)}>
					<p className="text text_type_main-default text_color_inactive">
						Уже зарегистрированы? <Button htmlType="button" type="secondary" size="medium" onClick={onClickLogin} disabled={loading}>
							Войти
						</Button>
					</p>
				</div>
			</div>
		</div>
	)
}