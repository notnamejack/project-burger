import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { IIngredients } from '../../data/ingredients'
import { v4 } from "uuid";

interface IngredientsSelectState {
  items: IIngredients[],
  bun: IIngredients | null,
}

interface IngredientState{
	item: IIngredients
}

interface IngredientMoveState{
	fromIndex: number,
	toIndex: number
}

export const initialState: IngredientsSelectState = {
	items: [],
	bun: null
} satisfies IngredientsSelectState as IngredientsSelectState

export const newGuid = (): string => v4()

export const ingredientsSelectSlice = createSlice({
	name: 'ingredientsSelect',
	initialState,
	reducers: {
	  setIngredient: {
		reducer: (state, action: PayloadAction<IIngredients>) => {
			state.items.push(action.payload);
		},
		prepare: (item: IIngredients) => {
			return {payload: {...item, index: newGuid()}}
		}
	  },
	  setBun: (state, action: PayloadAction<IIngredients>) => {
		state.bun = action.payload
	  },
	  deleteItem: (state, action: PayloadAction<IngredientState>) => {
		state.items = state.items.filter(i => i.index !== action.payload.item.index);
	  },
	  deleteAll: (state) => {
		state.items = [];
		state.bun = null;
	  },
	  moveItem: (state, action: PayloadAction<IngredientMoveState>) => {
		const ingredients = [...state.items];
   		ingredients.splice(action.payload.toIndex, 0, ingredients.splice(action.payload.fromIndex, 1)[0]);

		state.items = ingredients;
	  }
	},
  })

export const { setIngredient, setBun, deleteItem, deleteAll, moveItem } = ingredientsSelectSlice.actions
