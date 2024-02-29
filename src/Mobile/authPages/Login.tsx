import { useState } from "react";
import Logo from "../../assets/trooLogo.svg";
import { Button } from "../Buttons/Button.tsx";
import PasswordInput from "../inputFields/PasswordInput.js";
import { Link, useNavigate } from "react-router-dom";
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

  const history = useNavigate();

  const handleButtonClick = () => {
    if (!Email || !Password) {
      setError("Invalid email/password");
      return;
    } else {
      console.log("Email:", Email);
      console.log("Password:", Password);
      setError("");

      history("/dashboard");
    }
  };

  return (
    <div className="bg-[#EFEFEF] h-screen">
      <div className="flex flex-col items-center justify-center h-screen my-auto">
        <div className="">
          <img src={Logo} alt="" />
        </div>
        <div className=" grid  p-[40px] mt-[128px] mb-[40px] w-full md:w-[530px]">
          <div className=" mb-[40px] text-center">
            <p className="text-2xl text-grey500 ">Login Details</p>
            {error && <p className="text-red-500 pt-4">{error}</p>}
          </div>
          <div className=" grid gap-[16px]">
            <CustomInput
              type="text"
              label="Business name/phone number"
              value={Email}
              error={error}
              onChange={(newValue) => dispatch(setEmail(newValue))}
            />
            <PasswordInput
              label="Password"
              value={Password}
              onChange={handlePasswordChange}
              error={error}
              style={{ color: "blue" }}
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
        <div className=" mt-[150px]">
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
