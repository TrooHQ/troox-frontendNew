import { Switch, Modal, Box, Typography, IconButton } from "@mui/material";
import clsx from "clsx";
import { useState } from "react";
import CustomSelect5 from "../inputFields/CustomSelect5";
import CustomInput from "../inputFields/CustomInput";
import { Close, CheckCircle, Clear } from "@mui/icons-material";
import LocationTable from "./LocationTable";
import { FaPlus } from "react-icons/fa6";

// const branches = [];
const branches = [
  {
    state: "Lagos",
    address: "17, Milly Huston, Victoria Island",
    supportLink: "vi@kitchenexpress.com",
  },
  {
    state: "Lagos",
    address: "18 Alimosho Busstop, Alimosho",
    supportLink: "alimosho@chickenrepublic.com",
  },
  {
    state: "Lagos",
    address: "23 Ajah Busstop, Ajah",
    supportLink: "ajah@chickenrepublic.com",
  },
  {
    state: "Lagos",
    address: "Egbeda Roundabout Busstop, Egbeda",
    supportLink: "egbeda@chickenrepublic.com",
  },
  {
    state: "Lagos",
    address: "123 Ikeja GRA, Ikeja",
    supportLink: "ikeja@chickenrepublic.com",
  },
  {
    state: "Abuja",
    address: "12 Falomo Busstop, Ikoyi",
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

const PickupLocation = () => {
  const [isPickupEnabled, setIsPickupEnabled] = useState(false);
  const [selectedState, setSelectedState] = useState("");
  const [addresses, setAddresses] = useState([
    "17, Milly Huston, Victoria Island",
  ]);
  const [supportLink, setSupportLink] = useState("");
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

  const addAddressField = () => {
    setAddresses([...addresses, ""]);
  };

  const removeAddressField = (index: number) => {
    setAddresses(addresses.filter((_, i) => i !== index));
  };

  const handleAddressChange = (index: number, value: string) => {
    const newAddresses = [...addresses];
    newAddresses[index] = value;
    setAddresses(newAddresses);
  };

  return (
    <div className="h-full">
      {state.showLocation && (
        <div className="flex justify-end mb-4">
          <button
            className="border border-[#0d0d0d] bg-[#0d0d0d] w-fit rounded-[5px] px-[24px] py-[10px] font-[500] text-[#ffffff]"
            onClick={handleCreateLocation}
          >
            Add New Location
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
        <LocationTable branches={branches} />
      ) : state.createLocation ? (
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
            <div className="mt-[80px] w-[60%] m-auto">
              <form className="space-y-6">
                <CustomSelect5
                  label="Select a state"
                  options={stateOptions}
                  value={selectedState}
                  onChange={handleStateChange}
                />
                {addresses.map((address, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <CustomInput
                      type="text"
                      label="What is your pickup address?"
                      value={address}
                      onChange={(newValue) =>
                        handleAddressChange(index, newValue)
                      }
                      className="border-gray-500"
                      fullWidth
                    />
                    {index > 0 && (
                      <IconButton
                        onClick={() => removeAddressField(index)}
                        className="w-[5%] min-w-[24px] h-[24px]"
                      >
                        <Clear className="text-[#f03f3f]" fontSize="small" />
                      </IconButton>
                    )}
                  </div>
                ))}

                <button
                  type="button"
                  className="border border-[#0d0d0d] text-[#0d0d0d] w-fit rounded-[5px] px-[24px] py-[10px] font-[500] bg-[#ffffff]"
                  onClick={addAddressField}
                >
                  Add more addresses
                </button>

                <CustomInput
                  type="text"
                  label="Add your support link to your profile (Optional) WhatsApp, Instagram)"
                  value={supportLink}
                  onChange={(newValue) => setSupportLink(newValue)}
                  className="border-gray-500"
                />

                <button
                  type="button"
                  className="bg-[#0d0d0d] text-center text-white py-3 px-4 rounded"
                  onClick={handleOpen}
                >
                  Add Location
                </button>
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
                  Added
                </Typography>
                <Typography variant="body1" sx={{ mt: 1, textAlign: "center" }}>
                  Your pickup location has been published successfully.
                </Typography>
                <button
                  type="button"
                  className="border border-[#0d0d0d] text-[#0d0d0d] w-fit rounded-[5px] px-[24px] py-[10px] font-[500] mt-6 bg-[#ffffff]"
                  onClick={handleClose}
                >
                  View pickup location
                </button>
              </Box>
            </Box>
          </Modal>
        </div>
      ) : null}
    </div>
  );
};

export default PickupLocation;
