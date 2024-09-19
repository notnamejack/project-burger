import clsx from 'clsx';
import s from './forgot-password.module.scss';
import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { useNavigate } from 'react-router-dom';


export function ForgotPassword (){
	const navigate = useNavigate();

	const onClickLogin = () => {
		navigate('/login');
	}

	return(
		<div className={clsx(s.container)}>
			<div className={clsx(s.body)}>
				<div className={clsx(s.input)}>
					<p className="text text_type_main-medium">
						Восстановление пароля
					</p>
					<Input
						type={'email'}
						placeholder={'Укажите e-mail'}
						onChange={e => {}}
						value={''}
						name={'name'}
						error={false}
						errorText={'Ошибка'}
						size={'default'}
						extraClass="ml-1"
						/>
					<Button htmlType="button" type="primary" size="large">
						Восстановить
					</Button>
				</div>
				<div className={clsx(s.button)}>
					<p className="text text_type_main-default text_color_inactive">
						Вспомнили пароль? <Button htmlType="button" type="secondary" size="medium" onClick={onClickLogin}>
							Войти
						</Button>
					</p>
				</div>
			</div>
		</div>
	)
}