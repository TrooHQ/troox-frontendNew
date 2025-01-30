import React, { useState } from "react";
import { IconButton, Menu, MenuItem } from "@mui/material";
import { MoreVert } from "@mui/icons-material";

interface LocationTableProps {
  branches: {
    state: string;
    address: string;
    supportLink: string;
  }[];
}

const LocationTable: React.FC<LocationTableProps> = ({ branches }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <div className="overflow-x-auto mt-6">
        <table className="min-w-full border-collapse">
          <thead>
            <tr className="bg-[#606060] text-white text-center text-base font-normal">
              <th className="py-2 px-4 text-base font-normal min-w-[100px]">State</th>
              <th className="py-2 px-4 text-base font-normal">Address</th>
              <th className="py-2 px-4 text-base font-normal">Support link</th>
              <th className="py-2 px-4 text-base font-normal">Actions</th>
            </tr>
          </thead>

          <hr className="mb-2 text-[#E7E7E7]" />

          <tbody>
            {branches.map((branch, index) => (
              <tr key={index} className={`${index % 2 === 1 ? "bg-[#ffffff]" : "bg-[#F8F8F8]"}`}>
                <td className="text-base font-medium py-2 px-4">{branch.state}</td>
                <td className="text-base py-2 px-4 break-words font-medium">{branch.address}</td>
                <td className="text-base py-2 px-4 break-words font-medium text-center">
                  {branch.supportLink}
                </td>
                <td className="text-center">
                  <IconButton aria-label="more" onClick={handleMenuOpen}>
                    <MoreVert />
                  </IconButton>
                  <Menu
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleMenuClose}
                  >
                    <MenuItem onClick={handleMenuClose}>View</MenuItem>
                    <MenuItem onClick={handleMenuClose}>Edit</MenuItem>
                  </Menu>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LocationTable;
