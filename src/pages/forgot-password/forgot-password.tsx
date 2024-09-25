import clsx from 'clsx';
import s from './forgot-password.module.scss';
import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../services/store';
import { getError, getLoading, getMessage, setError } from '../../services/auth/reducer';
import { useCallback, useEffect, useState } from 'react';
import { forgot, IFormForgot } from '../../services/auth/actions';


export function ForgotPassword (){
    const dispatch = useAppDispatch();
	const loading = useAppSelector(getLoading);
	const message = useAppSelector(getMessage);
	const error = useAppSelector(getError);

	const [form, setForm] = useState<IFormForgot>({
		email: undefined
    })

	const navigate = useNavigate();

	useEffect(() => {
		if(message?.toLocaleLowerCase() === 'Reset email sent'.toLocaleLowerCase())
			navigate('/reset-password')
	}, [message])

	const onClickLogin = () => {
		navigate('/login');
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
		if(form.email){
			dispatch(forgot({form}));
		}
		form.email === undefined && setForm({ ...form, email: '' });
	}, [form]);

	return(
		<div className={clsx(s.container)}>
			<div className={clsx(s.body)}>
				<div className={clsx(s.input)}>
					<p className="text text_type_main-medium">
						Восстановление пароля
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
					{error && <p className="text text_type_main-default text_color_inactive">{error}</p>}
					<Button htmlType="submit" type="primary" size="large" disabled={loading}>
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