import { IIngredients } from '../../data/ingredients';
import {
	deleteAll,
	deleteItem,
	ingredientsSelectSlice,
	initialState,
	moveItem,
	setBun,
	setIngredient,
} from './reducer';

const ingredients: IIngredients[] = [
	{
		calories: 4242,
		carbohydrates: 242,
		fat: 142,
		image: 'https://code.s3.yandex.net/react/code/meat-01.png',
		image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png',
		image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
		name: 'Биокотлета из марсианской Магнолии',
		price: 424,
		proteins: 420,
		type: 'main',
		__v: 0,
		_id: '643d69a5c3f7b9001cfa0941',
		index: 'ingredients_1',
	},
	{
		calories: 4242,
		carbohydrates: 242,
		fat: 142,
		image: 'https://code.s3.yandex.net/react/code/meat-01.png',
		image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png',
		image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
		name: 'Биокотлета из марсианской Магнолии',
		price: 424,
		proteins: 420,
		type: 'main',
		__v: 0,
		_id: '643d69a5c3f7b9001cfa0941',
		index: 'ingredients_2',
	},
];

const bun: IIngredients = {
	calories: 420,
	carbohydrates: 53,
	fat: 24,
	image: 'https://code.s3.yandex.net/react/code/bun-02.png',
	image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
	image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
	name: 'Краторная булка N-200i',
	price: 1255,
	proteins: 80,
	type: 'bun',
	__v: 0,
	_id: '643d69a5c3f7b9001cfa093c',
};

describe('Сheck constructor ingredients', () => {
	it('Should return the initial state', () => {
		expect(ingredientsSelectSlice.reducer(undefined, { type: '' })).toEqual(
			initialState
		);
	});

	it('Add ingredient', () => {
		expect(
			ingredientsSelectSlice.reducer(initialState, {
				type: setIngredient.type,
				payload: ingredients[0],
			})
		).toEqual({
			...initialState,
			items: [ingredients[0]],
		});
	});

	it('Add bun', () => {
		expect(ingredientsSelectSlice.reducer(initialState, setBun(bun))).toEqual({
			...initialState,
			bun: bun,
		});
	});

	it('delete ingredient', () => {
		expect(
			ingredientsSelectSlice.reducer(
				{ ...initialState, items: [ingredients[0]] },
				deleteItem({ item: ingredients[0] })
			)
		).toEqual(initialState);
	});

	it('delete all', () => {
		expect(
			ingredientsSelectSlice.reducer(
				{ ...initialState, items: ingredients, bun: bun },
				deleteAll()
			)
		).toEqual(initialState);
	});

	it('move ingredient', () => {
		expect(
			ingredientsSelectSlice.reducer(
				{ ...initialState, items: ingredients },
				moveItem({ toIndex: 0, fromIndex: ingredients.length - 1 })
			)
		).toEqual({ ...initialState, items: ingredients.reverse() });
	});
});
