import React, { useState } from "react";
import DashboardLayout from "./DashboardLayout";
import TopMenuNav from "./TopMenuNav";
import { AppDispatch } from "@/src/store/store";
import { useDispatch } from "react-redux";
import DeliveryService from "../onlineOrdering/DeliveryService";
import PickupLocation from "../onlineOrdering/PickupLocation";
import YourLink from "../onlineOrdering/YourLink";
import Sidebar from "../onlineOrdering/Sidebar";

const OnlineOrdering = () => {
  // const dispatch = useDispatch<AppDispatch>();
  const [activeComponent, setActiveComponent] = useState("pickup location");

  const renderActiveComponent = () => {
    switch (activeComponent) {
      case "pickup location":
        return <PickupLocation />;
      case "delivery service":
        return <DeliveryService />;
      case "your link":
        return <YourLink />;
      default:
        return <PickupLocation />;
    }
  };

  return (
    <DashboardLayout>
      <TopMenuNav pathName="Online Ordering" />
      <div className="mt-6">
        <div className="flex">
          <Sidebar activeComponent={activeComponent} setActiveComponent={setActiveComponent} />
          <div className="w-full px-4 mt-4">{renderActiveComponent()}</div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default OnlineOrdering;
