import React, { useState } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import { KeyboardArrowDown } from "@mui/icons-material";

export default function InformationAccordion() {
  const [expanded, setExpanded] = useState<string | boolean>(false);
  const [editMode, setEditMode] = useState<{ [key: string]: boolean }>({
    businessInfo: false,
    firstName: false,
    lastName: false,
    address: false,
    payoutBankDetails: false,
  });
  const [formData, setFormData] = useState({
    businessInfo: "",
    personalInfo: {
      firstName: "Chinedu",
      lastName: "Ayoola",
      address: "452 Cherryview Estate, Lekki Lagos",
    },
    payoutBankDetails: "",
  });

  const handleChange = (panel: string) => (event: any, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  };

  const handleEditClick = (field: string) => {
    setEditMode((prevEditMode) => ({
      ...prevEditMode,
      [field]: !prevEditMode[field],
    }));
  };

  const handleInputChange =
    (field: string, subField: string | null = null) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      if (subField) {
        setFormData((prevFormData) => ({
          ...prevFormData,
          [field]: {
            ...prevFormData[field],
            [subField]: event.target.value,
          },
        }));
      } else {
        setFormData((prevFormData) => ({
          ...prevFormData,
          [field]: event.target.value,
        }));
      }
    };

  return (
    <div className="app-width mt-32 mb-40 text-blackish">
      <div className="mb-10">
        <h3 className="text-[24px] md:text-[34px] font-medium text-center">Information Details</h3>
        <div className="text-center text-sm sm:text-base">Update your information as needed</div>
      </div>

      <Accordion
        className="shadow-none"
        expanded={expanded === "panel1"}
        onChange={handleChange("panel1")}
      >
        <AccordionSummary
          expandIcon={<KeyboardArrowDown />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <div className="flex gap-3 sm:text-lg md:text-2xl font-medium text-blackish">
            Business Information
          </div>
        </AccordionSummary>
        <AccordionDetails className="sm:text-lg">
          <div className="flex items-center gap-2">
            <TextField
              fullWidth
              value={formData.businessInfo}
              onChange={handleInputChange("businessInfo")}
              disabled={!editMode.businessInfo}
              variant="outlined"
              label="Business Information"
            />
            <IconButton onClick={() => handleEditClick("businessInfo")}>
              {editMode.businessInfo ? <SaveIcon /> : <EditIcon />}
            </IconButton>
          </div>
        </AccordionDetails>
      </Accordion>

      <Accordion
        className="shadow-none"
        expanded={expanded === "panel2"}
        onChange={handleChange("panel2")}
      >
        <AccordionSummary
          expandIcon={<KeyboardArrowDown />}
          aria-controls="panel2-content"
          id="panel2-header"
        >
          <div className="flex gap-3 sm:text-lg md:text-2xl font-medium text-blackish">
            Personal Information
          </div>
        </AccordionSummary>
        <AccordionDetails className="sm:text-lg">
          <div className="flex items-center gap-2 mb-2">
            <TextField
              fullWidth
              value={formData.personalInfo.firstName}
              onChange={handleInputChange("personalInfo", "firstName")}
              disabled={!editMode.firstName}
              variant="outlined"
              label="First Name"
            />
            <IconButton onClick={() => handleEditClick("firstName")}>
              {editMode.firstName ? <SaveIcon /> : <EditIcon />}
            </IconButton>
          </div>
          <div className="flex items-center gap-2 mb-2">
            <TextField
              fullWidth
              value={formData.personalInfo.lastName}
              onChange={handleInputChange("personalInfo", "lastName")}
              disabled={!editMode.lastName}
              variant="outlined"
              label="Last Name"
            />
            <IconButton onClick={() => handleEditClick("lastName")}>
              {editMode.lastName ? <SaveIcon /> : <EditIcon />}
            </IconButton>
          </div>
          <div className="flex items-center gap-2">
            <TextField
              fullWidth
              value={formData.personalInfo.address}
              onChange={handleInputChange("personalInfo", "address")}
              disabled={!editMode.address}
              variant="outlined"
              label="Address"
            />
            <IconButton onClick={() => handleEditClick("address")}>
              {editMode.address ? <SaveIcon /> : <EditIcon />}
            </IconButton>
          </div>
        </AccordionDetails>
      </Accordion>

      <Accordion
        className="shadow-none"
        expanded={expanded === "panel3"}
        onChange={handleChange("panel3")}
      >
        <AccordionSummary
          expandIcon={<KeyboardArrowDown />}
          aria-controls="panel3-content"
          id="panel3-header"
        >
          <div className="flex gap-3 sm:text-lg md:text-2xl font-medium text-blackish">
            Payout & Bank Details
          </div>
        </AccordionSummary>
        <AccordionDetails className="sm:text-lg">
          <div className="flex items-center gap-2">
            <TextField
              fullWidth
              value={formData.payoutBankDetails}
              onChange={handleInputChange("payoutBankDetails")}
              disabled={!editMode.payoutBankDetails}
              variant="outlined"
              label="Payout & Bank Details"
            />
            <IconButton onClick={() => handleEditClick("payoutBankDetails")}>
              {editMode.payoutBankDetails ? <SaveIcon /> : <EditIcon />}
            </IconButton>
          </div>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
