import { ChangeEvent, useEffect } from "react";
import ArrowToggle2 from "../assets/chevron-down2.svg";
import {
  Checkbox,
  FormControlLabel,
  Tooltip,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import { InfoOutlined } from "@mui/icons-material";
import { accessLabels } from "./RolesandPerm";

interface FAQItem {
  question: string;
  inputValue?: string;
  subItems?: FAQItem[];
}

interface RolesAndPermissionProps {
  faqData: FAQItem[];
  openIndex: number | null;
  toggleAnswer: (index: number) => void;
  setSelectedPermissions: (perms: string[]) => void;
  checkedGeneral: string[];
  setCheckedGeneral: (perms: string[]) => void;
  checkedInventory: string[];
  setCheckedInventory: (perms: string[]) => void;
  checkedTickets: string[];
  setCheckedTickets: (perms: string[]) => void;
  selectedPermissions?: string[];
}

const RolesAndPermission: React.FC<RolesAndPermissionProps> = ({
  setSelectedPermissions,
  checkedGeneral,
  setCheckedGeneral,
  checkedInventory,
  setCheckedInventory,
  checkedTickets,
  setCheckedTickets,
  // selectedPermissions = [],
}) => {


  useEffect(() => {
    const allCheckedLabels = [
      ...checkedGeneral,
      ...checkedInventory,
      ...checkedTickets,
    ];


    const uniqueCheckedLabels = Array.from(new Set(allCheckedLabels));
    setSelectedPermissions(uniqueCheckedLabels);
  }, [checkedGeneral, checkedInventory, checkedTickets]);

  const handleMasterCheckboxChange = (
    event: ChangeEvent<HTMLInputElement>,
    category: string
  ) => {
    const isChecked = event.target.checked;
    const permissions = accessLabels.find((item) => item.category === category)?.permissions || [];

    switch (category.toLocaleLowerCase()) {
      case "general":
        setCheckedGeneral(isChecked ? permissions : []);
        break;
      case "inventory":
        setCheckedInventory(isChecked ? permissions : []);
        break;
      case "ticket":
        setCheckedTickets(isChecked ? permissions : []);
        break;
    }
  };

  const handleCheckboxChange = (label: string, category: string) => {
    const toggle = (checkedArray: string[], setFn: (val: string[]) => void) => {
      if (checkedArray.includes(label)) {
        setFn(checkedArray.filter((item) => item !== label));
      } else {
        setFn([...checkedArray, label]);
      }
    };

    switch (category.toLocaleLowerCase()) {
      case "general":
        toggle(checkedGeneral, setCheckedGeneral);
        break;
      case "inventory":
        toggle(checkedInventory, setCheckedInventory);
        break;
      case "ticket":
        toggle(checkedTickets, setCheckedTickets);
        break;
    }
  };

  const renderCheckboxes = (
    labels: string[],
    checkedState: string[],
    category: string
  ) => {
    // console.log("checeked state", checkedState)
    return labels.map((item, index) => (
      <div
        key={index}
        className="flex flex-row-reverse items-center justify-between mb-6"
      >
        <input
          type="checkbox"
          id={`${item}${index}`}
          className="h-6 w-6 mr-[24px] border border-black"
          checked={checkedState.includes(item)}
          onChange={() => handleCheckboxChange(item, category)}
        />
        <label
          htmlFor={`${item}${index}`}
          className="text-[16px] font-[400] text-grey500"
        >
          {item}
        </label>
      </div>
    ));
  }

  const getCheckedArray = (category: string) => {
    switch (category) {
      case "general":
        return checkedGeneral;
      case "inventory":
        return checkedInventory;
      case "ticket":
        return checkedTickets;
      default:
        return [];
    }
  };

  return (
    <div className="grid gap-[12px]">

      {accessLabels.map((item, index) => {
        const checkedArray = getCheckedArray(item.category.toLocaleLowerCase());
        const allChecked = item.permissions.every((perm) =>
          checkedArray.includes(perm)
        );

        return (
          <div
            key={index}
            className={`bg-[#ebebeb] border border-[#f8f8f8] focus:outline-[#121212] w-full rounded`}
          >
            <Accordion>
              <AccordionSummary
                expandIcon={<img src={ArrowToggle2} alt="" />}
                aria-controls={`panel${index}-content`}
                id={`panel${index}-header`}
                className="bg-[#F8F8F8] text-grey500 text-[16px] font-[500]"
              >
                {item?.title} Access
              </AccordionSummary>
              <AccordionDetails>
                <div className="flex flex-col">
                  <Tooltip title={item?.description}>
                    <div className="flex items-start p-4 space-x-2 bg-white border border-gray-200 rounded-md shadow-sm">
                      <div className="text-purple500">
                        <InfoOutlined className="text-2xl cursor-pointer" />
                      </div>
                      <div className="text-gray-700">
                        <span className="text-lg font-semibold">
                          {item?.title} Access:
                        </span>
                        <div className="mt-1 text-sm leading-relaxed">
                          {item?.description}
                        </div>
                      </div>
                    </div>
                  </Tooltip>
                </div>

                <div className="px-4 py-2">
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={allChecked}
                        onChange={(e) =>
                          handleMasterCheckboxChange(e, item.category)
                        }
                        sx={{
                          "& .MuiSvgIcon-root": { fontSize: 32 },
                          "&.Mui-checked": { color: "#5855B3" },
                        }}
                      />
                    }
                    label="Grant this role general access"
                  />
                  {renderCheckboxes(
                    item?.permissions,
                    checkedArray,
                    item?.category
                  )}
                </div>
              </AccordionDetails>
            </Accordion>
          </div>
        );
      })}
    </div>
  );
};

export default RolesAndPermission;
