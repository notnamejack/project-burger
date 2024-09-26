import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { IIngredients } from '../../data/ingredients';
import { apiConfig } from '../../utils/apiConfig';

interface IApi{
	data: IIngredients[]
}

export const ingredientsApi = createApi({
    reducerPath: "ingredientsApi",
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
        getIngredients: builder.query<IApi, void>({
            query: () => "/ingredients"
        })
    })
})

export const { useGetIngredientsQuery } = ingredientsApi;