import { ChangeEvent } from "react";

import ArrowToggle from "../assets/chevron-down.svg";
import ArrowToggle2 from "../assets/chevron-down2.svg";
import BackButton from "./buttons/backButton";
import { Link } from "react-router-dom";

interface FAQItem {
  question: string;
  inputValue?: string;
  subItems?: FAQItem[];
}

interface FAQProps {
  faqDataInner: FAQItem[];
  faqData: FAQItem[];
  openIndex: number | null;
  openIndexInner: number | null;
  toggleAnswer: (index: number) => void;
  handleInputChange: (
    index: number,
    event: ChangeEvent<HTMLInputElement>
  ) => void;
  toggleAnswer2: (index2: number) => void;
  handleInputChange2: (
    index: number,
    event: ChangeEvent<HTMLInputElement>
  ) => void;
}

const FAQSetting: React.FC<FAQProps> = ({
  faqData,
  openIndex,
  faqDataInner,
  openIndexInner,
  toggleAnswer,
  // handleInputChange,
  toggleAnswer2,
  // handleInputChange2,
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
    <div className="grid gap-[24px]">
      {faqData.map((faq, index) => (
        <div
          key={index}
          className={`bg-purple500 border  border-purple500 focus:outline-[#5955B3] w-full rounded `}
        >
          <div
            className="flex items-center justify-between cursor-pointer font-bold py-[24px] px-[24px]"
            onClick={() => toggleAnswer(index)}
          >
            <div className="mb-2 cursor-pointer">
              <p className="text-[#ffffff] font-[500] text-[14px] lg:text-[16px] ">{` ${faq.question}`}</p>
            </div>
            <div className="">
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
                          className="h-6 w-6 mr-[24px] border border-black"
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
                          className="h-6 w-6 mr-[24px] border border-black"
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
                          className="h-6 w-6 mr-[24px] border border-black"
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
                          className="h-6 w-6 mr-[24px] border border-black"
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
                          className="h-6 w-6 mr-[24px] border border-black"
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
                          className="h-6 w-6 mr-[24px] border border-black"
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
                    {faqDataInner.map((innerFaq, innerIndex) => (
                      <div
                        key={innerIndex}
                        className="bg-[#EEEEF7] border mt-4   focus:outline-[#5955B3] w-full rounded my-2"
                      >
                        <div
                          className="flex items-center justify-between cursor-pointer py-[24px] px-[24px] font-bold"
                          onClick={() => toggleAnswer2(innerIndex)}
                        >
                          <div className="mb-2 cursor-pointer">
                            <p className="text-purple500 font-[500] text-[14px] lg:text-[16px]">
                              {` ${innerFaq.question}`}
                            </p>
                          </div>
                          <div className="">
                            <img
                              src={ArrowToggle2}
                              alt=""
                              className={`transform transition-transform duration-300 ${
                                openIndexInner === innerIndex
                                  ? "rotate-180"
                                  : ""
                              }`}
                            />
                          </div>
                        </div>

                        {openIndexInner === 0 && (
                          <div className=" bg-white py-[28px]">
                            <div className=" px-[24px] grid gap-[33px] ">
                              <div className="flex  items-center">
                                <input
                                  type="checkbox"
                                  id="rememberMe"
                                  className="h-6 w-6 mr-[24px] border border-black"
                                  // checked={auth.rememberMe}
                                  // onChange={handleRememberMeToggle}
                                />
                                <label
                                  htmlFor="rememberMe"
                                  className="text-[16px] font-[400] text-[#121212]"
                                >
                                  Order management
                                </label>
                              </div>
                              <div className="flex  items-center">
                                <input
                                  type="checkbox"
                                  id="rememberMe"
                                  className="h-6 w-6 mr-[24px] border border-black"
                                  // checked={auth.rememberMe}
                                  // onChange={handleRememberMeToggle}
                                />
                                <label
                                  htmlFor="rememberMe"
                                  className="text-[16px] font-[400] text-[#121212]"
                                >
                                  Ticket
                                </label>
                              </div>
                              <div className="flex  items-center">
                                <input
                                  type="checkbox"
                                  id="rememberMe"
                                  className="h-6 w-6 mr-[24px] border border-black"
                                  // checked={auth.rememberMe}
                                  // onChange={handleRememberMeToggle}
                                />
                                <label
                                  htmlFor="rememberMe"
                                  className="text-[16px] font-[400] text-[#121212]"
                                >
                                  Discount
                                </label>
                              </div>
                              <div className="flex  items-center">
                                <input
                                  type="checkbox"
                                  id="rememberMe"
                                  className="h-6 w-6 mr-[24px] border border-black"
                                  // checked={auth.rememberMe}
                                  // onChange={handleRememberMeToggle}
                                />
                                <label
                                  htmlFor="rememberMe"
                                  className="text-[16px] font-[400] text-[#121212]"
                                >
                                  Refunds
                                </label>
                              </div>
                              <div className="flex  items-center">
                                <input
                                  type="checkbox"
                                  id="rememberMe"
                                  className="h-6 w-6 mr-[24px] border border-black"
                                  // checked={auth.rememberMe}
                                  // onChange={handleRememberMeToggle}
                                />
                                <label
                                  htmlFor="rememberMe"
                                  className="text-[16px] font-[400] text-[#121212]"
                                >
                                  Cancel or void order
                                </label>
                              </div>
                              <div className="flex  items-center">
                                <input
                                  type="checkbox"
                                  id="rememberMe"
                                  className="h-6 w-6 mr-[24px] border border-black"
                                  // checked={auth.rememberMe}
                                  // onChange={handleRememberMeToggle}
                                />
                                <label
                                  htmlFor="rememberMe"
                                  className="text-[16px] font-[400] text-[#121212]"
                                >
                                  Queue transaction
                                </label>
                              </div>
                              <div className="flex  items-center">
                                <input
                                  type="checkbox"
                                  id="rememberMe"
                                  className="h-6 w-6 mr-[24px] border border-black"
                                  // checked={auth.rememberMe}
                                  // onChange={handleRememberMeToggle}
                                />
                                <label
                                  htmlFor="rememberMe"
                                  className="text-[16px] font-[400] text-[#121212]"
                                >
                                  Tips
                                </label>
                              </div>{" "}
                              <div className="flex  items-center">
                                <input
                                  type="checkbox"
                                  id="rememberMe"
                                  className="h-6 w-6 mr-[24px] border border-black"
                                  // checked={auth.rememberMe}
                                  // onChange={handleRememberMeToggle}
                                />
                                <label
                                  htmlFor="rememberMe"
                                  className="text-[16px] font-[400] text-[#121212]"
                                >
                                  EOD balance of account
                                </label>
                              </div>
                              <div className="flex  items-center">
                                <input
                                  type="checkbox"
                                  id="rememberMe"
                                  className="h-6 w-6 mr-[24px] border border-black"
                                  // checked={auth.rememberMe}
                                  // onChange={handleRememberMeToggle}
                                />
                                <label
                                  htmlFor="rememberMe"
                                  className="text-[16px] font-[400] text-[#121212]"
                                >
                                  Sync to cloud
                                </label>
                              </div>
                              <div className="flex  items-center">
                                <input
                                  type="checkbox"
                                  id="rememberMe"
                                  className="h-6 w-6 mr-[24px] border border-black"
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
                              <div className="flex  items-center">
                                <input
                                  type="checkbox"
                                  id="rememberMe"
                                  className="h-6 w-6 mr-[24px] border border-black"
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
                              <div className="flex  items-center">
                                <input
                                  type="checkbox"
                                  id="rememberMe"
                                  className="h-6 w-6 mr-[24px] border border-black"
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
                      </div>
                    ))}
                  </div>
                )}
                {openIndex === 2 && (
                  <div className="">
                    <div className=" grid gap-[24px]">
                      <div className="flex  items-center">
                        <input
                          type="checkbox"
                          id="rememberMe"
                          className="h-6 w-6 mr-[24px] border border-black"
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
                          className="h-6 w-6 mr-[24px] border border-black"
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
                          className="h-6 w-6 mr-[24px] border border-black"
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
                          className="h-6 w-6 mr-[24px] border border-black"
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
                          className="h-6 w-6 mr-[24px] border border-black"
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
                          className="h-6 w-6 mr-[24px] border border-black"
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
                          className="h-6 w-6 mr-[24px] border border-black"
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
                          className="h-6 w-6 mr-[24px] border border-black"
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
                          className="h-6 w-6 mr-[24px] border border-black"
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
                          className="h-6 w-6 mr-[24px] border border-black"
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
                          className="h-6 w-6 mr-[24px] border border-black"
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
        <div className="border border-purple500 rounded px-[24px] py-[13px] font-[600] text-purple500">
          <BackButton text="Cancel" />
        </div>

        <div className="border border-purple500 bg-purple500 rounded px-[24px] py-[13px] font-[500] text-[#ffffff]">
          <Link to="/">
            <button className=" text-[16px]">Save and continue</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FAQSetting;
