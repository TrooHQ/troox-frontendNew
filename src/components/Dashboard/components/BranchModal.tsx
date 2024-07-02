import React, { SetStateAction, useState } from "react";
import CustomInput from "../../inputFields/CustomInput";
import Modal from "../../Modal";
import { toast } from "react-toastify";

const BranchModal = ({ isModalOpen, setIsModalOpen }: any) => {
  const [branchName, setBranchName] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const handleInputChange = (field: string, value: SetStateAction<string>) => {
    switch (field) {
      case "branchName":
        setBranchName(value);
        break;
      case "address":
        setAddress(value);
        break;
      case "email":
        setEmail(value);
        break;
      case "city":
        setCity(value);
        break;
      case "phoneNumber":
        setPhoneNumber(value);
        break;
      default:
        break;
    }
  };
  return (
    <div>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className="py-[28px] 2xl:py-[36px] px-[28px] 2xl:px-[51px] bg-white relative rounded-[20px] w-[539px]">
          <button
            onClick={() => setIsModalOpen(false)}
            style={{
              position: "absolute",
              top: "20px",
              right: "28px",
              background: "none",
              border: "none",
            }}
            aria-label="Close"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6 6L18 18"
                stroke="black"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M6 18L18 6"
                stroke="black"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <p className="text-[24px] pb-[24px] font-[500] leading-[36px] text-black">New Branch</p>
          <div className="grid gap-[32px] text-[16px] font-[400] text-grey200">
            <CustomInput
              label="Branch Name"
              type="text"
              value={branchName}
              onChange={(value) => handleInputChange("branchName", value)}
            />
            <CustomInput
              label="Address"
              type="text"
              value={address}
              onChange={(value) => handleInputChange("address", value)}
            />
            <CustomInput
              label="Email"
              type="email"
              value={email}
              onChange={(value) => handleInputChange("email", value)}
            />
            <CustomInput
              label="City"
              type="text"
              value={city}
              onChange={(value) => handleInputChange("city", value)}
            />
            <CustomInput
              label="Phone Number"
              type="tel"
              value={phoneNumber}
              onChange={(value) => handleInputChange("phoneNumber", value)}
            />
          </div>
          <button
            style={{
              backgroundColor: "#5955b3",
              color: "white",
              width: "100%",
              padding: "10px 0",
              marginTop: "32px",
              borderRadius: "5px",
            }}
            onClick={() => {
              setIsModalOpen(false);
              toast.success("Modal created successfully");
            }}
          >
            Create New Branch
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default BranchModal;
