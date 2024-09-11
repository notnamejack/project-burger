
import clsx from 'clsx';
import s from './igredients.module.scss';
import { useSelector } from "react-redux";
import { RootState } from "../../services/store";
import Ingredient from "../ingredient";
import { useGetIngredientsQuery } from '../../services/ingredients/api';
import { IIngredients } from '../../data/ingredients';

interface IIngredientItem{
	title: string;
	type: string,
}

interface IIngredientDate{
	data: IIngredients[];
}

export function Ingredients ({title, type}: IIngredientItem){

	const {data} = useGetIngredientsQuery();

	const selectIngredients = useSelector((state: RootState) => state.ingredientsSelect.items)
	const bun = useSelector((state: RootState) => state.ingredientsSelect.bun)

	return (
		<>
			<p className="text text_type_main-medium mb-6">{title}</p>
			<ul className={`${clsx(s.items)} pl-1`}>
				{data?.data.filter(i => i.type === type).map(item =>
					<Ingredient key={item._id} ingredient={item} count={item === bun ? 2 : selectIngredients.filter(i => i._id === item._id).length}/>
				)}
			</ul>
		</>
	)
}