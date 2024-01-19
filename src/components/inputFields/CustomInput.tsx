import React, { useState, useRef } from "react";

interface CustomInputProps {
  label: string;
  type: string;
  value: string;
  error?: string;
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

  const handleBlur = () => {
    setIsFocused(value !== "");
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
          className={`border-2 border-gray-300 p-2 focus:outline-[#5955B3] w-full rounded ${
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
              ? "text-[14px] -top-3 left-2 bg-white px-2 text-[#000000]"
              : "top-2 left-4 bg-white text-gray-400"
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