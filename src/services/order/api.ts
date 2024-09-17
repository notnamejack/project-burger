import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const orderApi = createApi({
    reducerPath: "orderApi",
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://norma.nomoreparties.space/api'
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