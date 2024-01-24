import DashboardLayout from "./DashboardLayout";
import TopMenuNav from "./TopMenuNav";
import Tabs from "./Tabs";
import { useState } from "react";
import Modal from "../Modal";
import CustomInput from "../inputFields/CustomInput";
import CustomSelect from "../inputFields/CustomSelect";
import { Link } from "react-router-dom";
import CancelButton from "../buttons/CancelButton";

const ManageUsers: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [email, setEmail] = useState(false);
  const [selectedValue, setSelectedValue] = useState<string>("");

  const handleNewRoleClick = () => {
    console.log("New Role button clicked");
  };

  const handleInviteUserClick = () => {
    console.log("Invite User button clicked");
    setIsModalOpen(true);
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
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <div className="p-[56px] h-[656px] relative rounded-[20px] w-[800px]">
            <p className="text-[24px] mb-[20px] font-[500] leading-[36px] text-purple500">
              Invite user
            </p>
            <hr className=" border border-grey100" />

            <div className=" my-[40px]">
              <div className=" grid grid-cols-2 gap-[24px] text-[16px] font-[400] text-grey200">
                <CustomInput
                  type="text"
                  label="First Name"
                  value=""
                  error=""
                  onChange={(newValue) => setEmail(email)}
                />
                <CustomInput
                  type="text"
                  label="Last Name"
                  value=""
                  error=""
                  onChange={(newValue) => setEmail(email)}
                />
                <CustomInput
                  type="email"
                  label="Email address"
                  value=""
                  error=""
                  onChange={(newValue) => setEmail(email)}
                />
                <CustomInput
                  type="text"
                  label="Mobile number"
                  value=""
                  error=""
                  onChange={(newValue) => setEmail(email)}
                />
                <CustomInput
                  type="text"
                  label="Pin code"
                  value=""
                  error=""
                  maxLength={4}
                  onChange={(newValue) => setEmail(email)}
                />
                <CustomInput
                  type="password"
                  label="Password"
                  value=""
                  error=""
                  onChange={(newValue) => setEmail(email)}
                />
                <CustomSelect
                  label=""
                  options={[
                    "Manager",
                    "Utility personnel",
                    "Kitchen staff",
                    "Supply",
                    "Account",
                    "Server",
                  ]}
                  value={selectedValue}
                  onChange={(value) => setSelectedValue(value)}
                  disabledOption="User Role"
                />
                <CustomSelect
                  label=""
                  options={["Full time", "Part time", "Contract"]}
                  value={selectedValue}
                  onChange={(value) => setSelectedValue(value)}
                  disabledOption="Employee type"
                />

                <CustomInput
                  type="text"
                  label="Department"
                  value=""
                  error=""
                  onChange={(newValue) => setEmail(email)}
                />
              </div>
            </div>

            <hr className=" border border-grey100" />
            <div className=" flex justify-end items-center mt-[24px] gap-2">
              <div
                className="border cursor-pointer border-purple500 rounded px-[24px] py-[13px] font-[600] text-purple500"
                onClick={() => setIsModalOpen(false)}
              >
                <CancelButton text="Cancel" />
              </div>

              <div className="border border-purple500 bg-purple500 rounded px-[24px] py-[13px] font-[500] text-[#ffffff]">
                <Link to="/">
                  <button className=" text-[16px]">Send invite</button>
                </Link>
              </div>
            </div>
          </div>
        </Modal>
      </DashboardLayout>
    </div>
  );
};

export default ManageUsers;
