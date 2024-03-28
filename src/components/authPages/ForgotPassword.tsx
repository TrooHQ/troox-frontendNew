import { useState } from "react";
import Logo from "../../assets/trooLogo.svg";
import lockIcon from "../../assets/passwordlockIcon2.png";
import Button from "../Buttons/Button";
import EmailInput from "../inputFields/CustomInput";
import BackButton from "../Buttons/Button";

const ForgotPassword = () => {
  const [value, setValue] = useState<string>("");

  return (
    <div className="bg-[#EFEFEF] h-screen">
      <div className="flex flex-col items-center justify-center h-screen my-auto">
        <div className="">
          <img src={Logo} alt="" />
        </div>{" "}
        <div className="bg-white  p-8 my-10 w-full md:w-[530px] rounded shadow-md">
          <div className=" flex flex-col items-center justify-center">
            <img src={lockIcon} alt="" />
          </div>
          <div className=" flex flex-col items-center justify-center text-center ">
            <p className=" text-grey500 text-[24px] font-[600] py-5">
              Forgot Password?
            </p>
            <p className=" text-grey300 text-[16px] font-[500] leading-[24px]">
              Enter email or phone number associated with your account and we'll
              send you an email/SMS to reset it.
            </p>
          </div>
          <div className=" py-5">
            <EmailInput
              type="text"
              label="Email address or phone number"
              value={value}
              onChange={(newValue) => setValue(newValue)}
            />
          </div>
          <Button link="/checkmail" text="Get a reset link" />
          <div className=" text-center py-3">
            <BackButton text="Go Back" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
