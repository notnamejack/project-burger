
import clsx from 'clsx';
import s from './profile-user.module.scss';
import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { useSelector } from 'react-redux';
import { getError, getLoading, getUser } from '../../services/auth/reducer';
import { useEffect, useRef, useState } from 'react';
import { useAppDispatch } from '../../services/store';
import { patchUser } from '../../services/auth/actions';

export function ProfileUser(){
    const dispatch = useAppDispatch();
	const user = useSelector(getUser);
	const loading = useSelector(getLoading);
	const error = useSelector(getError);

	const [name, setName] = useState<string | undefined>();
	const nameRef = useRef(null);

	const [email, setEmail] = useState<string | undefined>();
	const emailRef = useRef(null);

	const [password, setPassword] = useState<string | undefined>('123456789');
	const [isIcon, setIsIcon] = useState(false);
	const passwordRef = useRef<HTMLInputElement>(null);

	const [isEdit, setIsEdit] = useState(false);

	useEffect(() => {
		if(isEdit){
			setPassword(undefined);
		}
		else{
			setName(user?.name);
			setEmail(user?.email);
			setPassword('123456789');
		}
	}, [isEdit])

	useEffect(() => {
		setName(user?.name);
		setEmail(user?.email);
	}, [user])

	const onClick = () =>{
		if(email && name && password){
			const form = {email, name, password};
			dispatch(patchUser({form}));
			setIsEdit(!isEdit)
		}
		else{
			setPassword('')
		}
	}

	return(
		<div className={clsx(s.container)}>
			<Input
				ref={nameRef}
				type={'text'}
				name={'name'}
				placeholder={'Имя'}
				value={name || ''}
				onChange={e => setName(e.target.value)}
				onIconClick={!isEdit ? () => setIsEdit(!isEdit) : () => {setName(undefined)}}
				icon={!isEdit ? 'EditIcon' : 'CloseIcon'}
				error={name !== undefined ? name?.length === 0 : false}
				disabled={loading || !isEdit}
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
				onIconClick={!isEdit ? () => setIsEdit(!isEdit) : () => {setEmail(undefined)}}
				icon={!isEdit ? 'EditIcon' : 'CloseIcon'}
				error={email !== undefined ? email?.length === 0 : false}
				disabled={loading || !isEdit}
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
				onIconClick={isEdit ? () => setIsIcon(!isIcon) : () => {setIsEdit(!isEdit)}}
				icon={!isEdit ? 'EditIcon' : !isIcon ? 'ShowIcon' : 'HideIcon'}
				error={password !== undefined ? password?.length === 0 : false}
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
				<Button htmlType="button" type="primary" size="medium" onClick={onClick} disabled={loading}>
					Сохранить
				</Button>
			</div>}
		</div>
	)
}