import { order } from '../order-details/slice.test';
import {
	getTapeOrders,
	getTotal,
	getTotalToday,
	ITapeOrders,
	tapeOrdersSlice,
	initialState,
	wsError,
	wsMessage,
} from '../tape-orders/slice';

const message: ITapeOrders = {
	success: true,
	orders: [order],
	total: 59321,
	totalToday: 109,
};

describe('Сheck my order', () => {
	it('Should return the initial state', () => {
		expect(tapeOrdersSlice.reducer(undefined, { type: '' })).toEqual(
			initialState
		);
	});

	it('Error websoket', () => {
		const error = 'Error';
		expect(tapeOrdersSlice.reducer(initialState, wsError(error))).toEqual({
			...initialState,
			connectionError: error,
		});
	});

	it('Get message websoket', () => {
		expect(tapeOrdersSlice.reducer(initialState, wsMessage(message))).toEqual({
			...initialState,
			orders: message,
		});
	});

	it('Check selector null', () => {
		expect(getTapeOrders({ tapeOrders: initialState })).toEqual(undefined);
	});

	it('Check selector tape order', () => {
		expect(
			getTapeOrders({ tapeOrders: { ...initialState, orders: message } })
		).toEqual(message.orders);
	});

	it('Check selector total', () => {
		expect(
			getTotal({ tapeOrders: { ...initialState, orders: message } })
		).toEqual(message.total);
	});

	it('Check selector total null', () => {
		expect(getTotal({ tapeOrders: initialState })).toEqual(undefined);
	});

	it('Check selector total today', () => {
		expect(
			getTotalToday({ tapeOrders: { ...initialState, orders: message } })
		).toEqual(message.totalToday);
	});

	it('Check selector total today null', () => {
		expect(getTotalToday({ tapeOrders: initialState })).toEqual(undefined);
	});
});
