import { useState } from "react";
import Logo from "../../assets/trooLogo.svg";
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
import axios from "axios";
import { SERVER_DOMAIN } from "../../Api/Api.ts";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import { setUserData } from "../../slices/UserSlice.ts";
// import Button from "../Buttons/Button.tsx";
const Login = () => {
  const dispatch = useDispatch();
  const Email = useSelector(selectEmail);
  const Password = useSelector(selectPassword);

  const [error, setError] = useState("");
  const [loading, setLoading] = useState<boolean>(false);
  const handlePasswordChange = (newValue: string) => {
    dispatch(setPassword(newValue));
  };

  const history = useNavigate();

  const handleLogin = async () => {
    if (!Email || !Password) {
      setError("All Fields are required...");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post(`${SERVER_DOMAIN}/login`, {
        email: Email,
        password: Password,
      });
      setLoading(false);
      dispatch(setUserData(response.data));
      const userType = response.data.user_role;
      toast.success(response.data.message);
      if (userType === "employee") {
        history("/employee-dashboard");
      } else if (userType === "admin") {
        // history("/dashboard");
        if (response.data.has_created_menu_item == false) {
          history("/menu");
        } else {
          history("/dashboard");
        }
      }
    } catch (error) {
      console.error("Error occurred:", error);
      if (axios.isAxiosError(error)) {
        if (error.response) {
          setError(error.response.data.message);
          console.log(error.response.data);
          if (error.response.data.message === "Your Email is not verified") {
            history("/verify");
            console.log("Unverified");
          }
        } else {
          setError("An error occurred. Please try again later.");
        }
      } else {
        setError("An error occurred. Please try again later.");
      }
    }
    setLoading(false);
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
              label="Business email/phone number"
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
          <div className="" onClick={handleLogin}>
            <button
              className="bg-purple500 w-full text-center text-white py-3 rounded"
              disabled={loading}
            >
              Login
            </button>
          </div>
        </div>
        <div className=" mt-[100px]">
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
