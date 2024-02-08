import React, { useState } from "react";
import AddWhite from "../../assets/addWhite.svg";

interface ReusableCheckInputProps {
  text: string;
}
const CheckInput: React.FC<ReusableCheckInputProps> = ({ text }) => {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckToggle = () => {
    setIsChecked(!isChecked);
  };

  return (
    <div
      className={`flex items-center justify-between py-[8px] px-[16px] cursor-pointer ${
        isChecked ? "bg-[#EFEFEF]" : ""
      }`}
      onClick={handleCheckToggle}
    >
      <p className={`cursor-pointer text-[#121212] text-[16px] font-[400]`}>
        {text}
      </p>

      {isChecked && <img src={AddWhite} alt="" />}
    </div>
  );
};

export default CheckInput;
