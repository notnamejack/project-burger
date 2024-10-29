import { useEffect, useState } from "react";
import { IIngredients } from "../../../data/ingredients";
import { useGetIngredientsQuery } from "../../../services/ingredients/api";
import { IOrderIngredients } from "../../../services/order-details/slice";
import clsx from 'clsx';
import s from './order-info-data.module.scss';
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";

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