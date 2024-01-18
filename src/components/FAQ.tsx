import React, { useState } from "react";
import Arrow from "../assets/arrow.png";

interface FAQProps {
  faqData: { question: string; answer: string }[];
  openIndex: number | null;
  toggleAnswer: (index: number) => void;
}

const FAQ: React.FC<FAQProps> = ({ faqData, openIndex, toggleAnswer }) => {
  return (
    <div className=" ">
      {faqData.map((faq, index) => (
        <div
          key={index}
          className="text-[#5955B3] border-2 p-4 focus:outline-[#5955B3] w-full rounded border-[#484590]"
        >
          <div
            className="flex items-center justify-between cursor-pointer font-bold "
            onClick={() => toggleAnswer(index)}
          >
            <div className="flex items-center">
              <div className="font-[500] text-[#333333] text-[14px] lg:text-[20px]">
                <p className=" mb-2 cursor-pointer flex items-center justify-between">
                  <span className=" text-[#121212]">Business information</span>
                  <img
                    src={Arrow}
                    alt=""
                    className={`transform transition-transform duration-300 ${
                      openIndex === index ? "rotate-180" : ""
                    }`}
                  />
                </p>
                {` ${faq.question}`}
              </div>
            </div>
          </div>
          {openIndex === index && (
            <div className="text-[#757575] text-[12px] lg:text-[18px] font-[400]">
              {` ${faq.answer}`}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default FAQ;
