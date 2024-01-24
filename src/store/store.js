import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../slices/authSlice";
import InviteUserReducer from "../slices/InviteUserSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    InviteUser: InviteUserReducer,
  },
});
