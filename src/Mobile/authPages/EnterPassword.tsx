import { Link } from "react-router-dom";
import Logo from "../../assets/trooLogo.svg";
import { Button } from "../Buttons/Button.js";

const EnterPassword = () => {
  return (
    <div className="bg-[#EFEFEF] h-screen">
      <div className="flex flex-col items-center justify-center h-screen my-auto">
        <div className="">
          <img src={Logo} alt="" />
        </div>
        <div className=" grid  p-[40px] mt-[128px] mb-[40px] w-full md:w-[530px]">
          <div className=" mb-[40px] text-center">
            <p className="text-[20px] font-[500] text-[#121212] ">Hello User</p>
            <p className=" text-[16px] text-[#121212] font-[400] mt-[24px] mb-[32px]">
              Click the button below to enter your password
            </p>
          </div>

          <Link to="/create-password">
            <div className="">
              <Button text="Enter password" />
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EnterPassword;
