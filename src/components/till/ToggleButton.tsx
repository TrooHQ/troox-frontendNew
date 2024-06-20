"use client";

import { ToggleOff, ToggleOn } from "@mui/icons-material";
import clsx from "clsx";
import React, { useState } from "react";

const ToggleButton = () => {
  const [isOnline, setIsOnline] = useState(true);

  const toggleOnlineStatus = () => {
    setIsOnline(!isOnline);
  };

  return (
    <div className="flex gap-1 items-center">
      <div onClick={toggleOnlineStatus} className="transition-colors duration-500">
        {isOnline ? (
          <ToggleOn className="h-[60px] w-[60px] cursor-pointer text-[#5855B3]" />
        ) : (
          <ToggleOff className="h-[60px] w-[60px] cursor-pointer text-[#929292]" />
        )}
      </div>
      <span
        className={clsx(" text-base font-normal", {
          "text-[#5855B3]": isOnline,
          "text-[#929292]": !isOnline,
        })}
      >
        {isOnline ? "Online" : "Offline"}
      </span>
    </div>
  );
};

export default ToggleButton;
