import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { IIngredients } from '../../data/ingredients';

interface IApi{
	data: IIngredients[]
}

export const ingredientsApi = createApi({
    reducerPath: "ingredientsApi",
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://norma.nomoreparties.space/api'
    }),
    endpoints: (builder) => ({
        getIngredients: builder.query<IApi, void>({
            query: () => "/ingredients"
        })
    })
})

export const { useGetIngredientsQuery } = ingredientsApi;