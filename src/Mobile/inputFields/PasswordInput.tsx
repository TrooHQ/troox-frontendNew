import React, { useState, useRef, CSSProperties } from "react";
import EyeOpen from "../../assets/eyeOpen.png";
import EyeClose from "../../assets/eyeClose.png";
interface PasswordInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  style?: CSSProperties;
}

const PasswordInput: React.FC<PasswordInputProps> = ({
  label,
  value,
  onChange,
  error,
  style,
}) => {
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(value !== "" || isFocused);
  };
  const handleLabelClick = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div style={style}>
      <div className="relative">
        <input
          type={showPassword ? "text" : "password"}
          className={` bg-transparent border border-grey200 p-2 text-grey500 text-[16px] focus:border-purple500 focus:border-none w-full rounded ${
            error ? "border-red-500" : ""
          }`}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={handleFocus}
          onBlur={handleBlur}
          ref={inputRef}
        />
        <label
          className={`absolute transition-all duration-300 cursor-text ${
            isFocused
              ? "text-[14px] -top-3 left-2 bg-[#EFEFEF] px-2 text-[#000000]"
              : "top-2 left-4 bg-[#EFEFEF] text-grey200 text-[14px]"
          } ${error ? "text-red-500" : ""}`}
          onClick={handleLabelClick}
        >
          {label}
        </label>

        <div
          className="absolute top-2 right-2 cursor-pointer"
          onClick={togglePasswordVisibility}
        >
          {showPassword ? (
            <img src={EyeOpen} alt="" className="text-gray-400" />
          ) : (
            <img src={EyeClose} alt="" className="text-gray-400" />
          )}
        </div>
      </div>
    </div>
  );
};

export default PasswordInput;
