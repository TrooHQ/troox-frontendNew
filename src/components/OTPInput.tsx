import React, { useRef, useEffect, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";

interface OTPInputProps {
  otp: string[];
  setOtp: (otp: string[]) => void;
  setActiveIndex: React.Dispatch<React.SetStateAction<number>>;
}

const OTPInput: React.FC<OTPInputProps> = ({ otp, setOtp, setActiveIndex }) => {
  const navigate = useNavigate();

  const inputRefs = useRef<HTMLInputElement[]>([]);

  useEffect(() => {
    inputRefs.current = inputRefs.current.slice(0, otp.length);
    if (otp.some((value) => value === "")) {
      const emptyInputIndex = otp.findIndex((value) => value === "");
      inputRefs.current[emptyInputIndex].focus();
    }
  }, [otp]);
  const handleInputChange = (index: number, value: string) => {
    const newOtp = [...otp];
    newOtp[index] = value;

    setOtp(newOtp);

    if (value !== "") {
      const nextEmptyInputIndex = newOtp.findIndex((value) => value === "");
      if (nextEmptyInputIndex !== -1) {
        inputRefs.current[nextEmptyInputIndex].focus();
      }
    }
  };

  const handleInputClick = () => {
    const emptyInputIndex = otp.findIndex((value) => value === "");
    if (emptyInputIndex !== -1) {
      inputRefs.current[emptyInputIndex].focus();
    }
  };

  const isOtpFilled = otp.every((value) => value !== "");

  return (
    <div className="flex flex-col justify-center items-center w-[586px] m-auto">
      <div className="flex flex-col items-center justify-center py-2 w-full">
        <div className="flex flex-col">
          <div className="flex space-x-2">
            {otp.map((value, index) => (
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
          <p className="mt-6 text-[#5955B3] text-base font-light cursor-pointer">Resend Code</p>
        </div>

        <button
          className={`mt-[40px] px-6 py-3 rounded-md w-full ${
            isOtpFilled ? "bg-[#5855b3] text-white" : "text-[#858497] bg-[#D9D9DF]"
          }`}
          disabled={!isOtpFilled}
          onClick={() => {
            setActiveIndex((prevIndex) => prevIndex + 1);
            navigate("/verified-successfully");
          }}
        >
          Activate Account
        </button>
      </div>
    </div>
  );
};

export default OTPInput;
