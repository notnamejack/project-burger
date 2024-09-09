import { configureStore } from '@reduxjs/toolkit';
import ingredientsReducer from '../services/ingredients-splice';
import ingredientsSelectReducer from '../services/ingredients-select-splice';
import ingredientsDetailsReducer from '../services/ingredients-details-splice';
import orderReducer from '../services/order-splice';

//произвел настройку согласно https://redux-toolkit.js.org/tutorials/quick-start
export const store = configureStore({
	reducer: {
		ingredients: ingredientsReducer,
		ingredientsSelect: ingredientsSelectReducer,
		ingredientsDetails: ingredientsDetailsReducer,
		order: orderReducer,
	},
	devTools: process.env.NODE_ENV !== 'production',
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch