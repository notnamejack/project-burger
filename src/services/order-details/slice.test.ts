import { IOrders } from "../tape-orders/slice";
import { getOrder } from "./actions";
import { addOrderDetails, deleteOrderDetails, initialState, IOrderDetails, orderDetailsSplice } from "./slice";

export const order: IOrders = {
	_id: "6731a1ccb27b06001c3e7881",
	ingredients: [
		"643d69a5c3f7b9001cfa093c",
		"643d69a5c3f7b9001cfa0947",
		"643d69a5c3f7b9001cfa0947",
		"643d69a5c3f7b9001cfa093c"
	],
	status: "done",
	name: "Краторный фалленианский бургер",
	createdAt: new Date("2024-11-11T06:18:52.723Z"),
	updatedAt: new Date("2024-11-11T06:18:53.432Z"),
	number: 59038,
}

const orderDetail: IOrderDetails = {
	number: 59038,
	name: "Краторный фалленианский бургер",
	date: new Date("2024-11-11T06:18:53.432Z"),
	status: "done",
	ingredients: [{
		_id: "643d69a5c3f7b9001cfa093c",
		count: 2
	},{
		_id: "643d69a5c3f7b9001cfa0947",
		count: 2
	}]
}

describe("Сheck order details", () => {
	it('Should return the initial state', () => {
        expect(orderDetailsSplice.reducer(undefined, {type: ""})).toEqual(initialState);
    });

	it('Open modal details order', () => {
		expect(orderDetailsSplice.reducer(initialState, addOrderDetails(order))).toEqual({
			...initialState,
			orderDetail: orderDetail
		});
	});

	it('Close modal details order', () => {
		expect(orderDetailsSplice.reducer({ ...initialState, orderDetail: orderDetail}, deleteOrderDetails())).toEqual(initialState);
	});

	it('Pending details order', () => {
		expect(orderDetailsSplice.reducer(initialState, getOrder.pending('', {} as number))).toEqual({...initialState, loading: true});
	});

	it('Fulfilled details order', () => {
		expect(orderDetailsSplice.reducer(initialState, getOrder.fulfilled(order, '', {} as number))).toEqual({...initialState, orderDetail: orderDetail});
	});

	it('Rejected details order', () => {
		const message = 'Заказ отсутсует';
		expect(orderDetailsSplice.reducer(initialState, getOrder.rejected(new Error(message),'', {} as number))).toEqual({...initialState, error: message});
	});

	it('Rejected details order (message undefined)', () => {
		expect(orderDetailsSplice.reducer(initialState, getOrder.rejected( new Error(undefined) ,'', {} as number))).toEqual({...initialState, error: null});
	});
})