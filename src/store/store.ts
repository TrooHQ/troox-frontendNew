import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../slices/authSlice";
import inviteUserReducer from "../slices/InviteUserSlice";
import faqSettingReducer from "../slices/FaqSettingSlice";
import userReducer from "../slices/UserSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    inviteUser: inviteUserReducer,
    faqSetting: faqSettingReducer,
    user: userReducer,
  },
});
