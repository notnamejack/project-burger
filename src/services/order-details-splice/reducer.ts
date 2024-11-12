import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface OrderState {
	orderDetail: IOrder | null
}

interface IOrder{
	name: string,
	order: IOrderDetails
}

interface IOrderDetails{
	number:string
}

export const initialState: OrderState = {
	orderDetail: null
}

export const orderSplice = createSlice({
	name: 'order',
	initialState,
	reducers: {
		addOrder: (state, action: PayloadAction<IOrder>) => {
		  state.orderDetail = action.payload
		},
		deleteOrder: (state) => {
			state.orderDetail = null
		},
	},
  })

export const { addOrder, deleteOrder } = orderSplice.actions