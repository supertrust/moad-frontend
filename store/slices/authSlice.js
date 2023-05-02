import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {login,signup} from '@/services/auth/authService';

const initialState = {
  user: {},
};

export const loggedIn = createAsyncThunk('auth/login', async (data) => {
  const response = await login(data);
  return response.data;
});

export const signedUp = createAsyncThunk('auth/signup', async (data) => {
  const response = await signup(data);
  return response.data;
});

export const logout = () => {
  localStorage.clear();
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: {
    [loggedIn.fulfilled]: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const {} = authSlice.actions;

export const selectUser = (state) => state.auth.user;

export default authSlice.reducer;
