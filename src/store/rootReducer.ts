import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "../slices/authSlice";
import inviteUserReducer from "../slices/InviteUserSlice";
import faqSettingReducer from "../slices/FaqSettingSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  inviteUser: inviteUserReducer,
  faqSetting: faqSettingReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
