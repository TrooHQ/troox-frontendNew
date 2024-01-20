import { useState, ChangeEvent } from "react";
import Logo from "../../assets/trooLogo.svg";
import FAQ from "../FAQ";

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
        <div className="bg-white grid gap-3 py-4 px-8 my-5 w-full md:w-[700px] rounded shadow-md">
          <p className="text-[24px] font-[500] text-[#5955B3] mb-8">
            Business profile | ID:TR89340
          </p>

          <FAQ
            faqData={faqData}
            openIndex={openIndex}
            toggleAnswer={toggleAnswer}
            handleInputChange={handleInputChange}
          />

          <div className=" flex justify-end items-center gap-2">
            <div className="border-2 border-[#5955b3] rounded px-3 py-2 font-[600] text-[#5955B3]">
              <button className=" ">Cancel</button>
            </div>
            <div className="border-2 border-[#5955b3] bg-[#5955b3] rounded px-3 py-2 font-[600] text-[#ffffff]">
              <button className="">Save and continue</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessProfiles;
