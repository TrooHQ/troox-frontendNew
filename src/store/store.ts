import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import authReducer from "../slices/authSlice";
import inviteUserReducer from "../slices/InviteUserSlice";
import faqSettingReducer from "../slices/FaqSettingSlice";
import userReducer from "../slices/UserSlice";
import businessReducer from "../slices/businessSlice";
import registerReducer from "../slices/registerSlice";
import bankRegisterReducer from "../slices/bankRegisterSlice";
import basketReducer from "../slices/BasketSlice";
import branchReducer from "../slices/branchSlice";
import tableReducer from "../slices/TableSlice";
import menuReducer from "../slices/menuSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  inviteUser: inviteUserReducer,
  faqSetting: faqSettingReducer,
  user: userReducer,
  business: businessReducer,
  register: registerReducer,
  bankRegister: bankRegisterReducer,
  basket: basketReducer,
  branches: branchReducer,
  tables: tableReducer,
  menu: menuReducer,
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: [
    "auth",
    "inviteUser",
    "branches",
    "faqSetting",
    "user",
    "business",
    "basket",
    "tables",
    "menu",
  ],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
