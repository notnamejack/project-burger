import clsx from 'clsx';
import s from './feed.module.scss';
import { OrderCard } from '../../components';
import { useAppDispatch, useAppSelector } from '../../services/store';
import { useEffect } from 'react';
import { wsConnect, wsDisconnect } from '../../services/tape-orders/actions';
import { getTapeOrders, getTotal, getTotalToday } from '../../services/tape-orders/slice';

export function Feed(){

	const dispatch = useAppDispatch();
	const orders = useAppSelector(getTapeOrders);
	const total = useAppSelector(getTotal);
	const totalToday = useAppSelector(getTotalToday);

	useEffect(() => {
		dispatch(wsConnect("wss://norma.nomoreparties.space/orders/all"))
		return () => {
			dispatch(wsDisconnect());
		}
	},[])

	return(
		<div className={clsx(s.container)}>
			<p className="text text_type_main-large mb-5 mt-10">
				Лента заказов
			</p>
			<div className={clsx(s.body)}>
				<div className={clsx(s.orders)}>
					{orders?.map(order =>
						<OrderCard key={order._id} order={order}/>
					)}
				</div>
				<div className={clsx(s.panel)}>
					<div className={clsx(s.work)}>
						<div className={clsx(s.list, s.done)}>
							<p className="text text_type_main-medium mb-6">
								Готовы:
							</p>
							<ul>
								{orders?.filter(i => i.status.toLocaleUpperCase() === 'done'.toLocaleUpperCase())
									.splice(0, 10)
									.map(order =>
									<li key={`${order._id}_done`}>
										<p className="text text_type_digits-default">{order.number}</p>
									</li>
								)}
							</ul>
						</div>
						<div className={clsx(s.list)}>
							<p className="text text_type_main-medium mb-6">
								В работе:
							</p>
							<ul>
								{orders?.filter(i => i.status.toLocaleUpperCase() === 'created'.toLocaleUpperCase())
									.splice(0, 10)
									.map(order =>
									<li key={`${order._id}_pending`}>
										<p className="text text_type_digits-default">{order.number}</p>
									</li>
								)}
							</ul>
						</div>
					</div>
					<div className={clsx(s.history)}>
						<div>
							<p className="text text_type_main-medium">
								Выполнено за все время:
							</p>
							<p className={`${clsx(s.result)} text text_type_digits-large`}>{`${total}`}</p>
						</div>
						<div>
							<p className="text text_type_main-medium">
								Выполнено за сегодня:
							</p>
							<p className={`${clsx(s.result)} text text_type_digits-large`}>{`${totalToday}`}</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}