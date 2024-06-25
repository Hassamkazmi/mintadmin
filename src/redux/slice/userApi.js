import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { selectToken } from './authSlice';
import Cookies from 'js-cookie';

const API_BASE_URL = process.env.REACT_APP_API_URL;

const getTokenFromCookies = () => {
  return Cookies.get('token');
};

export const Userapi = createApi({
  reducerPath: 'Userapi',
  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE_URL,
    tagTypes:["User"],

    prepareHeaders: (headers, { getState }) => {
      const token = selectToken(getState()) || getTokenFromCookies();

      if (token) {
        headers.set('Authorization', `${token}`);
      }

      return headers;
    },
    providesTags:["User"]

  }),
  endpoints: (builder) => ({

    getUser: builder.query({
      query: () => '/user',
      providesTags:["User"]

    }),
    createUser: builder.mutation({
      query: (Data) => ({
        url: '/user',
        method: 'POST',
        body: Data,
      }),
      invalidatesTags:["User"]
    }),
    deleteUser: builder.mutation({
      query: (packageId) => ({
        url: `user/${packageId}`,
        method: 'DELETE',
      }),
      invalidatesTags:["User"]
    }),
    updateUser: builder.mutation({
      query: ({ packageId, updatedPackage }) => ({
        url: `user/${packageId}`,
        method: 'PUT',
        body: updatedPackage,
      }),
      invalidatesTags:["User"]

    }),
  }),
});

export const {
  useGetUserQuery,
  useCreateUserMutation ,
  useDeleteUserMutation,
  useUpdateUserMutation,
} = Userapi;
