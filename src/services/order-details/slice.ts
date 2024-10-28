

import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IIngredients } from '../../data/ingredients'
import { orderDetailsUpdate } from './order-details-update'
import { IOrders, ITapeOrders } from '../tape-orders/slice'

interface IOrderDetailsState {
	orderDetail: IOrderDetails | null
}

export interface IOrderDetails{
	name: string,
	number: number,
	date: Date,
	ingredients: IOrderIngredients[]
}

export interface IOrderIngredients{
	_id: string,
	count: number
}

const initialState: IOrderDetailsState = {
	orderDetail: null
}

export const orderDetailsSplice = createSlice({
	name: 'orderdetails',
	initialState,
	reducers: {
		addOrderDetails: (state, action: PayloadAction<IOrders>) => {
		  state.orderDetail = orderDetailsUpdate(state.orderDetail, action.payload);
		},
	},
  })

export const { addOrderDetails } = orderDetailsSplice.actions