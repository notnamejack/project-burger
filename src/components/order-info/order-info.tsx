import clsx from 'clsx';
import s from './order-info.module.scss';
import { CurrencyIcon, FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';
import { useLocation, useParams } from 'react-router-dom';
import { useEffect, useMemo, useState } from 'react';
import { getTapeOrders } from '../../services/tape-orders/slice';
import { useAppDispatch, useAppSelector } from '../../services/store';
import { getMyOrders } from '../../services/my-orders/slice';
import { useGetIngredientsQuery } from '../../services/ingredients/api';
import { addOrderDetails, deleteOrderDetails } from '../../services/order-details/slice';
import { getOrder } from '../../services/order-details/actions';
import { OrderInfoData } from './order-info-data/order-info-data';

export function OrderInfo(){
	const params = useParams()
	const location = useLocation();
	const state = location.state as { backgroundLocation?: Location };

	const dispatch = useAppDispatch();
	const tapeOrders = useAppSelector(getTapeOrders);
	const myOrders = useAppSelector(getMyOrders);
	const {orderDetail, loading, error} = useAppSelector(state => state.orderDetails)
	const {data} = useGetIngredientsQuery();

	const [total, setTotal] = useState(0);

	useEffect(() => {
		if(params.id != undefined){
			let find = tapeOrders?.find(i => i.number == Number(params.id));
			if(!find){
				find = myOrders?.find(i => i.number == Number(params.id));
				if(!find){
					dispatch(getOrder({number: Number(params.id)}))
				}
				else{
					dispatch(addOrderDetails(find));
				}
			}
			else{
				dispatch(addOrderDetails(find));
			}
			return() => {
				dispatch(deleteOrderDetails());
			}
		}
	},[params])

	useEffect(() => {
		let totalAll = 0;
		orderDetail?.ingredients.forEach(item => {
			const find = data?.data.find(i => i._id === item._id);
			if(!find){return (undefined)};
			totalAll += (find.price * item.count);
		})
		setTotal(totalAll);
	}, [data?.data, orderDetail?.ingredients])

	const getStatus = useMemo(() => {
		let status = '';
		switch(orderDetail?.status) {
			case 'created':
				status = 'Готовится';
				break;
			case 'pending':
				status = 'Отменён';
				break;
			case 'done':
				status = 'Выполнен';
				break;
		}
		return status
	}, [orderDetail])

	return(
		<div className={`${clsx(s.container)} ${(!state?.backgroundLocation) && clsx(s.notmodal)}`}>
			{!loading &&
			<p className={`${(state?.backgroundLocation) && clsx(s.left)} text text_type_main-medium`}>
				#{orderDetail?.number}
			</p>}
			{!loading &&
			<div className={clsx(s.body)}>
				<div className={clsx(s.header)}>
					<p className="text text_type_main-medium">
						{orderDetail?.name}
					</p>
					<p className={`${clsx(s.done)} text text_type_main-default`}>
						{getStatus}
					</p>
				</div>
				<div className={clsx(s.order)}>
					<p className="text text_type_main-large">
						Состав:
					</p>
					<ul className={clsx(s.items)}>
						{orderDetail?.ingredients.map(ingredient =>
							<OrderInfoData ingredientOrder={ingredient}/>
						)}
					</ul>
				</div>
			</div>}
			{!loading &&
			<div className={clsx(s.footer)}>
				<FormattedDate date={new Date(orderDetail?.date || '')} className='text text_type_main-default text_color_inactive'/>
				<div className={clsx(s.total)}>
					<p className="text text_type_digits-default">{`${total} `}<CurrencyIcon type="primary" /></p>
				</div>
			</div>}
			{loading &&
				<div className={clsx(s.loading)}>
					<span className={clsx(s.loader)}></span>
				</div>
			}
		</div>
	)
}
