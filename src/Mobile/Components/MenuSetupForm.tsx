import Logo from "../../assets/trooLogo.svg";
import { Link } from "react-router-dom";
import AddWhite from "../../assets/addWhite.svg";
import info from "../assets/info.svg";
import CheckCircle from "../assets/check_circle.svg";
import { useEffect, useState } from "react";
import CustomInput from "../inputFields/CustomInput";
import Cancel from "../assets/Cancel.svg";
import imageIcon from "../assets/image.svg";
import Skip from "../assets/skip.svg";
import Arrow from "../assets/arrow.png";
import MenuModal from "./MenuModal";
import { SERVER_DOMAIN } from "../../Api/Api";
import axios from "axios";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

interface MenuItem {
  title: string;
  link: string;
}

interface MenuCategory {
  category: string;
  items: MenuItem[];
  name: string;
  _id: string;
  menu_category_name: string;
  menu_group_name: string;
  menu_item_name: string;
  modifier_name: string;
  modifier_price: string;
}
interface Props {
  menuData?: MenuCategory[];
}

const MenuSetupForm: React.FC<Props> = () => {
  const [expandedCategories, setExpandedCategories] = useState<{
    [key: string]: boolean;
  }>({});

  const [expandedGroups, setExpandedGroups] = useState<{
    [key: string]: boolean;
  }>({});

  const [expandedItem, setExpandedItem] = useState<{
    [key: string]: boolean;
  }>({});
  const [menuData, setMenuData] = useState<MenuCategory[]>([]);
  const [menuGroup, setMenuGroup] = useState<MenuCategory[]>([]);
  const [items, setItems] = useState<MenuCategory[]>([]);
  const [modifiers, setModifiers] = useState<MenuCategory[]>([]);
  const [menuCategory, setMenuCategory] = useState<string>("");
  const [openCategory, setOpenCategory] = useState<string>("");
  const [openGroup, setOpenGroup] = useState<string>("");
  const [openItem, setOpenItem] = useState<string>("");
  const [menuItem, setMenuItem] = useState<string>("");
  const [menuItemPrice, setMenuItemPrice] = useState<string>("");
  const [modifierName, setModifierName] = useState<string>("");
  const [modifierPrice, setModifierPrice] = useState<string>("");
  const [menuItemModal, setMenuItemModal] = useState(false);
  const [modifierModal, setModifierModal] = useState(false);

  const [menuGroupName, setMenuGroupName] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [successModal, setSuccessModal] = useState(false);
  const [addCategory, setAddCategoryModal] = useState(false);
  const [addGroupModal, setAddGroupModal] = useState(false);
  const [infoModal, setInfoModal] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedOption, setSelectedOption] = useState("no");
  const [pricings, setPricing] = useState("no");

  const [loading, setLoading] = useState(false);

  const [menuGroupError, setMenuGroupError] = useState("");
  const [menuItemError, setMenuItemError] = useState("");
  const [modifierError, setModifierError] = useState("");
  const [error, setError] = useState("");

  const [base64String, setBase64String] = useState<string | null>(null);

  const toggleCategory = (categoryId: string | number) => {
    setExpandedCategories((prevState) => {
      const newState = { ...prevState };
      Object.keys(newState).forEach((key) => {
        newState[key] = false;
      });
      newState[categoryId] = !prevState[categoryId];

      const categoryName = Object.keys(newState).find(
        (key) => newState[key] === true
      );
      if (categoryName) {
        setOpenCategory(categoryName);
        console.log("Currently open category:", categoryName);
      }

      return newState;
    });
  };

  const toggleGroup = (groupName: string) => {
    setExpandedGroups((prevState) => {
      const newState = { ...prevState };
      newState[groupName] = !prevState[groupName];
      console.log("New state:", newState);
      return newState;
    });

    setOpenGroup(groupName);
    console.log(groupName);
    getMenuItem(groupName);
  };

  const toggleItem = (itemName: string) => {
    setExpandedItem((prevState) => {
      const updatedState: { [key: string]: boolean } = {};

      updatedState[itemName] = !prevState[itemName];

      console.log("Updated State:", updatedState);
      return updatedState;
    });

    setOpenItem(itemName);
    console.log("Toggled item:", openItem);
  };

  useEffect(() => {
    if (openItem !== null) {
      getModifier();
    }
  }, [expandedItem, openItem]);

  const handleOptionChange = (option: string) => {
    setSelectedOption(option);
  };

  const handlePriceChange2 = (option: string) => {
    setPricing(option);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onload = function (event) {
        const base64 = event.target?.result as string;
        setBase64String(base64);
        console.log("Base64 representation:", base64);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddGroupModal = () => {
    setAddGroupModal(true);
  };

  const handleAddCategoryModal = () => {
    setAddCategoryModal(true);
  };
  const handleCloseAddCategoryModal = () => {
    setAddCategoryModal(false);
    setInfoModal(false);
  };
  const handleCloseAddGroupModal = () => {
    setAddGroupModal(false);
    setInfoModal(false);
    setMenuItemModal(false);
  };
  const handleAddMenuItem = () => {
    setMenuItemModal(true);
  };

  const handleInfoModal = () => {
    setInfoModal(!infoModal);
  };

  const userDetails = useSelector((state: RootState) => state.user);
  const businessType = userDetails?.userData?.business_type;
  const id = userDetails?.userData?.id;
  const token = userDetails?.userData?.token;
  const hasMenu = userDetails?.userData?.has_created_menu_item;
  console.log(userDetails);

  const createCategory = async () => {
    if (!menuCategory) {
      setError("Add a Menu Category");
      console.log(menuCategory);
      return;
    }
    const headers = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      setLoading(true);

      const response = await axios.post(
        `${SERVER_DOMAIN}/menu/addMenuCategory`,
        {
          menu_category_name: menuCategory,
          user_id: id,
          image: base64String,
        },
        headers
      );
      console.log("menu Category added successfully:", response.data);
      toast.success(response.data.message);
      setAddCategoryModal(false);
      window.location.reload();
    } catch (error: any) {
      console.error("Error adding Menu Category:", error);
      console.log(token);

      if (error.response) {
        setError(error.response.data.message);
      } else {
        setError("An error occurred. Please try again later.");
      }
    }
    setLoading(false);
  };

  const createItem = async () => {
    if (!menuItem || !menuItemPrice) {
      setMenuItemError("Add Menu Item Name");
      return;
    }
    const headers = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      setLoading(true);

      const response = await axios.post(
        `${SERVER_DOMAIN}/menu/addMenuItem`,
        {
          menu_category_name: openCategory,
          menu_group_name: openGroup,
          menu_item_name: menuItem,
          price: menuItemPrice || price,
          image: base64String,
        },
        headers
      );
      console.log("menu item added successfully:", response.data);
      toast.success(response.data.message);
      setMenuItemModal(false);
      window.location.reload();
    } catch (error: any) {
      console.error("Error adding Menu Category:", error);
      console.log(token);

      if (error.response) {
        setError(error.response.data.message);
        // toast.error(error.response.data.message);
        setMenuItemError(error.response.data.message);
      } else {
        setError("An error occurred. Please try again later.");
      }
    }
    setLoading(false);
  };

  const createGroup = async () => {
    if (!menuGroupName) {
      setMenuGroupError("Add Menu Group Name");
      return;
    }
    const headers = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      setLoading(true);

      const response = await axios.post(
        `${SERVER_DOMAIN}/menu/addMenuGroup`,
        {
          category_name: openCategory,
          group_name: menuGroupName,
          price_to_all_items: pricings === "yes" ? true : false,
          price: price || 0,
        },
        headers
      );
      console.log("menu Category added successfully:", response.data);
      toast.success(response.data.message);
      setAddGroupModal(false);
      window.location.reload();
    } catch (error: any) {
      console.error("Error adding Menu Category:", error);
      console.log(token);

      if (error.response) {
        setError(error.response.data.message);
        // toast.error(error.response.data.message);
        setMenuGroupError(error.response.data.message);
      } else {
        setError("An error occurred. Please try again later.");
      }
    }
    setLoading(false);
  };

  const getMenuCategory = async () => {
    const headers = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      setLoading(true);

      const response = await axios.get(
        `${SERVER_DOMAIN}/menu/getAllMenuCategory`,
        headers
      );
      console.log("menu Category retrieved successfully:", response.data.data);

      setMenuData(response.data.data);
    } catch (error: any) {
      console.error("Error adding Menu Category:", error);
      console.log(token);

      if (error.response) {
        setError(error.response.data.message);
      } else {
        setError("An error occurred. Please try again later.");
      }
    }
    setLoading(false);
  };

  const getMenuGroup = async () => {
    const headers = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      setLoading(true);

      const response = await axios.get(
        `${SERVER_DOMAIN}/menu/getAllMenuGroup`,
        headers
      );
      console.log("Menu Group retrieved successfully:", response.data.data);
      setMenuGroup(response.data.data);

      response.data.data.forEach(async (menuItem: { name: string }) => {
        const menuGroupName = menuItem.name;
        console.log(menuGroupName);
        await getMenuItem(menuGroupName);
      });
    } catch (error: any) {
      console.error("Error retrieving Menu Group:", error);
      console.log(token);

      if (error.response) {
        setError(error.response.data.message);
      } else {
        setError("An error occurred. Please try again later.");
      }
    }
    setLoading(false);
  };

  const getMenuItem = async (openGroup: string) => {
    const headers = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      setLoading(true);

      const response = await axios.get(
        `${SERVER_DOMAIN}/menu/filterMenuItems/?menu_group_name=${openGroup}`,
        headers
      );
      console.log("Menu Items retrieved successfully:", response.data);

      setItems(response.data.data);
    } catch (error: any) {
      console.error("Error retrieving Menu Items:", error);
      console.log(token);

      if (error.response) {
        setError(error.response.data.message);
      } else {
        setError("An error occurred. Please try again later.");
      }
    }
    setLoading(false);
  };

  const getModifier = async () => {
    const headers = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      setLoading(true);

      const response = await axios.get(
        `${SERVER_DOMAIN}/menu/getMenuModifier/?attach_to=item&name=${openItem}`,
        headers
      );
      console.log("Modifier retrieved successfully:", response.data);

      setModifiers(response.data.data);
    } catch (error: any) {
      console.error("Error retrieving Modifiers:", error);
      console.log(token);

      if (error.response) {
        setError(error.response.data.message);
      } else {
        setError("An error occurred. Please try again later.");
      }
    }
    setLoading(false);
  };

  const createModifier = async () => {
    if (!modifierName || !base64String || !modifierPrice) {
      setModifierError("All fields are required");
      return;
    }
    const headers = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      setLoading(true);

      const response = await axios.post(
        `${SERVER_DOMAIN}/menu/addMenuModifier`,
        {
          attach_to: "item",
          modifier_name: modifierName,
          menu_item_name: openItem,
          price: modifierPrice,
          image: base64String,
        },
        headers
      );
      console.log("Modifier added successfully:", response.data);
      toast.success(response.data.message);
      setModifierModal(false);
      // window.location.reload();
    } catch (error: any) {
      console.error("Error adding modifier:", error);
      console.log(token);

      if (error.response) {
        setError(error.response.data.message);
        // toast.error(error.response.data.message);
        setModifierError(error.response.data.message);
      } else {
        setError("An error occurred. Please try again later.");
      }
    }
    setLoading(false);
  };
  useEffect(() => {
    getMenuCategory();
    getMenuGroup();
    getMenuItem(menuGroupName);
  }, []);

  return (
    <div className=" bg-[#EFEFEF]  relative h-full">
      <div className=" mx-10">
        <div className=" py-[48px] flex items-center justify-center">
          <img src={Logo} alt="" />
        </div>

        <div className=" ">
          {hasMenu === false && (
            <p className=" text-grey500 text-[14px] my-[24px]">
              Stage 2/ <span className="text-[20px]"> Menu Setup</span>{" "}
            </p>
          )}
          <p
            className=" text-[#5855B3] text-[14px] font-[400] flex items-center cursor-pointer"
            onClick={handleAddCategoryModal}
          >
            <img src={AddWhite} alt="" />
            Add new menu category
          </p>

          <div>
            {menuData.map((category, index) => (
              <div key={index}>
                <div
                  className="flex items-center justify-between cursor-pointer px-[10px] py-[16px] bg-gray-100 my-2"
                  onClick={() => toggleCategory(category.name)}
                >
                  <h3>{category.name}</h3>
                  <img
                    src={Arrow}
                    alt=""
                    style={{
                      transform: expandedCategories[category.name]
                        ? "rotate(180deg)"
                        : "rotate(0deg)",
                      transition: "transform 0.3s ease",
                    }}
                  />
                </div>
                {expandedCategories[category.name] && (
                  <div className="">
                    <p
                      className=" text-[#5855B3] py-[11px] px-[4px] text-[14px] font-[400] flex items-center cursor-pointer"
                      onClick={handleAddGroupModal}
                    >
                      <img src={AddWhite} alt="" />
                      Add Menu Group
                    </p>
                    <p
                      className=" text-[#5855B3] py-[11px] px-[4px] text-[14px] font-[400] flex items-center cursor-pointer"
                      onClick={handleAddMenuItem}
                    >
                      <img src={AddWhite} alt="" />
                      Add menu item
                    </p>
                    <div className="">
                      {menuGroup.map((group, index) => (
                        <div className="" key={index}>
                          {group.menu_category_name === openCategory && (
                            <div className="">
                              <div
                                className="flex items-center justify-between cursor-pointer py-[16px]"
                                onClick={() => toggleGroup(group.name)}
                              >
                                <h3 className=" ">{group.name}</h3>
                                <img
                                  src={Arrow}
                                  alt=""
                                  style={{
                                    transform: expandedGroups[group.name]
                                      ? "rotate(180deg)"
                                      : "rotate(0deg)",
                                    transition: "transform 0.3s ease",
                                  }}
                                />
                              </div>
                              {expandedGroups[group.name] && (
                                <div className=" ">
                                  <div className=" pl-[20px]">
                                    {items.map((item, index) => (
                                      <div className="" key={index}>
                                        {group.name ===
                                          item.menu_group_name && (
                                          <div
                                            className="flex items-center justify-between"
                                            onClick={() =>
                                              toggleItem(item.menu_item_name)
                                            }
                                            style={{ cursor: "pointer" }}
                                          >
                                            <p className=" font-[500] py-[8px]">
                                              {item.menu_item_name}
                                            </p>
                                            <img
                                              src={Arrow}
                                              alt=""
                                              style={{
                                                transform: expandedItem[
                                                  item.menu_item_name
                                                ]
                                                  ? "rotate(180deg)"
                                                  : "rotate(0deg)",
                                                transition:
                                                  "transform 0.3s ease",
                                              }}
                                            />
                                          </div>
                                        )}

                                        {expandedItem[item.menu_item_name] && (
                                          <div
                                            className=" grid gap-[10px]"
                                            onClick={() =>
                                              setModifierModal(true)
                                            }
                                          >
                                            {modifiers
                                              .filter(
                                                (modifier) =>
                                                  modifier.menu_item_name ===
                                                  item.menu_item_name
                                              )
                                              .map((modifier, index) => (
                                                <div
                                                  key={index}
                                                  className=" flex items-center justify-between  bg-slate-50 p-[8px]"
                                                >
                                                  <p className=" ">
                                                    {modifier.modifier_name}
                                                  </p>
                                                  <p>
                                                    &#x20A6;
                                                    {modifier.modifier_price}
                                                  </p>
                                                </div>
                                              ))}
                                            <p className="text-[#5855B3] py-[11px] px-[4px] text-[14px] font-[400] flex items-center cursor-pointer">
                                              <img src={AddWhite} alt="" />
                                              Add Modifier
                                            </p>
                                          </div>
                                        )}
                                      </div>
                                    ))}
                                  </div>
                                  <div className="">
                                    <p
                                      className=" text-[#5855B3] py-[11px] px-[4px] text-[14px] font-[400] flex items-center cursor-pointer"
                                      onClick={handleAddMenuItem}
                                    >
                                      <img src={AddWhite} alt="" />
                                      Add Menu item
                                    </p>
                                  </div>
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className=" grid py-[32px] gap-[8px]">
            {hasMenu === false && (
              <div
                className={`${
                  menuData?.length > 0 ? " bg-purple500" : "bg-[#B6B6B6]"
                } text-[16px] font-[500] text-[#ffffff] border w-full text-center py-3 rounded`}
              >
                {menuData?.length > 0 ? (
                  <Link
                    to={`${
                      businessType === "Hotel & Lodgings"
                        ? "/demo/room/troo-portal"
                        : "/demo/table/troo-portal"
                    }`}
                  >
                    <p>Save and continue</p>
                  </Link>
                ) : (
                  <p>Save and continue</p>
                )}
              </div>
            )}

            <Link
              to={`${hasMenu === false ? "/" : "/demo/dashboard/troo-portal"}`}
            >
              <button className=" text-[16px] font-[500] text-[#929292] border border-[#B6B6B6] w-full text-center py-3 rounded">
                {hasMenu === false ? "Cancel" : "Back"}
              </button>
            </Link>
          </div>
        </div>
      </div>

      <MenuModal
        isOpen={addCategory}
        onClose={() => setAddCategoryModal(false)}
      >
        <div className=" fixed top-1/3  left-0 w-full  z-50 py-[32px] px-[21px] bg-white rounded-tl-[20px] rounded-tr-[20px]">
          <div className=" ">
            <p className=" text-red-500">{error}</p>
            <div
              className=" flex items-center justify-end cursor-pointer"
              onClick={handleCloseAddCategoryModal}
            >
              <img src={Cancel} alt="" />
            </div>
            <div className="relative flex items-end gap-[5px] mb-[12px]">
              <p className=" text-[20px]  font-[400] text-grey500 ">
                New menu category
              </p>
              <img
                src={info}
                alt=""
                className=" cursor-pointer"
                onClick={handleInfoModal}
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

            <div className=" grid gap-[16px]">
              <CustomInput
                type="text"
                label="Menu Category name"
                value={menuCategory}
                onChange={(newValue) => setMenuCategory(newValue)}
              />
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
                      required
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
                    <p>{selectedFile?.name}</p>
                  </div>
                </div>
              </div>
            </div>
            {base64String && menuCategory && (
              <div className="border border-purple500 cursor-pointer text-center bg-purple500 rounded px-[24px] py-[10px] font-[500] text-[#ffffff] mt-[72px]">
                <button
                  className="text-[16px]"
                  type="submit"
                  disabled={loading}
                  onClick={() => createCategory()}
                >
                  {loading ? "Creating Menu" : "Save"}
                </button>
              </div>
            )}
          </div>
        </div>
      </MenuModal>

      <MenuModal isOpen={addGroupModal} onClose={() => setAddGroupModal(false)}>
        <div className="  w-full py-[32px] px-[16px] absolute bottom-0  bg-white rounded-tr-[20px] rounded-tl-[20px]">
          <div className=" ">
            <p className=" text-red-500">{menuGroupError}</p>
            <div
              className=" flex items-center justify-end cursor-pointer"
              onClick={handleCloseAddGroupModal}
            >
              <img src={Cancel} alt="" />
            </div>
            <div className=" flex relative items-center gap-[5px] mb-[16px]">
              <p className=" text-[20px]  font-[400] text-grey500">
                New Menu Group
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

            <CustomInput
              type="text"
              label="Menu Group Name"
              value={menuGroupName}
              onChange={(newValue) => setMenuGroupName(newValue)}
            />
            <div className=" grid gap-[8px] my-[16px]">
              <div className="">
                <p className=" text-[#606060] text-[14px] font-[400]">
                  Do you want all the menu items under this menu group to have
                  the same price?
                </p>

                <div className=" flex items-center gap-[16px]">
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
                  <div className=" mb-[18px]">
                    <CustomInput
                      type="text"
                      label="Enter Price"
                      value={price}
                      onChange={(newValue) => setPrice(newValue)}
                    />
                  </div>
                )}
              </div>

              <div className="">
                <p className=" text-[#606060] text-[14px] font-[400] mb-[10px]">
                  Do you want to add a Modifier to this Menu?
                </p>

                <div className=" flex items-center gap-[16px] ">
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
              </div>

              {selectedOption === "yes" && (
                <div>
                  <CustomInput
                    type="text"
                    label="Enter modifier name"
                    value={menuGroupName}
                    onChange={(newValue) => setMenuGroupName(newValue)}
                  />
                </div>
              )}
            </div>
            <div
              className="border border-purple500 cursor-pointer text-center bg-purple500 rounded px-[24px] py-[10px] font-[500] text-[#ffffff] "
              onClick={createGroup}
            >
              <button className="text-[16px]" type="submit" disabled={loading}>
                {loading ? "Creating Menu" : "Save"}
              </button>
            </div>
          </div>
        </div>
      </MenuModal>

      <MenuModal isOpen={menuItemModal} onClose={() => setMenuItemModal(false)}>
        <div className="  w-full py-[32px] px-[16px] absolute bottom-0  bg-white">
          <div className=" ">
            <p className=" text-red-500">{menuItemError}</p>
            <div
              className=" flex items-center justify-end cursor-pointer"
              onClick={handleCloseAddGroupModal}
            >
              <img src={Cancel} alt="" />
            </div>
            <p className=" text-[20px]  font-[400] text-grey500 mb-[16px]">
              New menu Item
            </p>

            <div className=" grid gap-[16px] ">
              <CustomInput
                type="text"
                label="Menu item name"
                value={menuItem}
                onChange={(newValue) => setMenuItem(newValue)}
              />

              <CustomInput
                type="text"
                label="Menu item price"
                value={menuItemPrice}
                onChange={(newValue) => setMenuItemPrice(newValue)}
              />
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
                    <p>{selectedFile?.name}</p>
                  </div>
                </div>
              </div>
            </div>
            {!loading && (
              <div
                className="border border-purple500 cursor-pointer text-center bg-purple500 rounded px-[24px]  py-[10px] font-[500] text-[#ffffff] mt-[34px]"
                onClick={createItem}
              >
                <button className=" text-[16px] ">Save</button>
              </div>
            )}
          </div>
        </div>
      </MenuModal>

      <MenuModal isOpen={modifierModal} onClose={() => setModifierModal(false)}>
        <div className="  w-full py-[32px] px-[16px] absolute bottom-0  bg-white">
          <div className=" ">
            <p className=" text-red-500">{modifierError}</p>
            <div
              className=" flex items-center justify-end cursor-pointer"
              onClick={() => setModifierModal(false)}
            >
              <img src={Cancel} alt="" />
            </div>
            <p className=" text-[20px]  font-[400] text-grey500 mb-[16px]">
              Add Modifier
            </p>

            <div className=" grid gap-[20px]">
              <CustomInput
                type="text"
                label="Modifier Name"
                value={modifierName}
                onChange={(newValue) => setModifierName(newValue)}
              />
              <CustomInput
                type="text"
                label="Modifier Price"
                value={modifierPrice}
                onChange={(newValue) => setModifierPrice(newValue)}
              />
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
                      required
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
                    <p>{selectedFile?.name}</p>
                  </div>
                </div>
              </div>
            </div>
            {base64String && (
              <div
                className="border border-purple500 cursor-pointer text-center bg-purple500 rounded px-[24px]  py-[10px] font-[500] text-[#ffffff] mt-[34px]"
                onClick={createModifier}
              >
                <button className=" text-[16px] ">Save</button>
              </div>
            )}
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
              Menu has been setup successfully
            </p>
          </div>
        </div>
      </MenuModal>

      {hasMenu === false && (
        <div className=" absolute bottom-10 right-10 ">
          <Link
            to={`${businessType === "Hotel & Lodgings" ? "/room" : "/table"}`}
          >
            <div className="flex items-end gap-[5px]">
              <p className=" text-[#5855B3] text-[18px] leading-[24px] font-400">
                Continue
                {/* Skip this part for now */}
              </p>
              <img src={Skip} alt="" />
            </div>{" "}
          </Link>
        </div>
      )}
    </div>
  );
};

export default MenuSetupForm;
