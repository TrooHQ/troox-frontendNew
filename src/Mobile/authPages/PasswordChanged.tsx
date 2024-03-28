import Logo from "../../assets/trooLogo.svg";
import lockIcon from "../../assets/passwordlockIcon2.png";
import Button from "../Buttons/Button";

const PasswordChanged = () => {
  return (
    <div className="bg-[#EFEFEF] h-screen">
      <div className="flex flex-col items-center justify-center h-screen my-auto">
        <div className="">
          <img src={Logo} alt="" />
        </div>{" "}
        <div className="bg-white  p-8 my-10 w-full md:w-[530px] rounded shadow-md">
          <div className="grid items-center gap-5">
            <div className=" flex gap-5 flex-col items-center justify-center text-center">
              <img src={lockIcon} alt="" />
              <div className=" max-w-[355px] mx-auto">
                <p className=" text-grey500 text-[24px] font-[600]">
                  Well done!
                </p>
                <p className=" text-grey500 text-[16px] font-[500] py-3">
                  You have successfully changed your password. Please use your
                  new password when logging in
                </p>
              </div>
            </div>
            <Button link="/" text="Login to Continue" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PasswordChanged;
