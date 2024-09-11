
import {configureStore} from "@reduxjs/toolkit";
import {ingredientsApi} from "./ingredients/api";
import { ingredientsSelectSlice } from "./ingredients-select-splice/reducer";
import { orderSplice } from "./order-splice/reducer";
import { ingredientsDetailsSlice } from "./ingredients-details-splice/reducer";

//произвел настройку согласно https://redux-toolkit.js.org/tutorials/quick-start
export const store = configureStore({
	reducer: {
		ingredientsSelect: ingredientsSelectSlice.reducer,
		order: orderSplice.reducer,
		ingredientsDetails: ingredientsDetailsSlice.reducer,
		[ingredientsApi.reducerPath]: ingredientsApi.reducer,
	},
	middleware: (getDefaultMiddleware) => {
		return getDefaultMiddleware().concat(ingredientsApi.middleware);
	},
	devTools: process.env.NODE_ENV !== 'production',
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch