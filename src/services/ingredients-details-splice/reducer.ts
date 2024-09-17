import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { IIngredients } from '../../data/ingredients'

interface IngredientDetailsState {
  item: IIngredients | null,
}

interface IngredientDetails{
	item: IIngredients
}

const initialState: IngredientDetailsState = {
	item: null,
}

export const ingredientsDetailsSlice = createSlice({
	name: 'ingredientsDetails',
	initialState,
	reducers: {
	  openModal: (state, action: PayloadAction<IngredientDetails>) => {
		state.item = action.payload.item
	  },
	  closeModal: (state) => {
		state.item = null
	  },
	},
  })

export const { openModal, closeModal } = ingredientsDetailsSlice.actions
