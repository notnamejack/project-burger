import { createAction } from '@reduxjs/toolkit';

export const wsMyConnect = createAction<string, 'MY_ORDERS_CONNECT'>(
	'MY_ORDERS_CONNECT'
);
export const wsMyDisconnect = createAction('MY_ORDERS_DISCONNECT');
