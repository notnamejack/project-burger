
import clsx from 'clsx';
import s from './modal.module.scss';
import { createPortal } from 'react-dom';
import React, { useEffect } from 'react';
import { Button, CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';

const modalRoot = document.getElementById("modals") as HTMLDivElement;

interface IModalOverlay{
	onClose: () => void
}

interface IModal extends IModalOverlay{
	children: React.ReactNode,
	title?: string,
}


export function Modal ({title, children, onClose}:IModal){

	useEffect(() => {
		window.addEventListener("keyup", (e: KeyboardEvent) => handleClose(e))
		return () => {
			window.removeEventListener("keyup", (e: KeyboardEvent) => handleClose(e))
		}
	  },[])

	const handleClose = (e: KeyboardEvent) => {
		if(e.key === 'Escape'){
			onClose()
		}
	}

	return createPortal(
		(
			<div className={clsx(s.container)}>
				<div className={clsx(s.modal)}>
					<div className={clsx(s.head)}>
						{title && <p className="text text_type_main-large">{title}</p>}
						<div className={clsx(s.close)} onClick={onClose}>
							<CloseIcon type="primary" />
						</div>
					</div>
					{children}
				</div>
				<ModalOverlay onClose={onClose}/>
			</div>
		), modalRoot
	)
}

function ModalOverlay ({onClose}:IModalOverlay){
	return (
		<div className={clsx(s.back)} onClick={onClose}></div>
	)
}