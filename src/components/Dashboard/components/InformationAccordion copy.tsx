import React, { useEffect, useState } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import { KeyboardArrowDown } from "@mui/icons-material";
import imageIcon from "../../../assets/image60.png";
import { SERVER_DOMAIN } from "../../../Api/Api";
import axios from "axios";
import { useSelector } from "react-redux";

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
    email: false,
    phoneNumber: false,
    social1: false,
    social2: false,
    motto: false,
    firstName: false,
    lastName: false,
    city: false,
    state: false,
    country: false,
    accountNumber: false,
    accountName: false,
    bankName: false,
    sortCode: false,
    bankCountry: false,
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

  // Fetch the business information on component mount
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

  console.log(formData);
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    console.log(file);
  };

  const handleChange = (panel: string) => (event: any, isExpanded: boolean) => {
    event.preventDefault();
    setExpanded(isExpanded ? panel : false);
  };

  const toSnakeCase = (str: string) =>
    str.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);

  const handleEditClick = async (field: keyof BusinessInfo) => {
    const isCurrentlyInEditMode = editMode[field]; // Check if the field is currently in edit mode
    if (isCurrentlyInEditMode) {
      // Field is being saved, so trigger PUT request
      const payload = {
        [toSnakeCase(field)]: formData.businessInfo[field], // Convert key to snake_case
      };

      try {
        const headers = {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        };

        const response = await axios.put(`${SERVER_DOMAIN}/updateBusinessDetails`, payload, {
          headers,
        });

        console.log("Field updated successfully:", response.data);
      } catch (error) {
        console.error("Error updating field:", error);
      }
    }

    // Toggle edit mode for the field
    setEditMode((prevEditMode) => ({
      ...prevEditMode,
      [field]: !prevEditMode[field],
    }));
  };

  const handleInputChange =
    (
      section: "personalInfo" | "businessInfo" | "payoutBankDetails",
      subField?: keyof PersonalInfo | keyof BusinessInfo | keyof BankInfo
    ) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [section]: {
          ...prevFormData[section],
          [subField!]: event.target.value,
        },
      }));
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
        <AccordionSummary
          expandIcon={<KeyboardArrowDown />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <div className="flex gap-3 sm:text-lg md:text-[22px] font-medium md:font-normal text-blackish">
            Business Information
          </div>
        </AccordionSummary>

        <AccordionDetails className="sm:text-lg flex flex-col gap-4">
          <p className="mb-2">
            This information is required in order to verify your business. It will show up on your
            payout report, invoices, and receipts.
          </p>

          {[
            { label: "Business Name", field: "businessName" as keyof BusinessInfo },
            { label: "Owner Name", field: "ownerName" as keyof BusinessInfo },
            { label: "Address", field: "businessAddress" as keyof BusinessInfo },
            { label: "Email", field: "businessEmail" as keyof BusinessInfo },
            { label: "CAC Number", field: "cacNumber" as keyof BusinessInfo },
            { label: "Phone Number", field: "phoneNumber" as keyof BusinessInfo },
            { label: "Social Media 1", field: "social1" as keyof BusinessInfo },
            { label: "Social Media 2", field: "social2" as keyof BusinessInfo },
            { label: "Motto", field: "motto" as keyof BusinessInfo },
          ].map((item) => (
            <div key={item.field} className="flex items-center gap-2">
              <TextField
                fullWidth
                value={formData.businessInfo[item.field]}
                onChange={handleInputChange("businessInfo", item.field as keyof BusinessInfo)}
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
              <IconButton onClick={() => handleEditClick(item.field)}>
                {editMode[item.field] ? <SaveIcon /> : <EditIcon />}
              </IconButton>
            </div>
          ))}
        </AccordionDetails>

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
      </Accordion>

      <Accordion
        sx={{
          borderTop: "none",
          borderLeft: "none",
          borderRight: "none",
          boxShadow: "none",
          borderBottom: "1px solid #e0e0e0",
        }}
        expanded={expanded === "panel2"}
        onChange={handleChange("panel2")}
      >
        <AccordionSummary
          expandIcon={<KeyboardArrowDown />}
          aria-controls="panel2-content"
          id="panel2-header"
        >
          <div>
            <div className="flex gap-3 sm:text-lg md:text-[22px] font-medium md:font-normal text-blackish">
              Personal Information
            </div>
          </div>
        </AccordionSummary>
        <AccordionDetails className="sm:text-lg flex flex-col gap-4">
          <p className="mb-2">
            Please make sure that your personal details remain up-to-date. Because this information
            is used to verify your identity. You will need to send our Support Team a message if you
            need to change it.
          </p>
          <div className="flex items-center gap-2 mb-2">
            <TextField
              fullWidth
              value={formData.personalInfo.firstName}
              onChange={handleInputChange("personalInfo", "firstName")}
              disabled={!editMode.firstName}
              variant="outlined"
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "black",
                  },
                  "&:hover fieldset": {
                    borderColor: "black",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "black",
                  },
                },
              }}
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
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "black",
                  },
                  "&:hover fieldset": {
                    borderColor: "black",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "black",
                  },
                },
              }}
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
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "black",
                  },
                  "&:hover fieldset": {
                    borderColor: "black",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "black",
                  },
                },
              }}
              label="Address"
            />
            <IconButton onClick={() => handleEditClick("address")}>
              {editMode.address ? <SaveIcon /> : <EditIcon />}
            </IconButton>
          </div>
          <div className="flex items-center gap-2">
            <TextField
              fullWidth
              value={formData.personalInfo.city}
              onChange={handleInputChange("personalInfo", "city")}
              disabled={!editMode.city}
              variant="outlined"
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "black",
                  },
                  "&:hover fieldset": {
                    borderColor: "black",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "black",
                  },
                },
              }}
              label="City"
            />
            <IconButton onClick={() => handleEditClick("city")}>
              {editMode.city ? <SaveIcon /> : <EditIcon />}
            </IconButton>
          </div>
          <div className="flex items-center gap-2">
            <TextField
              fullWidth
              value={formData.personalInfo.state}
              onChange={handleInputChange("personalInfo", "state")}
              disabled={!editMode.state}
              variant="outlined"
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "black",
                  },
                  "&:hover fieldset": {
                    borderColor: "black",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "black",
                  },
                },
              }}
              label="State"
            />
            <IconButton onClick={() => handleEditClick("state")}>
              {editMode.state ? <SaveIcon /> : <EditIcon />}
            </IconButton>
          </div>
          <div className="flex items-center gap-2">
            <TextField
              fullWidth
              value={formData.personalInfo.country}
              onChange={handleInputChange("personalInfo", "country")}
              disabled={!editMode.country}
              variant="outlined"
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "black",
                  },
                  "&:hover fieldset": {
                    borderColor: "black",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "black",
                  },
                },
              }}
              label="Country"
            />
            <IconButton onClick={() => handleEditClick("country")}>
              {editMode.country ? <SaveIcon /> : <EditIcon />}
            </IconButton>
          </div>
        </AccordionDetails>
      </Accordion>

      <Accordion
        sx={{
          borderTop: "none",
          borderLeft: "none",
          borderRight: "none",
          boxShadow: "none",
          borderBottom: "1px solid #e0e0e0",
        }}
        expanded={expanded === "panel3"}
        onChange={handleChange("panel3")}
      >
        <AccordionSummary
          expandIcon={<KeyboardArrowDown />}
          aria-controls="panel3-content"
          id="panel3-header"
        >
          <div className="flex gap-3 sm:text-lg md:text-[22px] font-medium md:font-normal text-blackish">
            Payout & Bank Details
          </div>
        </AccordionSummary>
        <AccordionDetails className="sm:text-lg flex flex-col gap-4">
          <p className="mb-2">
            Please enter your bank account information. You will receive a four-digit verification
            code via text message. Once you enter the code Troo will direct all payouts to the
            account.
          </p>
          <div className="flex items-center gap-2 mb-2">
            <TextField
              fullWidth
              value={formData.payoutBankDetails.accountNumber}
              onChange={handleInputChange("payoutBankDetails", "accountNumber")}
              disabled={!editMode.accountNumber}
              variant="outlined"
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "black",
                  },
                  "&:hover fieldset": {
                    borderColor: "black",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "black",
                  },
                },
              }}
              label="Account Number"
            />
            <IconButton onClick={() => handleEditClick("accountNumber")}>
              {editMode.accountNumber ? <SaveIcon /> : <EditIcon />}
            </IconButton>
          </div>
          <div className="flex items-center gap-2 mb-2">
            <TextField
              fullWidth
              value={formData.payoutBankDetails.accountName}
              onChange={handleInputChange("payoutBankDetails", "accountName")}
              disabled={!editMode.accountName}
              variant="outlined"
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "black",
                  },
                  "&:hover fieldset": {
                    borderColor: "black",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "black",
                  },
                },
              }}
              label="Account Name"
            />
            <IconButton onClick={() => handleEditClick("accountName")}>
              {editMode.accountName ? <SaveIcon /> : <EditIcon />}
            </IconButton>
          </div>
          <div className="flex items-center gap-2">
            <TextField
              fullWidth
              value={formData.payoutBankDetails.bankName}
              onChange={handleInputChange("payoutBankDetails", "bankName")}
              disabled={!editMode.bankName}
              variant="outlined"
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "black",
                  },
                  "&:hover fieldset": {
                    borderColor: "black",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "black",
                  },
                },
              }}
              label="Bank Name"
            />
            <IconButton onClick={() => handleEditClick("bankName")}>
              {editMode.bankName ? <SaveIcon /> : <EditIcon />}
            </IconButton>
          </div>
          <div className="flex items-center gap-2">
            <TextField
              fullWidth
              value={formData.payoutBankDetails.sortCode}
              onChange={handleInputChange("payoutBankDetails", "sortCode")}
              disabled={!editMode.sortCode}
              variant="outlined"
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "black",
                  },
                  "&:hover fieldset": {
                    borderColor: "black",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "black",
                  },
                },
              }}
              label="Sort Code"
            />
            <IconButton onClick={() => handleEditClick("sortCode")}>
              {editMode.sortCode ? <SaveIcon /> : <EditIcon />}
            </IconButton>
          </div>
          <div className="flex items-center gap-2">
            <TextField
              fullWidth
              value={formData.payoutBankDetails.bankCountry}
              onChange={handleInputChange("payoutBankDetails", "bankCountry")}
              disabled={!editMode.bankCountry}
              variant="outlined"
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "black",
                  },
                  "&:hover fieldset": {
                    borderColor: "black",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "black",
                  },
                },
              }}
              label="Country"
            />
            <IconButton onClick={() => handleEditClick("bankCountry")}>
              {editMode.bankCountry ? <SaveIcon /> : <EditIcon />}
            </IconButton>
          </div>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
