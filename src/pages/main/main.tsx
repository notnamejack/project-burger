import { useEffect, useState } from 'react';
import clsx from 'clsx';
import s from './main.module.scss';

import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useAppDispatch, useAppSelector } from '../../services/store';
import {
	BurgerConstructor,
	BurgerIngredients,
	Modal,
	OrderDetails,
} from '../../components';
import { deleteOrder } from '../../services/order-details-splice/reducer';
import { deleteAll } from '../../services/ingredients-select-splice/reducer';

export function Main() {
	const [height, setHeight] = useState(
		window.document.documentElement.clientHeight
	);
	const order = useAppSelector((state) => state.order.orderDetail);
	const dispatch = useAppDispatch();

	useEffect(() => {
		window.addEventListener('resize', trackMousePos);
		return () => {
			window.removeEventListener('resize', trackMousePos);
		};
	}, []);

	const trackMousePos = () => {
		setHeight(window.document.documentElement.clientHeight);
	};

	return (
		<div className={clsx(s.container)}>
			<DndProvider backend={HTML5Backend}>
				<BurgerIngredients height={height} />
				<BurgerConstructor height={height} />
			</DndProvider>
			{order && (
				<Modal
					onClose={() => {
						dispatch(deleteOrder()), dispatch(deleteAll());
					}}>
					<OrderDetails />
				</Modal>
			)}
		</div>
	);
}
