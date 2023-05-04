import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./slices/authSlice";
import myPageReducer from "./slices/mypageSlice";
const reducer = {
  auth: authReducer,
  myPage: myPageReducer,
};

export const store = configureStore({
  reducer: reducer,
});
