import { useEffect, useState } from "react";
import AccountIcon from "./assets/AccountSettings.svg";
import QrIcon from "./assets/QRImage.svg";
import MenuModal from "./Components/MenuModal";
import CheckCircle from "../assets/check_circle.svg";
import WarningIcon from "./assets/WarningModal.svg";
import DeleteSuccess from "./assets/DeleteSuccess.svg";
import Trash from "./assets/delete.svg";
import Back from "./assets/Cancel.svg";

import QrCode from "./assets/qr_code_2.svg";
import downloadIcon from "./assets/downloadIcon.svg";
import copyIcon from "./assets/copyicon.svg";
import printIcon from "./assets/printer.svg";

import MenuSettings from "./Components/Settings/MenuSettings";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { SERVER_DOMAIN } from "../Api/Api";
import { RootState } from "../store/store";
import { useSelector } from "react-redux";
import TopMenuNav from "./Components/TopMenuNav";

// interface FormData extends FieldValues {
//   employee_name?: string;
//   employee_email?: string;
//   employee_phone?: string;
// }

const SettingsPage = () => {
  const [employeeName, setEmployeeName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [tempPassword, setTempPassword] = useState("");
  const [group_name, setGroup_name] = useState("");
  const [number, setNumber] = useState("");

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
  const [ManageQRCodeModal, setManageQRCodeModal] = useState(false);
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
  const [loading, setLoading] = useState(false);

  const [resetPasswordModal, setResetPasswordModal] = useState(false);
  const [employeeModal, setEmployeeModal] = useState(false);
  const [removeEmployeeModal, setRemoveEmployeeModal] = useState(false);

  const type = sessionStorage.getItem("type");

  const handleQRCodeModal = () => {
    setQRCodeModal(true);
  };

  const handleManageQRCodeModal = () => {
    setManageQRCodeModal(true);
  };

  const handleManageRoomQRCodeModal = () => {
    sessionStorage.setItem("type", "room");
    setManageQRCodeModal(false);
    navigate("/manage-qr");
  };

  const handleManageTableQRCodeModal = () => {
    setManageQRCodeModal(false);
    navigate("/manage-qr");
    sessionStorage.setItem("type", "table");
  };

  const handleRoomQRCodeModal = () => {
    setQRCodeModal(false);
    setRoomQRCodeModal(true);
    sessionStorage.setItem("type", "room");
  };

  const handleTableQRCodeModal = () => {
    setQRCodeModal(false);
    setTableQRCodeModal(true);
    sessionStorage.setItem("type", "table");
  };

  const handleSaveTableGroupModal = () => {
    setTableListModal(false);
    setSaveTableGroupModal(true);
    setTableQRCodeModal(false);
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

  const userDetails = useSelector((state: RootState) => state.user);

  const token = userDetails?.userData?.token;

  const createEmployee = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    if (!employeeName || !phoneNumber || !email) {
      setError("All fields Are required");
      return;
    }
    sessionStorage.setItem("employeeEmail", email);
    const headers = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const response = await axios.post(
        `${SERVER_DOMAIN}/employee/createEmployee`,
        {
          employee_name: employeeName,
          email: email,
          phone_number: phoneNumber,
        },
        headers
      );
      console.log("Employee added successfully:", response.data);
      setLoading(false);
      setEmployeeName("");
      setEmail("");
      setPhoneNumber("");
      setError("");
      setEmployeeModal(false);
      setSuccessModal(true);
      setLoading(false);
    } catch (error) {
      console.error("Error adding employee:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchTempPassword = async () => {
      setLoading(true);
      const email = sessionStorage.getItem("employeeEmail");
      const headers = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      try {
        const response = await axios.post(
          `${SERVER_DOMAIN}/employee/getEmployeeTempPassword`,
          {
            email,
          },
          headers
        );
        setTempPassword(response.data.password);
        sessionStorage.setItem("tempPassword", tempPassword);
        console.log(response.data);

        setLoading(false);
      } catch (error) {
        console.error("Error fetching temporary password:", error);
        setError("An error occurred while fetching temporary password");
        setLoading(false);
      }
    };
    fetchTempPassword();
  }, []);
  const updatePassword = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    if (!newPassword || !confirmPassword) {
      setError("All fields are Required");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    const tempPassword = sessionStorage.getItem("tempPassword");
    try {
      const headers = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.post(
        `${SERVER_DOMAIN}/employee/updateEmployeePassword`,
        {
          password: newPassword,
          confirm_password: confirmPassword,
          temp_password: tempPassword,
        },
        headers
      );
      console.log("Employee Password Reset successfully:", response.data);
      setLoading(false);
      setEmployeeName("");
      setEmail("");
      setPhoneNumber("");
      setError("");
      setEmployeeModal(false);
      setSuccessModal(true);
      setLoading(false);
    } catch (error) {
      console.error("Error adding employee:", error);
      setLoading(false);
    }
  };

  const navigate = useNavigate();

  const generateQr = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    // if (!employeeName || !phoneNumber || !email) {
    //   setError("All fields Are required");
    //   return;
    // }
    const headers = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const response = await axios.post(
        `${SERVER_DOMAIN}/asset/generateBusinessAsset`,
        {
          type: type,
          group_name: group_name,
          number: number,
        },
        headers
      );
      console.log("Qr Code Generared successfully:", response.data);
      setLoading(false);
      setGroup_name("");
      setNumber("");
      setTableGroupSuccessModal(true);
    } catch (error) {
      console.error("Error creating Qr Code:", error);
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="my-[16px] mx-[24px]">
        <TopMenuNav title="Settings" />

        <div className="mt-[24px]">
          <div className="bg-[#CFF5EE] p-[24px] rounded-[5px]">
            <div className="flex items-center justify-between ">
              <div className="flex items-center gap-[16px]">
                <img src={AccountIcon} alt="" />
                <p className="text-grey500 text-[20px]">Account</p>
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
                <p className="text-grey500 text-[20px]">QR Code</p>
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
              {/* <Link to="/manage-qr"> */}
              <p
                className=" cursor-pointer text-grey300 text-[16px]"
                onClick={handleManageQRCodeModal}
              >
                Manage QR Code
              </p>
              {/* </Link> */}
              <p className="text-grey300 text-[16px]">Delete QR Code</p>
            </div>
          </div>
        </div>
      </div>

      <MenuModal
        isOpen={resetPasswordModal}
        onClose={() => setResetPasswordModal(false)}
      >
        <form action="" onSubmit={updatePassword}>
          <div className="w-full py-[32px] px-[16px] absolute bottom-0 bg-white rounded-tr-[20px] rounded-tl-[20px]">
            <div>
              <div
                className=" cursor-pointer flex items-center justify-end"
                onClick={() => setResetPasswordModal(false)}
              >
                <img src={Back} alt="" />
              </div>
              <p className="text-[20px] font-[400] text-grey500">
                Reset password
              </p>
              <div className=" mt-[24px] grid gap-[16px]">
                <p className="text-red-500 text-sm mt-1">{error}</p>
                <input
                  type="password"
                  id="new_password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Create new password"
                  className={`bg-transparent placeholder:text-[14px] border border-black border-opacity-35 rounded-md pl-2 pr-2 py-4 w-full `}
                />
                <input
                  type="password"
                  id="confirm_password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm password"
                  className={`bg-transparent placeholder:text-[14px] border border-black border-opacity-35 rounded-md pl-2 pr-2 py-4 w-full `}
                />

                <button
                  disabled={loading}
                  type="submit"
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
            <div
              className=" cursor-pointer flex items-center justify-end"
              onClick={() => setQRCodeModal(false)}
            >
              <img src={Back} alt="" />
            </div>

            <div className="">
              <p className="text-[20px] font-[400] text-grey500">
                Create QR Code
              </p>
            </div>
            <div className=" mt-[24px] grid gap-[16px]">
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
        isOpen={ManageQRCodeModal}
        onClose={() => setManageQRCodeModal(false)}
      >
        <div className="w-full py-[32px] px-[16px] absolute bottom-0 bg-white rounded-tr-[20px] rounded-tl-[20px]">
          <div>
            <div
              className=" cursor-pointer flex items-center justify-end"
              onClick={() => setManageQRCodeModal(false)}
            >
              <img src={Back} alt="" />
            </div>

            <div className=" mt-[24px] grid gap-[16px]">
              <div className=" grid gap-[12px]">
                <button
                  onClick={handleManageRoomQRCodeModal}
                  className="bg-purple500 w-full font-[500] text-center text-white py-3 rounded"
                >
                  Manage QR Code for Rooms
                </button>
                <button
                  onClick={handleManageTableQRCodeModal}
                  className="bg-purple500 text-[16px] font-[500] w-full text-center text-white py-3 rounded"
                >
                  Manage QR Code for Tables
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
            <p className="text-[16px] font-[400] text-grey500 text-center">
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
            <p className="text-[16px] font-[400] text-grey500 text-center">
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
        <div className="w-full py-[32px] px-[16px] absolute bottom-0 bg-white rounded-tr-[20px] rounded-tl-[20px]">
          <div
            className=" cursor-pointer flex items-center justify-end"
            onClick={() => setTableQRCodeModal(false)}
          >
            <img src={Back} alt="" />
          </div>
          <div>
            <p className="text-[20px] font-[400] text-grey500">
              How many tables do you have?
            </p>
            <div className=" mt-[16px] ">
              <input
                type="text"
                id="number"
                value={number}
                onChange={(e) => setNumber(e.target.value)}
                placeholder="Number of Table"
                className={`bg-transparent placeholder:text-[14px] border border-black border-opacity-35 rounded-md pl-2 pr-2 py-4 w-full `}
              />

              {number && (
                <button
                  onClick={handleSaveTableGroupModal}
                  className="bg-purple500 w-full text-center text-white py-3 rounded mt-[32px]"
                >
                  Next
                </button>
              )}
            </div>
          </div>
        </div>
      </MenuModal>

      <MenuModal
        isOpen={tableListModal}
        onClose={() => setTableListModal(false)}
      >
        <div className="w-full py-[32px] px-[16px] absolute bottom-0 bg-white rounded-tr-[20px] rounded-tl-[20px]">
          <div>
            <p className="text-[16px] font-[400] text-grey500">
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
      </MenuModal>

      <MenuModal
        isOpen={saveTableGroupModal}
        onClose={() => setSaveTableGroupModal(false)}
      >
        <form onSubmit={generateQr}>
          <div className="w-full py-[32px] px-[32px] absolute bottom-0 bg-white rounded-tr-[20px] rounded-tl-[20px]">
            <div
              className=" cursor-pointer flex items-center justify-end"
              onClick={() => setSaveTableGroupModal(false)}
            >
              <img src={Back} alt="" />
            </div>
            <div>
              <p className="text-[20px] font-[400] text-grey500">
                Save Table Group As{" "}
              </p>
              <div className=" mt-[16px] ">
                <p className="text-red-500 text-sm mt-1"></p>
                <input
                  type="text"
                  id="group_name"
                  value={group_name}
                  onChange={(e) => setGroup_name(e.target.value)}
                  placeholder="Enter table group name"
                  className={`bg-transparent placeholder:text-[14px] border border-black border-opacity-35 rounded-md pl-2 pr-2 py-4 w-full `}
                />

                <div className=" flex items-center gap-[8px] mt-[16px]">
                  <button
                    className="border-2 border-purple500 w-full font-[500] text-center text-[#5855B3] py-[10px] rounded"
                    onClick={() => navigate(-1)}
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    disabled={!group_name}
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
              onClick={() => navigate(-1)}
            />
            <p className="text-[16px] font-[400] text-grey500 text-center">
              QR Codes successfully created for tables
            </p>
          </div>
        </div>
      </MenuModal>

      <MenuModal isOpen={employeeModal} onClose={() => setEmployeeModal(false)}>
        <form action="" onSubmit={createEmployee}>
          <div className="w-full py-[32px] px-[16px] absolute bottom-0 bg-white rounded-tr-[20px] rounded-tl-[20px]">
            <div
              className=" cursor-pointer flex items-center justify-end"
              onClick={() => setEmployeeModal(false)}
            >
              <img src={Back} alt="" />
            </div>
            <div>
              <p className="text-[20px] font-[400] text-grey500">
                Add employee
              </p>
              <div className=" mt-[24px] grid gap-[16px]">
                <input
                  type="text"
                  id="employee_name"
                  value={employeeName}
                  onChange={(e) => setEmployeeName(e.target.value)}
                  placeholder="Add employee name"
                  className={`bg-transparent placeholder:text-[14px] border border-black border-opacity-35 rounded-md pl-2 pr-2 py-4 w-full `}
                />
                <input
                  type="email"
                  id="employee_email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                  className={`bg-transparent placeholder:text-[14px] border border-black border-opacity-35 rounded-md pl-2 pr-2 py-4 w-full `}
                />
                <input
                  type="tel"
                  id="employee_phone"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder="Phone number"
                  className={`bg-transparent placeholder:text-[14px] border border-black border-opacity-35 rounded-md pl-2 pr-2 py-4 w-full `}
                />

                <button
                  type="submit"
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
          <div
            className=" cursor-pointer flex items-center justify-end"
            onClick={() => setRemoveEmployeeModal(false)}
          >
            <img src={Back} alt="" />
          </div>
          <p className="text-[20px] font-[400] text-grey500">Remove employee</p>
          <div className=" mt-[24px] grid gap-[16px]">
            {users.map((user) => (
              <div
                className=" py-[14px] px-[16px] border rounded-[5px] flex items-center justify-between"
                key={user.id}
              >
                <p className=" text-grey500 text-[14px] font-[400]">
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
              Employee has been Added successfully
            </p>
          </div>
        </div>
      </MenuModal>
    </div>
  );
};

export default SettingsPage;
