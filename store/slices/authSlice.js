import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { loginApi, signupApi } from '../api/authApi';

const initialState = {
  user: {},
};

export const login = createAsyncThunk('login', async (data) => {
  const response = await loginApi(data);
  return response;
});

export const signup = createAsyncThunk('signup', async (data) => {
  const response = await signupApi(data);
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
    [login.fulfilled]: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const {} = authSlice.actions;

export const selectUser = (state) => state.auth.user;

export default authSlice.reducer;
