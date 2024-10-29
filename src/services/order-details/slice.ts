

import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IIngredients } from '../../data/ingredients'
import { orderDetailsUpdate } from './order-details-update'
import { IOrders, ITapeOrders } from '../tape-orders/slice'
import { getOrder } from './actions'

interface IOrderDetailsState {
	orderDetail: IOrderDetails | null,
	loading: boolean,
	error: string | null
}

export interface IOrderDetails{
	name: string,
	number: number,
	date: Date,
	status: string,
	ingredients: IOrderIngredients[]
}

export interface IOrderIngredients{
	_id: string,
	count: number
}

const initialState: IOrderDetailsState = {
	orderDetail: null,
	loading: false,
	error: null
}

export const orderDetailsSplice = createSlice({
	name: 'orderdetails',
	initialState,
	reducers: {
		addOrderDetails: (state, action: PayloadAction<IOrders>) => {
		  state.orderDetail = orderDetailsUpdate(state.orderDetail, action.payload);
		},
		deleteOrderDetails: (state) =>{
			state.orderDetail = null;
		}
	},
	extraReducers: (builder) => {
		builder
			.addCase(getOrder.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(getOrder.fulfilled, (state, action: PayloadAction<IOrders>) => {
				state.orderDetail = orderDetailsUpdate(state.orderDetail, action.payload);
				state.loading = false;
			})
			.addCase(getOrder.rejected, (state, action) => {
				state.error = action.error.message || null;
				state.loading = false;
			})
	}
  })

export const { addOrderDetails, deleteOrderDetails } = orderDetailsSplice.actions