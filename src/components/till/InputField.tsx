"use client";
import React, { useState } from "react";
import { Close, QrCodeScanner, Search } from "@mui/icons-material";
import { Drawer, InputAdornment, TextField } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import KantaLogo from "../common/KantaLogo";
import KantaLogo2 from "../common/KantaLogo2";
import styles from "@/components/till/Till.module.css";
import { menuItems } from "./TillSidebar";
import MenuLink from "./MenuLink";
import ToggleButton from "./ToggleButton";
import UserInformation from "./UserInformation";

const InputField = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const storeName = "God is Good Stores";

  return (
    <div>
      <Drawer anchor="left" open={isSidebarOpen} onClose={() => setSidebarOpen(false)}>
        <div className="pt-6 pl-4 pr-6 flex flex-col gap-4" style={{ width: "75vw" }}>
          <div className="flex justify-between items-center">
            <KantaLogo2 />
            <Close
              className="cursor-pointer text-[#858497]"
              onClick={() => setSidebarOpen(false)}
            />
          </div>
          <hr className="bg-[#E7E7E7] mb-2" />
          <div className={styles.storeName}>{storeName}</div>
          <hr className="bg-[#E7E7E7] mb-2" />
          <ul className={styles.list}>
            {menuItems.map((cat) => (
              <li key={cat.title}>
                <span className={styles.cat}>{cat.title}</span>
                {cat.list.map((item) => (
                  <MenuLink item={item} key={item.title} />
                ))}
              </li>
            ))}
          </ul>
          <div className="absolute bottom-0 w-full">
            <hr className="bg-[#E7E7E7] mb-8" />
            <ToggleButton />
            <hr className="bg-[#E7E7E7] mt-8 mb-0" />

            <UserInformation />
          </div>
        </div>
      </Drawer>
      <div className="sm:flex hidden items-center gap-8 ml-3">
        <div style={{ flexGrow: 1 }}>
          <TextField
            fullWidth
            variant="standard"
            placeholder="Search"
            sx={{
              borderRadius: "100px",
              border: "1px solid var(--Kanta-Neutral-300, #ADADB9)",
              padding: "8px 24px",
              "& .MuiInput-root:before": {
                border: "none !important",
              },
              "& .MuiInput-root:hover::before": {
                border: "none !important",
              },
              "& .MuiInput-root.Mui-focused::after": {
                border: "none !important",
              },
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
            }}
          />
        </div>
        <QrCodeScanner className="text-[#858497] h-8 w-8" />
      </div>
      <div className="flex flex-col sm:hidden">
        <div className="flex justify-between items-center px-4 mb-6">
          <MenuIcon className="cursor-pointer" onClick={() => setSidebarOpen(true)} />
          <QrCodeScanner className="text-[#858497] h-6 w-6" />
        </div>
        <div className="px-4">
          <TextField
            fullWidth
            variant="standard"
            placeholder="Search for a product"
            sx={{
              borderRadius: "100px",
              border: "1px solid var(--Kanta-Neutral-300, #ADADB9)",
              padding: "4px 16px",
              "& .MuiInput-root:before": {
                border: "none !important",
              },
              "& .MuiInput-root:hover::before": {
                border: "none !important",
              },
              "& .MuiInput-root.Mui-focused::after": {
                border: "none !important",
              },
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search className="h-4 w-4" />
                </InputAdornment>
              ),
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default InputField;
