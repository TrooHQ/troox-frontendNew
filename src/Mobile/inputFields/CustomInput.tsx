import React, { useState, useRef } from "react";

interface CustomInputProps {
  label: string;
  type: string;
  value: string;
  error?: string | undefined;
  maxLength?: number;
  onChange: (value: string) => void;
}

const CustomInput: React.FC<CustomInputProps> = ({
  label,
  type,
  value,
  error,
  maxLength,
  onChange,
}) => {
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleFocus = () => {
    setIsFocused(true);
  };

  // const handleBlur = () => {
  //   setIsFocused(value !== "");
  // };

  const handleBlur = () => {
    setIsFocused(value !== "" || isFocused);
  };
  const handleLabelClick = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <div>
      <div className="relative">
        <input
          type={type}
          className={`border bg-transparent border-grey200 p-2 text-grey500 text-[16px] focus:outline-purple500 focus:border-none w-full rounded ${
            error ? "border-red-500" : ""
          }`}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={handleFocus}
          onBlur={handleBlur}
          maxLength={maxLength}
          ref={inputRef}
        />
        <label
          className={`absolute transition-all duration-300 cursor-text ${
            isFocused
              ? "text-[14px] -top-3 left-2 bg-[#EFEFEF] px-2 text-[#000000]"
              : "top-2 left-4  text-grey200 text-[14px]"
          } ${error ? "text-red-500" : ""}`}
          onClick={handleLabelClick}
        >
          {label}
        </label>
      </div>
    </div>
  );
};

export default CustomInput;
