
import { Counter, CurrencyIcon, Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import clsx from 'clsx';
import s from './igredients.module.scss';
import { IIngredients } from "../../data/ingredients";

interface IIngredientItem{
	title: string;
	items: IIngredients[],
	selectIngredients: IIngredients[],
	handlerAdd: (value: IIngredients) => void
}

export function Ingredient ({title, items, selectIngredients, handlerAdd}: IIngredientItem){
	return (
		<>
			<p className="text text_type_main-medium mb-6">{title}</p>
			<ul className={`${clsx(s.items)} pl-1`}>
				{items.map(item =>
					<li key={item._id} className={clsx(s.item)} onClick={() => handlerAdd(item)}>
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