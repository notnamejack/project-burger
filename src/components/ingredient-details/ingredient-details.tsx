
import clsx from 'clsx';
import s from './ingredient-details.module.scss';
import { IIngredients } from '../../data/ingredients';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';

interface IIngredientDetails{
	ingredient: IIngredients | undefined
}

export function IngredientDetails (){
	const ingredient = useSelector((state: RootState) => state.ingredientsDetails.item);

	return (
		<div className={clsx(s.container)}>
			<img className={clsx(s.img)} alt={ingredient?.name} src={ingredient?.image_large}/>
			<div className={clsx(s.description)}>
				<p className="text text_type_main-medium">{ingredient?.name}</p>
				<ul className={clsx(s.items)}>
					<li className={clsx(s.item)}>
						<p className="text text_type_main-default text_color_inactive">Калории,ккал</p>
						<p className="text text_type_main-default text_color_inactive">{ingredient?.calories}</p>
					</li>
					<li className={clsx(s.item)}>
						<p className="text text_type_main-default text_color_inactive">Белки, г</p>
						<p className="text text_type_main-default text_color_inactive">{ingredient?.proteins}</p>
					</li>
					<li className={clsx(s.item)}>
						<p className="text text_type_main-default text_color_inactive">Жиры, г</p>
						<p className="text text_type_main-default text_color_inactive">{ingredient?.fat}</p>
					</li>
					<li className={clsx(s.item)}>
						<p className="text text_type_main-default text_color_inactive">Углеводы, г</p>
						<p className="text text_type_main-default text_color_inactive">{ingredient?.carbohydrates}</p>
					</li>
				</ul>
			</div>
		</div>
	)
}