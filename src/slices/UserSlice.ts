import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  userData: { [key: string]: any } | null;
}

const initialState: UserState = {
  userData: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserData: (state, action: PayloadAction<{ [key: string]: any }>) => {
      state.userData = action.payload;
    },
    updateUserData: (state, action: PayloadAction<{ [key: string]: any }>) => {
      if (state.userData) {
        state.userData = { ...state.userData, ...action.payload };
      } else {
        state.userData = action.payload;
      }
    },
    clearUserData: (state) => {
      state.userData = null;
    },
  },
});

export const { setUserData, updateUserData, clearUserData } = userSlice.actions;
export default userSlice.reducer;
