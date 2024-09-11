import { createSlice } from '@reduxjs/toolkit'

interface OrderState {
	isOpen: boolean,
}

const initialState: OrderState = {
	isOpen: false
}

export const orderSplice = createSlice({
	name: 'order',
	initialState,
	reducers: {
		openModal: (state) => {
		  state.isOpen = true
		},
		closeModal: (state) => {
		  state.isOpen = false
		},
	},
  })

export const { openModal, closeModal } = orderSplice.actions