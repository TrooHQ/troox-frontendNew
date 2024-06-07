import Logo from "../../assets/trooLogo.svg";
import { CheckCircle } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const VerifySuccess = () => {
  const navigate = useNavigate();
  return (
    <div className="bg-[#EFEFEF] h-screen">
      <div className="flex flex-col items-center justify-start h-screen my-auto">
        <div className="mt-[100px]">
          <img src={Logo} alt="" />
        </div>
        <div className="mt-[160px] mb-10">
          <CheckCircle className="text-green-500 text-[100px]" style={{ fontSize: 120 }} />
        </div>
        <div className="text-center">
          <h4 className="text-[#121212] text-2xl font-medium mb-3">Account verified</h4>
          <p className="text-[#121212] text-base font-normal">
            Your account has been verified successfully
          </p>
        </div>
        <button
          className={`mt-[80px] px-6 py-3 rounded-md w-[40%] ${"bg-[#5855b3] text-white cursor-pointer"}`}
          onClick={() => {
            navigate("/");
          }}
        >
          Log in Your Account
        </button>
      </div>
    </div>
  );
};

export default VerifySuccess;
