import { useState } from "react";
import Grey from "../assets/GreyStroke.svg";
import Purple from "../assets/PurpleStroke.svg";
import Logo from "../../assets/trooLogo.svg";
import CustomInput from "../inputFields/CustomInput";
import PasswordInput from "../inputFields/PasswordInput";
import { Button } from "../Buttons/Button";
import { Link } from "react-router-dom";
import Back from "../assets/Back.svg";
import CustomSelect4 from "../inputFields/CustomSelect4";

const RegistrationStepForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [businessType, setBusinessType] = useState<string>("");
  const [bank, setBank] = useState<string>("");

  sessionStorage.setItem("businessType", businessType);
  sessionStorage.setItem("bank", bank);
  console.log(businessType, bank);

  const handlePasswordChange = (newValue: string) => {
    setPassword(newValue);
  };
  const handleConfirmPasswordChange = (newValue: string) => {
    setConfirmPassword(newValue);
  };
  // const [formData, setFormData] = useState({
  //   name: "",
  //   email: "",
  //   password: "",
  // });

  // const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
  //   event.preventDefault();
  //   console.log("Form submitted:", formData);
  // };

  // const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
  //   const { name, value } = event.target;
  //   setFormData({ ...formData, [name]: value });
  // };
  const nextStep = () => {
    if (businessType === "Hotel & Lodgings") {
      setCurrentStep(currentStep + 1);
    } else {
      setCurrentStep(currentStep + 2);
    }
  };

  const prevStep = () => {
    if (businessType === "Hotel & Lodgings") {
      setCurrentStep(currentStep - 1);
    } else {
      setCurrentStep(currentStep - 2);
    }
  };

  return (
    <div className=" bg-[#EFEFEF] h-screen">
      <div className=" mx-10">
        <div className=" py-[48px] flex items-center justify-center">
          <img src={Logo} alt="" />
        </div>

        {currentStep === 1 && (
          <>
            {businessType === "Hotel & Lodgings" ? (
              <div className=" grid grid-cols-3 gap-[10px]">
                <img src={Purple} />
                <img src={Grey} />
                <img src={Grey} />
              </div>
            ) : (
              <div className=" grid grid-cols-2 gap-[10px]">
                <img src={Purple} />
                <img src={Grey} />
              </div>
            )}
            <p className=" text-grey500 text-[14px] my-[24px]">
              Stage 1/{" "}
              <span className="text-[20px]"> Business information</span>{" "}
            </p>
            <div className=" grid gap-3  my-5 w-full md:w-[530px] ">
              <CustomInput
                type="text"
                label="Business name (e.g. Deluxe Restaurant)"
                value={name}
                onChange={(newValue) => setName(newValue)}
              />
              <CustomInput
                type="text"
                label="Business contact (e.g. Sade Adu)"
                value={email}
                onChange={(newValue) => setEmail(newValue)}
              />

              <CustomInput
                type="text"
                label="Business address"
                value={email}
                onChange={(newValue) => setEmail(newValue)}
              />
              <CustomInput
                type="email"
                label="Business email"
                value={email}
                onChange={(newValue) => setEmail(newValue)}
              />

              <CustomInput
                type="text"
                label="Phone number (e.g. +234 812 345 6789)"
                value={email}
                onChange={(newValue) => setEmail(newValue)}
              />

              <PasswordInput
                label="Password"
                value={password}
                onChange={handlePasswordChange}
              />
              <PasswordInput
                label="Confirm Password"
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
              />

              <CustomSelect4
                options={["Restaurant", "Hotel & Lodgings", "Bar & Lounge"]}
                placeholder="Business Type"
                onSelect={(selectedValue) => setBusinessType(selectedValue)}
              />

              <div className=" grid mt-[32px] gap-[8px]">
                <div className="" onClick={nextStep}>
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
        )}
        {currentStep === 2 && (
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
                <div className="" onClick={nextStep}>
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
        )}
        {currentStep === 3 && (
          <>
            {businessType === "Hotel & Lodgings" ? (
              <div className=" grid grid-cols-3 gap-[10px]">
                <img src={Purple} />
                <img src={Purple} />
                <img src={Purple} />
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
              <span className="text-[20px]"> Payout & bank details</span>{" "}
            </p>
            <div className=" grid gap-[16px]  my-5 w-full md:w-[530px] ">
              <CustomInput
                type="text"
                label="Bank account name"
                value={name}
                onChange={(newValue) => setName(newValue)}
              />

              <CustomInput
                type="text"
                label="Bank account number"
                value={name}
                onChange={(newValue) => setName(newValue)}
              />

              <CustomSelect4
                options={["UBA", "FIRST BANK", "ACCESS BANK"]}
                placeholder="Bank"
                onSelect={(selectedValue) => setBank(selectedValue)}
              />
              <CustomInput
                type="text"
                label="Bank Verification Number (BVN)"
                value={email}
                onChange={(newValue) => setEmail(newValue)}
              />
              <CustomInput
                type="text"
                label="Country"
                value={email}
                onChange={(newValue) => setEmail(newValue)}
              />

              <div className=" grid mt-[32px] gap-[8px]">
                <div className="">
                  <Button link="/menu" text="Save and continue" />
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
