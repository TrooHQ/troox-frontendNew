import { useState } from "react";
import CheckInput from "../../inputFields/CheckInput";
import RadioInput from "../../inputFields/RadioInput";
import info from "../../assets/info.svg";
import AddWhite from "../../assets/addWhite.svg";
import EditIcon from "../../assets/EditIcon.svg";
import imageIcon from "../../assets/image.svg";
import MenuIcon from "../../assets/MenuIcon2.svg";
import CheckCircle from "../../assets/check_circle.svg";
import WarningIcon from "../../assets/WarningModal.svg";
import DeleteSuccess from "../../assets/DeleteSuccess.svg";
import Trash from "../../assets/delete.svg";
import { Link } from "react-router-dom";
import CustomInput from "../../inputFields/CustomInput";
import MenuModal from "../MenuModal";
import Back from "../../assets/Cancel.svg";

const MenuSettings = () => {
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

  const [successModal2, setSuccessModal2] = useState(false);
  const [email, setEmail] = useState<string>("");
  const [editModal, setEditModal] = useState(false);
  const [editItem, setEditItem] = useState(false);
  const [addCategory, setAddCategoryModal] = useState(false);
  const [warningModal2, setWarningModal2] = useState(false);
  const [infoModal, setInfoModal] = useState(false);
  const [removeMenuModal, setRemoveMenuModal] = useState(false);
  const [addModifierModal, setAddModifierModal] = useState(false);
  const [successModal, setSuccessModal] = useState(false);
  const [deleteSuccessfullModal2, setDeleteSuccessfullModal2] = useState(false);

  const [selectedOption, setSelectedOption] = useState<string>("");

  const handleInfoModal = () => {
    setInfoModal(!infoModal);
  };
  const handleOptionChange = (option: string) => {
    setSelectedOption(option);
  };
  // const handleAddMenuCategory = () => {
  //   setAddModifierModal(true);
  // };

  const handleWarningModal2 = () => {
    setRemoveMenuModal(false);
    setWarningModal2(true);
  };
  const handleEditModal = () => {
    setEditModal(true);
  };
  const handleEditMenu = () => {
    setEditModal(false);
    setEditItem(true);
  };
  const handleEditSuccessModal = () => {
    setAddCategoryModal(false);
    setEditItem(false);
    setSuccessModal2(true);
  };
  const handleAddMenuItem = () => {
    setAddModifierModal(false);
    setEditItem(false);
    setAddCategoryModal(true);
  };
  const handleRemoveMenuModal = () => {
    setRemoveMenuModal(true);
  };

  const handleSuccessModal = () => {
    setAddCategoryModal(false);
    setEditItem(false);
    setSuccessModal(true);
  };

  const handleDeleteSuccessModal2 = () => {
    setWarningModal2(false);
    setDeleteSuccessfullModal2(true);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    console.log("Selected file:", file);
  };
  return (
    <div>
      <div className="bg-[#F3EBE8] p-[24px] rounded-[5px] mt-[24px]">
        <div className="flex items-center justify-between ">
          <div className="flex items-center gap-[16px]">
            <img src={MenuIcon} alt="" />
            <p className="text-grey500 text-[20px]">Menu</p>
          </div>
        </div>

        <div className="ml-[36px] grid gap-[24px] my-[24px]">
          <Link to="/demo/menu/troo-portal">
            <p className="text-grey300 text-[16px] cursor-pointer">Add Menu</p>
          </Link>
          <p
            className="text-grey300 text-[16px] cursor-pointer"
            onClick={handleRemoveMenuModal}
          >
            Remove Menu
          </p>
          <p
            className="text-grey300 text-[16px] cursor-pointer"
            onClick={handleEditModal}
          >
            Edit Menu
          </p>
        </div>
      </div>

      <MenuModal
        isOpen={addModifierModal}
        onClose={() => setAddModifierModal(false)}
      >
        <div className="  w-full py-[32px] px-[16px] absolute bottom-0  bg-white">
          <div className=" ">
            <div className=" flex relative items-center justify-between mb-[16px]">
              <p className=" text-[20px]  font-[400] text-grey500">
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
                  <p className=" text-[14px] font-[400] text-grey500">
                    New Menu allows you create a new menu category where other
                    food items can be added to it.
                  </p>
                  <p className=" text-[14px] font-[400] text-grey500">
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
              <p className=" text-grey500 text-[16px] font-[400]">
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
        isOpen={removeMenuModal}
        onClose={() => setRemoveMenuModal(false)}
      >
        <div className="w-full py-[32px] px-[16px] absolute bottom-0 bg-white rounded-tr-[20px] rounded-tl-[20px]">
          <div
            className=" cursor-pointer flex items-center justify-end"
            onClick={() => setRemoveMenuModal(false)}
          >
            <img src={Back} alt="" />
          </div>
          <p className="text-[20px] font-[400] text-grey500">Remove menu</p>
          <div className=" mt-[24px] grid gap-[16px]">
            {menu.map((user) => (
              <div
                className=" py-[14px] px-[16px] border rounded-[5px] flex items-center justify-between"
                key={user.id}
              >
                <p className=" text-grey500 text-[14px] font-[400]">
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

      <MenuModal isOpen={editModal} onClose={() => setEditModal(false)}>
        <div className="w-full py-[32px] px-[16px] absolute bottom-0 bg-white rounded-tr-[20px] rounded-tl-[20px]">
          <div
            className=" cursor-pointer flex items-center justify-end"
            onClick={() => setEditModal(false)}
          >
            <img src={Back} alt="" />
          </div>
          <p className="text-[20px] font-[400] text-grey500">
            Edit menu category
          </p>
          <div className=" mt-[24px] grid gap-[16px]">
            {menu.map((menuItem) => (
              <div
                className=" py-[14px] px-[16px] border rounded-[5px] flex items-center justify-between"
                key={menuItem.id}
              >
                <p className=" text-grey500 text-[14px] font-[400]">
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
            <h2 className=" mb-[16px] text-grey500 font-[400] text-[20px]">
              Edit Menu Category
            </h2>
            <CustomInput
              type="text"
              label="Soups"
              value={email}
              onChange={(newValue) => setEmail(newValue)}
            />
            <div className=" grid gap-[8px] my-[16px]">
              <p className=" text-grey500 text-[16px] font-[400]">
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

      <MenuModal
        isOpen={addCategory}
        onClose={() => setAddCategoryModal(false)}
      >
        <div className="  w-full py-[32px] px-[16px] absolute bottom-0  bg-white">
          <div className=" ">
            <p className=" text-[20px]  font-[400] text-grey500 mb-[16px]">
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
                <p className=" text-[18px] mb-[8px] font-[500] text-grey500">
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
    </div>
  );
};

export default MenuSettings;
