import { ChangeEvent } from "react";

import ArrowToggle from "../assets/chevron-down.svg";
import BackButton from "./buttons/backButton";
import { Link } from "react-router-dom";

interface FAQItem {
  question: string;
  inputValue?: string;
}

interface FAQProps {
  faqData: FAQItem[];
  openIndex: number | null;
  toggleAnswer: (index: number) => void;
  handleInputChange: (
    index: number,
    event: ChangeEvent<HTMLInputElement>
  ) => void;
}

const FAQSetting: React.FC<FAQProps> = ({
  faqData,
  openIndex,
  toggleAnswer,
}) => {
  // const [checkedLegalType, setCheckedLegalType] = useState<string>("");

  // const handleLegalTypeChange = (
  //   event: React.ChangeEvent<HTMLInputElement>
  // ) => {
  //   setCheckedLegalType(event.target.value);
  //   console.log(event.target.value, "checked");
  // };
  // const [name, setName] = useState<string>("");
  // const [selectedValue, setSelectedValue] = useState<string>("");

  return (
    <div className="grid gap-4">
      {faqData.map((faq, index) => (
        <div
          key={index}
          className={`bg-purple500 border pt-4 border-purple500 focus:outline-[#5955B3] w-full rounded `}
        >
          <div
            className="flex items-center justify-between cursor-pointer font-bold "
            onClick={() => toggleAnswer(index)}
          >
            <div className="mb-2 cursor-pointer">
              <p className="text-[#ffffff] font-[500] text-[14px] lg:text-[16px] px-[24px]">{` ${faq.question}`}</p>
            </div>
            <div className="ml-2">
              <img
                src={ArrowToggle}
                alt=""
                className={`transform transition-transform duration-300 ${
                  openIndex === index ? "rotate-180" : ""
                }`}
              />
            </div>
          </div>

          <div className=" bg-white">
            {openIndex === index && (
              <div className="text-[#757575] text-[12px] lg:text-[18px] font-[300] py-[24px] px-[24px]">
                {openIndex === 0 && (
                  <div className="">
                    <div className=" grid gap-[24px]">
                      <div className="flex  items-center">
                        <input
                          type="checkbox"
                          id="rememberMe"
                          className="h-6 w-6 mr-[24px] border border-black" // Add border-black to apply black border
                          // checked={auth.rememberMe}
                          // onChange={handleRememberMeToggle}
                        />
                        <label
                          htmlFor="rememberMe"
                          className="text-[16px] font-[400] text-[#121212]"
                        >
                          Create Category
                        </label>
                      </div>
                      <div className="flex  items-center">
                        <input
                          type="checkbox"
                          id="rememberMe"
                          className="h-6 w-6 mr-[24px] border border-black" // Add border-black to apply black border
                          // checked={auth.rememberMe}
                          // onChange={handleRememberMeToggle}
                        />
                        <label
                          htmlFor="rememberMe"
                          className="text-[16px] font-[400] text-[#121212]"
                        >
                          Create Menu
                        </label>
                      </div>
                      <div className="flex  items-center">
                        <input
                          type="checkbox"
                          id="rememberMe"
                          className="h-6 w-6 mr-[24px] border border-black" // Add border-black to apply black border
                          // checked={auth.rememberMe}
                          // onChange={handleRememberMeToggle}
                        />
                        <label
                          htmlFor="rememberMe"
                          className="text-[16px] font-[400] text-[#121212]"
                        >
                          Add Item
                        </label>
                      </div>
                    </div>
                  </div>
                )}
                {openIndex === 1 && (
                  <div className="">
                    <div className=" grid gap-[24px]">
                      <div className="flex  items-center">
                        <input
                          type="checkbox"
                          id="rememberMe"
                          className="h-6 w-6 mr-[24px] border border-black" // Add border-black to apply black border
                          // checked={auth.rememberMe}
                          // onChange={handleRememberMeToggle}
                        />
                        <label
                          htmlFor="rememberMe"
                          className="text-[16px] font-[400] text-[#121212]"
                        >
                          Inventory management
                        </label>
                      </div>
                      <div className="flex  items-center">
                        <input
                          type="checkbox"
                          id="rememberMe"
                          className="h-6 w-6 mr-[24px] border border-black" // Add border-black to apply black border
                          // checked={auth.rememberMe}
                          // onChange={handleRememberMeToggle}
                        />
                        <label
                          htmlFor="rememberMe"
                          className="text-[16px] font-[400] text-[#121212]"
                        >
                          POS integration
                        </label>
                      </div>
                      <div className="flex  items-center">
                        <input
                          type="checkbox"
                          id="rememberMe"
                          className="h-6 w-6 mr-[24px] border border-black" // Add border-black to apply black border
                          // checked={auth.rememberMe}
                          // onChange={handleRememberMeToggle}
                        />
                        <label
                          htmlFor="rememberMe"
                          className="text-[16px] font-[400] text-[#121212]"
                        >
                          Hardware integration
                        </label>
                      </div>
                    </div>
                  </div>
                )}
                {openIndex === 2 && (
                  <div className="">
                    <div className=" grid gap-[24px]">
                      <div className="flex  items-center">
                        <input
                          type="checkbox"
                          id="rememberMe"
                          className="h-6 w-6 mr-[24px] border border-black" // Add border-black to apply black border
                          // checked={auth.rememberMe}
                          // onChange={handleRememberMeToggle}
                        />
                        <label
                          htmlFor="rememberMe"
                          className="text-[16px] font-[400] text-[#121212]"
                        >
                          View all tickets
                        </label>
                      </div>
                      <div className="flex  items-center">
                        <input
                          type="checkbox"
                          id="rememberMe"
                          className="h-6 w-6 mr-[24px] border border-black" // Add border-black to apply black border
                          // checked={auth.rememberMe}
                          // onChange={handleRememberMeToggle}
                        />
                        <label
                          htmlFor="rememberMe"
                          className="text-[16px] font-[400] text-[#121212]"
                        >
                          View ticket status
                        </label>
                      </div>
                      <div className="flex  items-center">
                        <input
                          type="checkbox"
                          id="rememberMe"
                          className="h-6 w-6 mr-[24px] border border-black" // Add border-black to apply black border
                          // checked={auth.rememberMe}
                          // onChange={handleRememberMeToggle}
                        />
                        <label
                          htmlFor="rememberMe"
                          className="text-[16px] font-[400] text-[#121212]"
                        >
                          Void ticket transactions
                        </label>
                      </div>
                      <div className="flex  items-center">
                        <input
                          type="checkbox"
                          id="rememberMe"
                          className="h-6 w-6 mr-[24px] border border-black" // Add border-black to apply black border
                          // checked={auth.rememberMe}
                          // onChange={handleRememberMeToggle}
                        />
                        <label
                          htmlFor="rememberMe"
                          className="text-[16px] font-[400] text-[#121212]"
                        >
                          Refund ticket
                        </label>
                      </div>
                    </div>
                  </div>
                )}
                {openIndex === 3 && (
                  <div className="">
                    <div className=" grid gap-[24px]">
                      <div className="flex  items-center">
                        <input
                          type="checkbox"
                          id="rememberMe"
                          className="h-6 w-6 mr-[24px] border border-black" // Add border-black to apply black border
                          // checked={auth.rememberMe}
                          // onChange={handleRememberMeToggle}
                        />
                        <label
                          htmlFor="rememberMe"
                          className="text-[16px] font-[400] text-[#121212]"
                        >
                          Access handheld devices with pin
                        </label>
                      </div>
                      <div className="flex  items-center">
                        <input
                          type="checkbox"
                          id="rememberMe"
                          className="h-6 w-6 mr-[24px] border border-black" // Add border-black to apply black border
                          // checked={auth.rememberMe}
                          // onChange={handleRememberMeToggle}
                        />
                        <label
                          htmlFor="rememberMe"
                          className="text-[16px] font-[400] text-[#121212]"
                        >
                          Mirror cash register privileges
                        </label>
                      </div>
                    </div>
                  </div>
                )}
                {openIndex === 4 && (
                  <div className="">
                    <div className=" grid gap-[24px]">
                      <div className="flex  items-center">
                        <input
                          type="checkbox"
                          id="rememberMe"
                          className="h-6 w-6 mr-[24px] border border-black" // Add border-black to apply black border
                          // checked={auth.rememberMe}
                          // onChange={handleRememberMeToggle}
                        />
                        <label
                          htmlFor="rememberMe"
                          className="text-[16px] font-[400] text-[#121212]"
                        >
                          View order
                        </label>
                      </div>
                      <div className="flex  items-center">
                        <input
                          type="checkbox"
                          id="rememberMe"
                          className="h-6 w-6 mr-[24px] border border-black" // Add border-black to apply black border
                          // checked={auth.rememberMe}
                          // onChange={handleRememberMeToggle}
                        />
                        <label
                          htmlFor="rememberMe"
                          className="text-[16px] font-[400] text-[#121212]"
                        >
                          Fulfil order
                        </label>
                      </div>

                      <div className="flex  items-center">
                        <input
                          type="checkbox"
                          id="rememberMe"
                          className="h-6 w-6 mr-[24px] border border-black" // Add border-black to apply black border
                          // checked={auth.rememberMe}
                          // onChange={handleRememberMeToggle}
                        />
                        <label
                          htmlFor="rememberMe"
                          className="text-[16px] font-[400] text-[#121212]"
                        >
                          View order status
                        </label>
                      </div>
                      <div className="flex  items-center">
                        <input
                          type="checkbox"
                          id="rememberMe"
                          className="h-6 w-6 mr-[24px] border border-black" // Add border-black to apply black border
                          // checked={auth.rememberMe}
                          // onChange={handleRememberMeToggle}
                        />
                        <label
                          htmlFor="rememberMe"
                          className="text-[16px] font-[400] text-[#121212]"
                        >
                          Edit order status
                        </label>
                      </div>
                      <div className="flex  items-center">
                        <input
                          type="checkbox"
                          id="rememberMe"
                          className="h-6 w-6 mr-[24px] border border-black" // Add border-black to apply black border
                          // checked={auth.rememberMe}
                          // onChange={handleRememberMeToggle}
                        />
                        <label
                          htmlFor="rememberMe"
                          className="text-[16px] font-[400] text-[#121212]"
                        >
                          Order chat
                        </label>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      ))}

      <div className=" flex justify-end items-center gap-2">
        <div className="border border-purple500 rounded px-3 py-2 font-[600] text-purple500">
          <BackButton text="Cancel" />
        </div>

        <div className="border border-purple500 bg-purple500 rounded px-3 py-2 font-[500] text-[#ffffff]">
          <Link to="/">
            <button className=" text-[16px]">Save and continue</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FAQSetting;
