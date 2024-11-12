
import clsx from 'clsx';
import s from './modal.module.scss';
import { createPortal } from 'react-dom';
import React, { useEffect } from 'react';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { IModalOverlay, ModalOverlay } from '../modal-overlay/modal-overlay';

const modalRoot = document.getElementById("modals") as HTMLDivElement;

interface IModal extends IModalOverlay{
	children: React.ReactNode,
	title?: string,
}

export function Modal ({title, children, onClose}:IModal){

	useEffect(() => {
		window.addEventListener("keyup", handleClose)
		return () => {
			window.removeEventListener("keyup", handleClose)
		}
	  },[])

	  useEffect(() => {
		document.body.style.overflow = "hidden"
		return () => {
	  		document.body.style.overflow = "visible"
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
						{title && <p className="text text_type_main-large" data-testid="modal_title">{title}</p>}
						<div className={clsx(s.close)} onClick={onClose} data-testid="modal_close">
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