import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import authReducer from "../slices/authSlice";
import inviteUserReducer from "../slices/InviteUserSlice";
import faqSettingReducer from "../slices/FaqSettingSlice";
import userReducer from "../slices/UserSlice";
import businessReducer from "../slices/businessSlice";
import basketReducer from "../slices/BasketSlice";
import outletReducer from "../slices/OutletSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  inviteUser: inviteUserReducer,
  faqSetting: faqSettingReducer,
  user: userReducer,
  business: businessReducer,
  basket: basketReducer,
  outlet: outletReducer,
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: [
    "auth",
    "inviteUser",
    "faqSetting",
    "user",
    "business",
    "basket",
    "outlet",
  ],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
