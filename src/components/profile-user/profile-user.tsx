
import clsx from 'clsx';
import s from './profile-user.module.scss';
import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';

export function ProfileUser(){
	return(
		<div className={clsx(s.container)}>
			<Input
				type={'text'}
				placeholder={'Имя'}
				onChange={e => {}}
				icon='EditIcon'
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
				icon='CloseIcon'
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
			<div className={clsx(s.btn)}>
				<Button htmlType="button" type="secondary" size="medium">
					Отмена
				</Button>
				<Button htmlType="button" type="primary" size="medium">
					Сохранить
				</Button>
			</div>
		</div>
	)
}