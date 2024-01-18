import { useState } from "react";
import Logo from "../assets/trooLogo.svg";
// import { Button } from "./Button";
// import BackButton from "./backButton";
import FAQ from "./FAQ";

const BusinessProfiles: React.FC = () => {
  const [faqVisible, setFaqVisible] = useState<boolean>(false);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFaqVisibility = () => {
    setFaqVisible(!faqVisible);
  };

  const faqData = [
    {
      question: "Lorem ipsum dolor sit amet consectetur. Orci.",
      answer:
        "Lorem ipsum dolor sit amet consectetur. Nibh eget id egestas donec. Arcu gravida quam arcu lacinia. Maecenas tristique id vestibulum et adipiscing etiam. Nibh amet tincidunt amet elit nunc lorem nunc. Nisi purus cras eu id ipsum odio ultricies tortor viverra. Nulla pulvinar ornare ante ac et ac feugiat pharetra ac. Nunc nullam fringilla dui habitant morbi sed mauris ac blandit. Ullamcorper nunc morbi proin ultricies suscipit mi. At egestas nunc fermentum viverra ultrices interdum vitae. Lectus amet sodales at vel adipiscing nisl. Ut ele",
    },
    {
      question: "How can I contribute to the project?",
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
          <p className="text-[18px] font-[500] text-[#5955B3]">
            Business profile | ID:TR89340
          </p>
          <FAQ
            faqData={faqData}
            openIndex={openIndex}
            toggleAnswer={toggleAnswer}
          />
        </div>
      </div>
    </div>
  );
};

export default BusinessProfiles;
