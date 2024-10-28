import clsx from 'clsx';
import s from './order-info.module.scss';
import { CurrencyIcon, FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';
import { useLocation, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getTapeOrders, IOrders } from '../../services/tape-orders/slice';
import { useAppDispatch, useAppSelector } from '../../services/store';
import { getMyOrders } from '../../services/my-orders/slice';
import { useGetIngredientsQuery } from '../../services/ingredients/api';
import { addOrderDetails } from '../../services/order-details/slice';

export function OrderInfo(){
	const params = useParams()
	const location = useLocation();
	const state = location.state as { backgroundLocation?: Location };

	const dispatch = useAppDispatch();
	const tapeOrders = useAppSelector(getTapeOrders);
	const myOrders = useAppSelector(getMyOrders);
	const {orderDetail} = useAppSelector(state => state.orderDetails)
	const {data} = useGetIngredientsQuery();

	const [total, setTotal] = useState(0);

	useEffect(() => {
		let find = tapeOrders?.find(i => i._id.toLocaleUpperCase() === params.id?.toLocaleUpperCase());
		if(!find){
			find = myOrders?.find(i => i._id.toLocaleUpperCase() === params.id?.toLocaleUpperCase())
			if(!find){
				// getMyOrders();
			}
			else{
				dispatch(addOrderDetails(find));
			}
		}
		else{
			dispatch(addOrderDetails(find));
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

	return(
		<div className={`${clsx(s.container)} ${(!state?.backgroundLocation) && clsx(s.notmodal)}`}>
			<p className={`${(state?.backgroundLocation) && clsx(s.left)} text text_type_main-medium`}>
				#{orderDetail?.number}
			</p>
			<div className={clsx(s.body)}>
				<div className={clsx(s.header)}>
					<p className="text text_type_main-medium">
						{orderDetail?.name}
					</p>
					<p className="text text_type_main-default">
						Выполнен
					</p>
				</div>
				<div className={clsx(s.order)}>
					<p className="text text_type_main-large">
						Состав:
					</p>
					<ul className={clsx(s.items)}>
						{orderDetail?.ingredients.map(ingredients =>
							<OrderInfoData/>
						)}
					</ul>
				</div>
			</div>
			<div className={clsx(s.footer)}>
				<FormattedDate date={new Date(orderDetail?.date || '')} className='text text_type_main-default text_color_inactive'/>
				<div className={clsx(s.total)}>
					<p className="text text_type_digits-default">{`${total} `}<CurrencyIcon type="primary" /></p>
				</div>
			</div>
		</div>
	)
}

export function OrderInfoData(){
	return(
		<li className={clsx(s.item)}>
			<img src='https://code.s3.yandex.net/react/code/bun-02-mobile.png'/>
			<p className="text text_type_main-default">
				Флюоресцентная булка R2-D3
			</p>
			<div className={clsx(s.total)}>
				<p className="text text_type_digits-default">{`${2} x ${480} `}<CurrencyIcon type="primary" /></p>
			</div>
		</li>
	)
}