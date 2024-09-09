import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { IIngredients } from '../data/ingredients'

interface IngredientsState {
  items: IIngredients[]
}

const initialState: IngredientsState = {
	items: [],
}

const ingredientsSlice = createSlice({
	name: 'ingredients',
	initialState,
	reducers: {
	  setItems: (state, action: PayloadAction<IIngredients[]>) => {
		state.items = action.payload
	  },
	},
  })

export const { setItems } = ingredientsSlice.actions

export default ingredientsSlice.reducer