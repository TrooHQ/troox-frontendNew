import { useState } from "react";
import Grey from "../assets/GreyStroke.svg";
import Purple from "../assets/PurpleStroke.svg";
import Logo from "../../assets/trooLogo.svg";
import CustomInput from "../inputFields/CustomInput";
import PasswordInput from "../inputFields/PasswordInput";
import { Button } from "../Buttons/Button";
import { Link, useNavigate } from "react-router-dom";
import Back from "../assets/Back.svg";
import CustomSelect4 from "../inputFields/CustomSelect4";
import axios from "axios";
import { SERVER_DOMAIN } from "../../Api/Api";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";

const RegistrationStepForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [contact, setContact] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [businessType, setBusinessType] = useState<string>("");
  const [bankName, setBankName] = useState<string>("");
  const [accountNumber, setAccountNumber] = useState<string>("");
  const [country, setCountry] = useState<string>("");
  const [bvn, setBvn] = useState<string>("");
  const [accountName, setAccountName] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  sessionStorage.setItem("businessType", businessType);
  const id = sessionStorage.getItem("id");
  // console.log(businessType, bank);
  const history = useNavigate();

  const handlePasswordChange = (newValue: string) => {
    setPassword(newValue);
  };
  const handleConfirmPasswordChange = (newValue: string) => {
    setConfirmPassword(newValue);
  };

  const createBusinessAccount = async () => {
    try {
      if (
        !name ||
        !email ||
        !contact ||
        !address ||
        !phone ||
        !password ||
        !confirmPassword ||
        !businessType
      ) {
        setError("All fields are required...");
        return;
      }

      if (password !== confirmPassword) {
        setError("Passwords do not match");
        return;
      }

      setLoading(true);
      const response = await axios.post(`${SERVER_DOMAIN}/createBusiness`, {
        business_name: name,
        business_email: email,
        personal_name: contact,
        business_address: address,
        phone_number: phone,
        password,
        confirm_password: confirmPassword,
        business_type: businessType,
      });
      setLoading(false);
      console.log(response.data);
      toast.success("User created successfully");
      sessionStorage.setItem("id", response.data.id);
      sessionStorage.setItem("user_role", response.data.user_role);
      sessionStorage.setItem("email_verified", response.data.email_verified);
      setCurrentStep(currentStep + 1);
    } catch (error) {
      console.error("Error occurred:", error);
      if (axios.isAxiosError(error)) {
        if (error.response) {
          setError(error.response.data.message);
        } else {
          setError("An error occurred. Please try again later.");
        }
      } else {
        setError("An error occurred. Please try again later.");
      }
    } finally {
      setLoading(false);
      setError("");
    }
  };

  const createAccountDetails = async () => {
    try {
      if (!accountName || !accountNumber || !bankName || !bvn || !country) {
        setError("All fields are required...");
        return;
      }

      setLoading(true);
      const response = await axios.post(
        `${SERVER_DOMAIN}/createAccountDetails`,
        {
          user_id: id,
          account_name: accountName,
          account_number: accountNumber,
          bank_name: bankName,
          bank_verification_number: bvn,
          country: country,
        }
      );
      setLoading(false);
      console.log(response.data.account_details);
      console.log(response.data.message);
      toast.success(response.data.message);
      history("/verify");
    } catch (error) {
      console.error("Error occurred:", error);
      if (axios.isAxiosError(error)) {
        if (error.response) {
          setError(error.response.data.message);
        } else {
          setError("An error occurred. Please try again later.");
        }
      } else {
        setError("An error occurred. Please try again later.");
      }
    } finally {
      setLoading(false);
      setError("");
    }
  };

  const prevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  return (
    <div className=" bg-[#EFEFEF] h-screen">
      <div className=" mx-10">
        <div className=" py-[48px] flex items-center justify-center">
          <img src={Logo} alt="" />
        </div>

        {currentStep === 1 && (
          <>
            <div className=" grid grid-cols-2 gap-[10px]">
              <img src={Purple} />
              <img src={Grey} />
            </div>
            <p className=" text-grey500 text-[14px] my-[24px]">
              Stage 1/{" "}
              <span className="text-[20px]"> Business information</span>
            </p>
            <p className=" text-red-500">{error}</p>
            <div className=" grid gap-3  my-5 w-full md:w-[530px] ">
              <div
                className={`${error && " border border-red-500 rounded-[5px]"}`}
              >
                <CustomInput
                  type="text"
                  label="Business name (e.g. Deluxe Restaurant)"
                  value={name}
                  onChange={(newValue) => setName(newValue)}
                />
              </div>

              <div
                className={`${
                  error && " border border-red-500  rounded-[5px]"
                }`}
              >
                <CustomInput
                  type="text"
                  label="Business contact (e.g. Sade Adu)"
                  value={contact}
                  onChange={(newValue) => setContact(newValue)}
                />
              </div>

              <div
                className={`${
                  error && " border border-red-500  rounded-[5px]"
                }`}
              >
                <CustomInput
                  type="text"
                  label="Business address"
                  value={address}
                  onChange={(newValue) => setAddress(newValue)}
                />
              </div>

              <div
                className={`${
                  error && " border border-red-500  rounded-[5px]"
                }`}
              >
                <CustomInput
                  type="email"
                  label="Business email"
                  value={email}
                  onChange={(newValue) => setEmail(newValue)}
                />
              </div>

              <div
                className={`${
                  error && " border border-red-500  rounded-[5px]"
                }`}
              >
                <CustomInput
                  type="text"
                  label="Phone number (e.g. +234 812 345 6789)"
                  value={phone}
                  onChange={(newValue) => setPhone(newValue)}
                />
              </div>

              <div
                className={`${
                  error && " border border-red-500  rounded-[5px]"
                }`}
              >
                <PasswordInput
                  label="Password"
                  value={password}
                  onChange={handlePasswordChange}
                />
              </div>

              <div
                className={`${
                  error && " border border-red-500  rounded-[5px]"
                }`}
              >
                <PasswordInput
                  label="Confirm Password"
                  value={confirmPassword}
                  onChange={handleConfirmPasswordChange}
                />
              </div>
              <div
                className={`${
                  error && " border border-red-500  rounded-[5px]"
                }`}
              >
                <CustomSelect4
                  options={["Restaurant", "Hotel & Lodgings", "Bar & Lounge"]}
                  placeholder="Business Type"
                  onSelect={(selectedValue) => setBusinessType(selectedValue)}
                />
              </div>

              <div className=" grid mt-[32px] gap-[8px]">
                <div className="" onClick={createBusinessAccount}>
                  <Button text="Next" loading={loading} />
                </div>
                <Link to="/">
                  <button className=" text-[16px] font-[500] text-purple500 border border-purple500 w-full text-center py-3 rounded">
                    Cancel
                  </button>
                </Link>
              </div>
            </div>
          </>
        )}
        {/* {currentStep === 2 && (
          <>
            {businessType === "Hotel & Lodgings" ? (
              <div className=" grid grid-cols-3 gap-[10px]">
                <img src={Purple} />
                <img src={Purple} />
                <img src={Grey} />
              </div>
            ) : (
              <div className=" grid grid-cols-2 gap-[10px]">
                <img src={Purple} />
                <img src={Grey} />
              </div>
            )}
            <div
              className="  items-center mt-[9px] flex gap-[8px]"
              onClick={prevStep}
            >
              <img src={Back} alt="" />
              <p className=" font-[500] text-[16px] text-purple500 cursor-pointer">
                Back
              </p>
            </div>
            <p className=" text-grey500 text-[14px] my-[24px]">
              Stage 1/{" "}
              <span className="text-[20px]"> Personal information</span>{" "}
            </p>
            <div className=" grid gap-[16px]  my-5 w-full md:w-[530px] ">
              <CustomInput
                type="text"
                label="First name"
                value={name}
                onChange={(newValue) => setName(newValue)}
              />
              <CustomInput
                type="text"
                label="Last name"
                value={email}
                onChange={(newValue) => setEmail(newValue)}
              />
              <CustomInput
                type="text"
                label="Registered home address"
                value={email}
                onChange={(newValue) => setEmail(newValue)}
              />
              <CustomInput
                type="text"
                label="City"
                value={email}
                onChange={(newValue) => setEmail(newValue)}
              />
              <CustomInput
                type="text"
                label="State"
                value={email}
                onChange={(newValue) => setEmail(newValue)}
              />

              <div className=" grid mt-[32px] gap-[8px]">
                <div className="" onClick={createBusinessAccount}>
                  <Button text="Next" />
                </div>
                <Link to="/">
                  <button className=" text-[16px] font-[500] text-purple500 border border-purple500 w-full text-center py-3 rounded">
                    Cancel
                  </button>
                </Link>
              </div>
            </div>
          </>
        )} */}
        {currentStep === 2 && (
          <>
            <div className=" grid grid-cols-2 gap-[10px]">
              <img src={Purple} />
              <img src={Grey} />
            </div>
            <div
              className="  items-center mt-[9px] flex gap-[8px]"
              onClick={prevStep}
            >
              <img src={Back} alt="" />
              <p className=" font-[500] text-[16px] text-purple500 cursor-pointer">
                Back
              </p>
            </div>
            <p className=" text-grey500 text-[14px] my-[24px]">
              Stage 1/{" "}
              <span className="text-[20px]"> Payout & bank details</span>{" "}
            </p>
            <p className=" text-red-500">{error}</p>
            <div className=" grid gap-[16px]  my-5 w-full md:w-[530px] ">
              <CustomInput
                type="text"
                label="Bank account name"
                value={accountName}
                onChange={(newValue) => setAccountName(newValue)}
              />

              <CustomInput
                type="text"
                label="Bank account number"
                value={accountNumber}
                onChange={(newValue) => setAccountNumber(newValue)}
              />

              <CustomInput
                type="text"
                label="Bank Name"
                value={bankName}
                onChange={(newValue) => setBankName(newValue)}
              />

              <CustomInput
                type="text"
                label="Bank Verification Number (BVN)"
                value={bvn}
                onChange={(newValue) => setBvn(newValue)}
              />
              <CustomInput
                type="text"
                label="Country"
                value={country}
                onChange={(newValue) => setCountry(newValue)}
              />

              <div className=" grid mt-[32px] gap-[8px]">
                <div className="" onClick={createAccountDetails}>
                  <Button text="Save and continue" />
                </div>
                <Link to="/">
                  <button className=" text-[16px] font-[500] text-purple500 border border-purple500 w-full text-center py-3 rounded">
                    Cancel
                  </button>
                </Link>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default RegistrationStepForm;
