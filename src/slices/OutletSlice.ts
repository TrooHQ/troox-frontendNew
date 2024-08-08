import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface OutletState {
  selectedOutlet: string;
  selectedOutletID: string;
}

const initialState: OutletState = {
  selectedOutlet: "",
  selectedOutletID: "",
};

const outletSlice = createSlice({
  name: "outlet",
  initialState,
  reducers: {
    setSelectedOutlet: (state, action: PayloadAction<string>) => {
      state.selectedOutlet = action.payload;
    },
    setSelectedOutletID: (state, action: PayloadAction<string>) => {
      state.selectedOutletID = action.payload;
    },
  },
});

export const { setSelectedOutlet, setSelectedOutletID } = outletSlice.actions;
export default outletSlice.reducer;
