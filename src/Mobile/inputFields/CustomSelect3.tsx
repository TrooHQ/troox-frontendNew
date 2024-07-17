import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoIosArrowDown } from "react-icons/io";
interface Option {
  value: string;
  label: string;
  link?: string;
}

interface CustomSelect3Props {
  options: (string | Option)[];
  disabledOptions?: string[];
  placeholder?: string;
  BG?: string;
  text?: string;
  hover?: string;
}

const CustomSelect3: React.FC<CustomSelect3Props> = ({
  options,
  disabledOptions,
  placeholder = "",
  BG,
  text,
  hover = "hover:bg-gray-100",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string>(placeholder);
  const navigate = useNavigate();

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const selectOption = (option: string, link?: string) => {
    setSelectedOption(option);
    setIsOpen(false);
    if (link) {
      navigate(link);
    }
  };

  const getOptionLabel = (option: string | Option) => {
    if (typeof option === "string") {
      return option;
    }
    return option.label;
  };

  const getOptionValue = (option: string | Option) => {
    if (typeof option === "string") {
      return option;
    }
    return option.label;
  };

  return (
    <div className="relative">
      <div
        className={`border border-gray-300 ${
          BG ? BG : "bg-white"
        } p-2 focus:outline-[#5955B3] ${
          text ? text : "text-black"
        } w-full rounded flex justify-between items-center gap-[8px] cursor-pointer`}
        onClick={toggleDropdown}
      >
        <span className="selected-option">{selectedOption}</span>
        <span className={`arrow ${isOpen ? "transform rotate-180" : ""}`}>
          <IoIosArrowDown />
        </span>
      </div>
      <div
        className={`options-container absolute top-full left-0 w-full border border-gray-300 bg-white shadow-md rounded-b transition-all ${
          isOpen ? "block" : "hidden"
        }`}
      >
        {options.map((option, index) => (
          <div
            key={index}
            className={`option p-2 cursor-pointer transition-colors ${hover} ${
              disabledOptions &&
              disabledOptions.includes(getOptionValue(option))
                ? "opacity-50 cursor-not-allowed"
                : ""
            }`}
            onClick={() =>
              !disabledOptions ||
              !disabledOptions.includes(getOptionValue(option))
                ? selectOption(
                    getOptionValue(option),
                    typeof option === "string" ? undefined : option.link
                  )
                : null
            }
          >
            {getOptionLabel(option)}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CustomSelect3;
