import {
  AccountCircleOutlined,
  ChevronRight,
  LocationCityOutlined,
  Password,
} from "@mui/icons-material";
import React from "react";

interface SidebarProps {
  activeComponent: string;
  setActiveComponent: (component: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeComponent, setActiveComponent }) => {
  const isActive = (component: string) => activeComponent === component;

  return (
    <div className="w-64 min-h-screen bg-white py-2 px-0">
      <nav className="space-y-6 mt-0">
        <button
          onClick={() => setActiveComponent("pickup location")}
          className={`flex items-center justify-between py-3 px-2 rounded-lg w-full ${
            isActive("pickup location") ? "bg-[#EEEEF7]" : "hover:bg-gray-50"
          }`}
        >
          <span
            className={`${
              isActive("pickup location")
                ? "text-[#3E3C7F] font-medium"
                : "text-[#929292] font-normal"
            } text-[16px] leading-[24px] tracking-[0.5px]`}
          >
            PICKUP LOCATION
          </span>
          <ChevronRight
            className={`w-5 h-5 ${
              isActive("pickup location") ? "text-[#3E3C7F]" : "text-[#929292]"
            }`}
          />
        </button>
        <button
          onClick={() => setActiveComponent("delivery service")}
          className={`flex items-center justify-between py-3 px-2 rounded-lg w-full ${
            isActive("delivery service") ? "bg-[#EEEEF7]" : "hover:bg-gray-50"
          }`}
        >
          <span
            className={`${
              isActive("delivery service")
                ? "text-[#3E3C7F] font-medium"
                : "text-[#929292] font-normal"
            } text-[16px] leading-[24px] tracking-[0.5px]`}
          >
            DELIVERY
          </span>
          <ChevronRight
            className={`w-5 h-5 ${
              isActive("delivery service") ? "text-[#3E3C7F]" : "text-[#929292]"
            }`}
          />
        </button>
        <button
          onClick={() => setActiveComponent("your link")}
          className={`flex items-center justify-between py-3 px-2 rounded-lg w-full ${
            isActive("your link") ? "bg-[#EEEEF7]" : "hover:bg-gray-50"
          }`}
        >
          <span
            className={`${
              isActive("your link") ? "text-[#3E3C7F] font-medium" : "text-[#929292] font-normal"
            } text-[16px] leading-[24px] tracking-[0.5px]`}
          >
            YOUR LINK
          </span>
          <ChevronRight
            className={`w-5 h-5 ${isActive("your link") ? "text-[#3E3C7F]" : "text-[#929292]"}`}
          />
        </button>
      </nav>
    </div>
  );
};

export default Sidebar;
