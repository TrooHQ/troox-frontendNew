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
          className={`flex items-center py-3 px-2 rounded-lg ${
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
          onClick={() => setActiveComponent("branch")}
          className={`flex items-center space-x-3 p-3 rounded-lg ${
            isActive("branch") ? "bg-gray-100" : "hover:bg-gray-50"
          }`}
        >
          <LocationCityOutlined
            className={`w-5 h-5 ${isActive("branch") ? "text-[#121212]" : "text-[#929292]"}`}
          />
          <span
            className={`${
              isActive("branch") ? "text-[#121212] font-medium" : "text-[#929292] font-normal"
            } text-[16px] leading-[24px] tracking-[0.5px]`}
          >
            Branch Details
          </span>
        </button>
        <button
          onClick={() => setActiveComponent("security")}
          className={`flex items-center space-x-3 p-3 rounded-lg ${
            isActive("security") ? "bg-gray-100" : "hover:bg-gray-50"
          }`}
        >
          <Password
            className={`w-5 h-5 ${isActive("security") ? "text-[#121212]" : "text-[#929292]"}`}
          />
          <span
            className={`${
              isActive("security") ? "text-[#121212] font-medium" : "text-[#929292] font-normal"
            } text-[16px] leading-[24px] tracking-[0.5px]`}
          >
            Password & Pin
          </span>
        </button>
      </nav>
    </div>
  );
};

export default Sidebar;
