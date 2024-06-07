import { useState } from "react";
import Arrow from "../assets/arrow.png";
import { ChangeEvent } from "react";
import CustomInput from "./inputFields/CustomInput";
import CustomSelect from "./inputFields/CustomSelect";
import PasswordInput from "./inputFields/PasswordInput";
import pics from "../assets/pics.svg";

interface FAQItem {
  question: string;
  inputValue?: string;
}

interface FAQProps {
  faqData: FAQItem[];
  openIndex: number | null;
  toggleAnswer: (index: number) => void;
  handleInputChange: (index: number, event: ChangeEvent<HTMLInputElement>) => void;
}

const FAQ: React.FC<FAQProps> = ({ faqData, openIndex, toggleAnswer }) => {
  // const [checkedLegalType, setCheckedLegalType] = useState<string>("");
  // const handleLegalTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setCheckedLegalType(event.target.value);
  //   console.log(event.target.value, "checked");
  // };

  const [name, setName] = useState<string>("");
  const [contact, setContact] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [selectedValue, setSelectedValue] = useState<string>("");

  const handlePasswordChange = (newValue: string) => {
    setPassword(newValue);
  };
  const handleConfirmPasswordChange = (newValue: string) => {
    setConfirmPassword(newValue);
  };

  const banks = [
    { label: "Bank 1", value: "bank1" },
    { label: "Bank 2", value: "bank2" },
    { label: "Bank 3", value: "bank3" },
    { label: "Bank 4", value: "bank4" },
  ];

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
                      This information is required in order to verify your business. It will show up
                      on your payout report, invoices and receipts.
                    </p>
                    <div className="">
                      {/* <p className=" text-[16px] font-[500] leading-[24px] text-grey500">
                        What is the legal type of your business?
                      </p> */}

                      {/* <div className="grid md:grid-cols-2 gap-4 my-5">
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
                      </div> */}

                      <div className=" grid gap-5">
                        <CustomInput
                          type="text"
                          label="Business name (e.g Deluxe Restaurant)"
                          value={name}
                          onChange={(newValue) => setName(newValue)}
                        />
                        <CustomInput
                          type="text"
                          label="Business contact (e.g Sade Adu)"
                          value={contact}
                          onChange={(newValue) => setContact(newValue)}
                        />
                        <CustomInput
                          type="text"
                          label="Business address"
                          value={address}
                          onChange={(newValue) => setAddress(newValue)}
                        />
                        <CustomInput
                          type="text"
                          label="Business email"
                          value={email}
                          onChange={(newValue) => setEmail(newValue)}
                        />
                        <CustomInput
                          type="text"
                          label="Phone number (e.g +234 123 456 7890)"
                          value={phone}
                          onChange={(newValue) => setPhone(newValue)}
                        />
                        <PasswordInput
                          label="Enter your password"
                          value={password}
                          onChange={handlePasswordChange}
                        />
                        <PasswordInput
                          label="Confirm your password"
                          value={confirmPassword}
                          onChange={handleConfirmPasswordChange}
                        />

                        <CustomSelect
                          label=""
                          options={[
                            "Sole proprietorship",
                            "Partnership",
                            "Limited Liability Company",
                            "Corporation",
                            "Nonprofit",
                            "Cooperative",
                            "Others",
                          ]}
                          value={selectedValue}
                          onChange={(value) => setSelectedValue(value)}
                          disabledOption="Business type"
                        />
                      </div>

                      <div className=" my-8">
                        <p className=" text-[16px] font-[500] font-sans leading-[24px] text-grey500 my-4">
                          Add Business Logo
                        </p>
                        <div className="flex gap-4 items-center justify-start">
                          <div className="p-5 border border-dashed border-[#5855B3] w-fit cursor-pointer">
                            <img
                              src={pics}
                              alt="imageLogo"
                              id="logoPreview"
                              onClick={() => {
                                const logoInput = document.getElementById("logoInput");
                                if (logoInput) {
                                  logoInput.click();
                                }
                              }}
                            />{" "}
                          </div>
                          <input
                            type="file"
                            id="logoInput"
                            style={{ display: "none" }}
                            onChange={(e) => {
                              if (e.target.files) {
                                const file = e.target.files[0];
                                if (file) {
                                  const reader = new FileReader();
                                  reader.onload = function (event) {
                                    const logoPreview = document.getElementById("logoPreview");
                                    if (logoPreview instanceof HTMLImageElement && event.target) {
                                      logoPreview.src = event.target.result as string;
                                    }
                                  };
                                  reader.readAsDataURL(file);
                                }
                              }
                            }}
                          />
                          <div
                            className="flex flex-col gap-2 cursor-pointer"
                            onClick={() => {
                              const logoInput = document.getElementById("logoInput");
                              if (logoInput) {
                                logoInput.click();
                              }
                            }}
                          >
                            <h5 className="text-[#5855B3] text-sm font-medium">
                              Click to upload image
                            </h5>
                            <p className="text-[#606060] text-sm font-normal">
                              Max. file size: 2MB
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                {openIndex === 1 && (
                  <div className="">
                    <p className=" mb-[32px] text-[16px] font-[400] leading-[24px] py-5 text-grey500">
                      Please make sure that your personal details remain up-to-date. Because this
                      information is used to verify your identity. You will need to send our Support
                      Team a message if you need to change it.
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
                      Please enter your bank account information. You&#39;ll receive a four-digit
                      verification code via text message. Once you enter the code Troo will direct
                      all payouts to the account.
                    </p>

                    <div className=" grid gap-5">
                      <CustomInput
                        type="text"
                        label="Bank account name"
                        value=""
                        onChange={(newValue) => setName(newValue)}
                      />
                      <CustomInput
                        type="text"
                        label="Bank account number"
                        value=""
                        onChange={(newValue) => setName(newValue)}
                      />
                      <CustomSelect
                        label=""
                        options={banks}
                        value={selectedValue}
                        onChange={(value) => setSelectedValue(value)}
                        disabledOption="Bank"
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
