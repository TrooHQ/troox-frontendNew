import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    id: null,
    user_role: null,
    email_verified: null,
  },
  reducers: {
    setUserData: (state, action) => {
      const { id, user_role, email_verified } = action.payload;
      state.id = id;
      state.user_role = user_role;
      state.email_verified = email_verified;
    },
    clearUserData: (state) => {
      state.id = null;
      state.user_role = null;
      state.email_verified = null;
    },
  },
});

export const { setUserData, clearUserData } = userSlice.actions;
export default userSlice.reducer;
