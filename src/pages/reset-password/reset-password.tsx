import clsx from 'clsx';
import s from './reset-password.module.scss';
import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';


export function ResetPassword (){

	return(
		<div className={clsx(s.container)}>
			<div className={clsx(s.body)}>
				<div className={clsx(s.input)}>
					<p className="text text_type_main-medium">
						Восстановление пароля
					</p>
					<Input
						type={'password'}
						placeholder={'Введите новый пароль'}
						onChange={e => {}}
						icon={'HideIcon'}
						value={''}
						name={'name'}
						error={false}
						errorText={'Ошибка'}
						size={'default'}
						extraClass="ml-1"
						/>
					<Input
						type={'text'}
						placeholder={'Введите код из письма'}
						onChange={e => {}}
						value={''}
						name={'name'}
						error={false}
						errorText={'Ошибка'}
						size={'default'}
						extraClass="ml-1"
						/>
					<Button htmlType="button" type="primary" size="large">
						Сохранить
					</Button>
				</div>
				<div className={clsx(s.button)}>
					<p className="text text_type_main-default text_color_inactive">
						Вспомнили пароль? <Button htmlType="button" type="secondary" size="medium">
							Войти
						</Button>
					</p>
				</div>
			</div>
		</div>
	)
}