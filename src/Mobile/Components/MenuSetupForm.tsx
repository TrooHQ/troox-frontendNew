import Logo from "../../assets/trooLogo.svg";
import { Link } from "react-router-dom";
import AddWhite from "../../assets/addWhite.svg";
import info from "../assets/info.svg";
import CheckCircle from "../assets/check_circle.svg";
import { useState } from "react";
import CustomInput from "../inputFields/CustomInput";
import imageIcon from "../assets/image.svg";
import Skip from "../assets/skip.svg";
// import Arrow from "../assets/arrow.png";
import MenuModal from "./MenuModal";
import RadioCustom from "../inputFields/RadioCustom";
import { SERVER_DOMAIN } from "../../Api/Api";
import axios from "axios";

const menuData = [
  // {
  //   category: "Soups",
  //   items: [
  //     { title: "Egusi Soup", link: "/egusi" },
  //     { title: "Okra  Soup", link: "/okra" },
  //     { title: "Ogbono Soup", link: "/ogbono" },
  //     { title: "White Soup", link: "/white" },
  //   ],
  // },
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
  menuData?: MenuCategory[];
}

const MenuSetupForm: React.FC<Props> = () => {
  // const [expandedCategories, setExpandedCategories] = useState<{
  //   [key: string]: boolean;
  // }>({});
  // const MenuSetupForm: React.FC<Props> = ({ menuData }) => {
  //   const [expandedCategories, setExpandedCategories] = useState<{
  //     [key: string]: boolean;
  //   }>({});

  // const toggleCategory = (category: string) => {
  //   setExpandedCategories((prevState) => ({
  //     ...prevState,
  //     [category]: !prevState[category],
  //   }));
  // };
  const [menuCategory, setMenuCategory] = useState<string>("");
  const [menuItem, setMenuItem] = useState<string>("");
  const [menuGroupName, setMenuGroupName] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [addModifierModar, setAddModifierModal] = useState(false);
  const [successModal, setSuccessModal] = useState(false);
  const [addCategory, setAddCategoryModal] = useState(false);
  const [infoModal, setInfoModal] = useState(false);

  const [selectedOption, setSelectedOption] = useState("no");
  const [pricings, setPricing] = useState("no");

  const [selectedMenuCategory, setSelectedMenuCategory] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [base64String, setBase64String] = useState<string | null>(null);

  const handleCategoryChange = (option: string) => {
    setSelectedMenuCategory(option);
  };
  const handleOptionChange = (option: string) => {
    setSelectedOption(option);
  };

  const handlePriceChange2 = (option: string) => {
    setPricing(option);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function (event) {
        const base64 = event.target?.result as string;
        setBase64String(base64);

        console.log("Base64 representation:", base64);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddMenuCategory = () => {
    setAddModifierModal(true);
  };
  // const handleSuccessModal = () => {
  //   setAddCategoryModal(false);
  //   setSuccessModal(true);
  // };
  const handleAddMenuItem = () => {
    if (!selectedMenuCategory && !menuCategory) {
      setError("You must pick a Menu category");
      return;
    }

    setError("");
    setAddModifierModal(false);
    setAddCategoryModal(true);
  };

  const handleInfoModal = () => {
    setInfoModal(!infoModal);
  };

  const businessType = sessionStorage.getItem("businessType");
  const token = sessionStorage.getItem("token");

  const createEmployee = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!selectedMenuCategory && !menuCategory && !price) {
      setError("You must input a Menu categorsssy");
      return;
    }

    if (!menuItem || !price) {
      setError("All fields Are required");
      console.log(selectedMenuCategory, menuGroupName, menuItem, price);
      return;
    }
    const price_to_all_items = pricings === "yes" ? true : false;
    const headers = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      setLoading(true);

      const response = await axios.post(
        `${SERVER_DOMAIN}/menu/createMenu`,
        {
          menu_category_name: selectedMenuCategory || menuCategory,
          menu_group_name: menuGroupName,
          price_to_all_items: price_to_all_items,
          menu_item_name: menuItem,
          price: Number(price),
          image: base64String,
        },
        headers
      );
      console.log("menu added successfully:", response.data);
    } catch (error: any) {
      console.error("Error adding Menu:", error);
      if (error.response) {
        setError(error.response.data.message);
      } else {
        setError("An error occurred. Please try again later.");
      }
    }
    setLoading(false);
  };
  return (
    <div className=" bg-[#EFEFEF] h-screen relative">
      <div className=" mx-10">
        <div className=" py-[48px] flex items-center justify-center">
          <img src={Logo} alt="" />
        </div>

        <div className=" ">
          <p className=" text-grey500 text-[14px] my-[24px]">
            Stage 2/ <span className="text-[20px]"> Menu Setup</span>{" "}
          </p>
          <p
            className=" text-[#5855B3] text-[14px] font-[400] flex items-center cursor-pointer"
            onClick={handleAddMenuCategory}
          >
            <img src={AddWhite} alt="" />
            Add new menu category
          </p>

          {/* <div>
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
          </div> */}
          <div className=" grid mt-[32px] gap-[8px]">
            <div
              className={`${
                menuData.length > 0 ? " bg-purple500" : "bg-[#B6B6B6]"
              } text-[16px] font-[500] text-[#ffffff] border w-full text-center py-3 rounded`}
            >
              {menuData.length > 0 ? (
                <Link
                  to={`${
                    businessType === "Hotel & Lodgings" ? "/room" : "/table"
                  }`}
                >
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
        </div>
      </div>

      <form onSubmit={createEmployee}>
        <MenuModal
          isOpen={addModifierModar}
          onClose={() => setAddModifierModal(false)}
        >
          <div className="  w-full py-[32px] px-[16px] absolute bottom-0  bg-white rounded-tr-[20px] rounded-tl-[20px]">
            <div className=" ">
              <p className=" text-red-500">{error}</p>

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
                <RadioCustom
                  text="Soups"
                  isSelected={selectedMenuCategory === "Soups"}
                  onSelect={handleCategoryChange}
                />
                <RadioCustom
                  text="Rice"
                  isSelected={selectedMenuCategory === "Rice"}
                  onSelect={handleCategoryChange}
                />
                <RadioCustom
                  text="Swallow"
                  isSelected={selectedMenuCategory === "Swallow"}
                  onSelect={handleCategoryChange}
                />
                <RadioCustom
                  text="Protein"
                  isSelected={selectedMenuCategory === "Protein"}
                  onSelect={handleCategoryChange}
                />
              </div>
              {!selectedMenuCategory && (
                <CustomInput
                  type="text"
                  label="Others"
                  value={menuCategory}
                  onChange={(newValue) => setMenuCategory(newValue)}
                />
              )}
              <div className=" grid gap-[8px] my-[16px]">
                <p className=" text-grey500 text-[16px] font-[400]">
                  Setup menu group
                </p>
                <p className=" text-[#606060] text-[14px] font-[400]">
                  Would you like to add a Menu group?
                </p>

                <div className=" flex items-center gap-[16px] mb-[16px]">
                  <label>
                    <input
                      type="radio"
                      value="yes"
                      checked={selectedOption === "yes"}
                      onChange={() => handleOptionChange("yes")}
                      className=" mr-[10px]"
                    />
                    Yes
                  </label>
                  <label>
                    <input
                      type="radio"
                      value="no"
                      checked={selectedOption === "no"}
                      onChange={() => handleOptionChange("no")}
                      className=" mr-[10px]"
                    />
                    No
                  </label>
                </div>

                {selectedOption === "yes" && (
                  <div>
                    <CustomInput
                      type="text"
                      label="Enter menu group name"
                      value={menuGroupName}
                      onChange={(newValue) => setMenuGroupName(newValue)}
                    />

                    <div className="">
                      <p className=" text-[#606060] text-[14px] font-[400] mt-[16px]">
                        Do you want this price to apply to all the items in this
                        menu?
                      </p>

                      <div className=" flex items-center gap-[16px] mb-[16px]">
                        <label>
                          <input
                            type="radio"
                            value="yes"
                            checked={pricings === "yes"}
                            onChange={() => handlePriceChange2("yes")}
                            className=" mr-[10px]"
                          />
                          Yes
                        </label>
                        <label className=" ">
                          <input
                            type="radio"
                            value="no"
                            checked={pricings === "no"}
                            onChange={() => handlePriceChange2("no")}
                            className=" mr-[10px]"
                          />
                          No
                        </label>
                      </div>
                      {pricings === "yes" && (
                        <CustomInput
                          type="text"
                          label="Enter Price"
                          value={price}
                          onChange={(newValue) => setPrice(newValue)}
                        />
                      )}
                    </div>
                  </div>
                )}
              </div>
              <p
                className=" text-[#5855B3] py-[11px] px-[4px] text-[14px] font-[400] flex items-center cursor-pointer"
                onClick={handleAddMenuItem}
              >
                <img src={AddWhite} alt="" />
                Add new menu item
              </p>
            </div>
          </div>
        </MenuModal>

        <MenuModal
          isOpen={addCategory}
          onClose={() => setAddCategoryModal(false)}
        >
          <div className="  w-full py-[32px] px-[16px] absolute bottom-0  bg-white rounded-tl-[20px] rounded-tr-[20px]">
            <div className=" ">
              <p className=" text-red-500">{error}</p>

              <p className=" text-[20px]  font-[400] text-grey500 mb-[16px]">
                New menu Item
              </p>

              <div className=" grid gap-[16px]">
                <CustomInput
                  type="text"
                  label="Menu item name"
                  value={menuItem}
                  onChange={(newValue) => setMenuItem(newValue)}
                />

                {pricings === "no" && (
                  <CustomInput
                    type="text"
                    label="Enter Price"
                    value={price}
                    onChange={(newValue) => setPrice(newValue)}
                  />
                )}
              </div>
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
              <div className="border border-purple500 cursor-pointer text-center bg-purple500 rounded px-[24px] py-[10px] font-[500] text-[#ffffff] mt-[72px]">
                <button
                  className="text-[16px]"
                  type="submit"
                  disabled={loading}
                >
                  {loading ? "Creating Menu" : "Save"}
                </button>
              </div>
            </div>
          </div>
        </MenuModal>
      </form>

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
              Menu has been setup successfully
            </p>
          </div>
        </div>
      </MenuModal>

      <div className=" absolute bottom-10 right-10 ">
        <Link
          to={`${businessType === "Hotel & Lodgings" ? "/room" : "/table"}`}
        >
          <div className="flex items-end gap-[5px]">
            <p className=" text-[#5855B3] text-[18px] leading-[24px] font-400">
              Skip this part for now
            </p>
            <img src={Skip} alt="" />
          </div>{" "}
        </Link>
      </div>
    </div>
  );
};

export default MenuSetupForm;
