import React, { useState, useEffect } from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  TextField,
  IconButton,
} from "@mui/material";
import { useSelector } from "react-redux";
import axios from "axios";
import SaveIcon from "@mui/icons-material/Save";
import EditIcon from "@mui/icons-material/Edit";
import KeyboardArrowDown from "@mui/icons-material/KeyboardArrowDown";
import { SERVER_DOMAIN } from "../../../Api/Api";
import imageIcon from "../../../assets/image60.png";

type PersonalInfo = {
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  state: string;
  country: string;
};

type BusinessInfo = {
  businessName: string;
  businessAddress: string;
  businessEmail: string;
  phoneNumber: string;
  businessType: string;
  cacNumber: string;
};

type BankInfo = {
  accountNumber: string;
  accountName: string;
  bankName: string;
  bvn: string;
  bankCountry: string;
  sortCode: string;
};

type FormData = {
  businessInfo: BusinessInfo;
  personalInfo: PersonalInfo;
  payoutBankDetails: BankInfo;
};

export default function InformationAccordion() {
  const [expanded, setExpanded] = useState<string | boolean>(false);
  const [editMode, setEditMode] = useState<{ [key: string]: boolean }>({
    businessName: false,
    ownerName: false,
    address: false,
    businessEmail: false,
    phoneNumber: false,
    businessType: false,
    cacNumber: false,
    firstName: false,
    lastName: false,
    city: false,
    state: false,
    country: false,
    accountNumber: false,
    accountName: false,
    bankName: false,
    bvn: false,
    bankCountry: false,
    sortCode: false,
  });

  const [formData, setFormData] = useState<FormData>({
    businessInfo: {
      businessName: "",
      businessAddress: "",
      businessEmail: "",
      phoneNumber: "",
      businessType: "",
      cacNumber: "",
    },
    personalInfo: {
      firstName: "",
      lastName: "",
      address: "",
      city: "",
      state: "",
      country: "Nigeria",
    },
    payoutBankDetails: {
      accountNumber: "",
      accountName: "",
      bankName: "",
      bvn: "",
      bankCountry: "Nigeria",
      sortCode: "",
    },
  });

  const userDetails = useSelector((state: any) => state.user);
  const token = userDetails?.userData?.token;

  useEffect(() => {
    const fetchAccountDetails = async () => {
      const headers = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      try {
        const response = await axios.get(`${SERVER_DOMAIN}/getAccountDetails`, headers);
        const { data } = response.data;

        setFormData({
          personalInfo: {
            firstName: data.personal_information.first_name,
            lastName: data.personal_information.last_name,
            address: data.personal_information.personal_address,
            city: data.personal_information.city,
            state: data.personal_information.state,
            country: data.personal_information.country,
          },
          businessInfo: {
            businessName: data.business_information.business_name,
            businessAddress: data.business_information.business_address,
            businessEmail: data.business_information.business_email,
            phoneNumber: data.business_information.business_phone_number,
            businessType: data.business_information.business_type,
            cacNumber: data.business_information.cac_number,
          },
          payoutBankDetails: {
            accountNumber: data.account_details.account_number,
            accountName: data.account_details.account_name,
            bankName: data.account_details.bank_name,
            bvn: data.account_details.bank_verification_number,
            bankCountry: data.account_details.country,
            sortCode: data.account_details.sort_code,
          },
        });
      } catch (error) {
        console.error("Error fetching account details:", error);
      }
    };

    fetchAccountDetails();
  }, [token]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    console.log(file);
  };

  const handleChange = (panel: string) => (event: any, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  };

  const toSnakeCase = (str: string) =>
    str.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);

  const handleEditClick = async (
    field:
      | keyof FormData["businessInfo"]
      | keyof FormData["personalInfo"]
      | keyof FormData["payoutBankDetails"],
    section: "businessInfo" | "personalInfo" | "payoutBankDetails"
  ) => {
    const isCurrentlyInEditMode = editMode[field];
    // Check if the field is in edit mode, and if yes, send the update request
    if (isCurrentlyInEditMode) {
      const payload = {
        [toSnakeCase(field)]: formData[section][field],
      };

      try {
        const headers = {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        };

        // Determine the endpoint based on the section
        let endpoint = "";
        if (section === "businessInfo" || section === "payoutBankDetails") {
          endpoint = `${SERVER_DOMAIN}/updateBusinessDetails`; // Use this for business info
        } else if (section === "personalInfo") {
          endpoint = `${SERVER_DOMAIN}/updatePersonalInformation`; // Use this for personal info
        }

        const response = await axios.put(endpoint, payload, { headers });

        console.log(`${section} field updated successfully:`, response.data);
      } catch (error) {
        console.error(`Error updating ${section} field:`, error);
      }
    }

    // Toggle the edit mode
    setEditMode((prevEditMode) => ({
      ...prevEditMode,
      [field]: !prevEditMode[field],
    }));
  };

  const handleInputChange =
    (
      section: "personalInfo" | "businessInfo" | "payoutBankDetails",
      subField: keyof PersonalInfo | keyof BusinessInfo | keyof BankInfo
    ) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [section]: {
          ...prevFormData[section],
          [subField]: event.target.value,
        },
      }));
    };

  const renderFields = (
    section: "personalInfo" | "businessInfo" | "payoutBankDetails",
    fields: {
      label: string;
      field:
        | keyof FormData["businessInfo"]
        | keyof FormData["personalInfo"]
        | keyof FormData["payoutBankDetails"];
    }[]
  ) =>
    fields.map((item) => (
      <div key={item.field} className="flex items-center gap-2">
        <TextField
          fullWidth
          value={formData[section][item.field]}
          onChange={handleInputChange(section, item.field)}
          disabled={!editMode[item.field]}
          variant="outlined"
          label={item.label}
          sx={{
            "& .MuiOutlinedInput-root": {
              "& fieldset": { borderColor: "black" },
              "&:hover fieldset": { borderColor: "black" },
              "&.Mui-focused fieldset": { borderColor: "black" },
            },
          }}
        />
        <IconButton onClick={() => handleEditClick(item.field, section)}>
          {editMode[item.field] ? <SaveIcon /> : <EditIcon />}
        </IconButton>
      </div>
    ));

  return (
    <>
      <Accordion expanded={expanded === "panel1"} onChange={handleChange("panel1")}>
        <AccordionSummary
          expandIcon={<KeyboardArrowDown />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <div className="flex gap-3 sm:text-lg md:text-[22px] font-medium text-blackish">
            Business Information
          </div>
        </AccordionSummary>
        <AccordionDetails className="flex flex-col gap-4">
          {renderFields("businessInfo", [
            { label: "Business Name", field: "businessName" },
            { label: "Business Address", field: "businessAddress" },
            { label: "Email", field: "businessEmail" },
            { label: "Phone Number", field: "phoneNumber" },
            { label: "Business Type", field: "businessType" },
            { label: "CAC Number", field: "cacNumber" },
          ])}

          {/* Business Logo Section */}
          <label htmlFor="logo" className="text-base font-medium text-[#121212] p-4">
            Add Business Logo
          </label>
          <div className="flex items-center px-4 py-1 gap-[16px]">
            <label
              htmlFor="fileInput"
              className="w-[72px] border border-dashed p-[20px] border-[#5855B3] cursor-pointer"
            >
              <input
                type="file"
                id="fileInput"
                className="hidden"
                onChange={handleFileChange}
                accept="image/*"
              />
              <img src={imageIcon} alt="Upload Icon" className="w-[70px]" />
            </label>
            <div>
              <label
                htmlFor="fileInput"
                className="text-[#5855B3] font-[500] text-[16px] mb-[8px] cursor-pointer"
              >
                Click to upload image
              </label>
              <p className="text-[14px] font-[400] text-grey300">Max. file size: 2MB</p>
            </div>
          </div>
        </AccordionDetails>
      </Accordion>

      <Accordion expanded={expanded === "panel2"} onChange={handleChange("panel2")}>
        <AccordionSummary
          expandIcon={<KeyboardArrowDown />}
          aria-controls="panel2-content"
          id="panel2-header"
        >
          <div className="flex gap-3 sm:text-lg md:text-[22px] font-medium text-blackish">
            Personal Information
          </div>
        </AccordionSummary>
        <AccordionDetails className="flex flex-col gap-4">
          {renderFields("personalInfo", [
            { label: "First Name", field: "firstName" },
            { label: "Last Name", field: "lastName" },
            { label: "Address", field: "address" },
            { label: "City", field: "city" },
            { label: "State", field: "state" },
            { label: "Country", field: "country" },
          ])}
        </AccordionDetails>
      </Accordion>

      <Accordion expanded={expanded === "panel3"} onChange={handleChange("panel3")}>
        <AccordionSummary
          expandIcon={<KeyboardArrowDown />}
          aria-controls="panel3-content"
          id="panel3-header"
        >
          <div className="flex gap-3 sm:text-lg md:text-[22px] font-medium text-blackish">
            Bank Information
          </div>
        </AccordionSummary>
        <AccordionDetails className="flex flex-col gap-4">
          {renderFields("payoutBankDetails", [
            { label: "Account Number", field: "accountNumber" },
            { label: "Account Name", field: "accountName" },
            { label: "Bank Name", field: "bankName" },
            { label: "BVN", field: "bvn" },
            { label: "Bank Country", field: "bankCountry" },
            { label: "Sort Code", field: "sortCode" },
          ])}
        </AccordionDetails>
      </Accordion>
    </>
  );
}
