import { IOrders } from '../tape-orders/slice';
import { IOrderDetails, IOrderIngredients } from './slice';

export const orderDetailsUpdate = (
	prevTable: IOrderDetails | null,
	actions: IOrders
): IOrderDetails | null => {
	const table: IOrderDetails = {
		number: actions?.number || 0,
		name: actions?.name || '',
		date: actions?.updatedAt || new Date(),
		status: actions?.status || '',
		ingredients: [],
	};

	let ingredientCopy: IOrderIngredients[] = [];

	actions.ingredients.forEach((item) => {
		if (!ingredientCopy.find((i) => i._id === item)) {
			ingredientCopy = [
				...ingredientCopy,
				{
					_id: item,
					count: actions.ingredients.filter((i) => i === item).length,
				},
			];
		}
	});

	table.ingredients = ingredientCopy;

	return table;
};
