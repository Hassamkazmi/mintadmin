import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../redux/slice/authSlice';
import { api } from '../redux/slice/packageApi';
import { subscriptionapi } from '../redux/slice/subscriptionApi';
import { Userapi } from '../redux/slice/userApi';
import { PoolnestRevenue } from '../redux/slice/PoolnestRevenueApi';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [api.reducerPath]: api.reducer,
    [subscriptionapi.reducerPath]: subscriptionapi.reducer,
    [Userapi.reducerPath]: Userapi.reducer,
    [PoolnestRevenue.reducerPath]: PoolnestRevenue.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware, subscriptionapi.middleware, Userapi.middleware , PoolnestRevenue.middleware),
});

export default store;
