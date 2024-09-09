
import { Counter, CurrencyIcon, Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import clsx from 'clsx';
import s from './igredients.module.scss';
import { IIngredients } from "../../data/ingredients";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { addItem } from "../../services/ingredients-select-splice";

interface IIngredientItem{
	title: string;
	type: string,
}

export function Ingredient ({title, type}: IIngredientItem){

	const ingredients = useSelector((state: RootState) => state.ingredients.items)
	const selectIngredients = useSelector((state: RootState) => state.ingredientsSelect.items)
	const dispatch = useDispatch()

	return (
		<>
			<p className="text text_type_main-medium mb-6">{title}</p>
			<ul className={`${clsx(s.items)} pl-1`}>
				{ingredients.filter(i => i.type === type).map(item =>
					<li key={item._id} className={clsx(s.item)} onClick={() => dispatch(addItem({item, type: item.type}))}>
						{selectIngredients.find(i => i._id === item._id) && <Counter count={selectIngredients.filter(i => i._id === item._id).length}
						size="default" extraClass="m-1" />}
						<img alt={item.name} src={item.image}/>
						<p className="text text_type_digits-default">{item.price}<CurrencyIcon type="primary"/></p>
						<p className="text text_type_main-default">{item.name}</p>
					</li>
				)}
			</ul>
		</>
	)
}