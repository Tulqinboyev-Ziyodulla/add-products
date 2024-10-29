import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const productsApi = createApi({
  reducerPath: "productsApi",
  tagTypes: ['Products'], // To'g'ri 'tagTypes' ni belgilash
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
      invalidatesTags: [{ type: 'Products', id: 'LIST' }], // Yana hamma mahsulotlarni yangilash
    }),
    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `/products/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: 'Products', id: 'LIST' }], // Mahsulot o'chirilganda yangilanish
    }),
    updateProduct: builder.mutation({
      query: ({ id, ...updatedData }) => ({
        url: `/products/${id}`,
        method: "PUT", // Yangilash uchun PUT metodidan foydalanamiz
        body: updatedData,
      }),
      invalidatesTags: [{ type: 'Products', id: 'LIST' }], // Yangilangan mahsulotlar uchun yangilanish
    }),
  }),
});

export const {
  useGetAllProductsQuery,
  useAddProductsMutation,
  useDeleteProductMutation, // O'chirish funktsiyasini export qilish
  useUpdateProductMutation, // Yangilash funktsiyasini export qilish
} = productsApi;
