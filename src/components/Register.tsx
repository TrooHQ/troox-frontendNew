import { useState } from "react";
import Logo from "../assets/troo-logo.png";

import { Button } from "./Button";
import BackButton from "./backButton";
import CustomInput from "./CustomInput";
import PasswordInput from "./PasswordInput";

const Register = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [pin, setPin] = useState<string>("");
  const [ConfirmPin, setConfirmPin] = useState<string>("");

  const handlePasswordChange = (newValue: string) => {
    setPassword(newValue);
  };
  const handleConfirmPasswordChange = (newValue: string) => {
    setConfirmPassword(newValue);
  };

  return (
    <div className="bg-[#EFEFEF] h-screen">
      <div className="flex flex-col items-center justify-center h-screen my-auto">
        <div className="">
          <img src={Logo} alt="" />
        </div>{" "}
        <div className="bg-white grid gap-5 p-8 my-5 w-full md:w-[530px] rounded shadow-md">
          <p className="text-2xl text-[#121212] mb-4">New Account</p>
          <CustomInput
            type="text"
            label="Business Name"
            value={name}
            onChange={(newValue) => setName(newValue)}
          />
          <CustomInput
            type="email"
            label="Business Email"
            value={email}
            onChange={(newValue) => setEmail(newValue)}
          />

          <PasswordInput
            label="Enter your password"
            value={password}
            onChange={handlePasswordChange}
          />
          <PasswordInput
            label="Confirm your password"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
          />

          <CustomInput
            type="text"
            label="Create pin (Create a four-digit pin)"
            value={pin}
            maxLength={4}
            onChange={(newValue) => setPin(newValue)}
          />
          <CustomInput
            type="text"
            label="Confirm your pin"
            value={ConfirmPin}
            maxLength={4}
            onChange={(newValue) => setConfirmPin(newValue)}
          />
          <div className=" my-3">
            <Button text="Create Account" />
            <div className=" flex items-center justify-center my-2">
              <BackButton />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
