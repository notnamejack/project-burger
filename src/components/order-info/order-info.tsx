import clsx from 'clsx';
import s from './order-info.module.scss';
import { CurrencyIcon, FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';
import { useLocation, useParams } from 'react-router-dom';
import { useEffect, useMemo, useState } from 'react';
import { getTapeOrders, IOrders } from '../../services/tape-orders/slice';
import { useAppDispatch, useAppSelector } from '../../services/store';
import { getMyOrders } from '../../services/my-orders/slice';
import { useGetIngredientsQuery } from '../../services/ingredients/api';
import { addOrderDetails, IOrderIngredients } from '../../services/order-details/slice';
import { IIngredients } from '../../data/ingredients';

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
			<p className={`${(state?.backgroundLocation) && clsx(s.left)} text text_type_main-medium`}>
				#{orderDetail?.number}
			</p>
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

export function OrderInfoData({ingredientOrder}:{ingredientOrder: IOrderIngredients}){

	const {data} = useGetIngredientsQuery();
	const [ingredient, setIngredient] = useState<IIngredients>()
	useEffect(() => {
		const find = data?.data.find(i => i._id == ingredientOrder._id);
		if(!find){return (undefined)};
		setIngredient(find);
	},[data])

	return(
		<li className={clsx(s.item)}>
			<img src={ingredient?.image_mobile}/>
			<p className="text text_type_main-default">
				{ingredient?.name}
			</p>
			<div className={clsx(s.total)}>
				<p className="text text_type_digits-default">{`${ingredientOrder.count} x ${ingredient?.price} `}<CurrencyIcon type="primary" /></p>
			</div>
		</li>
	)
}