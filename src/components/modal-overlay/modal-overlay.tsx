import clsx from 'clsx';
import s from './modal-overlay.module.scss';

export interface IModalOverlay {
	onClose: () => void;
}

export function ModalOverlay({ onClose }: IModalOverlay) {
	return (
		<div
			className={clsx(s.back)}
			onClick={onClose}
			data-testid='modal_overlay'></div>
	);
}
