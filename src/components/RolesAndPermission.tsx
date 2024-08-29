import { ChangeEvent, useEffect, useState } from "react";
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
  openIndex: number | null;
  toggleAnswer: (index: number) => void;
  setSelectedPermissions: any;
  checkedGeneral: string[];
  setCheckedGeneral: any;
  checkedInventory: string[];
  setCheckedInventory: any;
  checkedTickets: string[];
  setCheckedTickets: any;
}

const RolesAndPermission: React.FC<RolesAndPermissionProps> = ({
  faqData,
  openIndex,
  toggleAnswer,
  setSelectedPermissions,
  checkedGeneral,
  setCheckedGeneral,
  checkedInventory,
  setCheckedInventory,
  checkedTickets,
  setCheckedTickets,
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
    checked,
    handlePermissionChange,
  }: {
    id: string;
    label: string;
    checked: boolean;
    handlePermissionChange: (label: string) => void;
  }) => (
    <div className="flex items-center mb-6">
      <input
        type="checkbox"
        id={id}
        className="h-6 w-6 mr-[24px] border border-black"
        checked={checked} // This is the important part to control the checkbox state
        onChange={() => handlePermissionChange(label)} // Use the label as permission
      />
      <label htmlFor={id} className="text-[16px] font-[400] text-grey500">
        {label}
      </label>
    </div>
  );

  const generalLabels = [
    { id: "levelOneCheck", label: "Create Menus" },
    { id: "levelOneCheck", label: "View All Menus" },
    { id: "levelOneCheck", label: "Freeze/ Unfreeze Menu List" },
    { id: "levelOneCheck", label: "Edit Menus" },
    { id: "levelOneCheck", label: "Create Branches" },
    { id: "levelOneCheck", label: "Update Branches" },
    { id: "levelOneCheck", label: "Delete Branches" },
    { id: "levelOneCheck", label: "Create QR Codes for Rooms" },
    { id: "levelOneCheck", label: "Create QR Codes for Tables" },
    { id: "levelOneCheck", label: "Generate Online Ordering Link" },
    { id: "levelOneCheck", label: "Generate Self Checkout Link" },
    { id: "levelOneCheck", label: "View Open and Closed Tickets" },
    { id: "levelOneCheck", label: "Void Order for Open and Closed Tickets" },
    { id: "levelOneCheck", label: "Request Refund for Order on Closed Tickets" },
    { id: "levelOneCheck", label: "Vacate Table on Closed Tickets" },
    { id: "levelOneCheck", label: "View Business Report" },
    { id: "levelOneCheck", label: "Download Business Report" },
    { id: "levelOneCheck", label: "Add Users" },
    { id: "levelOneCheck", label: "Accept or Decline Incoming Tickets on Waiter App" },
    { id: "levelOneCheck", label: "Change Order Status on Waiter App" },
    { id: "levelOneCheck", label: "Collect Tips on Waiter App" },
    { id: "levelOneCheck", label: "View Earnings from Tips" },
    { id: "levelOneCheck", label: "Add Menus to Till" },
    { id: "levelOneCheck", label: "Add Modifiers to Till" },
    { id: "levelOneCheck", label: "Hold Orders on Till" },
    { id: "levelOneCheck", label: "Work on Open Tickets on Till" },
  ];

  const inventoryLabels = [
    { id: "levelTwoCheck", label: "Create Menus" },
    { id: "levelTwoCheck", label: "View All Menus" },
    { id: "levelTwoCheck", label: "Freeze/ Unfreeze Menu List" },
    { id: "levelTwoCheck", label: "Edit Menus" },
    { id: "levelTwoCheck", label: "Create Branches" },
    { id: "levelTwoCheck", label: "Update Branches" },
    { id: "levelTwoCheck", label: "Delete Branches" },
    { id: "levelTwoCheck", label: "Create QR Codes for Rooms" },
    { id: "levelTwoCheck", label: "Create QR Codes for Tables" },
    { id: "levelTwoCheck", label: "Generate Online Ordering Link" },
    { id: "levelTwoCheck", label: "Generate Self Checkout Link" },
    { id: "levelTwoCheck", label: "View Open and Closed Tickets" },
    { id: "levelTwoCheck", label: "Void Order for Open and Closed Tickets" },
    { id: "levelTwoCheck", label: "Request Refund for Order on Closed Tickets" },
    { id: "levelTwoCheck", label: "Vacate Table on Closed Tickets" },
    { id: "levelTwoCheck", label: "View Business Report" },
    { id: "levelTwoCheck", label: "Download Business Report" },
    { id: "levelTwoCheck", label: "Add Users" },
    { id: "levelTwoCheck", label: "Accept or Decline Incoming Tickets on Waiter App" },
    { id: "levelTwoCheck", label: "Change Order Status on Waiter App" },
    { id: "levelTwoCheck", label: "Collect Tips on Waiter App" },
    { id: "levelTwoCheck", label: "View Earnings from Tips" },
    { id: "levelTwoCheck", label: "Add Menus to Till" },
    { id: "levelTwoCheck", label: "Add Modifiers to Till" },
    { id: "levelTwoCheck", label: "Hold Orders on Till" },
    { id: "levelTwoCheck", label: "Work on Open Tickets on Till" },
  ];

  const ticketLabels = [
    { id: "levelThreeCheck", label: "Accept or Decline Incoming Tickets on Waiter App" },
    { id: "levelThreeCheck", label: "Change Order Status on Waiter App" },
    { id: "levelThreeCheck", label: "Collect Tips on Waiter App" },
    { id: "levelThreeCheck", label: "View Earnings from Tips" },
    { id: "levelThreeCheck", label: "Add Menus to Till" },
    { id: "levelThreeCheck", label: "Add Modifiers to Till" },
    { id: "levelThreeCheck", label: "Hold Orders on Till" },
    { id: "levelThreeCheck", label: "Work on Open Tickets on Till" },
  ];

  const renderCheckboxes = (
    labels: { id: string; label: string }[],
    checkedState: string[],
    handleChange: (label: string, category: "general" | "inventory" | "ticket") => void,
    category: "general" | "inventory" | "ticket"
  ) =>
    labels.map((item, index) => (
      <CheckboxWithLabel
        key={index}
        id={`${item.id}${index}`}
        label={item.label}
        checked={checkedState.includes(item.label)} // Check if the label is in the checked state
        handlePermissionChange={() => handleChange(item.label, category)}
      />
    ));

  const handlePermissionChange = (label: string, category: "general" | "inventory" | "ticket") => {
    let updatedLabels: any;

    switch (category) {
      case "general":
        updatedLabels = checkedGeneral.includes(label as any)
          ? checkedGeneral.filter((item: any) => item !== label)
          : [...checkedGeneral, label];
        setCheckedGeneral(updatedLabels);
        break;

      case "inventory":
        updatedLabels = checkedInventory.includes(label as any)
          ? checkedInventory.filter((item: any) => item !== label)
          : [...checkedInventory, label];
        setCheckedInventory(updatedLabels);
        break;

      case "ticket":
        updatedLabels = checkedTickets.includes(label as any)
          ? checkedTickets.filter((item: any) => item !== label)
          : [...checkedTickets, label];
        setCheckedTickets(updatedLabels);
        break;

      default:
        return;
    }
  };

  const allCheckedLabels = [...checkedGeneral, ...checkedInventory, ...checkedTickets];

  const uniqueCheckedLabels = Array.from(new Set(allCheckedLabels));

  useEffect(() => {
    setSelectedPermissions(uniqueCheckedLabels);
  }, [checkedGeneral, checkedInventory, checkedTickets]);

  console.log(uniqueCheckedLabels, "pppp");
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
              {index === 0 &&
                renderCheckboxes(generalLabels, checkedGeneral, handlePermissionChange, "general")}
              {index === 1 &&
                renderCheckboxes(
                  inventoryLabels,
                  checkedInventory,
                  handlePermissionChange,
                  "inventory"
                )}
              {index === 2 &&
                renderCheckboxes(ticketLabels, checkedTickets, handlePermissionChange, "ticket")}
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
    </div>
  );
};

export default RolesAndPermission;
