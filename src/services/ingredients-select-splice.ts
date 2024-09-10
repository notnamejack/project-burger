import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { IIngredients } from '../data/ingredients'
import { v4 } from "uuid";

interface IngredientsSelectState {
  items: IIngredients[],
  total: number,
  bun: IIngredients | null,
}

interface IngredientState{
	item: IIngredients,
	type?: string
}

interface IngredientMoveState{
	dragIndex: number,
	hoverIndex: number,
	item: IIngredients,
}

const initialState: IngredientsSelectState = {
	items: [],
	total: 0,
	bun: null
} satisfies IngredientsSelectState as IngredientsSelectState

const newGuid = (): string => v4()

const ingredientsSelectSlice = createSlice({
	name: 'ingredientsSelect',
	initialState,
	reducers: {
	  addItem: (state, action: PayloadAction<IngredientState>) => {
		if( action.payload.type !== 'bun'){
			state.items.push({...action.payload.item, index: newGuid()})
			state.total += action.payload.item.price
		}
		else{
			if(!state.bun){
				state.bun = action.payload.item
				state.total += (action.payload.item.price * 2)
			}
			else{
				state.total -= state.bun.price * 2
				state.bun = action.payload.item
				state.total += (action.payload.item.price * 2)
			}
		}
	  },
	  deleteItem: (state, action: PayloadAction<IngredientState>) => {
		state.items = state.items.filter(i => i.index !== action.payload.item.index);
		state.total -= action.payload.item.price;
	  },
	  moveItem: (state, action: PayloadAction<IngredientMoveState>) => {
		state.items.splice(action.payload.dragIndex, 1);
		state.items.splice(action.payload.hoverIndex, 0, action.payload.item);
	  }
	},
  })

export const { addItem, deleteItem, moveItem } = ingredientsSelectSlice.actions

export default ingredientsSelectSlice.reducer