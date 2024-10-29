import clsx from 'clsx';
import s from './order.module.scss';
import { OrderCard } from "../../components";
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../services/store';
import { wsMyConnect, wsMyDisconnect } from '../../services/my-orders/actions';
import { getMyOrders } from '../../services/my-orders/slice';
import { useLocation, useNavigate } from 'react-router-dom';
import { apiConfig } from '../../utils/apiConfig';

const WS_URL = apiConfig.wsMyOrder;

export function Orders(){
	const navigate = useNavigate();
	const location = useLocation();

	const dispatch = useAppDispatch();
	const orders = useAppSelector(getMyOrders);

	useEffect(() => {
		dispatch(wsMyConnect(`${WS_URL}?token=${localStorage.getItem('accessToken')}`));
		return () => {
			dispatch(wsMyDisconnect());
		}
	},[])

	return(
		<div className={clsx(s.container)}>
			{orders?.map(order =>
				<OrderCard
					key={order._id}
					order={order}
					activeStatus={true}
					onClick={() => navigate(`${order.number}`, {state:{backgroundLocation: location }})}/>
			)}
		</div>
	)
}