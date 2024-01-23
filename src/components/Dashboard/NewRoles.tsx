import { useState, ChangeEvent } from "react";

import DashboardLayout from "./DashboardLayout";
import TopMenuNav from "./TopMenuNav";
import FAQSetting from "../FAQSetting";

interface FAQItem {
  question: string;
  inputValue?: string;
}

const NewRoles = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqData: FAQItem[] = [
    {
      question: "Menu settings",
      inputValue: "Input 1",
    },
    {
      question: "Cash register",
      inputValue: "Input 2",
    },
    {
      question: "Tickets",
      inputValue: "Input 3",
    },
    {
      question: "Table ordering",
      inputValue: "Input 4",
    },
    {
      question: "Kitchen display system",
      inputValue: "Input 5",
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
    <DashboardLayout>
      <TopMenuNav pathName="Manage Users" />
      <div className="  max-w-[797px] 2xl:max-w-[1070px]">
        <div className="my-10 ">
          <p className="text-[24px] font-[500] text-purple500">New Roles</p>
          <div className="my-8 w-full">
            <div className=" grid gap-[48px]">
              <div className="flex items-start">
                <label htmlFor="" className="flex-shrink-0 mr-4">
                  Role Name
                </label>
                <div className="flex-1">
                  <input
                    type="text"
                    className="px-2 w-full h-[48px] rounded-[5px] border-2 border-grey100"
                  />
                </div>
              </div>
              <div className="flex items-start">
                <label htmlFor="" className="flex-shrink-0 mr-4">
                  Description
                </label>
                <div className="flex-1">
                  <input
                    type="text"
                    name=""
                    id=""
                    className="px-2 w-full h-[128px] rounded-[5px] border-2 border-grey100"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="my-10 ">
          <p className="text-[24px] font-[500] text-purple500">
            Permissions setting
          </p>
          <div className="my-8 w-full">
            <div className=" grid gap-[48px]">
              <FAQSetting
                faqData={faqData}
                openIndex={openIndex}
                toggleAnswer={toggleAnswer}
                handleInputChange={handleInputChange}
              />
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default NewRoles;
