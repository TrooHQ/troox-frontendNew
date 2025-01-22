import { Switch, Modal, Box, Typography, IconButton } from "@mui/material";
import clsx from "clsx";
import { useState } from "react";
import CustomSelect5 from "../inputFields/CustomSelect5";
import CustomInput from "../inputFields/CustomInput";
import KantaButton from "../buttons/KantaButton";
import { Close, CheckCircle } from "@mui/icons-material";

const stateOptions = [
  { label: "Lagos", value: "lagos" },
  { label: "Abia", value: "abia" },
  { label: "Abuja", value: "abuja" },
  { label: "Oyo", value: "oyo" },
  { label: "Kano", value: "kano" },
];

const supportLinkOptions = [
  { label: "Live chat", value: "live chat" },
  { label: "Normal link", value: "normal link" },
];

const PickupLocation = () => {
  const [isPickupEnabled, setIsPickupEnabled] = useState(false);
  const [selectedState, setSelectedState] = useState("");
  const [address, setAddress] = useState("");
  const [supportLink, setSupportLink] = useState("");
  const [link, setLink] = useState("");
  const [open, setOpen] = useState(false);

  const handleToggleChange = () => {
    setIsPickupEnabled((prev) => !prev);
  };

  const handleStateChange = (value: string) => {
    setSelectedState(value);
  };

  const handleSupportLinkChange = (value: string) => {
    setSupportLink(value);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className="">
      <div className="flex items-center g-2.5">
        <span className="text-[#121212] text-base font-normal">
          Do you want to offer pickup service?
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
        <div style={{ marginTop: "20px" }}>
          <form className="space-y-6">
            <CustomSelect5
              label="Select a state"
              options={stateOptions}
              value={selectedState}
              onChange={handleStateChange}
            />
            <CustomInput
              type="text"
              label="What is your pickup address?"
              value={address}
              onChange={(newValue) => setAddress(newValue)}
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

            <KantaButton text="Add Location" buttonType="button" onClick={handleOpen} />
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
              Success!
            </Typography>
            <Typography variant="body1" sx={{ mt: 1 }}>
              Location added successfully.
            </Typography>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};

export default PickupLocation;
