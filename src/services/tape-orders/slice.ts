import {createSlice, PayloadAction} from "@reduxjs/toolkit";


export interface ITapeOrders{
	success: boolean,
	orders: IOrders[],
	total: number,
	totalToday: number
}

export interface IOrders{
	ingredients: string[],
	_id: string,
	status: string,
	name: string,
	number: number,
	createdAt: Date,
	updatedAt: Date
}

export type TTapeOrdersStore = {
	orders: ITapeOrders | null
    connectionError: string | null;
}

export const initialState: TTapeOrdersStore = {
    orders: null,
    connectionError: null,
};

export const tapeOrdersSlice = createSlice({
    name: "tapeOrders",
    initialState,
    reducers: {
        wsError: (state, action: PayloadAction<string>) => {
            state.connectionError = action.payload;
        },
        wsMessage: (state, action: PayloadAction<ITapeOrders>) => {
            state.orders = action.payload;
        }
    },
    selectors: {
        getTapeOrders: (state) => state.orders?.orders,
		getTotal: (state) => state.orders?.total,
		getTotalToday: (state) => state.orders?.totalToday,
    }
});

export const { wsError, wsMessage } = tapeOrdersSlice.actions;
export const { getTapeOrders, getTotal, getTotalToday } = tapeOrdersSlice.selectors;