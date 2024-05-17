import { useEffect, useState } from "react";
import Grey from "../assets/GreyStroke.svg";
import Purple from "../assets/PurpleStroke.svg";
import Logo from "../../assets/trooLogo.svg";
import CustomInput from "../inputFields/CustomInput";
import PasswordInput from "../inputFields/PasswordInput";
import { Link, useNavigate } from "react-router-dom";
import Back from "../assets/Back.svg";
import CustomSelect4 from "../inputFields/CustomSelect4";
import axios from "axios";
import { SERVER_DOMAIN } from "../../Api/Api";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import CustomSelect from "../inputFields/CustomSelect";
import { useDispatch } from "react-redux";
import { setUserData } from "../../slices/UserSlice";
interface Country {
  name: string;
  code: string;
  id: string;
}
interface VerifyAccountPayload {
  account_number: string;
  account_code: string;
}

const RegistrationStepForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [emailError, setEmailError] = useState<string>("");
  const [contact, setContact] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [businessType, setBusinessType] = useState<string>("");
  // const [bankName, setBankName] = useState<string>("");
  // const [bankCode, setBankCode] = useState<string>("");
  const [accountNumber, setAccountNumber] = useState<string>("");
  const [country, setCountry] = useState<string>("");
  const [countries, setCountries] = useState<Country[]>([]);
  const [banks, setBanks] = useState<Country[]>([]);
  const [bvn, setBvn] = useState<string>("");
  const [bvnError, setBvnError] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [errorDuplicate, setErrorDuplicate] = useState<string>("");
  const [fieldsError, setFieldsError] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");
  const [confirmPasswordError, setConfirmPasswordError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  sessionStorage.setItem("businessType", businessType);
  const id = sessionStorage.getItem("id");
  const history = useNavigate();

  const dispatch = useDispatch();
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handlePasswordChange = (newValue: string) => {
    setPassword(newValue);

    const alphanumericRegex = /^(?=.*[a-zA-Z])(?=.*[0-9])/;
    const isValidPassword = alphanumericRegex.test(newValue);
    const isMinimumLength = newValue.length >= 8;

    if (!isValidPassword || !isMinimumLength) {
      setPasswordError(
        "Password must be alphanumeric and have a minimum length of 8 characters"
      );
      setConfirmPasswordError("");
    } else {
      setPasswordError("");
      if (newValue !== confirmPassword) {
        setConfirmPasswordError("Passwords do not match");
      } else {
        setConfirmPasswordError("");
      }
    }
  };

  const handleConfirmPasswordChange = (newValue: string) => {
    setConfirmPassword(newValue);
    if (newValue !== password) {
      setConfirmPasswordError("Passwords do not match");
    } else {
      setConfirmPasswordError("");
    }
  };

  const handleBvnChange = (newValue: string) => {
    if (newValue.length < 11) {
      setBvn(newValue);
      setBvnError("BVN must be at least 11 characters long");
    } else {
      setBvn(newValue);
      setBvnError("");
    }
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
        setFieldsError("All fields are required...");
        return;
      } else {
        setFieldsError("");
      }

      if (password !== confirmPassword) {
        setError("Passwords do not match");
        toast.error("Passwords do not match");
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
      toast.success("User created successfully");
      dispatch(setUserData(response.data));
      console.log(response.data);

      sessionStorage.setItem("id", response.data.id);
      sessionStorage.setItem("user_role", response.data.user_role);
      sessionStorage.setItem("email_verified", response.data.email_verified);
      setCurrentStep(currentStep + 1);
    } catch (error) {
      console.error("Error occurred:", error);
      if (axios.isAxiosError(error)) {
        if (error.response) {
          setErrorDuplicate(error.response.data.message);
          // toast.error(error.response.data.message);
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
      if (!accountNumber || !bvn || !country) {
        setError("All fields are required...");
        return;
      }
      if (bvn.length < 11) {
        setBvnError("BVN must be at least 11 characters long");
        return;
      } else {
        setBvnError("");
      }

      setLoading(true);
      const response = await axios.post(
        `${SERVER_DOMAIN}/createAccountDetails`,
        {
          user_id: id,
          account_name: "account Name",
          account_number: accountNumber,
          bank_name: "bankName",
          bank_verification_number: bvn,
          country: country,
        }
      );
      setLoading(false);
      console.log(response);
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

  // const verifyAccountNumber = async (payload: VerifyAccountPayload) => {
  //   try {
  //     setLoading(true);
  //     const response = await axios.post(
  //       `${SERVER_DOMAIN}/verifyUserAccountNumber`,
  //       payload
  //     );
  //     console.log(payload);

  //     setLoading(false);
  //     console.log(response);
  //     toast.success(response.data.message);
  //     // history.push("/verify"); // Corrected navigation
  //   } catch (error) {
  //     console.error("Error occurred:", error);
  //     setLoading(false);
  //     if (axios.isAxiosError(error)) {
  //       if (error.response) {
  //         setError(error.response.data.message);
  //       } else {
  //         setError("An error occurred. Please try again later.");
  //       }
  //     } else {
  //       setError("An error occurred. Please try again later.");
  //     }
  //   }
  // };

  const prevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const getCountries = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `https://countriesnow.space/api/v0.1/countries/capital`
      );
      setLoading(false);
      setCountries(response.data.data);
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

  const getBanks = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${SERVER_DOMAIN}/getBanks`);
      setLoading(false);
      setBanks(response.data.data);
      console.log(response.data.data);
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

  useEffect(() => {
    getCountries();
    getBanks();
  }, []);

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
              Stage 1:{" "}
              <span className="text-[20px]"> Business Information</span>
            </p>
            <p className=" text-red-500">{fieldsError}</p>
            <p className=" text-red-500">{errorDuplicate}</p>
            <div className=" grid gap-3  my-5 w-full md:w-[530px] ">
              <div
                className={`${
                  fieldsError && " border border-red-500 rounded-[5px]"
                }`}
              >
                <CustomInput
                  type="text"
                  label="Business Name (e.g. Deluxe Restaurant)"
                  value={name}
                  onChange={(newValue) => setName(newValue)}
                />
              </div>

              <div
                className={`${
                  fieldsError && " border border-red-500  rounded-[5px]"
                }`}
              >
                <CustomInput
                  type="text"
                  label="Business Contact (e.g. Sade Adu)"
                  value={contact}
                  onChange={(newValue) => setContact(newValue)}
                />
              </div>

              <div
                className={`${
                  fieldsError && " border border-red-500  rounded-[5px]"
                }`}
              >
                <CustomInput
                  type="text"
                  label="Business Address"
                  value={address}
                  onChange={(newValue) => setAddress(newValue)}
                />
              </div>

              <div
                className={`${
                  emailError ||
                  (fieldsError && " border border-red-500  rounded-[5px]")
                }`}
              >
                <CustomInput
                  type="email"
                  label="Business Email"
                  value={email}
                  onChange={(newValue) => {
                    setEmail(newValue);
                    const isValidEmail = validateEmail(newValue);
                    if (!isValidEmail) {
                      setEmailError("Please enter a valid email address");
                    } else {
                      setEmailError("");
                    }
                  }}
                />
              </div>
              {emailError && (
                <p className="text-red-500 text-[14px]">{emailError}</p>
              )}
              <div
                className={`${
                  fieldsError && " border border-red-500  rounded-[5px]"
                }`}
              >
                <CustomInput
                  type="text"
                  label="Phone Number (e.g. +234 812 345 6789)"
                  value={phone}
                  onChange={(newValue) => setPhone(newValue)}
                />
              </div>

              <div
                className={`${
                  passwordError ||
                  (fieldsError && "border border-red-500 rounded-[5px]")
                }`}
              >
                <PasswordInput
                  label="Password"
                  value={password}
                  onChange={handlePasswordChange}
                />
              </div>
              {passwordError && (
                <p className="text-red-500 text-[14px]">{passwordError}</p>
              )}
              {password && !passwordError && (
                <div
                  className={`${
                    fieldsError && "border border-red-500 rounded-[5px]"
                  }`}
                >
                  <PasswordInput
                    label="Confirm Password"
                    value={confirmPassword}
                    onChange={handleConfirmPasswordChange}
                  />
                </div>
              )}
              {confirmPasswordError && (
                <p className="text-red-500 text-[14px]">
                  {confirmPasswordError}
                </p>
              )}
              <div
                className={`${
                  fieldsError && " border border-red-500  rounded-[5px]"
                }`}
              >
                <CustomSelect4
                  options={["Restaurant", "Hotel & Lodgings", "Bar & Lounge"]}
                  placeholder="Business Type"
                  onSelect={(selectedValue) => setBusinessType(selectedValue)}
                />
              </div>

              <div className=" grid mt-[32px] gap-[8px]">
                {!emailError && !passwordError && !confirmPasswordError && (
                  <div className="" onClick={createBusinessAccount}>
                    <button
                      className="bg-purple500 w-full text-center text-white py-3 rounded"
                      disabled={loading}
                    >
                      {loading ? "Next..." : "Next"}
                    </button>
                  </div>
                )}
                <Link to="/">
                  <button className=" text-[16px] font-[500] text-purple500 border border-purple500 w-full text-center py-3 rounded">
                    Cancel
                  </button>
                </Link>
              </div>
            </div>
          </>
        )}

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
              Stage 1:{" "}
              <span className="text-[20px]"> Payout & Bank Details</span>{" "}
            </p>
            <p className=" text-red-500">{error}</p>
            <div className=" grid gap-[16px]  my-5 w-full md:w-[530px] ">
              <div className=" ">
                <CustomSelect
                  label=""
                  options={countries.map((country) => country.name)}
                  value={country}
                  onChange={(newValue) => setCountry(newValue)}
                  disabledOption="Country"
                  bgColor="bg-[#EFEFEF]"
                />
              </div>
              <CustomInput
                type="text"
                label="Bank Account Number"
                value={accountNumber}
                onChange={(newValue) => setAccountNumber(newValue)}
              />

              <div className=" ">
                {/* <CustomSelect
                  label=""
                  options={banks.map((bank) => bank.name)}
                  value={bankName}
                  // onChange={(newValue) => setBankName(newValue)}
                  onChange={(newValue) => {
                    setBankName(newValue);
                    const selectedBank = banks.find(
                      (bank) => bank.name === newValue
                    );
                    if (selectedBank) {
                      const payload = {
                        account_number: accountNumber,
                        account_code: selectedBank.code,
                      };
                      verifyAccountNumber(payload);
                    }
                  }}
                  disabledOption="Select Bank"
                  bgColor="bg-[#EFEFEF]"
                /> */}
              </div>

              <CustomInput
                type="text"
                label="Bank Verification Number (BVN)"
                value={bvn}
                onChange={handleBvnChange}
              />
              {bvnError && (
                <p className="text-red-500 text-[14px]">{bvnError}</p>
              )}

              <div className=" grid mt-[32px] gap-[8px]">
                {!bvnError && (
                  <div className="" onClick={createAccountDetails}>
                    <button
                      className={`${
                        loading ? `bg-gray-400` : `bg-purple500`
                      } w-full text-center text-white py-3 rounded`}
                      disabled={loading}
                    >
                      {loading ? "Sending..." : "Save and continue"}
                    </button>
                  </div>
                )}
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
