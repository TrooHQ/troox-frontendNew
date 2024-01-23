import { useState } from "react";
import Logo from "../../assets/trooLogo.svg";
import { Button } from "../buttons/Button.js";
import PasswordInput from "../inputFields/PasswordInput.js";
import { Link } from "react-router-dom";
import CustomInput from "../inputFields/CustomInput.js";
import { useDispatch, useSelector } from "react-redux";
import {
  setEmail,
  setPassword,
  selectEmail,
  selectPassword,
} from "../../slices/authSlice.js";

const Login = () => {
  const dispatch = useDispatch();
  const Email = useSelector(selectEmail);
  const Password = useSelector(selectPassword);

  const [error, setError] = useState("");

  const handlePasswordChange = (newValue: string) => {
    dispatch(setPassword(newValue));
  };

  const handleButtonClick = () => {
    if (!Email || !Password) {
      setError("Invalid email/password");
      return;
    } else {
      console.log("Email:", Email);
      console.log("Password:", Password);
      setError("");
    }
  };

  return (
    <div className="bg-[#EFEFEF] h-screen">
      <div className="flex flex-col items-center justify-center h-screen my-auto">
        <div className="">
          <img src={Logo} alt="" />
        </div>
        <div className="bg-white grid  p-[40px] mt-[32px] mb-[40px] w-full md:w-[530px] rounded shadow-md">
          <div className=" mb-[40px]">
            <p className="text-2xl text-[#121212] ">Login Details</p>
            {error && <p className="text-red-500 pt-4">{error}</p>}
          </div>
          <div className=" grid gap-[24px]">
            <CustomInput
              type="email"
              label="Business email"
              value={Email}
              error={error}
              onChange={(newValue) => dispatch(setEmail(newValue))}
            />
            <PasswordInput
              label="Password"
              value={Password}
              onChange={handlePasswordChange}
              error={error}
              style={{ marginTop: "10px", color: "blue" }}
            />
          </div>

          <div className="flex justify-end mt-[16px] mb-[32px]">
            <Link to="/forgot-password">
              <p className="text-purple500">Forgot password?</p>
            </Link>
          </div>
          <div className="" onClick={handleButtonClick}>
            <Button text="Login" />
          </div>
        </div>
        <div className=" mt-[40px]">
          <Link to="/register">
            <p className="font-[500] text-[16px] text-purple500">
              Create a business account
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
