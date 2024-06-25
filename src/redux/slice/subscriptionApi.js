import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { selectToken } from './authSlice';
import Cookies from 'js-cookie';

const API_BASE_URL = process.env.REACT_APP_API_URL;

const getTokenFromCookies = () => {
  return Cookies.get('token');
};

export const subscriptionapi = createApi({
  reducerPath: 'subscriptionapi',
  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE_URL,
    tagTypes:["Subscription"],

    prepareHeaders: (headers, { getState }) => {
      const token = selectToken(getState()) || getTokenFromCookies();

      if (token) {
        headers.set('Authorization', `${token}`);
      }

      return headers;
    },
    providesTags:["Subscription"]

  }),
  endpoints: (builder) => ({

    getSubscription: builder.query({
      query: () => '/subscription/GetSubscriptionListing',
      providesTags:["Subscription"]

    }),
    createSubscription: builder.mutation({
      query: (values) => ({
        url: '/subscription/CreateAdminAndSubscription',
        method: 'POST',
        body: values,
      }),
      invalidatesTags:["Subscription"]
    }),
    deleteSubscription: builder.mutation({
      query: (id) => ({
        url: `/subscription/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags:["Subscription"]
    }),
    updateSubscription: builder.mutation({
      query: ({ values ,subscriberId  }) => ({
        url: `/subscription/EditSubscription/${subscriberId}`,
        method: 'PUT',
        body: values,
      }),
      invalidatesTags:["Subscription"]

    }),
  }),
});

export const {
  useGetSubscriptionQuery,
  useCreateSubscriptionMutation ,
  useDeleteSubscriptionMutation,
  useUpdateSubscriptionMutation,
} = subscriptionapi;
