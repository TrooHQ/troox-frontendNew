import { useState } from "react";
import DashboardBackButton from "./buttons/DashboardBackButton";
import Arrow from "../Mobile/assets/BackArrow.svg";
import AccountIcon from "./assets/AccountSettings.svg";
import MenuIcon from "./assets/MenuIcon2.svg";
import QrIcon from "./assets/QRImage.svg";
// import arrowDown from "./assets/ArrowDown3.svg";
import MenuModal from "./Components/MenuModal";
import CheckCircle from "../assets/check_circle.svg";
import WarningIcon from "./assets/WarningModal.svg";
import DeleteSuccess from "./assets/DeleteSuccess.svg";
import Trash from "./assets/delete.svg";
import info from "./assets/info.svg";
import AddWhite from "./assets/addWhite.svg";
import imageIcon from "./assets/image.svg";
import EditIcon from "./assets/EditIcon.svg";

import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import CustomInput from "./inputFields/CustomInput";
import CheckInput from "./inputFields/CheckInput";
import RadioInput from "./inputFields/RadioInput";
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

  const menu = [
    {
      id: 1,
      name: "Soup",
    },
    {
      id: 2,
      name: "Swallow",
    },
    {
      id: 3,
      name: "Rice",
    },
  ];
  const options = ["yes", "no"];

  const [editModal, setEditModal] = useState(false);
  const [editItem, setEditItem] = useState(false);

  const [addModifierModar, setAddModifierModal] = useState(false);
  const [infoModal, setInfoModal] = useState(false);
  const [email, setEmail] = useState<string>("");
  const [addCategory, setAddCategoryModal] = useState(false);

  const [successModal, setSuccessModal] = useState(false);
  const [successModal2, setSuccessModal2] = useState(false);
  const [warningModal, setWarningModal] = useState(false);
  const [warningModal2, setWarningModal2] = useState(false);
  const [deleteSuccessfullModal, setDeleteSuccessfullModal] = useState(false);
  const [deleteSuccessfullModal2, setDeleteSuccessfullModal2] = useState(false);

  const [employeeModal, setEmployeeModal] = useState(false);
  const [removeEmployeeModal, setRemoveEmployeeModal] = useState(false);
  const [removeMenuModal, setRemoveMenuModal] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string>("");
  const handleAddMenuCategory = () => {
    setAddModifierModal(true);
  };
  const handleInfoModal = () => {
    setInfoModal(!infoModal);
  };
  const handleOptionChange = (option: string) => {
    setSelectedOption(option);
  };
  const handleEditModal = () => {
    setEditModal(true);
  };

  const handleEditMenu = () => {
    setEditModal(false);
    setEditItem(true);
  };

  const handleAddMenuItem = () => {
    setEditItem(false);
    setAddCategoryModal(true);
  };
  const handleEmployeeModal = () => {
    setEmployeeModal(true);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    console.log("Selected file:", file);
  };
  const handleWarningModal = () => {
    setRemoveMenuModal(false);
    setRemoveEmployeeModal(false);
    setWarningModal(true);
  };
  const handleWarningModal2 = () => {
    setRemoveMenuModal(false);
    setWarningModal2(true);
  };

  const handleDeleteSuccessModal = () => {
    setWarningModal(false);
    setDeleteSuccessfullModal(true);
  };

  const handleDeleteSuccessModal2 = () => {
    setWarningModal2(false);
    setDeleteSuccessfullModal2(true);
  };
  const handleRemoveMenuModal = () => {
    setRemoveMenuModal(true);
  };

  const handleRemoveEmployeeModal = () => {
    setRemoveEmployeeModal(true);
  };

  const handleSuccessModal = () => {
    setEmployeeModal(false);
    setAddCategoryModal(false);
    setEditItem(false);
    setSuccessModal(true);
  };

  const handleEditSuccessModal = () => {
    // setEmployeeModal(false);
    setAddCategoryModal(false);
    setEditItem(false);
    setSuccessModal2(true);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit: SubmitHandler<FormData> = (data) => {
    console.log(data.employee_name);
  };

  return (
    <div>
      <div className="my-[16px] mx-[24px]">
        <DashboardBackButton text="Settings" img={Arrow} />

        <div className="mt-[24px]">
          <div className="bg-[#CFF5EE] p-[24px] rounded-[5px] cursor-pointer">
            <div className="flex items-center justify-between ">
              <div className="flex items-center gap-[16px]">
                <img src={AccountIcon} alt="" />
                <p className="text-[#121212] text-[20px]">Account</p>
              </div>
            </div>

            <div className="ml-[36px] grid gap-[24px] my-[24px]">
              <p className="text-grey300 text-[16px]">Reset Password</p>
              <p
                className="text-grey300 text-[16px]"
                onClick={handleEmployeeModal}
              >
                Add Employee
              </p>
              <p
                className="text-grey300 text-[16px]"
                onClick={handleRemoveEmployeeModal}
              >
                Remove Employee
              </p>
            </div>
          </div>

          <div
            className="bg-[#F3EBE8] p-[24px] rounded-[5px] mt-[24px] cursor-pointer"
            // onClick={toggleMenu}
          >
            <div className="flex items-center justify-between ">
              <div className="flex items-center gap-[16px]">
                <img src={MenuIcon} alt="" />
                <p className="text-[#121212] text-[20px]">Menu</p>
              </div>
              {/* <img
                src={arrowDown}
                alt=""
                className={isMenuOpen ? "transform rotate-180" : ""}
              /> */}
            </div>

            {/* {isMenuOpen && ( */}
            <div className="ml-[36px] grid gap-[24px] my-[24px]">
              <p
                className="text-grey300 text-[16px]"
                onClick={handleAddMenuCategory}
              >
                Add Menu
              </p>
              <p
                className="text-grey300 text-[16px]"
                onClick={handleRemoveMenuModal}
              >
                Remove Menu
              </p>
              <p className="text-grey300 text-[16px]" onClick={handleEditModal}>
                Edit Menu
              </p>
            </div>
            {/* )} */}
          </div>

          <div
            className="bg-[#F9F7EC] p-[24px] rounded-[5px] mt-[24px] cursor-pointer"
            // onClick={toggleQr}
          >
            <div className="flex items-center justify-between ">
              <div className="flex items-center gap-[16px]">
                <img src={QrIcon} alt="" />
                <p className="text-[#121212] text-[20px]">QR Code</p>
              </div>
              {/* <img
                src={arrowDown}
                alt=""
                className={isQrOpen ? "transform rotate-180" : ""}
              /> */}
            </div>

            {/* {isQrOpen && ( */}
            <div className="ml-[36px] grid gap-[24px] my-[24px]">
              <p className="text-grey300 text-[16px]"> Create QR Code</p>
              <p className="text-grey300 text-[16px]">Manage QR Code</p>
              <p className="text-grey300 text-[16px]">Delete QR Code</p>
            </div>
            {/* )} */}
          </div>
        </div>
      </div>

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
        isOpen={addModifierModar}
        onClose={() => setAddModifierModal(false)}
      >
        <div className="  w-full py-[32px] px-[16px] absolute bottom-0  bg-white">
          <div className=" ">
            <div className=" flex relative items-center justify-between mb-[16px]">
              <p className=" text-[20px]  font-[400] text-[#121212]">
                New menu category
              </p>
              <img
                src={info}
                alt=""
                onClick={handleInfoModal}
                className=" cursor-pointer"
              />
              {infoModal && (
                <div className="grid gap-[10px] absolute top-[30px] right-0 shadow-2xl z-[50] w-[300px] py-[32px] px-[16px] bg-white">
                  <p className=" text-[14px] font-[400] text-[#121212]">
                    New Menu allows you create a new menu category where other
                    food items can be added to it.
                  </p>
                  <p className=" text-[14px] font-[400] text-[#121212]">
                    E.g when you create a menu for soup, you have created a
                    category called soup in your database. You can add soups
                    such as Pepper soup e.t.c. when you create a menu item.
                  </p>
                </div>
              )}
            </div>

            <div className=" grid gap-[8px] my-[16px]">
              <CheckInput text="Soup" />
              <CheckInput text="Swallow" />
              <CheckInput text="Protein" />
              <CheckInput text="Rice" />
            </div>
            <CustomInput
              type="text"
              label="Others"
              value={email}
              onChange={(newValue) => setEmail(newValue)}
            />
            <div className=" grid gap-[8px] my-[16px]">
              <p className=" text-[#121212] text-[16px] font-[400]">
                Setup menu group
              </p>
              <p className=" text-[#606060] text-[14px] font-[400]">
                Would you like to add a Menu group?
              </p>
              <div className=" flex">
                <RadioInput options={options} onChange={handleOptionChange} />
              </div>
            </div>
            <p
              className=" text-[#5855B3] py-[11px] px-[4px] text-[14px] font-[400] flex items-center cursor-pointer"
              onClick={handleAddMenuItem}
            >
              <img src={AddWhite} alt="" />
              Add new menu item
            </p>
            <Link to="">
              <div className="border border-purple500 text-center bg-purple500 rounded px-[24px]  py-[10px] font-[500] text-[#ffffff] mt-[72px]">
                <button className=" text-[16px] ">Save</button>
              </div>
            </Link>
          </div>
        </div>
      </MenuModal>

      <MenuModal
        isOpen={addCategory}
        onClose={() => setAddCategoryModal(false)}
      >
        <div className="  w-full py-[32px] px-[16px] absolute bottom-0  bg-white">
          <div className=" ">
            <p className=" text-[20px]  font-[400] text-[#121212] mb-[16px]">
              New menu Item
            </p>

            <CustomInput
              type="text"
              label="Menu item name"
              value={email}
              onChange={(newValue) => setEmail(newValue)}
            />
            <div className=" grid gap-[8px] my-[16px]">
              <div className="">
                <p className=" text-[18px] mb-[8px] font-[500] text-[#121212]">
                  Add image
                </p>

                <div className="flex items-center gap-[16px]">
                  <label
                    htmlFor="fileInput"
                    className="w-[72px] border border-dashed p-[20px] border-[#5855B3] cursor-pointer"
                  >
                    <input
                      type="file"
                      id="fileInput"
                      className="hidden"
                      onChange={handleFileChange}
                      accept="image/*"
                    />
                    <img src={imageIcon} alt="Upload Icon" />
                  </label>
                  <div className="">
                    <label
                      htmlFor="fileInput"
                      className="text-[#5855B3] font-[500] text-[16px] cursor-pointer"
                    >
                      Click to upload{" "}
                    </label>
                    <p className=" text-[14px] font-[400] mt-[8px] text-grey300">
                      Max. file size: 2MB
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="border border-purple500 cursor-pointer text-center bg-purple500 rounded px-[24px]  py-[10px] font-[500] text-[#ffffff] mt-[72px]"
              onClick={handleSuccessModal}
            >
              <button className=" text-[16px] ">Save</button>
            </div>
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
              Menu has been edited successfully
            </p>
          </div>
        </div>
      </MenuModal>

      <MenuModal
        isOpen={removeMenuModal}
        onClose={() => setRemoveMenuModal(false)}
      >
        <div className="w-full py-[32px] px-[16px] absolute bottom-0 bg-white rounded-tr-[20px] rounded-tl-[20px]">
          <p className="text-[20px] font-[400] text-[#121212]">Remove menu</p>
          <div className=" mt-[24px] grid gap-[16px]">
            {menu.map((user) => (
              <div
                className=" py-[14px] px-[16px] border rounded-[5px] flex items-center justify-between"
                key={user.id}
              >
                <p className=" text-[#121212] text-[14px] font-[400]">
                  {user.name}
                </p>
                <p
                  className=" text-[#ED5048] font-[400] text-[14px] flex items-center gap-[4px] cursor-pointer"
                  onClick={handleWarningModal2}
                >
                  <img src={Trash} alt="" />
                  Remove
                </p>
              </div>
            ))}
          </div>
        </div>
      </MenuModal>

      <MenuModal isOpen={warningModal2} onClose={() => setWarningModal2(false)}>
        <div className="flex items-center justify-center absolute bg-white w-full bottom-0">
          <div className=" px-[32px] py-[32px] h-[292px] flex flex-col items-center justify-center">
            <img
              className=" cursor-pointer"
              src={WarningIcon}
              alt=""
              onClick={() => setSuccessModal(false)}
            />
            <p className="text-[16px] font-[400] text-grey500 text-center mt-[24px]">
              Are you sure you want to remove this menu?
            </p>

            <button
              type="submit"
              onClick={handleDeleteSuccessModal2}
              className="bg-purple500 w-full text-center text-white py-3 rounded mt-[66px]"
            >
              Proceed
            </button>
          </div>
        </div>
      </MenuModal>

      <MenuModal
        isOpen={deleteSuccessfullModal2}
        onClose={() => setDeleteSuccessfullModal2(false)}
      >
        <div className="flex items-center justify-center absolute bg-white w-full bottom-0">
          <div className=" px-[32px] py-[32px] h-[292px] flex flex-col items-center justify-center">
            <img
              className=" cursor-pointer"
              src={DeleteSuccess}
              alt=""
              onClick={() => setDeleteSuccessfullModal2(false)}
            />
            <p className="text-[16px] font-[400] text-grey500 text-center mt-[24px]">
              Menu has been removed successfully
            </p>
          </div>
        </div>
      </MenuModal>

      <MenuModal isOpen={editModal} onClose={() => setEditModal(false)}>
        <div className="w-full py-[32px] px-[16px] absolute bottom-0 bg-white rounded-tr-[20px] rounded-tl-[20px]">
          <p className="text-[20px] font-[400] text-[#121212]">
            Edit menu category
          </p>
          <div className=" mt-[24px] grid gap-[16px]">
            {menu.map((menuItem) => (
              <div
                className=" py-[14px] px-[16px] border rounded-[5px] flex items-center justify-between"
                key={menuItem.id}
              >
                <p className=" text-[#121212] text-[14px] font-[400]">
                  {menuItem.name}
                </p>
                <p
                  className=" text-[#ED5048] font-[400] text-[14px] cursor-pointer"
                  onClick={handleEditMenu}
                >
                  <img src={EditIcon} alt="" />
                </p>
              </div>
            ))}
          </div>
        </div>
      </MenuModal>

      <MenuModal isOpen={editItem} onClose={() => setEditItem(false)}>
        <div className="w-full py-[32px] px-[16px] absolute bottom-0 bg-white rounded-tr-[20px] rounded-tl-[20px]">
          <div>
            <h2 className=" mb-[16px] text-[#121212] font-[400] text-[20px]">
              Edit Menu Category
            </h2>
            <CustomInput
              type="text"
              label="Soups"
              value={email}
              onChange={(newValue) => setEmail(newValue)}
            />
            <div className=" grid gap-[8px] my-[16px]">
              <p className=" text-[#121212] text-[16px] font-[400]">
                Edit menu group
              </p>
              <p className=" text-[#606060] text-[14px] font-[400]">
                Would you like to edit this menu group?
              </p>
              <div className=" flex">
                <RadioInput options={options} onChange={handleOptionChange} />
              </div>

              {selectedOption && (
                <>
                  {selectedOption === "yes" && (
                    <div className="">
                      <CustomInput
                        type="text"
                        label="Enter menu group name"
                        value={email}
                        onChange={(newValue) => setEmail(newValue)}
                      />
                    </div>
                  )}
                </>
              )}

              <p
                className=" text-[#5855B3] py-[11px] px-[4px] text-[14px] font-[400] flex items-center cursor-pointer"
                onClick={handleAddMenuItem}
              >
                <img src={AddWhite} alt="" />
                Add new menu item
              </p>

              <button
                type="submit"
                onClick={handleEditSuccessModal}
                className="bg-purple500 w-full text-center text-white py-3 rounded mt-[32px]"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </MenuModal>

      <MenuModal isOpen={successModal2} onClose={() => setSuccessModal2(false)}>
        <div className="flex items-center justify-center absolute bg-white w-full bottom-0">
          <div className=" px-[32px] py-[32px] h-[380px] flex flex-col items-center justify-center">
            <img
              className=" cursor-pointer"
              src={CheckCircle}
              alt=""
              onClick={() => setSuccessModal2(false)}
            />
            <p className="text-[16px] font-[400] text-grey500">
              Menu has been edited successfully
            </p>
          </div>
        </div>
      </MenuModal>
    </div>
  );
};

export default SettingsPage;
