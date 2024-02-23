import { useState } from "react";
import DashboardBackButton from "./buttons/DashboardBackButton";
import Arrow from "../Mobile/assets/BackArrow.svg";
import AccountIcon from "./assets/AccountSettings.svg";
import QrIcon from "./assets/QRImage.svg";
import MenuModal from "./Components/MenuModal";
import CheckCircle from "../assets/check_circle.svg";
import WarningIcon from "./assets/WarningModal.svg";
import DeleteSuccess from "./assets/DeleteSuccess.svg";
import Trash from "./assets/delete.svg";

import QrCode from "./assets/qr_code_2.svg";
import downloadIcon from "./assets/downloadIcon.svg";
import copyIcon from "./assets/copyicon.svg";
import printIcon from "./assets/printer.svg";

import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import MenuSettings from "./Components/Settings/MenuSettings";
import { Link } from "react-router-dom";

interface FormData extends FieldValues {
  employee_name?: string;
  employee_email?: string;
  employee_phone?: string;
}

const SettingsPage = () => {
  const users = [
    {
      id: 1,
      name: "John Doe",
    },
    {
      id: 2,
      name: "Jane Smith",
    },
    {
      id: 3,
      name: "Alice Johnson",
    },
  ];

  const [QRCodeModal, setQRCodeModal] = useState(false);
  const [roomQRCodeModal, setRoomQRCodeModal] = useState(false);
  const [tableQRCodeModal, setTableQRCodeModal] = useState(false);
  const [tableListModal, setTableListModal] = useState(false);
  const [roomQRCodeContentModal, setRoomQRCodeContentModal] = useState(false);
  const [saveTableGroupModal, setSaveTableGroupModal] = useState(false);
  const [tableGroupSuccessModal, setTableGroupSuccessModal] = useState(false);

  const [successModal, setSuccessModal] = useState(false);
  const [resetSuccessModal, setResetSuccessModal] = useState(false);
  const [warningModal, setWarningModal] = useState(false);
  const [deleteSuccessfullModal, setDeleteSuccessfullModal] = useState(false);

  const [resetPasswordModal, setResetPasswordModal] = useState(false);
  const [employeeModal, setEmployeeModal] = useState(false);
  const [removeEmployeeModal, setRemoveEmployeeModal] = useState(false);

  const handleQRCodeModal = () => {
    setQRCodeModal(true);
  };

  const handleRoomQRCodeModal = () => {
    setQRCodeModal(false);
    setRoomQRCodeModal(true);
  };

  const handleTableQRCodeModal = () => {
    setQRCodeModal(false);
    setTableQRCodeModal(true);
  };

  const handleTableListModal = () => {
    setTableQRCodeModal(false);
    setTableListModal(true);
  };

  const handleSaveTableGroupModal = () => {
    setTableListModal(false);
    setSaveTableGroupModal(true);
  };

  const handleTableGroupSuccessModal = () => {
    setSaveTableGroupModal(false);
    setTableGroupSuccessModal(true);
  };

  const handleRoomQRCodeContentModal = () => {
    setRoomQRCodeModal(false);
    setRoomQRCodeContentModal(true);
  };

  const handleDownloadQRCodeModal = () => {
    setRoomQRCodeContentModal(false);
    setQRCodeModal(true);
  };

  const handlePasswordResetModal = () => {
    setResetPasswordModal(true);
  };
  const handleEmployeeModal = () => {
    setEmployeeModal(true);
  };

  const handleWarningModal = () => {
    setRemoveEmployeeModal(false);
    setWarningModal(true);
  };

  const handleDeleteSuccessModal = () => {
    setWarningModal(false);
    setDeleteSuccessfullModal(true);
  };

  const handleRemoveEmployeeModal = () => {
    setRemoveEmployeeModal(true);
  };

  const handleSuccessModal = () => {
    setEmployeeModal(false);
    setSuccessModal(true);
  };

  const handlePasswordResetSuccessModal = () => {
    setResetPasswordModal(false);
    setResetSuccessModal(true);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit: SubmitHandler<FormData> = (data) => {
    console.log(data);
  };

  return (
    <div>
      <div className="my-[16px] mx-[24px]">
        <DashboardBackButton text="Settings" img={Arrow} />

        <div className="mt-[24px]">
          <div className="bg-[#CFF5EE] p-[24px] rounded-[5px]">
            <div className="flex items-center justify-between ">
              <div className="flex items-center gap-[16px]">
                <img src={AccountIcon} alt="" />
                <p className="text-[#121212] text-[20px]">Account</p>
              </div>
            </div>

            <div className="ml-[36px] grid gap-[24px] my-[24px]">
              <p
                className="  text-grey300 text-[16px] cursor-pointer"
                onClick={handlePasswordResetModal}
              >
                Reset Password
              </p>
              <p
                className="text-grey300 text-[16px] cursor-pointer"
                onClick={handleEmployeeModal}
              >
                Add Employee
              </p>
              <p
                className="text-grey300 text-[16px] cursor-pointer"
                onClick={handleRemoveEmployeeModal}
              >
                Remove Employee
              </p>
            </div>
          </div>

          <MenuSettings />

          <div className="bg-[#F9F7EC] p-[24px] rounded-[5px] mt-[24px] ">
            <div className="flex items-center justify-between ">
              <div className="flex items-center gap-[16px]">
                <img src={QrIcon} alt="" />
                <p className="text-[#121212] text-[20px]">QR Code</p>
              </div>
            </div>

            <div className="ml-[36px] grid gap-[24px] my-[24px]">
              <p
                className=" cursor-pointer text-grey300 text-[16px]"
                onClick={handleQRCodeModal}
              >
                {" "}
                Create QR Code
              </p>
              <Link to="/manage-qr">
                <p className="text-grey300 text-[16px]">Manage QR Code</p>
              </Link>
              <p className="text-grey300 text-[16px]">Delete QR Code</p>
            </div>
          </div>
        </div>
      </div>

      <MenuModal
        isOpen={resetPasswordModal}
        onClose={() => setResetPasswordModal(false)}
      >
        <form action="" onSubmit={handleSubmit(onSubmit)}>
          <div className="w-full py-[32px] px-[16px] absolute bottom-0 bg-white rounded-tr-[20px] rounded-tl-[20px]">
            <div>
              <p className="text-[20px] font-[400] text-[#121212]">
                Reset password
              </p>
              <div className=" mt-[24px] grid gap-[16px]">
                <p className="text-red-500 text-sm mt-1"></p>
                <input
                  type="password"
                  id="new_password"
                  {...register("new_password", {
                    required: "New Password is required",
                  })}
                  placeholder="Create new password"
                  className={`bg-transparent placeholder:text-[14px] border border-black border-opacity-35 rounded-md pl-2 pr-2 py-4 w-full ${
                    errors.new_password ? "border-red-500" : ""
                  }`}
                />
                <input
                  type="password"
                  id="confirm_password"
                  {...register("confirm_password", {
                    required: "Confirm Password is required",
                  })}
                  placeholder="Confirm password"
                  className={`bg-transparent placeholder:text-[14px] border border-black border-opacity-35 rounded-md pl-2 pr-2 py-4 w-full ${
                    errors.confirm_password ? "border-red-500" : ""
                  }`}
                />

                <button
                  type="submit"
                  onClick={handlePasswordResetSuccessModal}
                  className="bg-purple500 w-full text-center text-white py-3 rounded mt-[32px]"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </form>
      </MenuModal>

      <MenuModal isOpen={QRCodeModal} onClose={() => setQRCodeModal(false)}>
        <div className="w-full py-[32px] px-[16px] absolute bottom-0 bg-white rounded-tr-[20px] rounded-tl-[20px]">
          <div>
            <p className="text-[20px] font-[400] text-[#121212]">
              Create QR Code
            </p>
            <div className=" mt-[24px] grid gap-[16px]">
              <p className="text-red-500 text-sm mt-1"></p>

              <div className=" grid gap-[12px]">
                <button
                  onClick={handleRoomQRCodeModal}
                  className="bg-purple500 w-full font-[500] text-center text-white py-3 rounded"
                >
                  Create QR Code for Rooms
                </button>
                <button
                  onClick={handleTableQRCodeModal}
                  className="bg-purple500 text-[16px] font-[500] w-full text-center text-white py-3 rounded"
                >
                  Create QR Code for Tables
                </button>
              </div>
            </div>
          </div>
        </div>
      </MenuModal>

      <MenuModal
        isOpen={roomQRCodeModal}
        onClose={() => setRoomQRCodeModal(false)}
      >
        <div className="w-full py-[32px] px-[16px] absolute bottom-0 bg-white rounded-tr-[20px] rounded-tl-[20px]">
          <div className=" max-w-[280px] mx-auto">
            <p className="text-[16px] font-[400] text-[#121212] text-center">
              Do you want to create QR Code for rooms at Deluxe Hotel?
            </p>
            <div className=" mt-[24px] grid gap-[16px]">
              <p className="text-red-500 text-sm mt-1"></p>

              <div className=" flex items-center gap-[8px]">
                <button
                  onClick={() => setRoomQRCodeModal(false)}
                  className="border-2 border-purple500 w-full font-[500] text-center text-[#5855B3] py-[10px] rounded"
                >
                  No
                </button>
                <button
                  onClick={handleRoomQRCodeContentModal}
                  className="bg-purple500 text-[16px] border-2 border-purple500 font-[500] w-full text-center text-white py-[10px] rounded"
                >
                  Yes
                </button>
              </div>
            </div>
          </div>
        </div>
      </MenuModal>

      <MenuModal
        isOpen={roomQRCodeContentModal}
        onClose={() => setRoomQRCodeContentModal(false)}
      >
        <div className="w-full py-[40px] px-[16px] absolute bottom-0 bg-white rounded-tr-[20px] rounded-tl-[20px]">
          <div className=" ">
            <div
              className=" cursor-pointer flex items-center justify-center"
              onClick={handleDownloadQRCodeModal}
            >
              <img src={QrCode} alt="" />
            </div>
            <p className="text-[16px] font-[400] text-[#121212] text-center">
              QR Code for rooms at Deluxe Hotel has been created successfully
            </p>
            <div className=" mt-[24px] grid gap-[16px]">
              <p className="text-red-500 text-sm mt-1"></p>

              <div className=" flex items-center gap-[8px]">
                <button className=" flex items-center justify-center  gap-[4px] border-2 border-purple500 w-full font-[500] text-center text-[#5855B3] py-[10px] rounded">
                  <img src={downloadIcon} alt="" />
                  Download
                </button>
                <button className="flex items-center justify-center gap-[4px] border-2 border-purple500 w-full font-[500] text-center text-[#5855B3] py-[10px] rounded">
                  <img src={copyIcon} alt="" />
                  Copy
                </button>
                <button className="flex items-center justify-center gap-[4px] border-2 border-purple500 w-full font-[500] text-center text-[#5855B3] py-[10px] rounded">
                  <img src={printIcon} alt="" />
                  Print
                </button>
              </div>
            </div>
          </div>
        </div>
      </MenuModal>

      <MenuModal
        isOpen={tableQRCodeModal}
        onClose={() => setTableQRCodeModal(false)}
      >
        <form action="" onSubmit={handleSubmit(onSubmit)}>
          <div className="w-full py-[32px] px-[16px] absolute bottom-0 bg-white rounded-tr-[20px] rounded-tl-[20px]">
            <div>
              <p className="text-[20px] font-[400] text-[#121212]">
                How many tables do you have?
              </p>
              <div className=" mt-[16px] ">
                <p className="text-red-500 text-sm mt-1">
                  {/* {errors && "All Fields are required"} */}
                </p>
                <input
                  type="text"
                  id="new_password"
                  {...register("new_password", {
                    required: "New Password is required",
                  })}
                  placeholder=""
                  className={`bg-transparent placeholder:text-[14px] border border-black border-opacity-35 rounded-md pl-2 pr-2 py-4 w-full ${
                    errors.new_password ? "border-red-500" : ""
                  }`}
                />

                <button
                  type="submit"
                  onClick={handleTableListModal}
                  className="bg-purple500 w-full text-center text-white py-3 rounded mt-[32px]"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </form>
      </MenuModal>

      <MenuModal
        isOpen={tableListModal}
        onClose={() => setTableListModal(false)}
      >
        <form action="" onSubmit={handleSubmit(onSubmit)}>
          <div className="w-full py-[32px] px-[16px] absolute bottom-0 bg-white rounded-tr-[20px] rounded-tl-[20px]">
            <div>
              <p className="text-[16px] font-[400] text-[#121212]">
                Do you want to create these QR Codes for 11 tables at Chicken
                Express Restaurant?
              </p>

              <div className=" mt-[32px] grid gap-[16px]">
                <div className=" flex items-center justify-between">
                  <p className="  text-grey500">Table 1</p>
                  <img src={QrCode} alt="" className=" h-[18px]" />
                </div>
                <div className=" flex items-center justify-between">
                  <p className="  text-grey500">Table 2</p>
                  <img src={QrCode} alt="" className=" h-[18px]" />
                </div>
                <div className=" flex items-center justify-between">
                  <p className="  text-grey500">Table 3</p>
                  <img src={QrCode} alt="" className=" h-[18px]" />
                </div>
                <div className=" flex items-center justify-between">
                  <p className="  text-grey500">Table 4</p>
                  <img src={QrCode} alt="" className=" h-[18px]" />
                </div>
                <div className=" flex items-center justify-between">
                  <p className="  text-grey500">Table 5</p>
                  <img src={QrCode} alt="" className=" h-[18px]" />
                </div>
                <div className=" flex items-center justify-between">
                  <p className="  text-grey500">Table 6</p>
                  <img src={QrCode} alt="" className=" h-[18px]" />
                </div>
              </div>
              <div className=" mt-[16px] ">
                <p className="text-red-500 text-sm mt-1"></p>

                <div className=" mt-[32px] flex items-center gap-[16px]">
                  <button
                    onClick={() => setRoomQRCodeModal(false)}
                    className="border-2 border-purple500 w-full font-[500] text-center text-[#5855B3] py-[10px] rounded"
                  >
                    No
                  </button>
                  <button
                    type="submit"
                    onClick={handleSaveTableGroupModal}
                    className="bg-purple500 w-full text-center text-white py-3 rounded "
                  >
                    Yes
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </MenuModal>

      <MenuModal
        isOpen={saveTableGroupModal}
        onClose={() => setSaveTableGroupModal(false)}
      >
        <form action="" onSubmit={handleSubmit(onSubmit)}>
          <div className="w-full py-[32px] px-[32px] absolute bottom-0 bg-white rounded-tr-[20px] rounded-tl-[20px]">
            <div>
              <p className="text-[20px] font-[400] text-[#121212]">
                Save Table Group As{" "}
              </p>
              <div className=" mt-[16px] ">
                <p className="text-red-500 text-sm mt-1"></p>
                <input
                  type="text"
                  id="group_name"
                  {...register("group_name", {
                    required: "Group Name is required",
                  })}
                  placeholder="Enter table group name"
                  className={`bg-transparent placeholder:text-[14px] border border-black border-opacity-35 rounded-md pl-2 pr-2 py-4 w-full ${
                    errors.group_name ? "border-red-500" : ""
                  }`}
                />

                <div className=" flex items-center gap-[8px] mt-[16px]">
                  <button
                    onClick={() => setSaveTableGroupModal(false)}
                    className="border-2 border-purple500 w-full font-[500] text-center text-[#5855B3] py-[10px] rounded"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleTableGroupSuccessModal}
                    className="bg-purple500 text-[16px] border-2 border-purple500 font-[500] w-full text-center text-white py-[10px] rounded"
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </MenuModal>

      <MenuModal
        isOpen={tableGroupSuccessModal}
        onClose={() => setTableGroupSuccessModal(false)}
      >
        <div className="flex items-center justify-center absolute bg-white w-full bottom-0">
          <div className=" px-[32px] py-[32px] h-[292px] flex flex-col items-center justify-center">
            <img
              className=" cursor-pointer"
              src={CheckCircle}
              alt=""
              onClick={() => setTableGroupSuccessModal(false)}
            />
            <p className="text-[16px] font-[400] text-grey500 text-center">
              QR Codes successfully created for tables at Chicken Express
              Restaurant
            </p>
          </div>
        </div>
      </MenuModal>

      <MenuModal isOpen={employeeModal} onClose={() => setEmployeeModal(false)}>
        <form action="" onSubmit={handleSubmit(onSubmit)}>
          <div className="w-full py-[32px] px-[16px] absolute bottom-0 bg-white rounded-tr-[20px] rounded-tl-[20px]">
            <div>
              <p className="text-[20px] font-[400] text-[#121212]">
                Add employee
              </p>
              <div className=" mt-[24px] grid gap-[16px]">
                <p className="text-red-500 text-sm mt-1">
                  {errors ? "All Fields are required" : ""}
                </p>
                <input
                  type="text"
                  id="employee_name"
                  {...register("employee_name", {
                    required: "Full Name is required",
                  })}
                  placeholder="Add employee name"
                  className={`bg-transparent placeholder:text-[14px] border border-black border-opacity-35 rounded-md pl-2 pr-2 py-4 w-full ${
                    errors.employee_name ? "border-red-500" : ""
                  }`}
                />
                <input
                  type="email"
                  id="employee_email"
                  {...register("employee_email")}
                  placeholder="Email(optional)"
                  className={`bg-transparent placeholder:text-[14px] border border-black border-opacity-35 rounded-md pl-2 pr-2 py-4 w-full ${
                    errors.employee_email ? "border-red-500" : ""
                  }`}
                />
                <input
                  type="tel"
                  id="employee_phone"
                  {...register("employee_phone", {
                    required: "Phone number is required",
                    pattern: {
                      value: /^\d{11}$/,
                      message: "Invalid phone number",
                    },
                  })}
                  placeholder="Phone number"
                  className={`bg-transparent placeholder:text-[14px] border border-black border-opacity-35 rounded-md pl-2 pr-2 py-4 w-full ${
                    errors.employee_phone ? "border-red-500" : ""
                  }`}
                />

                <button
                  type="submit"
                  onClick={handleSuccessModal}
                  className="bg-purple500 w-full text-center text-white py-3 rounded mt-[32px]"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </form>
      </MenuModal>

      <MenuModal
        isOpen={removeEmployeeModal}
        onClose={() => setRemoveEmployeeModal(false)}
      >
        <div className="w-full py-[32px] px-[16px] absolute bottom-0 bg-white rounded-tr-[20px] rounded-tl-[20px]">
          <p className="text-[20px] font-[400] text-[#121212]">
            Remove employee
          </p>
          <div className=" mt-[24px] grid gap-[16px]">
            {users.map((user) => (
              <div
                className=" py-[14px] px-[16px] border rounded-[5px] flex items-center justify-between"
                key={user.id}
              >
                <p className=" text-[#121212] text-[14px] font-[400]">
                  {user.name}
                </p>
                <p
                  className=" text-[#ED5048] font-[400] text-[14px] flex items-center gap-[4px] cursor-pointer"
                  onClick={handleWarningModal}
                >
                  <img src={Trash} alt="" />
                  Remove
                </p>
              </div>
            ))}
          </div>
        </div>
      </MenuModal>

      <MenuModal isOpen={successModal} onClose={() => setSuccessModal(false)}>
        <div className="flex items-center justify-center absolute bg-white w-full bottom-0">
          <div className=" px-[32px] py-[32px] h-[292px] flex flex-col items-center justify-center">
            <img
              className=" cursor-pointer"
              src={CheckCircle}
              alt=""
              onClick={() => setSuccessModal(false)}
            />
            <p className="text-[16px] font-[400] text-grey500 text-center">
              A new Employee has been added successfully
            </p>
          </div>
        </div>
      </MenuModal>

      <MenuModal isOpen={warningModal} onClose={() => setWarningModal(false)}>
        <div className="flex items-center justify-center absolute bg-white w-full bottom-0">
          <div className=" px-[32px] py-[32px] h-[292px] flex flex-col items-center justify-center">
            <img
              className=" cursor-pointer"
              src={WarningIcon}
              alt=""
              onClick={() => setSuccessModal(false)}
            />
            <p className="text-[16px] font-[400] text-grey500 text-center mt-[24px]">
              Are you sure you want to remove this employee?
            </p>

            <button
              type="submit"
              onClick={handleDeleteSuccessModal}
              className="bg-purple500 w-full text-center text-white py-3 rounded mt-[66px]"
            >
              Proceed
            </button>
          </div>
        </div>
      </MenuModal>

      <MenuModal
        isOpen={deleteSuccessfullModal}
        onClose={() => setDeleteSuccessfullModal(false)}
      >
        <div className="flex items-center justify-center absolute bg-white w-full bottom-0">
          <div className=" px-[32px] py-[32px] h-[292px] flex flex-col items-center justify-center">
            <img
              className=" cursor-pointer"
              src={DeleteSuccess}
              alt=""
              onClick={() => setDeleteSuccessfullModal(false)}
            />
            <p className="text-[16px] font-[400] text-grey500 text-center mt-[24px]">
              Employee has been removed successfully
            </p>
          </div>
        </div>
      </MenuModal>

      <MenuModal
        isOpen={resetSuccessModal}
        onClose={() => setResetSuccessModal(false)}
      >
        <div className="flex items-center justify-center absolute bg-white w-full bottom-0">
          <div className=" px-[32px] py-[32px] h-[380px] flex flex-col items-center justify-center">
            <img
              className=" cursor-pointer"
              src={CheckCircle}
              alt=""
              onClick={() => setResetSuccessModal(false)}
            />
            <p className="text-[16px] font-[400] text-grey500">
              Your password has been reset successfully
            </p>
          </div>
        </div>
      </MenuModal>

      <MenuModal isOpen={successModal} onClose={() => setSuccessModal(false)}>
        <div className="flex items-center justify-center absolute bg-white w-full bottom-0">
          <div className=" px-[32px] py-[32px] h-[380px] flex flex-col items-center justify-center">
            <img
              className=" cursor-pointer"
              src={CheckCircle}
              alt=""
              onClick={() => setSuccessModal(false)}
            />
            <p className="text-[16px] font-[400] text-grey500">
              Menu has been Added successfully
            </p>
          </div>
        </div>
      </MenuModal>
    </div>
  );
};

export default SettingsPage;
