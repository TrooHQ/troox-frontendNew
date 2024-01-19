import React from "react";
import Sidebar from "./Sidebar";
import TopMenuNav from "./TopMenuNav";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  return (
    <div className=" bg-[#5955B3]">
      <div className="flex h-screen">
        <Sidebar userType="user" />

        <div className="flex-1 m-5 flex flex-col overflow-hidden">
          <div className="container mx-auto px-6 py-8 bg-white rounded-2xl">
            <TopMenuNav />
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
