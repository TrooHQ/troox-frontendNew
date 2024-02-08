import { useState, ChangeEvent } from "react";
import Logo from "../../assets/trooLogo.svg";
import FAQ from "../FAQ";
import BackButton from "../buttons/BackButton";
import { Link } from "react-router-dom";

interface FAQItem {
  question: string;
  inputValue?: string;
}
const BusinessProfiles: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqData: FAQItem[] = [
    {
      question: "Business information",
      inputValue: "Input 1",
    },
    {
      question: "Personal information",
      inputValue: "Input 2",
    },
    {
      question: "Payout & bank details",
      inputValue: "Input 3",
    },
  ];

  const toggleAnswer = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };
  const handleInputChange = (
    index: number,
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const newFAQData = [...faqData];
    newFAQData[index].inputValue = event.target.value;
    console.log(newFAQData);
  };
  return (
    <div className="bg-[#EFEFEF] ">
      <div className="flex flex-col items-center justify-center h-screen my-auto">
        <div>
          <img src={Logo} alt="" />
        </div>
        <div className="bg-white grid gap-3 py-[40px] px-8 my-5 w-full md:w-[700px] rounded shadow-md">
          <p className="text-[24px] font-[500] text-purple500 mb-8">
            Business profile | ID:TR89340
          </p>

          <FAQ
            faqData={faqData}
            openIndex={openIndex}
            toggleAnswer={toggleAnswer}
            handleInputChange={handleInputChange}
          />

          <div className=" flex justify-end items-center gap-2 mt-[32px]">
            <div className="border-2 border-purple500 rounded px-[24px] py-[13px] font-[600] text-purple500">
              <BackButton text="Cancel" />
            </div>

            <div className="border-2 border-purple500 bg-purple500 rounded px-[24px] py-[13px] font-[600] text-[#ffffff]">
              <Link to="/">
                <button className="">Save and continue</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessProfiles;
