import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface BusinessDetails {
  name: string;
  id: number;
  business_name?: string;
  _id: number;
  business_logo: string;
  tableNumber: string;
}

interface BusinessState {
  businessIdentifier: string | null;
  groupName: string;
  tableNo: string;
  businessDetails: BusinessDetails | null;
}

const initialState: BusinessState = {
  businessIdentifier: null,
  groupName: "default_group_name",
  tableNo: "",
  businessDetails: null,
};

const businessSlice = createSlice({
  name: "business",
  initialState,
  reducers: {
    setBusinessIdentifier(state, action: PayloadAction<string>) {
      state.businessIdentifier = action.payload;
    },
    setGroupName(state, action: PayloadAction<string>) {
      state.groupName = action.payload;
    },
    setTableNo(state, action: PayloadAction<string>) {
      state.tableNo = action.payload;
    },
    setBusinessDetails(state, action: PayloadAction<BusinessDetails>) {
      state.businessDetails = action.payload;
    },
    resetBusinessDetails(state) {
      state.businessIdentifier = initialState.businessIdentifier;
      state.groupName = initialState.groupName;
      state.tableNo = initialState.tableNo;
      state.businessDetails = initialState.businessDetails;
    },
  },
});

export const {
  setBusinessIdentifier,
  setGroupName,
  setTableNo,
  setBusinessDetails,
  resetBusinessDetails,
} = businessSlice.actions;

export default businessSlice.reducer;
