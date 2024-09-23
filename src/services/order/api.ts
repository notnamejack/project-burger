import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { apiConfig } from '../../utils/apiConfig';


export const orderApi = createApi({
    reducerPath: "orderApi",
    baseQuery: fetchBaseQuery({
        baseUrl: apiConfig.baseUrl,
		prepareHeaders: (headers) => {
            for (let [key, value] of Object.entries(apiConfig.headers)) {
                headers.set(key, value);
            }

            return headers;
        }
    }),
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