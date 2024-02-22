import { useState } from "react";
import Grey from "../assets/Grey.svg";
import Purple from "../assets/purple.svg";
import Logo from "../../assets/trooLogo.svg";
import CustomInput from "../inputFields/CustomInput";
import PasswordInput from "../inputFields/PasswordInput";
import { Button } from "../buttons/Button";
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

  sessionStorage.setItem("businessType", businessType);
  console.log(businessType);

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
    setCurrentStep(currentStep + 1);
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
            <div className=" flex justify-center gap-[20px] items-center">
              <img src={Purple} />
              <img src={Grey} />
              <img src={Grey} />
            </div>
            <p className=" text-[#121212] text-[14px] my-[24px]">
              Stage 1/{" "}
              <span className="text-[20px]"> Business information</span>{" "}
            </p>
            <div className=" grid gap-3  my-5 w-full md:w-[530px] ">
              <CustomInput
                type="text"
                label="Business name"
                value={name}
                onChange={(newValue) => setName(newValue)}
              />
              <CustomInput
                type="text"
                label="Business phone number"
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
                type="text"
                label="City"
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
            <div className=" grid grid-cols-3 gap-[10px]">
              <img src={Purple} />
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
            <p className=" text-[#121212] text-[14px] my-[24px]">
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
            <div className=" grid grid-cols-3 gap-[10px]">
              <img src={Purple} />
              <img src={Purple} />
              <img src={Purple} />
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
            <p className=" text-[#121212] text-[14px] my-[24px]">
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
