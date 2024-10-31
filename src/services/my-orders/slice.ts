import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import { ITapeOrders } from "../tape-orders/slice";


export type TMyOrdersStore = {
	orders: ITapeOrders | null
    connectionError: string | null;
}

const initialState: TMyOrdersStore = {
    orders: null,
    connectionError: null,
};

export const myOrdersSlice = createSlice({
    name: "myOrders",
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
        getMyOrders: (state) => state.orders?.orders,
    }
});

export const { wsError, wsMessage } = myOrdersSlice.actions;
export const { getMyOrders } = myOrdersSlice.selectors;