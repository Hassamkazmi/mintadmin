import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { selectToken } from './authSlice';
import Cookies from 'js-cookie';

const API_BASE_URL = process.env.REACT_APP_API_URL;

const getTokenFromCookies = () => {
  return Cookies.get('token');
};

export const PoolnestRevenue = createApi({
  reducerPath: 'PoolnestRevenue',
  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE_URL,
    tagTypes:["PoolnestRevenue"],

    prepareHeaders: (headers, { getState }) => {
      const token = selectToken(getState()) || getTokenFromCookies();

      if (token) {
        headers.set('Authorization', `${token}`);
      }

      return headers;
    },
    providesTags:["PoolnestRevenue"]

  }),
  endpoints: (builder) => ({
    poolnestRevenue: builder.query({
      query: () => 'owner/intents/allPayments',
      providesTags:["PoolnestRevenue"]

    }),
    poolnestRevenuePost: builder.mutation({
      query: (values) => ({
        url: '/owner/allPayments',
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
  usePoolnestRevenueQuery,
  usePoolnestRevenuePostMutation ,
  useDeletePackageMutation,
  useUpdatePackageMutation,
} = PoolnestRevenue;
