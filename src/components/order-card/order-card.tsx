import clsx from 'clsx';
import s from './order-card.module.scss';
import {
	CurrencyIcon,
	FormattedDate,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { IOrders } from '../../services/tape-orders/slice';
import { useEffect, useMemo, useState } from 'react';
import { useGetIngredientsQuery } from '../../services/ingredients/api';
import { ImageOrder } from './image-order/image-order';

interface IOrderCard {
	activeStatus?: boolean;
	order: IOrders;
	onClick?: () => void;
}

export function OrderCard({ activeStatus, order, onClick }: IOrderCard) {
	const [total, setTotal] = useState(0);
	const { data } = useGetIngredientsQuery();

	useEffect(() => {
		let totalAll = 0;
		order.ingredients.forEach((item) => {
			const find = data?.data.find((i) => i._id === item);
			if (!find) {
				return undefined;
			}
			totalAll += find.price;
		});
		setTotal(totalAll);
	}, [data?.data, order]);

	const getStatus = useMemo(() => {
		let status = '';

		switch (order.status) {
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
		return status;
	}, [order]);

	return (
		<div className={clsx(s.container)} onClick={onClick}>
			<div className={clsx(s.header)}>
				<p className='text text_type_digits-default'>{`#${order.number}`}</p>
				<FormattedDate
					date={new Date(order.updatedAt)}
					className='text text_type_main-default text_color_inactive'
				/>
			</div>
			<div className={clsx(s.status)}>
				<p className='text text_type_main-medium'>{order.name}</p>
				{activeStatus && (
					<p className={`${clsx(s.done)} text text_type_main-default`}>
						{getStatus}
					</p>
				)}
			</div>
			<div className={clsx(s.body)}>
				<ul className={clsx(s.items)}>
					{order.ingredients.length > 5 && (
						<ImageOrder
							key={order.ingredients.at(-1)}
							id={order.ingredients.at(-1) || ''}
							count={order.ingredients.length - 5}
						/>
					)}
					{order.ingredients.map(
						(ingredient, index) =>
							index <= 5 && (
								<ImageOrder key={`${ingredient}_${index}`} id={ingredient} />
							)
					)}
				</ul>
				<div className={clsx(s.total)}>
					<p className='text text_type_digits-default'>
						{`${total} `}
						<CurrencyIcon type='primary' />
					</p>
				</div>
			</div>
		</div>
	);
}
