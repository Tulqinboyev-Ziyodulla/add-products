import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const productsApi = createApi({
  reducerPath: "productsApi",
  tagTypes: ['Products'],
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000" }),
  endpoints: (builder) => ({
    getAllProducts: builder.query({
      query: () => "/products",
      providesTags: (result) =>
        result
          ? [...result.map(({ id }) => ({ type: 'Products', id })), { type: 'Products', id: 'LIST' }]
          : [{ type: 'Products', id: 'LIST' }],
    }),
    addProducts: builder.mutation({
      query: (newData) => ({
        url: "/products",
        method: "POST",
        body: newData,
      }),
      invalidatesTags: [{ type: 'Products', id: 'LIST' }],
    }),
    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `/products/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: 'Products', id: 'LIST' }],
    }),
    updateProduct: builder.mutation({
      query: ({ id, ...updatedData }) => ({
        url: `/products/${id}`,
        method: "PUT",
        body: updatedData,
      }),
      invalidatesTags: [{ type: 'Products', id: 'LIST' }],
    }),
  }),
});

export const {
  useGetAllProductsQuery,
  useAddProductsMutation,
  useDeleteProductMutation,
  useUpdateProductMutation,
} = productsApi;
