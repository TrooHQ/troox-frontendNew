import React, { useRef, useEffect, ChangeEvent } from "react";
import { PinInputProps } from "../comp/common.types";
import SetupHeader from "../comp/SetupHeader";
import { ArrowBack } from "@mui/icons-material";
import passwordpng from "../images/pngs/password2.png";

interface TillOnboardingMobileProps extends PinInputProps {
  onNavigate: (path: string) => void;
}

const TillOnboardingMobile: React.FC<TillOnboardingMobileProps> = ({ pin, setPin, onNavigate }) => {
  const inputRefs = useRef<HTMLInputElement[]>([]);

  useEffect(() => {
    inputRefs.current = inputRefs.current.slice(0, pin.length);
    if (pin.some((value) => value === "")) {
      const emptyInputIndex = pin.findIndex((value) => value === "");
      inputRefs.current[emptyInputIndex].focus();
    }
  }, [pin]);

  const handleInputChange = (index: number, value: string) => {
    const newPin = [...pin];
    newPin[index] = value;

    setPin(newPin);

    if (value !== "") {
      const nextEmptyInputIndex = newPin.findIndex((value) => value === "");
      if (nextEmptyInputIndex !== -1) {
        inputRefs.current[nextEmptyInputIndex].focus();
      }
    }
  };

  const handleInputClick = () => {
    const emptyInputIndex = pin.findIndex((value) => value === "");
    if (emptyInputIndex !== -1) {
      inputRefs.current[emptyInputIndex].focus();
    }
  };

  const isPinFilled = pin.every((value) => value !== "");

  const handleBack = () => {
    onNavigate("/auth/login");
  };

  const handleOkClick = () => {
    if (pin.length === 4) {
      onNavigate("/select-till-module");
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mt-[16px] mb-[40px]">
        <div onClick={handleBack}>
          <ArrowBack style={{ cursor: "pointer" }} />
        </div>
      </div>
      <div className="flex flex-col justify-center items-center m-auto">
        <SetupHeader header="" description="Enter your personal PIN" />

        <div className="mb-[32px]">
          <img src={passwordpng} alt="enter your pin" width={100} height={100} />
        </div>

        <div className="flex flex-col items-center justify-center py-2 w-full">
          <div className="flex space-x-2">
            {pin.map((value, index) => (
              <input
                key={index}
                ref={(el) => {
                  if (el !== null) {
                    inputRefs.current[index] = el;
                  }
                }}
                type="text"
                value={value}
                maxLength={1}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  handleInputChange(index, e.target.value)
                }
                onClick={handleInputClick}
                className="w-12 h-12 text-4xl text-center border rounded-md outline-kanta-blue"
              />
            ))}
          </div>

          <button
            className={`mt-[40px] px-6 py-3 rounded-md w-full ${
              isPinFilled ? "bg-[#5855b3] text-white" : "text-[#858497] bg-[#D9D9DF]"
            }`}
            disabled={!isPinFilled}
            onClick={handleOkClick}
          >
            Continue
          </button>
        </div>

        <div>
          <p className="mt-[2px] text-[#858497] text-xs font-light leading-5">
            Forgotten PIN? &nbsp;
            <span className="text-[#5855B3] text-sm font-semibold leading-5">Change PIN</span>
          </p>
        </div>
      </div>{" "}
    </div>
  );
};

export default TillOnboardingMobile;
