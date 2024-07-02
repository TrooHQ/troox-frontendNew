import React, { useState } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import { ArrowDropDown, ArrowRight, CheckBox, CheckBoxOutlineBlank } from "@mui/icons-material";
import ToggleOnIcon from "@mui/icons-material/ToggleOn";
import ToggleOffIcon from "@mui/icons-material/ToggleOff";
import IconButton from "@mui/material/IconButton";
import clsx from "clsx";
import {
  Autocomplete,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";

export const allOutlets = [
  { label: "All outlets" },
  { label: "Abuja outlet" },
  { label: "Agege outlet" },
  { label: "Ajah outlet" },
  { label: "Ikeja outlet" },
  { label: "Lekki outlet" },
];

const TenantAccordion = () => {
  const [expanded, setExpanded] = useState<string | false>(false);
  const [expanded2, setExpanded2] = useState<string | false>(false);
  const [expanded3, setExpanded3] = useState<string | false>(false);
  const [expanded4, setExpanded4] = useState<string | false>(false);
  const [isEnabledForOrganization, setIsEnabledForOrganization] = useState<boolean>(false);
  const [isEnabledForOrganization2, setIsEnabledForOrganization2] = useState<boolean>(false);
  const [isEnabledForOrganization3, setIsEnabledForOrganization3] = useState<boolean>(false);
  const [isEnabledForOrganization4, setIsEnabledForOrganization4] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState("entireOrg");
  const [selectedOption2, setSelectedOption2] = useState("entireOrg");
  const [selectedOption3, setSelectedOption3] = useState("entireOrg");
  const [selectedOption4, setSelectedOption4] = useState("entireOrg");
  const [selectedOutlets, setSelectedOutlets] = useState<string[]>([]);
  const [selectedOutlets2, setSelectedOutlets2] = useState<string[]>([]);
  const [selectedOutlets3, setSelectedOutlets3] = useState<string[]>([]);
  const [selectedOutlets4, setSelectedOutlets4] = useState<string[]>([]);

  const handleChange = (panel: string) => (event: any, isExpanded: boolean) => {
    event.preventDefault();
    setExpanded(isExpanded ? panel : false);
  };
  const handleChange2 = (panel: string) => (event: any, isExpanded2: boolean) => {
    event.preventDefault();
    setExpanded2(isExpanded2 ? panel : false);
  };
  const handleChange3 = (panel: string) => (event: any, isExpanded3: boolean) => {
    event.preventDefault();
    setExpanded3(isExpanded3 ? panel : false);
  };
  const handleChange4 = (panel: string) => (event: any, isExpanded4: boolean) => {
    event.preventDefault();
    setExpanded4(isExpanded4 ? panel : false);
  };

  const handleToggleChange = () => {
    setIsEnabledForOrganization(!isEnabledForOrganization);
  };
  const handleToggleChange2 = () => {
    setIsEnabledForOrganization2(!isEnabledForOrganization2);
  };
  const handleToggleChange3 = () => {
    setIsEnabledForOrganization3(!isEnabledForOrganization3);
  };
  const handleToggleChange4 = () => {
    setIsEnabledForOrganization4(!isEnabledForOrganization4);
  };

  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedOption(event.target.value);
  };
  const handleRadioChange2 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedOption2(event.target.value);
  };
  const handleRadioChange3 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedOption3(event.target.value);
  };
  const handleRadioChange4 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedOption4(event.target.value);
  };

  const handleOutletChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSelectedOutlets((prev) =>
      prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]
    );
  };

  return (
    <div className="app-width mt-4 mb-4 text-blackish">
      <Accordion
        sx={{
          borderTop: "none",
          borderLeft: "none",
          borderRight: "none",
          boxShadow: "none",
          borderBottom: "1px solid #e0e0e0",
        }}
        expanded={expanded === "panel1"}
        onChange={handleChange("panel1")}
      >
        <AccordionSummary aria-controls="panel1bh-content" id="panel1bh-header">
          {expanded === "panel1" ? <ArrowDropDown /> : <ArrowRight />}
          <h5 className="text-[18px] font-normal text-[#121212]">QR Code Order & Pay</h5>
        </AccordionSummary>
        <AccordionDetails className="sm:text-lg flex flex-col gap-4">
          <p className="text-xs font-normal text-[#606060]">
            {isEnabledForOrganization ? "Enabled for entire organization" : "Disabled"}
          </p>
          <p className="text-base font-normal text-[#606060]">QR Code Order & Pay enables...</p>
          <div>
            <IconButton onClick={handleToggleChange} color="default">
              {isEnabledForOrganization ? (
                <ToggleOnIcon style={{ color: "#5855B3", fontSize: "40px" }} />
              ) : (
                <ToggleOffIcon style={{ fontSize: "40px" }} />
              )}
            </IconButton>
            <span
              className={clsx(
                isEnabledForOrganization ? "text-[#5855b3]" : "text-gray-700",
                "text-base font-medium"
              )}
            >
              {isEnabledForOrganization ? "Enabled" : "Disabled"}
            </span>

            <h5 className="text-sm font-normal text-[#606060]">Apply to:</h5>

            <RadioGroup
              aria-label="apply-to"
              name="apply-to-group"
              value={selectedOption}
              onChange={handleRadioChange}
            >
              <FormControlLabel
                value="entireOrg"
                control={
                  <Radio
                    sx={{
                      color: "#5855B3",
                      "&.Mui-checked": {
                        color: "#5855B3",
                      },
                    }}
                  />
                }
                label="The entire organization"
              />
              <FormControlLabel
                value="specificBranches"
                control={
                  <Radio
                    sx={{
                      color: "#5855B3",
                      "&.Mui-checked": {
                        color: "#5855B3",
                      },
                    }}
                  />
                }
                label="Specific branches"
              />
              {selectedOption === "specificBranches" && (
                <Autocomplete
                  multiple
                  id="checkboxes-tags-demo"
                  options={allOutlets}
                  disableCloseOnSelect
                  getOptionLabel={(option) => option.label}
                  renderOption={(props, option, { selected }) => (
                    <li {...props}>
                      <Checkbox
                        icon={<CheckBoxOutlineBlank style={{ marginRight: 8 }} />}
                        checkedIcon={<CheckBox style={{ marginRight: 8 }} />}
                        checked={selected}
                      />
                      {option.label}
                    </li>
                  )}
                  style={{ width: 350 }}
                  renderInput={(params) => (
                    <TextField {...params} label="Select Outlets" placeholder="Outlets" />
                  )}
                  value={allOutlets.filter((outlet) => selectedOutlets.includes(outlet.label))}
                  onChange={(event, newValue) => {
                    setSelectedOutlets(newValue.map((item) => item.label));
                  }}
                />
              )}
              <FormControlLabel
                value="specificUserGroups"
                control={
                  <Radio
                    sx={{
                      color: "#5855B3",
                      "&.Mui-checked": {
                        color: "#5855B3",
                      },
                    }}
                  />
                }
                label="Specific user groups"
              />
              {selectedOption === "specificUserGroups" && (
                <TextField
                  label="Select User Groups"
                  placeholder="Enter group emails separated by a comma"
                  variant="outlined"
                  style={{ width: 350 }}
                  InputProps={{
                    style: {
                      borderColor: "#5855b3",
                    },
                  }}
                />
              )}
            </RadioGroup>
          </div>
        </AccordionDetails>
      </Accordion>

      {/* Second acc */}
      <Accordion
        sx={{
          borderTop: "none",
          borderLeft: "none",
          borderRight: "none",
          boxShadow: "none",
          borderBottom: "1px solid #e0e0e0",
        }}
        expanded={expanded2 === "panel1"}
        onChange={handleChange2("panel1")}
      >
        <AccordionSummary aria-controls="panel1bh-content" id="panel1bh-header">
          {expanded2 === "panel1" ? <ArrowDropDown /> : <ArrowRight />}
          <h5 className="text-[18px] font-normal text-[#121212]">Order-At-Table</h5>
        </AccordionSummary>
        <AccordionDetails className="sm:text-lg flex flex-col gap-4">
          <p className="text-xs font-normal text-[#606060]">
            {isEnabledForOrganization2 ? "Enabled for entire organization" : "Disabled"}
          </p>
          <p className="text-base font-normal text-[#606060]">QR Code Order & Pay enables...</p>
          <div>
            <IconButton onClick={handleToggleChange2} color="default">
              {isEnabledForOrganization ? (
                <ToggleOnIcon style={{ color: "#5855B3", fontSize: "40px" }} />
              ) : (
                <ToggleOffIcon style={{ fontSize: "40px" }} />
              )}
            </IconButton>
            <span
              className={clsx(
                isEnabledForOrganization2 ? "text-[#5855b3]" : "text-gray-700",
                "text-base font-medium"
              )}
            >
              {isEnabledForOrganization2 ? "Enabled" : "Disabled"}
            </span>

            <h5 className="text-sm font-normal text-[#606060]">Apply to:</h5>

            <RadioGroup
              aria-label="apply-to"
              name="apply-to-group"
              value={selectedOption2}
              onChange={handleRadioChange2}
            >
              <FormControlLabel
                value="entireOrg"
                control={
                  <Radio
                    sx={{
                      color: "#5855B3",
                      "&.Mui-checked": {
                        color: "#5855B3",
                      },
                    }}
                  />
                }
                label="The entire organization"
              />
              <FormControlLabel
                value="specificBranches"
                control={
                  <Radio
                    sx={{
                      color: "#5855B3",
                      "&.Mui-checked": {
                        color: "#5855B3",
                      },
                    }}
                  />
                }
                label="Specific branches"
              />
              {selectedOption2 === "specificBranches" && (
                <Autocomplete
                  multiple
                  id="checkboxes-tags-demo"
                  options={allOutlets}
                  disableCloseOnSelect
                  getOptionLabel={(option) => option.label}
                  renderOption={(props, option, { selected }) => (
                    <li {...props}>
                      <Checkbox
                        icon={<CheckBoxOutlineBlank style={{ marginRight: 8 }} />}
                        checkedIcon={<CheckBox style={{ marginRight: 8 }} />}
                        checked={selected}
                      />
                      {option.label}
                    </li>
                  )}
                  style={{ width: 350 }}
                  renderInput={(params) => (
                    <TextField {...params} label="Select Outlets" placeholder="Outlets" />
                  )}
                  value={allOutlets.filter((outlet) => selectedOutlets.includes(outlet.label))}
                  onChange={(event, newValue) => {
                    setSelectedOutlets(newValue.map((item) => item.label));
                  }}
                />
              )}
              <FormControlLabel
                value="specificUserGroups"
                control={
                  <Radio
                    sx={{
                      color: "#5855B3",
                      "&.Mui-checked": {
                        color: "#5855B3",
                      },
                    }}
                  />
                }
                label="Specific user groups"
              />
              {selectedOption2 === "specificUserGroups" && (
                <TextField
                  label="Select User Groups"
                  placeholder="Enter group emails separated by a comma"
                  variant="outlined"
                  style={{ width: 350 }}
                  InputProps={{
                    style: {
                      borderColor: "#5855b3",
                    },
                  }}
                />
              )}
            </RadioGroup>
          </div>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default TenantAccordion;
