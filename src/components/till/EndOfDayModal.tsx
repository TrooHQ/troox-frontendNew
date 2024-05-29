import React from "react";
import Modal from "@mui/material/Modal";
import { Box, IconButton } from "@mui/material";
import { Close } from "@mui/icons-material";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "90%",
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: 4,
  p: 1,
  pt: 5,
  "@media (min-width:600px)": {
    width: "40%",
    minHeight: "30%",
    p: 0,
    borderRadius: 4,
  },
};

interface EODProps {
  handleOpen: any;
  open: any;
  setOpen: any;
}

const EndOfDayModal: React.FC<EODProps> = ({ handleOpen, open, setOpen }) => {
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      {" "}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              cursor: "pointer",
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <Close />{" "}
          </IconButton>

          <div className="w-full text-center mt-10 px-[60px]">
            <h3 className="text-[#201f44] text-[23px] font-normal">End of Day Summary</h3>
            <span className="text-[#201f44] text-[16px] font-light">
              Monday 29 April, 2024 - 20:15 PM
            </span>
            <hr className="h-[1px] mt-8 mb-5 text-[#D4D9D9]" />
            <h2 className="text-[#5855B3] text-[23px] font-normal">Total Sale: ₦ 1,500,00.00</h2>
            <hr className="h-[1px] mt-5 mb-6 text-[#D4D9D9]" />
            <div className="flex gap-4 flex-col items-center justify-center">
              <h5 className="text-lg font-normal text-[#201f44]">Cash: ₦ 200,000.00</h5>
              <h5 className="text-lg font-normal text-[#201f44]">Card: ₦ 1,000,000.00</h5>
              <h5 className="text-lg font-normal text-[#201f44]">Bank Transfer: ₦ 300,000.00</h5>
            </div>
            <div className="flex gap-4 items-center justify-center mt-8 mb-10">
              <button
                onClick={handleClose}
                className="py-2 px-6 rounded-[4px] border border-[#5855B3] cursor-pointer text-[#5855B3] text-sm font-normal"
              >
                Close
              </button>
              <button className="py-2 px-6 rounded-[4px] bg-[#5855B3] cursor-pointer text-sm font-normal text-white">
                Post
              </button>
            </div>{" "}
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default EndOfDayModal;
