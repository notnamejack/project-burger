
import clsx from 'clsx';
import s from './igredients.module.scss';
import Ingredient from "../ingredient";
import { useGetIngredientsQuery } from '../../services/ingredients/api';

interface IIngredientItem{
	title: string;
	type: string,
}

export function Ingredients ({title, type}: IIngredientItem){

	const {data} = useGetIngredientsQuery();

	return (
		<>
			<p className="text text_type_main-medium mb-6">{title}</p>
			<ul className={`${clsx(s.items)} pl-1`}>
				{data?.data.filter(i => i.type === type).map(item =>
					<Ingredient key={item._id} ingredient={item}/>
				)}
			</ul>
		</>
	)
}