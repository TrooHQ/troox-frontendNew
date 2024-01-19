import Arrow from "../assets/arrow.png";

interface FAQProps {
  faqData: { question: string; answer: string }[];
  openIndex: number | null;
  toggleAnswer: (index: number) => void;
}

const FAQ: React.FC<FAQProps> = ({ faqData, openIndex, toggleAnswer }) => {
  return (
    <div className=" grid gap-3">
      {faqData.map((faq, index) => (
        <div
          key={index}
          className="text-[#5955B3] border p-4 focus:outline-[#5955B3] w-full rounded border-[#484590]"
        >
          <div
            className="flex items-center justify-between cursor-pointer font-bold "
            onClick={() => toggleAnswer(index)}
          >
            <div className="flex items-center">
              <div className="font-[400] text-[#333333] text-[14px] lg:text-[18px]">
                <div className="mb-2 cursor-pointer">
                  <p className="text-[#121212]">{` ${faq.question}`}</p>
                </div>
              </div>
            </div>
            <div className="ml-2">
              {" "}
              <img
                src={Arrow}
                alt=""
                className={`transform transition-transform duration-300 ${
                  openIndex === index ? "rotate-180" : ""
                }`}
              />
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
