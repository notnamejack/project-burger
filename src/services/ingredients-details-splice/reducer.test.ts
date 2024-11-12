import { IIngredients } from '../../data/ingredients';
import {
	closeModal,
	ingredientsDetailsSlice,
	initialState,
	openModal,
} from './reducer';

const ingredient: IIngredients = {
	_id: '643d69a5c3f7b9001cfa093e',
	name: 'Филе Люминесцентного тетраодонтимформа',
	type: 'main',
	proteins: 44,
	fat: 26,
	carbohydrates: 85,
	calories: 643,
	price: 988,
	image: 'https://code.s3.yandex.net/react/code/meat-03.png',
	image_mobile: 'https://code.s3.yandex.net/react/code/meat-03-mobile.png',
	image_large: 'https://code.s3.yandex.net/react/code/meat-03-large.png',
	__v: 0,
};

describe('Сheck ingredient details', () => {
	it('Should return the initial state', () => {
		expect(ingredientsDetailsSlice.reducer(undefined, { type: '' })).toEqual(
			initialState
		);
	});

	it('Open modal details ingredient', () => {
		expect(
			ingredientsDetailsSlice.reducer(
				initialState,
				openModal({ item: ingredient })
			)
		).toEqual({
			...initialState,
			item: ingredient,
		});
	});

	it('Close modal details ingredient', () => {
		expect(
			ingredientsDetailsSlice.reducer(
				{ ...initialState, item: ingredient },
				closeModal()
			)
		).toEqual(initialState);
	});
});
