import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { apiConfig } from '../../utils/apiConfig';
import type {
	BaseQueryFn,
	FetchArgs,
	FetchBaseQueryError,
  } from '@reduxjs/toolkit/query'
import { refreshToken } from '../../utils/api';

const baseQuery = fetchBaseQuery({
baseUrl: apiConfig.baseUrl,
prepareHeaders: (headers) => {
		for (let [key, value] of Object.entries(apiConfig.headers)) {
			headers.set(key, value);
		}
		headers.set('Authorization', `Bearer ${localStorage.getItem('accessToken')}`)
		return headers;
	}
});

const baseQueryWithReauth: BaseQueryFn< string | FetchArgs, unknown, FetchBaseQueryError > = async (args, api, extraOptions) => {
  var result = await baseQuery(args, api, extraOptions);
  if (result.error && result.error.status === 403) {
	const refreshData = await refreshToken();
    if (refreshData) {
      	result = await baseQuery(args, api, extraOptions);
    }
  }
  return result;
};

export const orderApi = createApi({
    reducerPath: "orderApi",
    baseQuery: baseQueryWithReauth,
    endpoints: (builder) => ({
        setOrder: builder.mutation({
            query: (ingredients) => ({
                url: "/orders",
                method: "POST",
                body: ingredients,
            }),
        })
    })
})

export const { useSetOrderMutation } = orderApi;