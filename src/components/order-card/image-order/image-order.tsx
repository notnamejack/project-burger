import { useEffect, useState } from 'react';
import { IIngredients } from '../../../data/ingredients';
import { useGetIngredientsQuery } from '../../../services/ingredients/api';
import clsx from 'clsx';
import s from './image-order.module.scss';

export function ImageOrder({ id, count }: { id: string; count?: number }) {
	const { data } = useGetIngredientsQuery();
	const [ingredient, setIngredient] = useState<IIngredients>();
	useEffect(() => {
		const find = data?.data.find((i) => i._id == id);
		if (!find) {
			return undefined;
		}
		setIngredient(find);
	}, [data]);

	return (
		<li className={clsx(s.item, count && s.other)}>
			<img src={ingredient?.image_mobile} />
			{count && (
				<span>
					<p className='text text_type_digits-default'>+{count}</p>
				</span>
			)}
		</li>
	);
}
