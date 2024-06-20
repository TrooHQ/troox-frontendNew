// Dashboard.js
import React, { useState } from "react";
import Sidebar from "./TillSidebar";
import Body from "./TillBody";

const TillDashboard = () => {
  const fetchedMenuItems = [
    {
      id: 1,
      title: "Main Floor",
      link: "/till/main-floor",
      num: 10,
    },
    {
      id: 2,
      title: "Curbside",
      link: "/till/curbside",
      num: 5,
    },
    {
      id: 3,
      title: "Oceanview",
      link: "/till/oceanview",
      num: 6,
    },
  ];

  const [selectedItem, setSelectedItem] = useState(null);

  const handleItemClick = (item: any) => {
    setSelectedItem(item);
  };

  return (
    <div className="flex w-full">
      <Sidebar menuItems={fetchedMenuItems} onItemClick={handleItemClick} />
      <Body selectedItem={selectedItem} />
    </div>
  );
};

export default TillDashboard;
