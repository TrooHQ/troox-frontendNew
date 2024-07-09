import { useState } from "react";
import Arrow from "../assets/arrow.png";
import { ChangeEvent } from "react";
import CustomInput from "./inputFields/CustomInput";
import CustomSelect from "./inputFields/CustomSelect";

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

const FAQ: React.FC<FAQProps> = ({ faqData, openIndex, toggleAnswer }) => {
  const [checkedLegalType, setCheckedLegalType] = useState<string>("");

  const handleLegalTypeChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setCheckedLegalType(event.target.value);
  };
  const [name, setName] = useState<string>("");
  const [selectedValue, setSelectedValue] = useState<string>("");

  return (
    <div className="grid gap-3">
      {faqData.map((faq, index) => (
        <div
          key={index}
          className={`text-purple500 border p-4 focus:outline-[#5955B3] w-full rounded border-[#484590] ${
            openIndex === index ? "overflow-y-scroll max-h-96" : ""
          }`}
        >
          <div
            className="flex items-center justify-between cursor-pointer font-bold "
            onClick={() => toggleAnswer(index)}
          >
            <div className="flex items-center">
              <div className="font-[400]  text-[14px] lg:text-[22px]">
                <div className="mb-2 cursor-pointer">
                  <p className="text-grey500">{` ${faq.question}`}</p>
                </div>
              </div>
            </div>
            <div className="ml-2">
              <img
                src={Arrow}
                alt=""
                className={`transform transition-transform duration-300 ${
                  openIndex === index ? "rotate-180" : ""
                }`}
              />
            </div>
          </div>

          <div className=" pl-3">
            {openIndex === index && (
              <div className="text-[#757575] text-[12px] lg:text-[18px] font-[300] ">
                {openIndex === 0 && (
                  <div className=" ">
                    <p className=" text-[16px] font-[400] leading-[24px] py-5 text-grey500">
                      This information is required in order to verify your
                      business. It will show up on your payout report, invoices
                      and receipts.
                    </p>
                    <div className="">
                      <p className=" text-[16px] font-[500] leading-[24px] text-grey500">
                        What is the legal type of your business?
                      </p>

                      <div className="grid md:grid-cols-2 gap-4 my-5">
                        <label
                          htmlFor="soleTrader"
                          className={`flex flex-col items-center px-4 py-3 rounded cursor-pointer ${
                            checkedLegalType ===
                            "Sole trader/Private Individual"
                              ? "bg-purple500 text-white"
                              : "bg-[#E7E7E7] text-grey500"
                          }`}
                        >
                          <input
                            type="radio"
                            id="soleTrader"
                            name="legalType"
                            value="Sole trader/Private Individual"
                            checked={
                              checkedLegalType ===
                              "Sole trader/Private Individual"
                            }
                            onChange={handleLegalTypeChange}
                            className="hidden"
                          />
                          <p className="text-[16px] font-[500] text-grey500 font-sans leading-[24px]">
                            Sole trader/Private Individual
                          </p>
                          <p className="text-[14px]  text-grey500 leading-[24px]">
                            e.g. self-employed
                          </p>
                        </label>

                        <label
                          htmlFor="otherLegalType"
                          className={`flex flex-col items-center px-4 py-3 rounded cursor-pointer ${
                            checkedLegalType === "Other legal type"
                              ? "bg-purple500 text-white"
                              : "bg-[#E7E7E7] text-grey500"
                          }`}
                        >
                          <input
                            type="radio"
                            id="otherLegalType"
                            name="legalType"
                            value="Other legal type"
                            checked={checkedLegalType === "Other legal type"}
                            onChange={handleLegalTypeChange}
                            className="hidden"
                          />
                          <p className="text-[16px] font-[500] font-sans leading-[24px]">
                            Other legal type
                          </p>
                          <p className="text-[14px]  text-grey500 leading-[24px]">
                            e.g. Ltd, LP, LLP, etc
                          </p>
                        </label>
                      </div>

                      <div className=" grid gap-5">
                        <CustomInput
                          type="text"
                          label="Company name"
                          value={name}
                          onChange={(newValue) => setName(newValue)}
                        />
                        <CustomSelect
                          label=""
                          options={["Option 1", "Option 2", "Option 3"]}
                          value={selectedValue}
                          onChange={(value) => setSelectedValue(value)}
                          disabledOption="How would you categorize your business?"
                        />

                        <CustomInput
                          type="text"
                          label="VAT number (optional)"
                          value=""
                          onChange={(newValue) => setName(newValue)}
                        />
                        <CustomInput
                          type="text"
                          label="Business phone number (mobile or landline)"
                          value=""
                          onChange={(newValue) => setName(newValue)}
                        />
                      </div>
                    </div>

                    <div className=" my-8">
                      <p className=" text-[14px] font-[500] font-sans leading-[24px] text-grey500">
                        Web page: Website, Social media page, Business listing,
                        Google map location, etc
                      </p>

                      <div className=" grid gap-5">
                        <CustomInput
                          type="text"
                          label="http://www.example.com"
                          value=""
                          onChange={(newValue) => setName(newValue)}
                        />

                        <div className=" mb-5 flex items-center justify-between">
                          <div className="flex items-center">
                            <input
                              type="checkbox"
                              id="rememberMe"
                              className="h-6 w-6 mr-2"
                              // checked={auth.rememberMe}
                              // onChange={handleRememberMeToggle}
                            />
                            <label
                              htmlFor="rememberMe"
                              className="text-[14px] text-grey500"
                            >
                              I don't have a web page
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className=" my-8">
                      <p className=" text-[16px] font-[500] font-sans leading-[24px] text-grey500 my-8">
                        Business address
                      </p>
                      <div className=" grid gap-5">
                        <div className="grid gap-2">
                          <label
                            htmlFor=""
                            className=" text-[16px] font-[500] text-grey500"
                          >
                            Address (Line 1)
                          </label>
                          <CustomInput
                            type="text"
                            label="Street address"
                            value=""
                            onChange={(newValue) => setName(newValue)}
                          />
                        </div>
                        <div className=" grid gap-2">
                          <label
                            htmlFor=""
                            className=" text-[16px] font-[500] text-grey500"
                          >
                            Address (Line 2){" "}
                            <span className=" text-grey200">(optional)</span>
                          </label>
                          <CustomInput
                            type="text"
                            label="Apartment, suite, unitv, building, floor"
                            value=""
                            onChange={(newValue) => setName(newValue)}
                          />
                        </div>
                        <div className="grid gap-2">
                          <label
                            htmlFor=""
                            className=" text-[16px] font-[500] text-grey500"
                          >
                            City
                          </label>
                          <CustomInput
                            type="text"
                            label="City or town"
                            value=""
                            onChange={(newValue) => setName(newValue)}
                          />
                        </div>
                      </div>
                    </div>

                    <div className=" my-8">
                      <p className=" text-[16px] font-[500] font-sans leading-[24px] text-grey500 my-4">
                        Business fiscal year
                      </p>
                      <div className=" grid md:grid-cols-2 items-center gap-5">
                        <div className="grid gap-2">
                          <label
                            htmlFor=""
                            className=" text-[16px] font-[500] text-grey500"
                          >
                            From:
                          </label>
                          <CustomInput
                            type="date"
                            label=""
                            value=""
                            onChange={(newValue) => setName(newValue)}
                          />
                        </div>
                        <div className=" grid gap-2">
                          <label
                            htmlFor=""
                            className=" text-[16px] font-[500] text-grey500"
                          >
                            To:
                          </label>
                          <CustomInput
                            type="date"
                            label=""
                            value=""
                            onChange={(newValue) => setName(newValue)}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                {openIndex === 1 && (
                  <div className="">
                    <p className=" mb-[32px] text-[16px] font-[400] leading-[24px] py-5 text-grey500">
                      Please make sure that your personal details remain
                      up-to-date. Because this information is used to verify
                      your identity. You will need to send our Support Team a
                      message if you need to change it.
                    </p>

                    <div className=" grid gap-5">
                      <div className=" grid grid-cols-2 gap-5 items-center">
                        <CustomInput
                          type="text"
                          label="First name"
                          value=""
                          onChange={(newValue) => setName(newValue)}
                        />
                        <CustomInput
                          type="text"
                          label="Last name"
                          value=""
                          onChange={(newValue) => setName(newValue)}
                        />
                      </div>

                      <CustomInput
                        type="text"
                        label="Registered home address"
                        value=""
                        onChange={(newValue) => setName(newValue)}
                      />
                      <CustomInput
                        type="text"
                        label="City"
                        value=""
                        onChange={(newValue) => setName(newValue)}
                      />
                      <CustomInput
                        type="text"
                        label="State"
                        value=""
                        onChange={(newValue) => setName(newValue)}
                      />
                      <CustomInput
                        type="text"
                        label="Country"
                        value=""
                        onChange={(newValue) => setName(newValue)}
                      />
                    </div>
                  </div>
                )}
                {openIndex === 2 && (
                  <div className="">
                    <p className=" mb-[32px] text-[16px] font-[400] leading-[24px] py-5 text-grey500">
                      Please enter your bank account information. You’ll receive
                      a four-digit verification code via text message. Once you
                      enter the code Troo will direct all payouts to the
                      account.
                    </p>

                    <div className=" grid gap-5">
                      <CustomInput
                        type="text"
                        label="Account holder or business name"
                        value=""
                        onChange={(newValue) => setName(newValue)}
                      />
                      <CustomInput
                        type="text"
                        label="Bank Verification Number (BVN) / IBAN"
                        value=""
                        onChange={(newValue) => setName(newValue)}
                      />
                      <CustomInput
                        type="text"
                        label="Country"
                        value=""
                        onChange={(newValue) => setName(newValue)}
                      />
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default FAQ;
