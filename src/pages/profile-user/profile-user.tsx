
import clsx from 'clsx';
import s from './profile-user.module.scss';
import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { getError, getLoading, getUser } from '../../services/auth/reducer';
import React, { useCallback, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../services/store';
import { IFormRegister, patchUser } from '../../services/auth/actions';
import { useForm } from '../../hook/useForm';

export function ProfileUser(){
    const dispatch = useAppDispatch();
	const user = useAppSelector(getUser);
	const loading = useAppSelector(getLoading);
	const error = useAppSelector(getError);

	const {form, handleInputChange, handleInputEdit, setForm} = useForm<IFormRegister>({
		name: undefined,
        email: undefined,
		password: undefined
	});

	const [isIcon, setIsIcon] = useState(false);

	const [isEdit, setIsEdit] = useState(false);

	useEffect(() => {
		if(isEdit){
			setForm({ ...form, password: undefined })
		}
		else{
			setForm({
				name: user?.name,
				email: user?.email,
				password: '123456789'
			})
		}
	}, [isEdit])

	useEffect(() => {setForm({
			...form,
			name: user?.name,
			email: user?.email
		})
	}, [user])


	const formSubmit = useCallback(
	(e: React.ChangeEvent<HTMLFormElement>) => {
		e.preventDefault();
		if(form.email && form.name && form.password){
			dispatch(patchUser(form));
			setIsEdit(!isEdit)
		}
		else{
			setForm({ ...form, password: '' })
		}
	}, [form]);


	return(
		<form className={clsx(s.container)} onSubmit={formSubmit}>
			<Input
				type={'text'}
				name={'name'}
				placeholder={'Имя'}
				value={form.name || ''}
				onChange={handleInputChange}
				onIconClick={!isEdit ? () => setIsEdit(!isEdit) : () => handleInputEdit('name')}
				icon={!isEdit ? 'EditIcon' : 'CloseIcon'}
				error={form.name !== undefined ? form.name?.length === 0 : false}
				disabled={loading || !isEdit}
				errorText={'Имя - не введёно'}
				size={'default'}
				extraClass="ml-1"
				/>
			<Input
				type={'email'}
				name={'email'}
				placeholder={'E-mail'}
				value={form.email || ''}
				onChange={handleInputChange}
				onIconClick={!isEdit ? () => setIsEdit(!isEdit) : () => handleInputEdit('email')}
				icon={!isEdit ? 'EditIcon' : 'CloseIcon'}
				error={form.email !== undefined ? form.email?.length === 0 : false}
				disabled={loading || !isEdit}
				errorText={'E-mail - не введён'}
				size={'default'}
				extraClass="ml-1"
				/>
			<Input
				type={isIcon ? 'text' : 'password'}
				name={'password'}
				placeholder={'Пароль'}
				value={form.password || ''}
				onChange={handleInputChange}
				onIconClick={isEdit ? () => setIsIcon(!isIcon) : () => {setIsEdit(!isEdit)}}
				icon={!isEdit ? 'EditIcon' : !isIcon ? 'ShowIcon' : 'HideIcon'}
				error={form.password !== undefined ? form.password?.length === 0 : false}
				disabled={loading || !isEdit}
				errorText={'Пароль - не введён'}
				size={'default'}
				extraClass="ml-1"
				/>
			{error && <p className="text text_type_main-default text_color_inactive">{error}</p>}
			{isEdit &&
			<div className={clsx(s.btn)}>
				<Button htmlType="button" type="secondary" size="medium" onClick={() => setIsEdit(!isEdit)} disabled={loading}>
					Отмена
				</Button>
				<Button htmlType="submit" type="primary" size="medium" disabled={loading}>
					Сохранить
				</Button>
			</div>}
		</form>
	)
}