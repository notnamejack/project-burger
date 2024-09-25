
import { Counter, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import clsx from 'clsx';
import s from './igredient.module.scss';
import { IIngredients } from "../../data/ingredients";
import { useDrag } from "react-dnd";
import { useMemo } from "react";
import { useAppSelector } from "../../services/store";
import { useLocation, useNavigate } from "react-router-dom";

interface IIngredient {
	ingredient: IIngredients
}

export function Ingredient ({ingredient}: IIngredient){

	const selectIngredients = useAppSelector((state) => state.ingredientsSelect.items)
	const bun = useAppSelector((state) => state.ingredientsSelect.bun)
	const navigate = useNavigate();
	const location = useLocation();

	const [{ opacity }, ref] = useDrag({
		type: 'ingredient',
		item: ingredient,
		collect: monitor => ({
			opacity: monitor.isDragging() ? 0.5 : 1
			})
	  });

	const count = useMemo(() => {
		let count = 0;
		if(ingredient.type !== 'bun')
			count = selectIngredients.filter(i => i._id === ingredient._id).length;

		if(bun?._id === ingredient._id)
			count = 2

		return count
	}, [selectIngredients, bun])

	return (
		<li key={ingredient._id} className={clsx(s.item)} ref={ref}
			onClick={() => navigate(`/ingredients/${ingredient._id}`, {state:{backgroundLocation: location }})}>
				{count > 0 && <Counter count={count} size="default" extraClass="m-1" />}
				<img alt={ingredient.name} src={ingredient.image}/>
				<p className="text text_type_digits-default">{`${ingredient.price} `}<CurrencyIcon type="primary"/></p>
				<p className="text text_type_main-default">{ingredient.name}</p>
		</li>
	)
}