import { CSSProperties } from "react";

export type LoginState = {
  email: string;
  password: string;
};

export type ButtonProps = {
  text: string;
  link?: string;
  color?: string;
  backgroundColor?: string;
  className?: string;
  onClick?: () => void;
  img?: string;
  isLoading?: boolean;
};

export type BackButtonProps = {
  text: string;
};

export type CancelButtonProps = {
  text: string;
  onClick: () => void;
};

export type CustomCheckboxProps = {
  label: string | React.ReactNode;
  checked: boolean;
  onChange: (checked: boolean) => void;
};

export type CustomInputProps = {
  label: string;
  focusedLabel?: string;
  type: string;
  value: string;
  error?: string;
  maxLength?: number;
  onChange: (value: string) => void;
};

export type CustomSelectProps = {
  label: string;
  options: string[];
  value: string;
  error?: string;
  onChange: (value: string) => void;
  disabledOption?: string;
};

export type CustomSelect2Props = {
  options: (string | { value: string; label: string })[];
  disabledOptions?: string[];
  placeholder?: string;
};

export type PasswordInputProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  style?: CSSProperties;
};

export interface Step {
  title: string;
  description: string;
  icon: any;
}

export interface FormData {
  name: string;
  role: string;
  phoneNo: string;
}

export interface AddEmployeeFormProps {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
  setAddEmployee: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface EmployeeProps {
  employees: Array<{
    id: number;
    name: string;
    role: string;
    phoneNo: string;
    image: any;
  }>;
}

export interface OTPInputProps {
  otp: string[];
  setOtp: React.Dispatch<React.SetStateAction<string[]>>;
  setActiveIndex: React.Dispatch<React.SetStateAction<number>>;
}

export interface PinInputProps {
  pin: string[];
  setPin: React.Dispatch<React.SetStateAction<string[]>>;
  setActiveIndex: React.Dispatch<React.SetStateAction<number>>;
}

export interface SetupHeaderProps {
  header: string;
  description: string | JSX.Element;
}

export interface AddProductFormData {
  productName: string;
  warehouse: string;
  outlet: string;
  sku: string;
  ean: string;
  totalQuantity: string;
  sellingPrice: string;
  costPrice: string;
  description: string;
}

export interface AddWarehouseFormData {
  warehouseName: string;
  address: string;
  city: string;
  email: string;
  phoneNo: string;
  priorityChecked: boolean;
}

export interface AddOutletFormData {
  warehouseName: string;
  outletName: string;
  address: string;
  city: string;
  phoneNo: string;
}

export interface AddProductProps {
  handleButtonClick: () => void;
  formData: AddProductFormData;
  setFormData: (data: AddProductFormData) => void;
}

export interface AddWarehouseProps {
  handleButtonClick: () => void;
  formData: AddWarehouseFormData;
  setFormData: (data: AddWarehouseFormData) => void;
  setState: any;
}

export interface AddOutletProps {
  handleButtonClick2: () => void;
  formData: AddOutletFormData;
  setOutletForm: (data: AddOutletFormData) => void;
  setState: any;
}
