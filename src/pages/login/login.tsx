import clsx from 'clsx';
import s from './login.module.scss';
import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';


export function Login (){

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
						Войти
					</Button>
				</div>
				<div className={clsx(s.button)}>
					<p className="text text_type_main-default text_color_inactive">
						Вы — новый пользователь? <Button htmlType="button" type="secondary" size="medium">
							Зарегистрироваться
						</Button>
					</p>
					<p className="text text_type_main-default text_color_inactive">
						Забыли пароль? <Button htmlType="button" type="secondary" size="medium">
							Восстановить пароль
						</Button>
					</p>
				</div>
			</div>
		</div>
	)
}