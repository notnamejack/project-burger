import clsx from 'clsx';
import s from './reset-password.module.scss';
import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { useAppDispatch } from '../../services/store';
import { useSelector } from 'react-redux';
import { getError, getLoading } from '../../services/auth/reducer';
import { useRef, useState } from 'react';
import { reset } from '../../services/auth/actions';
import { useNavigate } from 'react-router-dom';


export function ResetPassword (){
    const dispatch = useAppDispatch();
	const loading = useSelector(getLoading);
	const error = useSelector(getError);

	const [password, setPassword] = useState<string>();
	const [isIcon, setIsIcon] = useState(false);
	const passwordRef = useRef<HTMLInputElement>(null);

	const [token, setToken] = useState<string>();
	const tokenRef = useRef(null);

	const navigate = useNavigate();

	const onClickLogin = () => {
		navigate('/login');
	}

	const onClick = () => {
		if(token && password){
			const form = {password, token};
			dispatch(reset({form}));
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
					<Input
						ref={tokenRef}
						type={'text'}
						name={'token'}
						placeholder={'Введите код из письма'}
						value={token || ''}
						onChange={e => setToken(e.target.value)}
						error={token !== undefined ? token?.length === 0 : false}
						disabled={loading}
						errorText={'Код из письма не введён'}
						size={'default'}
						extraClass="ml-1"
						/>
					{error && <p className="text text_type_main-default text_color_inactive">{error}</p>}
					<Button htmlType="button" type="primary" size="large" onClick={onClick} disabled={loading}>
						Сохранить
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