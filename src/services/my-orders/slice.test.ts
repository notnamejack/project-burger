import { order } from "../order-details/slice.test";
import { ITapeOrders } from "../tape-orders/slice";
import { getMyOrders, initialState, myOrdersSlice, wsError, wsMessage } from "./slice";

const message:ITapeOrders = {
	success: true,
	orders: [ order ],
	total: 59321,
	totalToday: 109
  }

describe('Сheck my order', () => {
	it('Should return the initial state', () => {
        expect(myOrdersSlice.reducer(undefined, {type: ""})).toEqual(initialState);
    });

	it('Error websoket', () => {
		const error = "Error"
		expect(myOrdersSlice.reducer(initialState, wsError(error))).toEqual({
			...initialState,
			connectionError: error
		});
	});

	it('Get message websoket', () => {
		expect(myOrdersSlice.reducer(initialState, wsMessage(message))).toEqual({
			...initialState,
			orders: message
		});
	});

	it('Check selector null', () => {
		expect(getMyOrders({myOrders: initialState})).toEqual(undefined);
	});

	it('Check selector my order', () => {
		expect(getMyOrders({myOrders: {...initialState, orders: message}})).toEqual(message.orders);
	});
});