// ModalComponent.tsx
import React from "react";
import Modal from "@mui/material/Modal";
import { Box, IconButton } from "@mui/material";
import { Close } from "@mui/icons-material";

interface ModalProps {
  open: boolean;
  handleClose: () => void;
  children: React.ReactNode;
}

const ModalComponent: React.FC<ModalProps> = ({ open, handleClose, children }) => {
  const style = {
    position: "absolute",
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

  return (
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
          <Close />
        </IconButton>
        {children}
      </Box>
    </Modal>
  );
};

export default ModalComponent;
