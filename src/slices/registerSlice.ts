// src/store/registerSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store/store";

interface RegisterState {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  pin: string;
  businessPhoneNumber: string;
  businessType: string;
  businessAddress: string;
  firstName: string;
  lastName: string;
  personalAddress: string;
  city: string;
  state: string;
  bankAccountName: string;
  bankAccountNumber: string;
  bankName: string;
  bankVerificationNumber: string;
  country: string;
  businessLogo: string;
}

const initialState: RegisterState = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
  pin: "",
  businessPhoneNumber: "",
  businessType: "",
  businessAddress: "",
  firstName: "",
  lastName: "",
  personalAddress: "",
  city: "",
  state: "",
  bankAccountName: "",
  bankAccountNumber: "",
  bankName: "",
  bankVerificationNumber: "",
  country: "Nigeria",
  businessLogo: "",
};

const registerSlice = createSlice({
  name: "register",
  initialState,
  reducers: {
    setField: (state, action: PayloadAction<{ field: keyof RegisterState; value: string }>) => {
      state[action.payload.field] = action.payload.value;
    },
    setFormData: (state, action: PayloadAction<Partial<RegisterState>>) => {
      return { ...state, ...action.payload };
    },
  },
});

export const { setField, setFormData } = registerSlice.actions;
// Selector to get the transformed state
export const selectTransformedRegisterState = (state: RootState) => ({
  business_name: state.register.name,
  business_email: state.register.email,
  business_phone_number: state.register.businessPhoneNumber,
  business_type: state.register.businessType,
  business_address: state.register.businessAddress,
  password: state.register.password,
  confirm_password: state.register.confirmPassword,
  first_name: state.register.firstName,
  last_name: state.register.lastName,
  personal_address: state.register.personalAddress,
  city: state.register.city,
  state: state.register.state,
  bank_account_name: state.register.bankAccountName,
  bank_account_number: state.register.bankAccountNumber,
  bank_name: state.register.bankName,
  bank_verification_number: state.register.bankVerificationNumber,
  country: state.register.country,
  business_logo: state.register.businessLogo,
});
export default registerSlice.reducer;
