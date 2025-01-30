import { Switch, Modal, Box, Typography, IconButton } from "@mui/material";
import clsx from "clsx";
import { useState } from "react";
import CustomSelect5 from "../inputFields/CustomSelect5";
import CustomInput from "../inputFields/CustomInput";
import KantaButton from "../buttons/KantaButton";
import { Close, CheckCircle } from "@mui/icons-material";
import { FaPlus } from "react-icons/fa6";
import DeliveryTable from "./DeliveryTable";

const branches = [
  {
    state: "Lagos",
    fixedPrice: 50000,
    supportLink: "vi@kitchenexpress.com",
  },
  {
    state: "Lagos",
    fixedPrice: 50000,
    supportLink: "alimosho@chickenrepublic.com",
  },
  {
    state: "Lagos",
    fixedPrice: 50000,
    supportLink: "ajah@chickenrepublic.com",
  },
  {
    state: "Lagos",
    fixedPrice: 50000,
    supportLink: "egbeda@chickenrepublic.com",
  },
  {
    state: "Lagos",
    fixedPrice: 50000,
    supportLink: "ikeja@chickenrepublic.com",
  },
  {
    state: "Abuja",
    fixedPrice: 50000,
    supportLink: "ikoyi@chickenrepublic.com",
  },
];

const stateOptions = [
  { label: "Lagos", value: "lagos" },
  { label: "Abia", value: "abia" },
  { label: "Abuja", value: "abuja" },
  { label: "Oyo", value: "oyo" },
  { label: "Kano", value: "kano" },
];

const localGovernmentOptions = [
  { label: "Ikeja", value: "ikeja" },
  { label: "Lekki", value: "lekki" },
  { label: "Ajah", value: "ajah" },
  { label: "Surulere", value: "surulere" },
  { label: "Yaba", value: "yaba" },
];

const supportLinkOptions = [
  { label: "Live chat", value: "live chat" },
  { label: "Normal link", value: "normal link" },
];

const PickupLocation = () => {
  const [isPickupEnabled, setIsPickupEnabled] = useState(false);
  const [selectedState, setSelectedState] = useState("");
  const [selectedLocalGovernment, setSelectedLocalGovernment] = useState("");
  const [fixedPrice, setFixedPrice] = useState("");
  const [supportLink, setSupportLink] = useState("");
  const [link, setLink] = useState("");
  const [open, setOpen] = useState(false);
  const [state, setState] = useState({
    createLocation: false,
    showLocation: true,
  });

  const handleToggleChange = () => {
    setIsPickupEnabled((prev) => !prev);
  };

  const handleStateChange = (value: string) => {
    setSelectedState(value);
  };

  const handleLocalGovernmentChange = (value: string) => {
    setSelectedLocalGovernment(value);
  };

  const handleSupportLinkChange = (value: string) => {
    setSupportLink(value);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setState({
      createLocation: false,
      showLocation: true,
    });
  };

  const handleCreateLocation = () => {
    setState({
      createLocation: true,
      showLocation: false,
    });
  };

  return (
    <div>
      {state.showLocation && (
        <div className="flex justify-end mb-4">
          <button
            className="border border-purple500 bg-purple500 w-fit rounded-[5px] px-[24px] py-[10px] font-[500] text-[#ffffff]"
            onClick={handleCreateLocation}
          >
            Add New address
          </button>
        </div>
      )}

      {state.showLocation && branches.length === 0 ? (
        <div className="flex flex-col gap-6 items-center justify-center h-full w-full mt-[-100px]">
          <p>No location has been set yet</p>
          <div className="border border-purple500 bg-white w-fit rounded-[5px] px-[24px] py-[10px] font-[500] text-purple500">
            <button
              className="text-[16px] flex items-center gap-[8px]"
              onClick={handleCreateLocation}
            >
              <FaPlus className="w-5 h-5 text-purple500" />
              Add new location
            </button>
          </div>
        </div>
      ) : state.showLocation && branches.length > 0 ? (
        <DeliveryTable branches={branches} />
      ) : state.createLocation ? (
        <div className="">
          <div className="flex items-center g-2.5">
            <span className="text-[#121212] text-base font-normal">
              Do you want to offer delivery service?
            </span>
            <Switch
              checked={isPickupEnabled}
              onChange={handleToggleChange}
              color="primary"
              style={{ color: isPickupEnabled ? "#5855B3" : "#929292" }}
            />
            <span
              className={clsx({
                "text-[#5855B3]": isPickupEnabled,
                "text-[#929292]": !isPickupEnabled,
                "text-base font-medium": true,
              })}
            >
              {isPickupEnabled ? "Enabled" : "Disabled"}
            </span>
          </div>

          {isPickupEnabled && (
            <div className="mt-5 pr-[40%]">
              <form className="space-y-6">
                <CustomSelect5
                  label="Select a state"
                  options={stateOptions}
                  value={selectedState}
                  onChange={handleStateChange}
                />
                <CustomSelect5
                  label="Select LGA/Region"
                  options={localGovernmentOptions}
                  value={selectedLocalGovernment}
                  onChange={handleLocalGovernmentChange}
                />
                <CustomInput
                  type="text"
                  label="Enter your fixed price"
                  value={fixedPrice}
                  onChange={(newValue) => setFixedPrice(newValue)}
                  className="border-gray-500"
                />
                <CustomSelect5
                  label="Add your support link to your profile (Optional)"
                  options={supportLinkOptions}
                  value={supportLink}
                  onChange={handleSupportLinkChange}
                />
                <CustomInput
                  type="text"
                  label="Your Link (WhatsApp, Instagram, Facebook)"
                  value={link}
                  onChange={(newValue) => setLink(newValue)}
                  className="border-gray-500"
                />

                <KantaButton text="Save changes" buttonType="button" onClick={handleOpen} />
              </form>
            </div>
          )}

          <Modal open={open} onClose={handleClose}>
            <Box
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: 400,
                bgcolor: "background.paper",
                boxShadow: 24,
                p: 4,
                borderRadius: 2,
              }}
            >
              <IconButton
                aria-label="close"
                onClick={handleClose}
                sx={{
                  position: "absolute",
                  right: 8,
                  top: 8,
                  color: (theme) => theme.palette.grey[500],
                }}
              >
                <Close />
              </IconButton>
              <Box display="flex" flexDirection="column" alignItems="center">
                <CheckCircle sx={{ fontSize: 60, color: "green" }} />
                <Typography variant="h6" sx={{ mt: 2 }}>
                  Updaated!
                </Typography>
                <Typography variant="body1" sx={{ mt: 1, textAlign: "center" }}>
                  Your delivery location has been published successfully.
                </Typography>
              </Box>
            </Box>
          </Modal>
        </div>
      ) : null}
    </div>
  );
};

export default PickupLocation;
