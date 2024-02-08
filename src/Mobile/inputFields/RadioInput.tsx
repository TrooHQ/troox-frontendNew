import React, { useState } from "react";

interface RadioInputProps {
  options: string[];
}

const RadioInput: React.FC<RadioInputProps> = ({ options }) => {
  const [selectedOption, setSelectedOption] = useState<string>("");

  const handleOptionChange = (option: string) => {
    setSelectedOption(option);
  };

  return (
    <div className=" flex items-center gap-[32px]">
      {options.map((option, index) => (
        <div key={index} className="flex items-center">
          <input
            type="radio"
            id={option}
            name="radio-option"
            value={option}
            checked={selectedOption === option}
            onChange={() => handleOptionChange(option)}
            className="mr-2"
          />
          <label
            htmlFor={option}
            className=" text-[#121212] font-[400] text-[14px] cursor-pointer capitalize"
          >
            {option}
          </label>
        </div>
      ))}
    </div>
  );
};

export default RadioInput;
