import React from "react";
import Sidebar from "./Sidebar";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  return (
    <div className=" bg-[#5955B3]">
      <div className="flex max-h-full">
        <Sidebar userType="user" />
        <div className="flex-1 m-5 flex flex-col overflow-hidden">
          <div className="container mx-auto px-6 py-8 bg-white rounded-2xl">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
