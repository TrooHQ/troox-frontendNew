import { useState } from "react";
import Logo from "../assets/trooLogo.svg";
import { Button } from "./Button";
import PasswordInput from "./PasswordInput";
import { Link } from "react-router-dom";
import CustomInput from "./CustomInput";
import { useDispatch, useSelector } from "react-redux";
import {
  setEmail,
  setPassword,
  selectEmail,
  selectPassword,
} from "../slices/authSlice.js";

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
    }

    console.log("Email:", Email);
    console.log("Password:", Password);

    setError("");
  };

  return (
    <div className="bg-[#EFEFEF] h-screen">
      <div className="flex flex-col items-center justify-center h-screen my-auto">
        <div className="">
          <img src={Logo} alt="" />
        </div>
        <div className="bg-white grid gap-5 p-8 my-10 w-full md:w-[530px] rounded shadow-md">
          <div className=" mb-4">
            <p className="text-2xl text-[#121212] ">Login Details</p>
            {error && <p className="text-red-500 pt-4">{error}</p>}
          </div>
          <CustomInput
            type="email"
            label="Email"
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

          <div className="flex justify-end">
            <Link to="/forgot-password">
              <p className="text-[#5955B3]">Forgot password?</p>
            </Link>
          </div>
          <div className="" onClick={handleButtonClick}>
            <Button text="Login" />
          </div>
        </div>
        <div className="">
          <Link to="/register">
            <p className="font-[500] text-[16px] text-[#5955B3]">
              Create a business account
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
