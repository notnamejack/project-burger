import clsx from 'clsx';
import s from './burger-ingredients-constructor.module.scss';
import { useAppSelector } from '../../services/store';
import { BurgerIngredientConstructor } from '../burger-ingredient-constructor/burger-ingredient-constructor';

interface IBurgerConstructor {
	height: number;
}

export function BurgerIngredientsConstructor({ height }: IBurgerConstructor) {
	const selectIngredients = useAppSelector(
		(state) => state.ingredientsSelect.items
	);

	return (
		<ul
			className={clsx(s.items)}
			style={{
				height:
					height - 484 < selectIngredients.length * 90 ? height - 524 : 'auto',
				paddingRight: height - 484 < selectIngredients.length * 90 ? 0 : 15,
			}}>
			{selectIngredients.map((item, index) => (
				<BurgerIngredientConstructor
					ingredient={item}
					index={index}
					key={item.index}
				/>
			))}
		</ul>
	);
}
