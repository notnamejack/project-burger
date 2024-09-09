import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { IIngredients } from '../data/ingredients'

interface IngredientDetailsState {
  item: IIngredients | null,
  isOpen: boolean,
}

interface IngredientDetails{
	item: IIngredients
}

const initialState: IngredientDetailsState = {
	item: null,
	isOpen: false,
}

const ingredientsDetailsSlice = createSlice({
	name: 'ingredientsDetails',
	initialState,
	reducers: {
	  openModal: (state, action: PayloadAction<IngredientDetails>) => {
		state.item = action.payload.item,
		state.isOpen = true
	  },
	  closeModal: (state) => {
		state.item = null,
		state.isOpen = false
	  },
	},
  })

export const { openModal, closeModal } = ingredientsDetailsSlice.actions

export default ingredientsDetailsSlice.reducer