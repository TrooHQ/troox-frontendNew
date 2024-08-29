import { ChangeEvent, useState } from "react";
import ArrowToggle from "../assets/chevron-down.svg";
import ArrowToggle2 from "../assets/chevron-down2.svg";
import { Link, useNavigate } from "react-router-dom";
import { Checkbox, FormControlLabel } from "@mui/material";

interface FAQItem {
  question: string;
  inputValue?: string;
  subItems?: FAQItem[];
}

interface RolesAndPermissionProps {
  faqData: FAQItem[];
  faqDataInner: FAQItem[];
  openIndex: number | null;
  openIndexInner: number | null;
  toggleAnswer: (index: number) => void;
  toggleAnswer2: (index2: number) => void;
}

const RolesAndPermission: React.FC<RolesAndPermissionProps> = ({
  faqData,
  faqDataInner,
  openIndex,
  openIndexInner,
  toggleAnswer,
  toggleAnswer2,
}) => {
  const [checkedCategories, setCheckedCategories] = useState<boolean[]>(
    Array(faqData.length).fill(false)
  );
  const navigate = useNavigate();

  const handleCategoryChange = (index: number) => {
    const newCheckedCategories = [...checkedCategories];
    newCheckedCategories[index] = !newCheckedCategories[index];
    setCheckedCategories(newCheckedCategories);
  };

  const CheckboxWithLabel = ({
    id,
    label,
    onChange,
  }: {
    id: string;
    label: string;
    onChange?: any;
  }) => (
    <div className="flex items-center mb-6">
      <input
        type="checkbox"
        id={id}
        className="h-6 w-6 mr-[24px] border border-black"
        onChange={onChange}
      />
      <label htmlFor={id} className="text-[16px] font-[400] text-grey500">
        {label}
      </label>
    </div>
  );

  const renderCheckboxes = (labels: { id: string; label: string }[]) =>
    labels.map((item, index) => (
      <CheckboxWithLabel
        key={index}
        id={`${item.id}${index}`}
        label={item.label}
        onChange={handleCategoryChange}
      />
    ));

  const generalLabels = [
    { id: "categoryCheckbox", label: "Create Menus" },
    { id: "categoryCheckbox", label: "View All Menus" },
    { id: "categoryCheckbox", label: "Freeze/ Unfreeze Menu List" },
    { id: "categoryCheckbox", label: "Edit Menus" },
    { id: "categoryCheckbox", label: "Create Branches" },
    { id: "categoryCheckbox", label: "Update Branches" },
    { id: "categoryCheckbox", label: "Delete Branches" },
    { id: "categoryCheckbox", label: "Create QR Codes for Rooms" },
    { id: "categoryCheckbox", label: "Create QR Codes for Tables" },
    { id: "categoryCheckbox", label: "Generate Online Ordering Link" },
    { id: "categoryCheckbox", label: "Generate Self Checkout Link" },
    { id: "categoryCheckbox", label: "View Open and Closed Tickets" },
    { id: "categoryCheckbox", label: "Void Order for Open and Closed Tickets" },
    { id: "categoryCheckbox", label: "Request Refund for Order on Closed Tickets" },
    { id: "categoryCheckbox", label: "Vacate Table on Closed Tickets" },
    { id: "categoryCheckbox", label: "View Business Report" },
    { id: "categoryCheckbox", label: "Download Business Report" },
    { id: "categoryCheckbox", label: "Add Users" },
    { id: "categoryCheckbox", label: "Accept or Decline Incoming Tickets on Waiter App" },
    { id: "categoryCheckbox", label: "Change Order Status on Waiter App" },
    { id: "categoryCheckbox", label: "Collect Tips on Waiter App" },
    { id: "categoryCheckbox", label: "View Earnings from Tips" },
    { id: "categoryCheckbox", label: "Add Menus to Till" },
    { id: "categoryCheckbox", label: "Add Modifiers to Till" },
    { id: "categoryCheckbox", label: "Hold Orders on Till" },
    { id: "categoryCheckbox", label: "Work on Open Tickets on Till" },
  ];

  const inventoryLabels = [
    { id: "categoryCheckbox", label: "Create Menus" },
    { id: "categoryCheckbox", label: "View All Menus" },
    { id: "categoryCheckbox", label: "Freeze/ Unfreeze Menu List" },
    { id: "categoryCheckbox", label: "Edit Menus" },
    { id: "categoryCheckbox", label: "Create Branches" },
    { id: "categoryCheckbox", label: "Update Branches" },
    { id: "categoryCheckbox", label: "Delete Branches" },
    { id: "categoryCheckbox", label: "Create QR Codes for Rooms" },
    { id: "categoryCheckbox", label: "Create QR Codes for Tables" },
    { id: "categoryCheckbox", label: "Generate Online Ordering Link" },
    { id: "categoryCheckbox", label: "Generate Self Checkout Link" },
    { id: "categoryCheckbox", label: "View Open and Closed Tickets" },
    { id: "categoryCheckbox", label: "Void Order for Open and Closed Tickets" },
    { id: "categoryCheckbox", label: "Request Refund for Order on Closed Tickets" },
    { id: "categoryCheckbox", label: "Vacate Table on Closed Tickets" },
    { id: "categoryCheckbox", label: "View Business Report" },
    { id: "categoryCheckbox", label: "Download Business Report" },
    { id: "categoryCheckbox", label: "Add Users" },
    { id: "categoryCheckbox", label: "Accept or Decline Incoming Tickets on Waiter App" },
    { id: "categoryCheckbox", label: "Change Order Status on Waiter App" },
    { id: "categoryCheckbox", label: "Collect Tips on Waiter App" },
    { id: "categoryCheckbox", label: "View Earnings from Tips" },
    { id: "categoryCheckbox", label: "Add Menus to Till" },
    { id: "categoryCheckbox", label: "Add Modifiers to Till" },
    { id: "categoryCheckbox", label: "Hold Orders on Till" },
    { id: "categoryCheckbox", label: "Work on Open Tickets on Till" },
  ];

  const ticketLabels = [
    { id: "categoryCheckbox", label: "Accept or Decline Incoming Tickets on Waiter App" },
    { id: "categoryCheckbox", label: "Change Order Status on Waiter App" },
    { id: "categoryCheckbox", label: "Collect Tips on Waiter App" },
    { id: "categoryCheckbox", label: "View Earnings from Tips" },
    { id: "categoryCheckbox", label: "Add Menus to Till" },
    { id: "categoryCheckbox", label: "Add Modifiers to Till" },
    { id: "categoryCheckbox", label: "Hold Orders on Till" },
    { id: "categoryCheckbox", label: "Work on Open Tickets on Till" },
  ];

  const renderSubItems = (
    faqDataInner: FAQItem[],
    openIndexInner: number | null,
    toggleAnswer2: (index2: number) => void
  ) =>
    faqDataInner.map((innerFaq, innerIndex) => (
      <div
        key={innerIndex}
        className="bg-[#EEEEF7] border mt-4 focus:outline-[#5955B3] w-full rounded my-2"
      >
        <div
          className="flex items-center justify-between cursor-pointer py-[12px] px-[12px] font-bold"
          onClick={() => toggleAnswer2(innerIndex)}
        >
          <p className="text-purple500 font-[500] text-[14px] lg:text-[16px]">
            {innerFaq.question}
          </p>
          <img
            src={ArrowToggle2}
            alt=""
            className={`transform transition-transform duration-300 ${
              openIndexInner === innerIndex ? "rotate-180" : ""
            }`}
          />
        </div>
        {openIndexInner === innerIndex && (
          <div className="bg-white py-[28px] px-[24px] grid gap-[33px]">
            {renderCheckboxes(inventoryLabels)}
          </div>
        )}
      </div>
    ));

  return (
    <div className="grid gap-[24px]">
      {faqData.map((faq, index) => (
        <div
          key={index}
          className={`bg-purple500 border border-purple500 focus:outline-[#5955B3] w-full rounded`}
        >
          <div
            className="flex items-center justify-between cursor-pointer font-bold py-[12px] px-[12px]"
            onClick={() => toggleAnswer(index)}
          >
            <p className="text-[#ffffff] font-[500] text-[14px] lg:text-[16px]">{faq.question}</p>
            <img
              src={ArrowToggle}
              alt=""
              className={`transform transition-transform duration-300 ${
                openIndex === index ? "rotate-180" : ""
              }`}
            />
          </div>
          {openIndex === index && (
            <div className="bg-white text-[#757575] text-[12px] lg:text-[18px] font-[300] py-[24px] px-[24px]">
              {index === 0 && renderCheckboxes(generalLabels)}
              {index === 1 && (
                <>
                  <div className="grid gap-[24px]">{renderCheckboxes(inventoryLabels)}</div>
                  {renderSubItems(faqDataInner, openIndexInner, toggleAnswer2)}
                </>
              )}
              {index === 2 && renderCheckboxes(ticketLabels)}
              {/* Add more sections as needed */}
            </div>
          )}
        </div>
      ))}

      <div className="flex items-center justify-between">
        <p className="text-[24px] font-[500] text-purple500">Module setting</p>
        <FormControlLabel
          control={
            <Checkbox
              sx={{ "& .MuiSvgIcon-root": { fontSize: 32 }, "&.Mui-checked": { color: "#5855B3" } }}
            />
          }
          label="Grant this role general access"
        />
      </div>

      <div className="flex justify-end items-center gap-2">
        <div
          className="border border-purple500 rounded px-[24px] py-[13px] font-[600] text-purple500 cursor-pointer"
          onClick={() => navigate(-1)}
        >
          Cancel
        </div>
        <div className="border border-purple500 bg-purple500 rounded px-[24px] py-[13px] font-[500] text-[#ffffff]">
          <Link to="/">Save and continue</Link>
        </div>
      </div>
    </div>
  );
};

export default RolesAndPermission;
