import React, { useState } from "react";
import Arrow from "../assets/keyboard_arrow_down.svg";

interface FAQItem {
  question: string;
  answer: string;
}

const faqList: FAQItem[] = [
  {
    question: "Is Troo only for restaurants?",
    answer:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
  },
  {
    question: "Can I have all my employees on Troo?",
    answer:
      "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.",
  },
  {
    question: "How does the QR code system work on Troo?",
    answer:
      "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.",
  },
  {
    question:
      "Do I have to Purchase Every Product in the Troo Ecosystem to Onboard on Troo?",
    answer:
      "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.",
  },
];

const LandingPageFAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className=" bg-[#F8F8F8] py-[72px]">
      <div className=" mx-[10px] md:mx-[40px] 2xl:mx-[158px]">
        <div className="">
          <p className=" text-[18px] font-[400] text-[#414141] mb-[16px]">
            Frequently Asked Questions
          </p>
          <p className=" max-w-[451px] font-[500] text-[18px] md:text-[32px] text-[#414141] md:leading-[48px] mb-[24px]">
            No beer without its owner, <br /> no question without an answer
          </p>
        </div>
        <div>
          {faqList.map((faq, index) => (
            <div key={index} className="faq-item">
              <div
                className=" cursor-pointer py-[24px] border-t border-[#B6B6B6]"
                onClick={() => handleToggle(index)}
              >
                <div className="flex items-center justify-between">
                  <p className=" font-[500] text-[18px] text-[#414141]">
                    {faq.question}
                  </p>
                  <img
                    src={Arrow}
                    alt=""
                    className={`transition-all ${
                      openIndex === index ? "rotate-180" : ""
                    }`}
                  />
                </div>
              </div>
              {openIndex === index && (
                <div className=" py-[16px]">
                  <p>{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LandingPageFAQ;
