import { useState } from "react";
import Logo from "../../assets/trooLogo.svg";
import lockIcon from "../../assets/passwordlockIcon2.png";
import EmailInput from "../inputFields/CustomInput";
import { useNavigate } from "react-router-dom";
import { SERVER_DOMAIN } from "../../Api/Api";
import axios from "axios";
import { toast } from "react-toastify";

const ForgotPassword = () => {
  const navigate = useNavigate();

  const [value, setValue] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const forgotPassword = async () => {
    try {
      setLoading(true);
      setError("");
      const response = await axios.post(`${SERVER_DOMAIN}/requestForgotPassword`, {
        email: value,
      });
      setLoading(false);
      console.log(response.data);
      toast.success("Password reset token sent successfully");
      navigate("/checkmail");
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
    }
  };

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
          <div className=" flex flex-col items-center justify-center text-center">
            <p className=" text-red-500">{error.charAt(0).toUpperCase() + error.slice(1)}</p>
            <p className=" text-grey500 text-[24px] font-[500] py-5">Forgot Password?</p>
            <p className=" text-grey300 text-[16px] font-[300] leading-[24px]">
              Enter email or phone number associated with your account and we'll send you an
              email/SMS to reset it.
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
          <div className="" onClick={forgotPassword}>
            <button
              className="bg-purple500 w-full text-center text-white py-3 rounded"
              disabled={loading}
            >
              {loading ? "Loading..." : "Get a reset link"}
            </button>
          </div>
          <div className=" text-center py-3">
            <div onClick={() => navigate(-1)}>
              <p className=" font-[500] text-[16px] text-purple500 cursor-pointer">Go Back</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
