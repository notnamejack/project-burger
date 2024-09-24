
import clsx from 'clsx';
import s from './ingredient-details.module.scss';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../../services/store';
import { useEffect } from 'react';
import { openModal } from '../../services/ingredients-details-splice/reducer';
import { useLocation, useParams } from 'react-router-dom';
import { useGetIngredientsQuery } from '../../services/ingredients/api';

export function IngredientDetails (){
	const ingredient = useSelector((state: RootState) => state.ingredientsDetails.item);
	const {data} = useGetIngredientsQuery();
	const dispatch = useAppDispatch();

	const params = useParams()
	let location = useLocation();
	let state = location.state as { backgroundLocation?: Location };

	useEffect(() => {
		const copy = data?.data.find(i => i._id.toLocaleUpperCase() === params.ingredientId?.toLocaleUpperCase());
		if(copy){
			dispatch(openModal({item: copy}))
		}
	}, [params, data])

	return (
		<div className={`${clsx(s.container)} ${(!state?.backgroundLocation) && clsx(s.notmodal)}`}>
			{(!state?.backgroundLocation) && <p className="text text_type_main-large">Детали ингредиента</p>}
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