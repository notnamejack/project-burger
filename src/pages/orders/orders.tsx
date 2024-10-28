import clsx from 'clsx';
import s from './order.module.scss';
import { OrderCard } from "../../components";
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../services/store';
import { wsConnect, wsDisconnect } from '../../services/my-orders/actions';
import { getMyOrders } from '../../services/my-orders/slice';
import { useLocation, useNavigate } from 'react-router-dom';



export function Orders(){
	const navigate = useNavigate();
	const location = useLocation();

	const dispatch = useAppDispatch();
	const orders = useAppSelector(getMyOrders);

	useEffect(() => {
		dispatch(wsConnect(`wss://norma.nomoreparties.space/orders?token=${localStorage.getItem('accessToken')}`));
		return () => {
			dispatch(wsDisconnect());
		}
	},[])


	return(
		<div className={clsx(s.container)}>
			{orders?.map(order =>
				<OrderCard
					key={order._id}
					order={order}
					activeStatus={true}
					onClick={() => navigate(`${order._id}`, {state:{backgroundLocation: location }})}/>
			)}
		</div>
	)
}