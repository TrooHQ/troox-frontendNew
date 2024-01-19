import { useState } from "react";
import Logo from "../../assets/trooLogo.svg";
import FAQ from "../FAQ";
const BusinessProfiles: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqData = [
    {
      question: "Business Information",
      answer:
        "Lorem ipsum dolor sit amet consectetur. Nibh eget id egestas donec. Arcu gravida quam arcu lacinia. Maecenas tristique id vestibulum et adipiscing etiam. Nibh amet tincidunt amet elit nunc lorem nunc. Nisi purus cras eu id ipsum odio ultricies tortor viverra. Nulla pulvinar ornare ante ac et ac feugiat pharetra ac. Nunc nullam fringilla dui habitant morbi sed mauris ac blandit. Ullamcorper nunc morbi proin ultricies suscipit mi. At egestas nunc fermentum viverra ultrices interdum vitae. Lectus amet sodales at vel adipiscing nisl. Ut ele",
    },
    {
      question: "Personal information",
      answer: "Lorem ipsum dolor sit amet consectetur.",
    },
    {
      question: "Payout & bank details",
      answer: "Lorem ipsum dolor sit amet consectetur.",
    },
  ];

  const toggleAnswer = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="bg-[#EFEFEF] ">
      <div className="flex flex-col items-center justify-center h-screen my-auto">
        <div>
          <img src={Logo} alt="" />
        </div>
        <div className="bg-white grid gap-3 py-4 px-8 my-5 w-full md:w-[530px] rounded shadow-md">
          <p className="text-[18px] font-[400] text-[#5955B3]">
            Business profile | ID:TR89340
          </p>
          <FAQ
            faqData={faqData}
            openIndex={openIndex}
            toggleAnswer={toggleAnswer}
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
