
import { combineSlices, configureStore} from "@reduxjs/toolkit";
import {ingredientsApi} from "./ingredients/api";
import { ingredientsSelectSlice } from "./ingredients-select-splice/reducer";
import { orderSplice } from "./order-details-splice/reducer";
import { ingredientsDetailsSlice } from "./ingredients-details-splice/reducer";
import { orderApi } from "./order/api";
import { authSlice } from "./auth/reducer";
import { useDispatch, useSelector } from "react-redux";
import { ITapeOrders, tapeOrdersSlice, wsError, wsMessage } from "./tape-orders/slice";
import { wsConnect, wsDisconnect } from "./tape-orders/actions";
import { socketMiddleware } from "./middleware/socket-middleware";
import { myOrdersSlice, wsError as myError, wsMessage as myMessage } from "./my-orders/slice";
import { wsConnect as myConnect, wsDisconnect as myDisconnect} from "./tape-orders/actions";
import { orderDetailsSplice } from "./order-details/slice";

//произвел настройку согласно https://redux-toolkit.js.org/tutorials/quick-start

const tapeOrdersMiddleware = socketMiddleware<unknown, ITapeOrders>({
    connect: wsConnect,
    disconnect: wsDisconnect,
    onError: wsError,
    onMessage: wsMessage
});

const myOrdersMiddleware = socketMiddleware<unknown, ITapeOrders>({
    connect: myConnect,
    disconnect: myDisconnect,
    onError: myError,
    onMessage: myMessage
}, true);

const rootReducer = combineSlices({
	ingredientsSelect: ingredientsSelectSlice.reducer,
	order: orderSplice.reducer,
	ingredientsDetails: ingredientsDetailsSlice.reducer,
	auth: authSlice.reducer,
	tapeOrders: tapeOrdersSlice.reducer,
	myOrders: myOrdersSlice.reducer,
	orderDetails: orderDetailsSplice.reducer,
	[ingredientsApi.reducerPath]: ingredientsApi.reducer,
	[orderApi.reducerPath]: orderApi.reducer,
});

export const store = configureStore({
	reducer: rootReducer,
	middleware: (getDefaultMiddleware) => {
		return getDefaultMiddleware().concat(ingredientsApi.middleware, orderApi.middleware, tapeOrdersMiddleware, myOrdersMiddleware);
	},
	devTools: process.env.NODE_ENV !== 'production',
})

export type RootState = ReturnType<typeof rootReducer>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()