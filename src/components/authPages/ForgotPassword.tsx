import { useState } from "react";
import Logo from "../../assets/trooLogo.svg";
import lockIcon from "../../assets/passwordlockIcon2.png";
import EmailInput from "../inputFields/CustomInput";
import { Link, useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const navigate = useNavigate();

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
          <Link to="/checkmail">
            <button className="bg-purple500 w-full text-center text-white py-3 rounded">
              Get a reset link
            </button>
          </Link>
          <div className=" text-center py-3">
            <div onClick={() => navigate(-1)}>
              <p className=" font-[500] text-[16px] text-purple500 cursor-pointer">
                Go Back
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
