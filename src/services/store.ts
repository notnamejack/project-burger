
import { configureStore} from "@reduxjs/toolkit";
import {ingredientsApi} from "./ingredients/api";
import { ingredientsSelectSlice } from "./ingredients-select-splice/reducer";
import { orderSplice } from "./order-details-splice/reducer";
import { ingredientsDetailsSlice } from "./ingredients-details-splice/reducer";
import { orderApi } from "./order/api";
import { authSlice } from "./auth/reducer";
import { useDispatch, useSelector } from "react-redux";

//произвел настройку согласно https://redux-toolkit.js.org/tutorials/quick-start
export const store = configureStore({
	reducer: {
		ingredientsSelect: ingredientsSelectSlice.reducer,
		order: orderSplice.reducer,
		ingredientsDetails: ingredientsDetailsSlice.reducer,
		auth: authSlice.reducer,
		[ingredientsApi.reducerPath]: ingredientsApi.reducer,
		[orderApi.reducerPath]: orderApi.reducer,
	},
	middleware: (getDefaultMiddleware) => {
		return getDefaultMiddleware().concat(ingredientsApi.middleware, orderApi.middleware);
	},
	devTools: process.env.NODE_ENV !== 'production',
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()