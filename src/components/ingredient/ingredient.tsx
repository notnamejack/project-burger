
import { Counter, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import clsx from 'clsx';
import s from './igredient.module.scss';
import { IIngredients } from "../../data/ingredients";
import { useDispatch } from "react-redux";
import { useDrag } from "react-dnd";
import { openModal } from "../../services/ingredients-details-splice";

interface IIngredient {
	ingredient: IIngredients,
	count: number
}

export function Ingredient ({ingredient, count}: IIngredient){
	const dispatch = useDispatch()

	const [{ opacity }, ref] = useDrag({
		type: 'ingredient',
		item: ingredient,
		collect: monitor => ({
			opacity: monitor.isDragging() ? 0.5 : 1
			})
	  });

	return (
		<li key={ingredient._id} className={clsx(s.item)} onClick={() => dispatch(openModal({item: ingredient}))} ref={ref}>
			{count > 0 && <Counter count={count} size="default" extraClass="m-1" />}
			<img alt={ingredient.name} src={ingredient.image}/>
			<p className="text text_type_digits-default">{ingredient.price}<CurrencyIcon type="primary"/></p>
			<p className="text text_type_main-default">{ingredient.name}</p>
		</li>
	)
}