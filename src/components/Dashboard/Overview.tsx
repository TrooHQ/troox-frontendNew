import React from "react";
import DashboardLayout from "./DashboardLayout";
import TopMenuNav from "./TopMenuNav";

const Overview: React.FC = () => {
  return (
    <div className="">
      <DashboardLayout>
        <TopMenuNav pathName="Overview" />
        <div className=" my-10">Overview</div>
      </DashboardLayout>
    </div>
  );
};

export default Overview;
