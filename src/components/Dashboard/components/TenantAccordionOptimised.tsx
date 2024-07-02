import { useState } from "react";
import { AccordionItem } from "./AccordionItem";

const TenantAccordion = () => {
  const initialAccordionState = {
    expanded: false,
    isEnabled: false,
    selectedOption: "entireOrg",
    selectedOutlets: [],
  };

  const [accordionState, setAccordionState] = useState([
    { ...initialAccordionState, title: "QR Code Order & Pay" },
    { ...initialAccordionState, title: "Order-At-Table" },
    { ...initialAccordionState, title: "In-Room Dining" },
    { ...initialAccordionState, title: "Self Checkout" },
  ]);

  const handleAccordionChange = (index: number, field: string, value: any) => {
    const newState = accordionState.map((item, i) => {
      if (i === index) {
        return { ...item, [field]: value };
      }
      return item;
    });
    setAccordionState(newState);
  };

  return (
    <div className="app-width mt-4 mb-4 text-blackish">
      {accordionState.map((accordion, index) => (
        <AccordionItem
          key={index}
          title={accordion.title}
          expanded={accordion.expanded}
          setExpanded={(value: any) => handleAccordionChange(index, "expanded", value)}
          isEnabled={accordion.isEnabled}
          setIsEnabled={(value: any) => handleAccordionChange(index, "isEnabled", value)}
          selectedOption={accordion.selectedOption}
          setSelectedOption={(value: any) => handleAccordionChange(index, "selectedOption", value)}
          selectedOutlets={accordion.selectedOutlets}
          setSelectedOutlets={(value: any) =>
            handleAccordionChange(index, "selectedOutlets", value)
          }
        />
      ))}
    </div>
  );
};

export default TenantAccordion;
