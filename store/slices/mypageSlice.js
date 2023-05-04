import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getUserDetailsApi } from "../api/userApi";

export const getUserDetails = createAsyncThunk(
  "getUserDetails",
  async (data) => {
    const response = await getUserDetailsApi(data);
    return response.data;
  }
);

const myPageSlice = createSlice({
  name: "myPage",
  initialState: {
    userDetails: {},
  },
  reducers: {
    setUserDetails: (state, action) => {
      state.userDetails = action.payload;
    },
    clearUserDetails: (state) => {
      state.userDetails = null;
    },
  },
  extraReducers: {
    [getUserDetails.fulfilled]: (state, action) => {
      state.userDetails = action.payload;
    },
  },
});

export const { setUserDetails, clearUserDetails } = myPageSlice.actions;

export default myPageSlice.reducer;