import { useState } from "react";
import Logo from "../../assets/trooLogo.svg";
import PasswordInput from "../inputFields/PasswordInput";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { SERVER_DOMAIN } from "../../Api/Api";
import { toast } from "react-toastify";

const ResetPassword = () => {
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState<boolean>(false);
  const history = useNavigate();
  const token = "22wedbee23rej3r";

  const handlePasswordChange = (newValue: string) => {
    setPassword(newValue);
  };
  const handleConfirmPasswordChange = (newValue: string) => {
    setConfirmPassword(newValue);
  };

  const handleButtonClick = async () => {
    try {
      if (!password || !confirmPassword || !token) {
        setError("All fields are required!");
        return;
      }

      if (password !== confirmPassword) {
        setError("Passwords do not match");
        return;
      }

      setError("");
      setLoading(true);
      const response = await axios.post(`${SERVER_DOMAIN}/resetForgotPassword`, {
        token,
        password,
        confirm_password: confirmPassword,
      });
      setLoading(false);
      console.log(response.data);
      toast.success("Password reset successfully");
      history("/password-changed");
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
        <div className="bg-white grid gap-5 p-8 my-10 w-full md:w-[530px] rounded shadow-md">
          <div className=" max-w-[387px]">
            <p className="text-2xl text-grey500 mb-4 font-[400]">Create new password</p>
            {error && <p className="text-red-500 pt-4">{error}</p>}
            <p className="font-[300]">
              Your new password must be different from previously used passwords.
            </p>
          </div>

          <PasswordInput
            label="Enter new password"
            value={password}
            onChange={handlePasswordChange}
          />
          <PasswordInput
            label="Confirm new password"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
          />
          <p className="font-light text-[14px]">Both passwords must match</p>
          <div className="" onClick={handleButtonClick}>
            <button className="bg-purple500 w-full text-center text-white py-3 rounded">
              {loading ? "Loading..." : "Reset password"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
