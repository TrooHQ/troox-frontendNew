import React, { useState } from "react";
import { IconButton, Menu, MenuItem } from "@mui/material";
import { MoreVert } from "@mui/icons-material";
import Modal from "../Modal";
import Close from "../../assets/CloseIcon.svg";
import DeleteAlert from "../../assets/mdi_delete.png";

interface LocationTableProps {
  branches: {
    state: string;
    address: string;
    supportLink: string;
  }[];
}

const LocationTable: React.FC<LocationTableProps> = ({ branches }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBranch, setSelectedBranch] = useState<number | null>(null);

  const handleMenuOpen = (
    event: React.MouseEvent<HTMLElement>,
    index: number
  ) => {
    setAnchorEl(event.currentTarget);
    setSelectedBranch(index);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleDeleteClick = () => {
    setIsModalOpen(true);
    handleMenuClose();
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedBranch(null);
  };

  const handleConfirmDelete = () => {
    console.log("Deleted branch:", selectedBranch);
    handleCloseModal();
  };

  return (
    <div>
      <div className="overflow-x-auto mt-6">
        <table className="min-w-full border-collapse">
          <thead>
            <tr className="bg-[#606060] text-white text-center text-base font-normal">
              <th className="py-2 px-4 text-base font-normal min-w-[100px]">
                State
              </th>
              <th className="py-2 px-4 text-base font-normal">Address</th>
              <th className="py-2 px-4 text-base font-normal">Support link</th>
              <th className="py-2 px-4 text-base font-normal">Actions</th>
            </tr>
          </thead>

          <hr className="mb-2 text-[#E7E7E7]" />

          <tbody>
            {branches.map((branch, index) => (
              <tr
                key={index}
                className={`${
                  index % 2 === 1 ? "bg-[#ffffff]" : "bg-[#F8F8F8]"
                }`}
              >
                <td className="text-base font-normal py-2 px-4">
                  {branch.state}
                </td>
                <td className="text-base py-2 px-4 break-words font-normal">
                  {branch.address}
                </td>
                <td className="text-base py-2 px-4 break-words font-normal text-center">
                  {branch.supportLink}
                </td>
                <td className="text-center">
                  <IconButton
                    aria-label="more"
                    onClick={(e) => handleMenuOpen(e, index)}
                  >
                    <MoreVert />
                  </IconButton>
                  <Menu
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleMenuClose}
                  >
                    <MenuItem onClick={handleMenuClose}>Edit</MenuItem>
                    <MenuItem onClick={handleDeleteClick}>Delete</MenuItem>
                  </Menu>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <div className="py-[28px] 2xl:py-[36px] px-[28px] 2xl:px-[51px] bg-white relative rounded-[20px] w-[539px]">
          <div
            className="flex items-center justify-end cursor-pointer"
            onClick={handleCloseModal}
          >
            <img src={Close} alt="Close" />
          </div>
          <div className="flex flex-col justify-center items-center gap-6">
            <img src={DeleteAlert} alt="Close" className="w-[64px] h-[64px]" />
            <p className="text-[16px] font-[400] text-grey500">
              Are you sure you want to delete this?
            </p>
            <div className="flex items-center justify-center gap-4 mt-5">
              <button
                className="border cursor-pointer border-[#090909] rounded px-[24px] py-[10px] font-[600] text-[#090909]"
                onClick={handleCloseModal}
              >
                No
              </button>
              <button
                className="border border-[#090909] bg-[#090909] rounded px-[24px] py-[10px] font-[500] text-white"
                onClick={handleConfirmDelete}
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default LocationTable;
