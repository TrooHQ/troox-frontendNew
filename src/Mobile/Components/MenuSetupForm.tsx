import Logo from "../../assets/trooLogo.svg";
import { Link } from "react-router-dom";
import AddWhite from "../../assets/addWhite.svg";
import info from "../assets/info.svg";
import CheckCircle from "../assets/check_circle.svg";
import { useState } from "react";
import CheckInput from "../inputFields/CheckInput";
import CustomInput from "../inputFields/CustomInput";
import RadioInput from "../inputFields/RadioInput";
import imageIcon from "../assets/image.svg";
import Arrow from "../assets/arrow.png";
import MenuModal from "./MenuModal";

const menuData = [
  {
    category: "Soups",
    items: [
      { title: "Egusi Soup", link: "/egusi" },
      { title: "Okra  Soup", link: "/okra" },
      { title: "Ogbono Soup", link: "/ogbono" },
      { title: "White Soup", link: "/white" },
    ],
  },
];

interface MenuItem {
  title: string;
  link: string;
}

interface MenuCategory {
  category: string;
  items: MenuItem[];
}

interface Props {
  menuData: MenuCategory[];
}

const MenuSetupForm = () => {
  const [expandedCategories, setExpandedCategories] = useState<{
    [key: string]: boolean;
  }>({});

  const toggleCategory = (category: string) => {
    setExpandedCategories((prevState) => ({
      ...prevState,
      [category]: !prevState[category],
    }));
  };
  const [email, setEmail] = useState<string>("");
  const options = ["yes", "no"];
  const [addModifierModar, setAddModifierModal] = useState(false);
  const [successModal, setSuccessModal] = useState(false);
  const [addCategory, setAddCategoryModay] = useState(false);
  const [infoModal, setInfoModal] = useState(false);
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    console.log("Selected file:", file);
  };
  const handleAddMenuCategory = () => {
    setAddModifierModal(true);
  };
  const handleSuccessModal = () => {
    setAddCategoryModay(false);
    setSuccessModal(true);
  };
  const handleAddMenuItem = () => {
    setAddModifierModal(false);
    setAddCategoryModay(true);
  };
  const handleInfoModal = () => {
    setInfoModal(!infoModal);
  };
  return (
    <div className=" bg-[#EFEFEF] h-screen">
      <div className=" mx-10">
        <div className=" py-[48px] flex items-center justify-center">
          <img src={Logo} alt="" />
        </div>

        <>
          <p className=" text-[#121212] text-[14px] my-[24px]">
            Stage 2/ <span className="text-[20px]"> Menu Setup</span>{" "}
          </p>
          <p
            className=" text-[#5855B3] text-[14px] font-[400] flex items-center cursor-pointer"
            onClick={handleAddMenuCategory}
          >
            <img src={AddWhite} alt="" />
            Add new menu category
          </p>

          <div>
            {menuData.map((category, index) => (
              <div key={index}>
                <div
                  className="flex items-center justify-between cursor-pointer py-[16px]"
                  onClick={() => toggleCategory(category.category)}
                >
                  <h3>{category.category}</h3>
                  <img
                    src={Arrow}
                    alt=""
                    style={{
                      transform: expandedCategories[category.category]
                        ? "rotate(180deg)"
                        : "rotate(0deg)",
                      transition: "transform 0.3s ease",
                    }}
                  />
                </div>
                {expandedCategories[category.category] && (
                  <ul className=" ">
                    {category.items.map((item, i) => (
                      <li
                        key={i}
                        className=" py-[16px] border-b-2 border-b-grey100"
                      >
                        <Link to={item.link}>{item.title}</Link>
                      </li>
                    ))}
                    <p
                      className=" text-[#5855B3] py-[11px] px-[4px] text-[14px] font-[400] flex items-center cursor-pointer"
                      onClick={handleAddMenuItem}
                    >
                      <img src={AddWhite} alt="" />
                      Add new menu item
                    </p>
                  </ul>
                )}
              </div>
            ))}
          </div>
          <div className=" grid mt-[32px] gap-[8px]">
            <div
              className={`${
                menuData.length > 0 ? " bg-purple500" : "bg-[#B6B6B6]"
              } text-[16px] font-[500] text-[#ffffff] border w-full text-center py-3 rounded`}
            >
              {menuData.length > 0 ? (
                <Link to="/table">
                  <p>Save and continue</p>
                </Link>
              ) : (
                <p>Save and continue</p>
              )}
            </div>

            <Link to="/">
              <button className=" text-[16px] font-[500] text-[#929292] border border-[#B6B6B6] w-full text-center py-3 rounded">
                Cancel
              </button>
            </Link>
          </div>
        </>
      </div>

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
                <RadioInput options={options} />
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
        onClose={() => setAddCategoryModay(false)}
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
        <div className=" absolute bottom-0 bg-white w-full px-[32px] py-[32px]">
          <div className=" flex flex-col gap-[24px] items-center justify-center">
            <img
              src={CheckCircle}
              alt=""
              onClick={() => setSuccessModal(false)}
            />

            <p className="text-[16px] font-[400] text-grey500">
              Menu has been setup successfully
            </p>
          </div>
        </div>
      </MenuModal>
    </div>
  );
};

export default MenuSetupForm;
