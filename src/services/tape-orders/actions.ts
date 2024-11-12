import { createAction } from '@reduxjs/toolkit';

export const wsConnect = createAction<string, 'TAPE_ORDERS_CONNECT'>(
	'TAPE_ORDERS_CONNECT'
);
export const wsDisconnect = createAction('TAPE_ORDERS_DISCONNECT');
