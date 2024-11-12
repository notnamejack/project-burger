import { number } from 'prop-types';
import { addOrder, deleteOrder, initialState, orderSplice } from './reducer';

const order = {
	name: 'Краторный фалленианский бургер',
	number: '59038',
};

describe('Сheck create order', () => {
	it('Should return the initial state', () => {
		expect(orderSplice.reducer(undefined, { type: '' })).toEqual(initialState);
	});

	it('Open modal create order', () => {
		expect(
			orderSplice.reducer(
				initialState,
				addOrder({ name: order.name, order: { number: order.number } })
			)
		).toEqual({
			...initialState,
			orderDetail: { name: order.name, order: { number: order.number } },
		});
	});

	it('Close modal details ingredient', () => {
		expect(
			orderSplice.reducer(
				{
					...initialState,
					orderDetail: { name: order.name, order: { number: order.number } },
				},
				deleteOrder()
			)
		).toEqual(initialState);
	});
});
