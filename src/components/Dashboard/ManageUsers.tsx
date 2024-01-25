import DashboardLayout from "./DashboardLayout";
import TopMenuNav from "./TopMenuNav";
import Tabs from "./Tabs";
import { useState } from "react";
import Modal from "../Modal";
import CustomInput from "../inputFields/CustomInput";
import CustomSelect from "../inputFields/CustomSelect";
import CancelButton from "../buttons/CancelButton";
import { useDispatch, useSelector } from "react-redux";
import { sendInvite, setUserData } from "../../slices/InviteUserSlice";
import { RootState } from "../../store/rootReducer";

// interface UserState {
//   firstName: string;
//   lastName: string;
//   email: string;
//   mobileNumber: string;
//   pinCode: string;
//   password: string;
//   userRole: string;
//   employeeType: string;
//   department: string;
// }

const ManageUsers: React.FC = () => {
  const dispatch = useDispatch();
  const userData = useSelector((state: RootState) => state.inviteUser);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleNewRoleClick = () => {
    console.log("New Role button clicked");
  };

  const handleInviteUserClick = () => {
    console.log("Invite User button clicked");
    setIsModalOpen(true);
  };

  const handleInputChange = (fieldName: string, value: string) => {
    dispatch(setUserData({ [fieldName]: value }));
  };

  const handleSendInvite = () => {
    dispatch(sendInvite());
    setIsModalOpen(false);
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
          <div className=" py-[28px] 2xl:py-[56px] px-[28px] 2xl:px-[56px] bg-white relative rounded-[20px]  w-[800px]">
            <div className=" ">
              <p className="text-[24px] pb-[24px] font-[500] leading-[36px] text-purple500">
                Invite user
              </p>
              <hr className=" border border-grey100" />

              <div className=" my-[20px] lg:my-[40px]">
                <div className=" grid grid-cols-2 gap-[12px] lg:gap-[24px] text-[16px] font-[400] text-grey200">
                  <CustomInput
                    type="text"
                    label="First Name"
                    value={userData.firstName}
                    error=""
                    onChange={(newValue) =>
                      handleInputChange("firstName", newValue)
                    }
                  />
                  <CustomInput
                    type="text"
                    label="Last Name"
                    value={userData.lastName}
                    error=""
                    onChange={(newValue) =>
                      handleInputChange("lastName", newValue)
                    }
                  />
                  <CustomInput
                    type="email"
                    label="Email address"
                    value={userData.email}
                    error=""
                    onChange={(newValue) =>
                      handleInputChange("email", newValue)
                    }
                  />
                  <CustomInput
                    type="text"
                    label="Mobile number"
                    value={userData.mobileNumber}
                    error=""
                    onChange={(newValue) =>
                      handleInputChange("mobileNumber", newValue)
                    }
                  />
                  <CustomInput
                    type="text"
                    label="Pin code"
                    value={userData.pinCode}
                    error=""
                    maxLength={4}
                    onChange={(newValue) =>
                      handleInputChange("pinCode", newValue)
                    }
                  />
                  <CustomInput
                    type="password"
                    label="Password"
                    value={userData.password}
                    error=""
                    onChange={(newValue) =>
                      handleInputChange("password", newValue)
                    }
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
                    value={userData.userRole}
                    onChange={(newValue) =>
                      handleInputChange("userRole", newValue)
                    }
                    disabledOption="User Role"
                  />
                  <CustomSelect
                    label=""
                    options={["Full time", "Part time", "Contract"]}
                    value={userData.employeeType}
                    onChange={(newValue) =>
                      handleInputChange("employeeType", newValue)
                    }
                    disabledOption="Employee type"
                  />
                  <CustomInput
                    type="text"
                    label="Department"
                    value={userData.department}
                    error=""
                    onChange={(newValue) =>
                      handleInputChange("department", newValue)
                    }
                  />
                </div>
              </div>

              <hr className=" border border-grey100" />
              <div className=" flex justify-end items-center pt-[12px] lg:pt-[24px] gap-2">
                <div
                  className="border cursor-pointer border-purple500 rounded px-[24px]  py-[10px] font-[600] text-purple500"
                  onClick={() => setIsModalOpen(false)}
                >
                  <CancelButton text="Cancel" />
                </div>

                <div
                  className="border border-purple500 bg-purple500 rounded px-[24px]  py-[10px] font-[500] text-[#ffffff]"
                  onClick={handleSendInvite}
                >
                  <button className=" text-[16px]">Send invite</button>
                </div>
              </div>
            </div>
          </div>
        </Modal>
      </DashboardLayout>
    </div>
  );
};

export default ManageUsers;
