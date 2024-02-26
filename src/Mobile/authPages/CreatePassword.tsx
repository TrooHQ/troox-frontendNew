import { useState } from "react";
import Logo from "../../assets/trooLogo.svg";
import { Button } from "../buttons/Button.js";
import PasswordInput from "../inputFields/PasswordInput.js";
import { Link } from "react-router-dom";
import Modal from "../Components/Modal.js";
import CheckCircle from "../assets/check_circle.svg";
import ArrowRight from "../assets/arrowRight.svg";

const CreatePassword = () => {
  const [modal, setModal] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handlePasswordChange = (newValue: string) => {
    setPassword(newValue);
  };

  const handleConfirmPasswordChange = (newValue: string) => {
    setConfirmPassword(newValue);
  };

  const handleButtonClick = () => {
    if (!password || !confirmPassword) {
      setError("Please enter both password and confirm password");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    console.log("Password:", password);
    console.log("Confirm Password:", confirmPassword);
    setError("");

    setModal(true);
  };

  return (
    <div className="bg-[#EFEFEF] h-screen">
      <div className="flex flex-col items-center justify-center h-screen my-auto">
        <div className="">
          <img src={Logo} alt="" />
        </div>
        <div className="grid p-[40px] mt-[128px] mb-[40px] w-full md:w-[530px]">
          <div className="mb-[32px] text-center">
            <p className="text-[20px] text-grey500 ">Create Password</p>
            {error && <p className="text-red-500 pt-4">{error}</p>}
          </div>
          <div className="grid gap-[16px]">
            <PasswordInput
              label="Enter Password"
              value={password}
              onChange={handlePasswordChange}
              error={error}
              style={{ color: "blue" }}
            />
            <PasswordInput
              label="Confirm Password"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              error={error}
              style={{ color: "blue" }}
            />
          </div>

          <div className=" mt-[40px]" onClick={handleButtonClick}>
            <Button text="Create password" />
          </div>
        </div>
      </div>

      <Modal isOpen={modal}>
        <div className=" w-[328px]">
          <div className=" flex flex-col items-center justify-center">
            <img src={CheckCircle} alt="" />
            <p className=" text-grey500 my-[24px] w-[277px] text-center">
              Your password has been created successfully
            </p>
            <Link to="/login">
              <div className=" flex items-end gap-[4px]">
                <p className=" text-[#5855B3]">Proceed to Login</p>
                <img src={ArrowRight} alt="" />
              </div>
            </Link>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default CreatePassword;
