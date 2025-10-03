import React, { useState } from "react";
import { Link } from "react-router-dom";
import Roles from "./Roles";
import Users from "./Users";

interface TabsProps {
  tabs: string[];
  onNewRoleClick: () => void;
  onInviteUserClick: () => void;
}

const Tabs: React.FC<TabsProps> = ({
  tabs,
  onNewRoleClick,
  onInviteUserClick,
}) => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (index: number) => {
    setActiveTab(index);
  };

  return (
    <div className="">
      <div className="flex justify-between items-center border-b border-grey100 my-10">
        <div className="flex items-center gap-10">
          {tabs.map((tab, index) => (
            <p
              key={index}
              className={` text-[22px] px-3 py-2 font-GeneralSans  cursor-pointer ${index === activeTab
                ? " text-black font-[500] border-b-4 border-b-[#121212]"
                : "text-grey300"
                }`}
              onClick={() => handleTabChange(index)}
            >
              {tab}
            </p>
          ))}
        </div>
        <div className="border-2 borderblack bg-black rounded px-[16px] py-[8px] font-[500] text-[14px] text-[#ffffff]">
          <Link to={`${activeTab === 0 && "/new-roles"}`}>
            <button
              className=""
              onClick={activeTab === 0 ? onNewRoleClick : onInviteUserClick}
            >
              {activeTab === 0 && "New Role"}
            </button>
          </Link>
          <button
            className=""
            onClick={activeTab === 0 ? onNewRoleClick : onInviteUserClick}
          >
            {activeTab === 1 && "Invite User"}
          </button>
        </div>
      </div>
      {activeTab === 0 && <Roles />}
      {activeTab === 1 && <Users />}
    </div>
  );
};

export default Tabs;
