import React, { useState, useRef, CSSProperties } from "react";
import EyeFillIcon from "remixicon-react/EyeFillIcon";
import EyeCloseFillIcon from "remixicon-react/EyeCloseFillIcon";
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
    setIsFocused(value !== "");
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
          className={`border-2 border-gray-300 p-2 focus:outline-[#5955B3] w-full rounded ${
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
              ? "text-[14px] -top-3 left-2 bg-white px-2 text-[#000000]"
              : "top-2 left-4 bg-white text-gray-400"
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
            <EyeFillIcon className="text-gray-400" />
          ) : (
            <EyeCloseFillIcon className="text-gray-400" />
          )}
        </div>
      </div>
    </div>
  );
};

export default PasswordInput;
