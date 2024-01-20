import React, { useRef } from "react";

interface CustomSelectProps {
  label: string;
  options: string[];
  value: string;
  error?: string;
  onChange: (value: string) => void;
}

const CustomSelect: React.FC<CustomSelectProps> = ({
  // label,
  options,
  value,
  error,
  onChange,
}) => {
  // const [isFocused, setIsFocused] = useState<boolean>(false);
  const selectRef = useRef<HTMLSelectElement | null>(null);

  // const handleFocus = () => {
  //   setIsFocused(true);
  // };

  // const handleBlur = () => {
  //   setIsFocused(value !== "");
  // };

  // const handleLabelClick = () => {
  //   if (selectRef.current) {
  //     selectRef.current.focus();
  //   }
  // };

  return (
    <div>
      <div className="relative">
        <select
          className={`border-2 border-gray-300  bg-white p-2 focus:outline-[#5955B3] w-full rounded ${
            error ? "border-red-500" : ""
          }`}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          // onFocus={handleFocus}
          // onBlur={handleBlur}
          ref={selectRef}
        >
          <option value="" disabled>
            How would you categorize your business?
          </option>
          {options.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>
        {/* <label
          className={`absolute transition-all duration-300 cursor-text ${
            isFocused
              ? "text-[14px] -top-3 left-2 bg-white px-2 text-[#000000]"
              : "top-2 left-4 bg-white text-gray-400"
          } ${error ? "text-red-500" : ""}`}
          onClick={handleLabelClick}
        >
          {label}
        </label> */}
      </div>
    </div>
  );
};

export default CustomSelect;
