import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { selectToken } from './authSlice';
import Cookies from 'js-cookie';

const API_BASE_URL = process.env.REACT_APP_API_URL;

const getTokenFromCookies = () => {
  return Cookies.get('token');
};

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE_URL,
    tagTypes:["Package"],

    prepareHeaders: (headers, { getState }) => {
      const token = selectToken(getState()) || getTokenFromCookies();

      if (token) {
        headers.set('Authorization', `${token}`);
      }

      return headers;
    },
    providesTags:["Package"]

  }),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (values) => ({
        url: '/owner/login',
        method: 'POST',
        body: values,
      }),
    }),
    getPackages: builder.query({
      query: () => '/package/GetPackageListing',
      providesTags:["Package"]

    }),
    createPost: builder.mutation({
      query: (values) => ({
        url: '/package',
        method: 'POST',
        body: values,
      }),
      invalidatesTags:["Package"]
    }),

    
    deletePackage: builder.mutation({
      query: (packageId) => ({
        url: `package/${packageId}`,
        method: 'DELETE',
      }),
      invalidatesTags:["Package"]
    }),

   

    updatePackage: builder.mutation({
      query: ({  values,packageId }) => ({
        url: `package/${packageId}`,
        method: 'PUT',
        body: values,
      }),
      invalidatesTags:["Package"]

    }),
  }),
});

export const {
  useLoginMutation,
  useGetPackagesQuery,
  useCreatePostMutation ,
  useDeletePackageMutation,
  useUpdatePackageMutation,
} = api;
