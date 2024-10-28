import clsx from 'clsx';
import s from './order-card.module.scss';
import { CurrencyIcon, FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';
import { IOrders } from '../../services/tape-orders/slice';
import { useEffect, useState } from 'react';
import { useAppSelector } from '../../services/store';
import { useGetIngredientsQuery } from '../../services/ingredients/api';
import { IIngredients } from '../../data/ingredients';

interface IOrderCard{
	activeStatus?: boolean
	order: IOrders,
	onClick?: () => void
}


export function OrderCard({activeStatus, order, onClick}:IOrderCard){

	const [total, setTotal] = useState(0);
	const {data} = useGetIngredientsQuery();

	useEffect(() => {
		let totalAll = 0;
		order.ingredients.forEach(item => {
			const find = data?.data.find(i => i._id === item);
			if(!find){return (undefined)};
			totalAll += find.price;
		})
		setTotal(totalAll);
	}, [data?.data, order])

	return(
		<div className={clsx(s.container)} onClick={onClick}>
			<div className={clsx(s.header)}>
				<p className="text text_type_digits-default">{`#${order.number}`}</p>
				<FormattedDate date={new Date(order.updatedAt)} className='text text_type_main-default text_color_inactive'/>
			</div>
			<div>
			<p className="text text_type_main-medium">
				{order.name}
			</p>
			{activeStatus &&
			<p className="text text_type_main-small">
				Создан
			</p>}
			</div>
			<div className={clsx(s.body)}>
				<ul className={clsx(s.items)}>
					{order.ingredients.length > 5 &&
						<ImageOrder key={order.ingredients.at(-1)} id={order.ingredients.at(-1) || ''} count={order.ingredients.length - 5}/>
					}
					{order.ingredients.map((ingredient, index) =>
						(index <= 5 && <ImageOrder key={ingredient} id={ingredient}/>)
					)}
				</ul>
				<div className={clsx(s.total)}>
					<p className="text text_type_digits-default">{`${total} `}<CurrencyIcon type="primary" /></p>
				</div>
			</div>
		</div>
	)
}

export function ImageOrder({id, count}:{id: string, count?: number}){
	const {data} = useGetIngredientsQuery();
	const [ingredient, setIngredient] = useState<IIngredients>()
	useEffect(() => {
		const find = data?.data.find(i => i._id == id);
		console.log(find)
		if(!find){return (undefined)};
		setIngredient(find);
	},[data])

	return (
		<li className={clsx(s.item, count && s.other)}>
			<img src={ingredient?.image_mobile}/>
			{count && <span>
				<p className="text text_type_digits-default">+{count}</p>
			</span>}
		</li>
	)
}
