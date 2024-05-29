"use client";

import React, { useState } from "react";
import styles from "./TillTable.module.css";
import { AddCircleOutline, MoreVert, RemoveCircleOutline } from "@mui/icons-material";
import clsx from "clsx";
import { IconButton, ListItemText, Menu, MenuItem } from "@mui/material";
const TillTable = ({ items, incrementQty, decrementQty }: any) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th>Items</th>
          <th>Qty</th>
          <th>Price</th>
        </tr>
      </thead>
      <tbody>
        {items &&
          items.map((item: any) => (
            <tr key={item.id}>
              <td style={{ maxWidth: "100px" }}>
                <p>{item.name}</p>
              </td>
              <td>
                <RemoveCircleOutline
                  className={clsx("mr-2 cursor-pointer", item.qty === 0 && "text-gray-300")}
                  onClick={() => decrementQty(item.id)}
                />
                {item.qty}
                <AddCircleOutline
                  className={clsx("ml-2 cursor-pointer")}
                  onClick={() => incrementQty(item.id)}
                />
              </td>
              <td>{item.price}</td>
              <td>
                <div>
                  <IconButton onClick={handleClick}>
                    <MoreVert className="text-[#ADADB9] cursor-pointer" />
                  </IconButton>
                  <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                    anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                    transformOrigin={{ vertical: "top", horizontal: "right" }}
                    MenuListProps={{
                      sx: {
                        display: "flex",
                        flexDirection: "column",
                        gap: "12px",
                      },
                    }}
                    PaperProps={{
                      sx: {
                        borderRadius: "10px",
                        boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.05)", // Decreased opacity to 0.05
                      },
                    }}
                  >
                    <MenuItem
                      onClick={() => {
                        handleClose();
                      }}
                    >
                      <ListItemText primary="Void line" />
                    </MenuItem>
                    <MenuItem
                      onClick={() => {
                        handleClose();
                      }}
                    >
                      <ListItemText primary="Edit Price" />
                    </MenuItem>
                    <MenuItem onClick={handleClose}>
                      <ListItemText primary="Apply Discount" />
                    </MenuItem>
                  </Menu>
                </div>
              </td>
            </tr>
          ))}
      </tbody>
    </table>
  );
};

export default TillTable;
