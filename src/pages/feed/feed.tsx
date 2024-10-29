import clsx from 'clsx';
import s from './feed.module.scss';
import { OrderCard } from '../../components';
import { useAppDispatch, useAppSelector } from '../../services/store';
import { useEffect } from 'react';
import { wsConnect, wsDisconnect } from '../../services/tape-orders/actions';
import { getTapeOrders, getTotal, getTotalToday } from '../../services/tape-orders/slice';
import { useLocation, useNavigate } from 'react-router-dom';
import { apiConfig } from '../../utils/apiConfig';

const WS_URL = apiConfig.wsOrder;

export function Feed(){
	const navigate = useNavigate();
	const location = useLocation();

	const dispatch = useAppDispatch();
	const orders = useAppSelector(getTapeOrders);
	const total = useAppSelector(getTotal);
	const totalToday = useAppSelector(getTotalToday);
	const orderDone = useAppSelector(state => state.tapeOrders.orders?.orders
		.filter(i => i.status.toLocaleUpperCase() === 'done'.toLocaleUpperCase()).splice(0,10) || []);
	const orderCreated = useAppSelector(state => state.tapeOrders.orders?.orders
		.filter(i => i.status.toLocaleUpperCase() === 'created'.toLocaleUpperCase()).splice(0,10) || [])


	useEffect(() => {
		dispatch(wsConnect(WS_URL));
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
						<OrderCard
							key={order._id}
							order={order}
							onClick={() => navigate(`${order.number}`, {state:{backgroundLocation: location }})}/>
					)}
				</div>
				<div className={clsx(s.panel)}>
					<div className={clsx(s.work)}>
						<div className={clsx(s.list, s.done)}>
							<p className="text text_type_main-medium mb-6">
								Готовы:
							</p>
							<ul>
								{orderDone?.map(order =>
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
								{orderCreated?.map(order =>
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
							<p className={`${clsx(s.result)} text text_type_digits-large`}>{total || ''}</p>
						</div>
						<div>
							<p className="text text_type_main-medium">
								Выполнено за сегодня:
							</p>
							<p className={`${clsx(s.result)} text text_type_digits-large`}>{totalToday || ''}</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}