import { createSlice } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: null,
    isAuthenticated: false,
  },
  reducers: {
    setToken: (state, action) => {
      const token = action.payload;
      console.log(token)
      state.token = token;
      state.isAuthenticated = !!token;

      // Set the token in cookies
      Cookies.set('token', token); // Replace 'token' with the desired name for your token cookie
    },
    clearToken: (state) => {
      // Clear the token from cookies
      Cookies.remove('token'); // Replace 'yourTokenCookieName' with the actual name of your token cookie

      state.token = null;
      state.isAuthenticated = false;
    },
  },
});

// Export the selectToken function
export const { setToken, clearToken } = authSlice.actions;
export const selectToken = (state) => state.auth.token;

export default authSlice.reducer;
