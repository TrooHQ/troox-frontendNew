import { useState } from "react";
import Logo from "../../assets/trooLogo.svg";
import OTPInput from "../OTPInput";

const VerifyAccount = () => {
  //   const [error, setError] = useState();
  const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""]);
  const [activeIndex, setActiveIndex] = useState(0);

  const components = [
    <OTPInput key="OTPInput" otp={otp} setOtp={setOtp} setActiveIndex={setActiveIndex} />,
  ];

  return (
    <div className="bg-[#EFEFEF] h-screen">
      <div className="flex flex-col items-center justify-center h-screen my-auto">
        <div className="">
          <img src={Logo} alt="" />
        </div>
        <div className="bg-white flex flex-col p-[40px] mt-[32px] mb-[40px] w-full md:w-[50%] rounded shadow-md">
          <div className="text-center mb-[32px]">
            <p className="text-[28px] font-normal text-purple500 ">Verify Account</p>
            {/* {error && <p className="text-red-500 pt-4">{error}</p>} */}
          </div>
          <div className=" flex flex-col items-center justify-center text-center">
            {/* {error && (
              <p className=" text-red-500">{error.charAt(0).toUpperCase() + error.slice(1)}</p>
            )} */}
            <p className=" text-grey300 text-[16px] font-[300] leading-[24px] w-2/3 mb-6">
              A verification code has been sent to your email. Please enter the six-digit OTP that
              was sent to your email
            </p>
          </div>
          {components[activeIndex]}
        </div>
      </div>
    </div>
  );
};

export default VerifyAccount;
