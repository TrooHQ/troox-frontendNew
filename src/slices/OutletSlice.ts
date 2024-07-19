import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface OutletState {
  selectedOutlet: string;
}

const initialState: OutletState = {
  selectedOutlet: "",
};

const outletSlice = createSlice({
  name: "outlet",
  initialState,
  reducers: {
    setSelectedOutlet: (state, action: PayloadAction<string>) => {
      state.selectedOutlet = action.payload;
    },
  },
});

export const { setSelectedOutlet } = outletSlice.actions;
export default outletSlice.reducer;
