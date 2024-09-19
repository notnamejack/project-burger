import clsx from 'clsx';
import s from './register.module.scss';
import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { useNavigate } from 'react-router-dom';


export function Register (){
	const navigate = useNavigate();

	const onClickLogin = () => {
		navigate('/login');
	}

	return(
		<div className={clsx(s.container)}>
			<div className={clsx(s.body)}>
				<div className={clsx(s.input)}>
					<p className="text text_type_main-medium">
						Регистрация
					</p>
					<Input
						type={'text'}
						placeholder={'Имя'}
						onChange={e => {}}
						value={''}
						name={'name'}
						error={false}
						errorText={'Ошибка'}
						size={'default'}
						extraClass="ml-1"
						/>
					<Input
						type={'email'}
						placeholder={'E-mail'}
						onChange={e => {}}
						value={''}
						name={'name'}
						error={false}
						errorText={'Ошибка'}
						size={'default'}
						extraClass="ml-1"
						/>
					<Input
						type={'password'}
						placeholder={'Пароль'}
						onChange={e => {}}
						icon={'HideIcon'}
						value={''}
						name={'name'}
						error={false}
						errorText={'Ошибка'}
						size={'default'}
						extraClass="ml-1"
						/>
					<Button htmlType="button" type="primary" size="large">
						Зарегистрироваться
					</Button>
				</div>
				<div className={clsx(s.button)}>
					<p className="text text_type_main-default text_color_inactive">
						Уже зарегистрированы? <Button htmlType="button" type="secondary" size="medium" onClick={onClickLogin}>
							Войти
						</Button>
					</p>
				</div>
			</div>
		</div>
	)
}