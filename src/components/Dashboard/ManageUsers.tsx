import React from "react";
import DashboardLayout from "./DashboardLayout";
import TopMenuNav from "./TopMenuNav";
import Tabs from "./Tabs";

const ManageUsers: React.FC = () => {
  const handleNewRoleClick = () => {
    console.log("New Role button clicked");
  };

  const handleInviteUserClick = () => {
    console.log("Invite User button clicked");
  };

  return (
    <div className="">
      <DashboardLayout>
        <TopMenuNav pathName="Manage Users" />
        <Tabs
          tabs={["Roles", "All Users"]}
          onNewRoleClick={handleNewRoleClick}
          onInviteUserClick={handleInviteUserClick}
        />
      </DashboardLayout>
    </div>
  );
};

export default ManageUsers;
