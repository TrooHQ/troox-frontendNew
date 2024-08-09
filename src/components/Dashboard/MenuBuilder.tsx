import DashboardLayout from "./DashboardLayout";
import TopMenuNav from "./TopMenuNav";
import Add from "../../assets/add.svg";
import CheckCircle from "../../assets/check_circle.svg";
import Close from "../../assets/closeIcon.svg";
import PublishIcon from "../../assets/publishIcon.svg";
import AddWhite from "../../assets/addWhite.svg";
import Publish from "../../assets/publish.svg";
import chevron_right from "../../assets/chevron_right.svg";
import imageIcon from "../../assets/image.svg";
import activeArrow from "../../assets/activeArrow.svg";
import { useEffect, useState } from "react";
import CoffeeImg from "../../assets/coffeeImg.png";
import CustomInput from "../inputFields/CustomInput";
import Modal from "../Modal";
// import CustomSelect2 from "../inputFields/CustomSelect2";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/rootReducer";
import { sendInvite, setUserData } from "../../slices/InviteUserSlice";
import Modifiers from "./components/Modifiers";
import AddMenuCategory from "./AddMenuCategory";
import { AppDispatch } from "@/src/store/store";
import { fetchMenuCategories, fetchMenuGroups, fetchMenuItems } from "../../slices/menuSlice";
import { truncateText } from "../../utils/truncateText";
import { SERVER_DOMAIN } from "../../Api/Api";
import axios from "axios";
import { toast } from "react-toastify";
import { convertToBase64 } from "../../utils/imageToBase64";

const MenuBuilder = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { categories, menuGroups, menuItems } = useSelector((state: any) => state.menu);
  const { selectedBranch } = useSelector((state: any) => state.branches);
  console.log(menuItems, "wwww");

  const userData = useSelector((state: RootState) => state.inviteUser);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [addMenuGroup, setAddMenuGroup] = useState(false);
  const [addMenuItem, setAddMenuItem] = useState(false);
  const [successModal, setSuccessModal] = useState(false);
  const [publishModal, setPublishModal] = useState(false);
  const [confirmPublishModal, setConfirmPublishModal] = useState(false);
  const [confirmSaveModal, setConfirmSaveModal] = useState(false);
  const [addModifierModar, setAddModifierModal] = useState(false);

  const [groupName, setGroupName] = useState("");
  const [menuName, setMenuName] = useState("");
  const [menuDescription, setMenuDescription] = useState("");
  const [menuPrice, setMenuPrice] = useState("");
  const [applyPriceToAll, setApplyPriceToAll] = useState(false);
  const [price, setPrice] = useState("");

  const handleGroupName = (value: string) => {
    setGroupName(value);
  };
  const handleMenuName = (value: string) => {
    setMenuName(value);
  };
  const handleMenuDescription = (value: any) => {
    console.log(value);
    setMenuDescription(value);
  };
  const handleMenuPrice = (value: string) => {
    setMenuPrice(value);
  };
  const handlePrice = (value: string) => {
    setPrice(value);
  };

  const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setApplyPriceToAll(event.target.value === "yes");
  };

  const [imageName, setImageName] = useState<string>("");
  const [image, setImage] = useState<string>("");

  const handleFileChange = async (e: any) => {
    const file = e.target.files[0];
    setImageName(file.name);
    try {
      const base64 = await convertToBase64(file);
      setImage(base64 as string);
    } catch (error) {
      console.error("Error converting file to base64:", error);
    }
  };

  const handleAddMenu = () => {
    setIsModalOpen(true);
  };

  const handleAddMenuGroup = () => {
    setAddMenuGroup(true);
  };
  const handleAddMenuItem = () => {
    setAddMenuItem(true);
  };
  const handleAddModifier = () => {
    setAddModifierModal(true);
  };

  const handleSuccessModal = () => {
    setConfirmSaveModal(false);
    setSuccessModal(true);
  };
  const handleConfirmSaveModal = () => {
    setConfirmSaveModal(true);
  };

  const handlePublishModal = () => {
    setConfirmPublishModal(false);
    setPublishModal(true);
  };
  const handleConfirmPublishModal = () => {
    setConfirmPublishModal(true);
  };
  const handleInputChange = (fieldName: string, value: string) => {
    dispatch(setUserData({ [fieldName]: value }));
  };

  const handleSendInvite = () => {
    dispatch(sendInvite());
    setIsModalOpen(false);
  };

  const [subMenuContent, setSubmenuContent] = useState<
    {
      type: string;
      data: {
        img: string;
        price: string;
        name: string;
      }[];
    }[]
  >([]);
  const [activeMainMenu, setActiveMainMenu] = useState<string | null>(categories[0]?.name || null);
  const [activeSubMenu, setActiveSubMenu] = useState<string | null>(null);
  const [menuType, setMenuType] = useState<string>("");

  const getSubmenu = (categoryName: string) => {
    const category = categories.find((cat: any) => cat.name === categoryName);

    if (category) {
      setActiveMainMenu(category.name);
      // Set submenu content with type included
      setSubmenuContent([{ type: category.name, data: [] }]);
    }
  };
  // useEffect(() => {
  //   setActiveSubMenu(menuGroups[0].name);
  // }, [dispatch, menuGroups]);

  const [menuGroupLoading, setMenuGroupLoading] = useState(false);
  console.log(activeMainMenu, activeSubMenu);

  // Fetch data based on selectedBranch, activeMainMenu, and activeSubMenu
  useEffect(() => {
    selectedBranch && dispatch(fetchMenuCategories(selectedBranch.id));
    selectedBranch &&
      dispatch(
        fetchMenuGroups({ branch_id: selectedBranch.id, menu_category_name: activeMainMenu })
      );
    selectedBranch &&
      dispatch(fetchMenuItems({ branch_id: selectedBranch.id, menu_group_name: activeSubMenu }));
  }, [selectedBranch, activeMainMenu, activeSubMenu]);

  // Update submenuContent when menuItems change
  useEffect(() => {
    if (menuItems.length > 0) {
      setSubmenuContent([
        {
          type: activeSubMenu as any,
          data: menuItems.map((item: any) => ({
            img: item.menu_item_image,
            price: item.menu_item_price.toString(),
            name: item.menu_item_name,
          })),
        },
      ]);
    } else {
      setSubmenuContent([{ type: activeSubMenu as any, data: [] }]);
    }
  }, [menuItems, activeSubMenu]);

  const handleSaveMenuGroup = async () => {
    setMenuGroupLoading(true);

    const headers = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };

    let payload = {
      category_name: activeMainMenu,
      group_name: groupName,
      branch_id: selectedBranch.id,
      price_to_all_items: applyPriceToAll,
      ...(applyPriceToAll && { price: Number(price) }),
    };

    try {
      const response = await axios.post(`${SERVER_DOMAIN}/menu/addMenuGroup`, payload, headers);
      console.log(response);
      dispatch(
        fetchMenuGroups({ branch_id: selectedBranch.id, menu_category_name: activeMainMenu })
      );
      toast.success(response.data.message || "Menu group added successfully.");

      setGroupName("");
      setApplyPriceToAll(false);
    } catch (error: any) {
      console.log(error);
      toast.error(error.response.data.message || "An error occurred. Please try again.");
    } finally {
      setMenuGroupLoading(false);
      setAddMenuGroup(false);
    }
  };

  const handleSaveMenuItem = async () => {
    setMenuGroupLoading(true);

    const headers = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };

    try {
      const response = await axios.post(
        `${SERVER_DOMAIN}/menu/addMenuItem`,
        {
          menu_category_name: activeMainMenu,
          branch_id: selectedBranch.id,
          menu_group_name: activeSubMenu,
          menu_item_name: menuName,
          description: menuDescription,
          price: Number(menuPrice),
          image,
        },
        headers
      );
      console.log(response);
      dispatch(fetchMenuItems({ branch_id: selectedBranch.id, menu_group_name: activeSubMenu }));
      toast.success(response.data.message || "Menu group added successfully.");
      setMenuName("");
      setMenuDescription("");
      setMenuPrice("");
      setImage("");
      setAddMenuItem(false);
    } catch (error: any) {
      console.log(error);
      toast.error(error.response.data.message || "An error occurred. Please try again.");
    } finally {
      setMenuGroupLoading(false);
      setAddMenuGroup(false);
    }
  };
  console.log(subMenuContent, "ffff");
  return (
    <div>
      <DashboardLayout>
        <TopMenuNav pathName="Menu" />
        <div className="">
          <div className="mt-[40px]">
            <div className="flex items-center justify-between">
              <div className="border border-purple500 bg-purple500 w-fit rounded-[5px] px-[24px] py-[10px] font-[500] text-[#ffffff]">
                <button className="text-[16px] flex items-center gap-[8px]" onClick={handleAddMenu}>
                  <img src={Add} alt="" /> Add new menu category
                </button>
              </div>
              <div
                className="rounded-[5px] px-[24px] py-[10px] font-[500] text-purple500"
                onClick={handleConfirmPublishModal}
              >
                <button className="text-[14px] flex items-center gap-[8px]">
                  <img src={Publish} alt="" /> Publish changes
                </button>
              </div>
            </div>
            <div className=" flex ">
              <div className="mt-[24px]">
                <nav className="flex flex-col gap-[8px]">
                  {categories.map((category: any) => (
                    <button
                      onClick={() => getSubmenu(category.name)}
                      key={category._id}
                      className={`${
                        activeMainMenu === category.name && "bg-purple100 text-purple600 font-[500]"
                      } text-grey200 hover:bg-purple100 uppercase flex justify-between items-center w-[201px] text-[16px] font-[400] py-[12px] px-[8px]`}
                    >
                      {truncateText(category.name, 13)}
                      {activeMainMenu === category.name ? (
                        <img src={activeArrow} alt="activearrow" />
                      ) : (
                        <img src={chevron_right} alt="" />
                      )}
                    </button>
                  ))}
                </nav>
              </div>
              <div className=" flex-grow">
                <div className="mt-[24px] w-full border p-[16px]">
                  <div className=" flex gap-[16px] items-start">
                    <div className=" w-[204px]">
                      <p className=" font-[400] text-[12px] text-[#606060]">Menu Group</p>
                      <div className="">
                        {menuGroups.map((group: any) => (
                          <p
                            className={`${
                              activeSubMenu === group.name
                                ? "font-[500] text-[#5855B3]"
                                : "text-grey200"
                            } hover:bg-purple100 flex justify-between cursor-pointer items-center w-[201px] text-[16px] font-[400] py-[12px] px-[8px]`}
                            key={group._id}
                            onClick={() => {
                              // Update submenu content and active submenu
                              setSubmenuContent([{ type: group.name, data: [] }]); // Adjust this line as needed
                              setActiveSubMenu(group.name);
                              setMenuType(group.menu_category_name); // Update based on your logic
                            }}
                          >
                            {truncateText(group.name, 15)}
                            {activeSubMenu === group.name ? (
                              <img src={activeArrow} alt="activearrow" />
                            ) : (
                              <img src={chevron_right} alt="" />
                            )}
                          </p>
                        ))}

                        <div
                          className=" w-[196px]  px-[10px] py-[6px] font-[500] text-purple500"
                          onClick={handleAddMenuGroup}
                        >
                          <button className="text-[16px] flex items-center gap-[8px]">
                            <img src={AddWhite} alt="" /> Add Menu Group
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className=" flex-grow space-y-[16px]">
                      <p className=" font-[400] text-[12px] text-[#606060]">Menu Item</p>
                      <div className=" flex items-start justify-between ">
                        <p className=" text-[16px] font-[500] text-[#5855B3]">
                          {menuType || "Type"}
                        </p>
                        <div className=" ">
                          <button
                            className="w-[196px]  px-[10px] py-[6px] font-[500] text-purple500 text-[16px] flex items-center gap-[8px]"
                            onClick={handleAddMenuItem}
                          >
                            <img src={AddWhite} alt="" /> Add Menu Item
                          </button>
                        </div>
                      </div>
                      {subMenuContent.map((menuItem, index) => (
                        <div>
                          {menuItem.data.map((item, itemIndex) => (
                            <div className="" key={index}>
                              <div className=" grid gap-[8px]">
                                <div className=" flex items-center justify-between bg-[#F8F8F8] py-[8px] px-[16px]">
                                  <div className="flex gap-[8px] items-center">
                                    <img src={item.img || CoffeeImg} alt="" />

                                    <div className="">
                                      <p className="text-[12px] font-[400] text-grey300">Item</p>
                                      <div key={itemIndex}>
                                        <p className="leading-[24px] text-[16px] text-grey500 font-[500] capitalize">
                                          {item.name}
                                        </p>
                                        <p className="text-[12px] font-[400] text-grey300">
                                          Modifier groups (6){" "}
                                          {/* This is static; you may want to make this dynamic */}
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                                  <div className=" flex">
                                    <p className="text-[16px] font-[500] text-grey500">
                                      &#8358;
                                      {item.price}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      ))}

                      {subMenuContent.length > 1 && (
                        <div className=" flex items-center justify-end">
                          <button
                            className="w-[196px] border border-[#5955B3] rounded-[5px]  px-[16px] py-[8px] font-[500] text-purple500 text-[16px] flex items-center gap-[8px]"
                            onClick={handleAddMenuItem}
                          >
                            <img src={AddWhite} alt="" /> Add Menu Item
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <Modifiers
                  activeMainMenu={activeMainMenu}
                  handleAddModifier={handleAddModifier}
                  Add={Add}
                  handleConfirmSaveModal={handleConfirmSaveModal}
                />
              </div>
            </div>
          </div>
          <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
            <AddMenuCategory setIsModalOpen={setIsModalOpen} />
          </Modal>

          <Modal isOpen={successModal} onClose={() => setSuccessModal(false)}>
            <div className=" w-[443px] px-[32px] py-[32px]">
              <div
                className="flex items-center justify-end cursor-pointer"
                onClick={() => setSuccessModal(false)}
              >
                <img src={Close} alt="" className=" " />
              </div>
              <div className=" flex flex-col gap-[24px] items-center justify-center">
                <img src={CheckCircle} alt="" />
                <p className="text-grey500 text-[22px] font-[500]">Changes Saved!</p>
                <p className="text-[16px] font-[400] text-grey500">
                  Changes have been saved successfully
                </p>
              </div>
            </div>
          </Modal>

          <Modal isOpen={confirmSaveModal} onClose={() => setConfirmSaveModal(false)}>
            <div className=" w-[443px] px-[32px] py-[32px]">
              <div
                className="flex items-center justify-end cursor-pointer"
                onClick={() => setSuccessModal(false)}
              >
                <img src={Close} alt="" className=" " />
              </div>
              <div className=" flex flex-col gap-[24px] items-center justify-center">
                <p className="text-grey500 text-[22px] font-[500]">Save changes</p>
                <p className="text-[16px] font-[400] text-grey500">
                  Do you want to save changes made to this menu?
                </p>
                <div
                  className="border border-purple500 bg-purple500 rounded px-[24px]  py-[10px] font-[500] text-[#ffffff]"
                  onClick={handleSuccessModal}
                >
                  <button className=" text-[16px]">Yes</button>
                </div>
              </div>
            </div>
          </Modal>

          <Modal isOpen={publishModal} onClose={() => setPublishModal(false)}>
            <div className=" w-[443px] px-[32px] py-[32px]">
              <div
                className="flex items-center justify-end cursor-pointer"
                onClick={() => setPublishModal(false)}
              >
                <img src={Close} alt="" className=" " />
              </div>
              <div className=" flex flex-col gap-[24px] items-center justify-center">
                <img src={CheckCircle} alt="" />
                <p className="text-grey500 text-[22px] font-[500]">Changes Published!</p>
                <p className="text-[16px] font-[400] text-grey500">
                  Changes have been published successfully
                </p>
              </div>
            </div>
          </Modal>

          <Modal isOpen={confirmPublishModal} onClose={() => setConfirmPublishModal(false)}>
            <div className=" w-[443px] px-[32px] py-[32px]">
              <div
                className="flex items-center justify-end cursor-pointer"
                onClick={() => setConfirmPublishModal(false)}
              >
                <img src={Close} alt="" className=" " />
              </div>
              <div className=" flex flex-col gap-[24px] items-center justify-center">
                <img src={PublishIcon} alt="" />
                <p className="text-grey500 text-[22px] font-[500]">Publish changes</p>
                <p className="text-[16px] font-[400] text-grey500">
                  Do you want to publish changes made to this menu?
                </p>
                <div
                  className="border border-purple500 bg-purple500 rounded px-[24px]  py-[10px] font-[500] text-[#ffffff]"
                  onClick={handlePublishModal}
                >
                  <button className=" text-[16px]">Yes</button>
                </div>
              </div>
            </div>
          </Modal>

          <Modal isOpen={addModifierModar} onClose={() => setAddModifierModal(false)}>
            <div className=" w-[539px] py-[32px] px-[52px]">
              <div className="">
                <p className=" text-[24px] mb-[11px] font-[500] text-purple500">Add modifier</p>
                <hr className="border my-[24px] border-[#E7E7E7]" />
                <div className=" flex items-center gap-[8px] justify-center">
                  <img src={AddWhite} alt="" />
                  <div className=" flex-grow  ">
                    <CustomInput
                      type="text"
                      label="Enter modifier Name"
                      value={userData.department}
                      error=""
                      onChange={(newValue) => handleInputChange("department", newValue)}
                    />
                  </div>
                </div>
                <hr className="border mb-[16px] mt-[24px] border-[#E7E7E7]" />

                <div className=" flex justify-end items-center  gap-2">
                  <div
                    className="border cursor-pointer border-purple500 rounded px-[24px]  py-[10px] font-[600] text-purple500"
                    onClick={() => setAddModifierModal(false)}
                  >
                    <p className="font-[500] text-[16px] text-purple500 cursor-pointer">Cancel</p>
                    {/* <CancelButton text="Cancel" /> */}
                  </div>

                  <div
                    className="border border-purple500 bg-purple500 rounded px-[24px]  py-[10px] font-[500] text-[#ffffff]"
                    onClick={handleSendInvite}
                  >
                    <button className=" text-[16px]">Save item</button>
                  </div>
                </div>
              </div>
            </div>
          </Modal>

          <Modal isOpen={addMenuGroup} onClose={() => setAddMenuGroup(false)}>
            <div
              className=" py-[28px] 2xl:py-[36px] px-[28px] 2xl:px-[51px] bg-white relative rounded-[20px]  w-[539px] md:h-[600px] lg:h-screen overflow-y-scroll"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              <div className=" ">
                <p className="text-[24px] pb-[24px] font-[500] leading-[36px] text-purple500">
                  Add menu group
                </p>
                <hr className="border border-[#E7E7E7] mb-[24px]" />

                <div className=" lg:mb-[24px]">
                  <div className=" grid gap-[32px] lg:gap-[32px] text-[16px] font-[400] text-grey200">
                    <CustomInput
                      type="text"
                      label="Enter group name"
                      value={groupName}
                      error=""
                      onChange={(newValue) => handleGroupName(newValue)}
                    />

                    {/* <CustomSelect2
                      options={["Channel1", "Channel2", "Channel3"]}
                      placeholder="Channels"
                    /> */}

                    <div className="">
                      <p className=" text-[18px] mb-[8px] font-[500] text-grey500">Pricing</p>
                      <p className=" text-[14px] font-[400] text-grey500">
                        Do you want this price to apply to all the items in this menu group?
                      </p>
                      <div className="flex items-center mt-[8px]">
                        <input
                          type="radio"
                          id="yes"
                          name="options"
                          value="yes"
                          checked={applyPriceToAll === true}
                          onChange={handleOptionChange}
                          className={`mr-2 ${applyPriceToAll === true ? "bg-purple500" : ""}`}
                        />
                        <label htmlFor="yes" className="mr-4  text-grey500 text-[16px] font-[400]">
                          Yes
                        </label>

                        <input
                          type="radio"
                          id="no"
                          name="options"
                          value="no"
                          checked={applyPriceToAll === false}
                          onChange={handleOptionChange}
                          className={`mr-2 ${applyPriceToAll === false ? "bg-purple500" : ""}`}
                        />
                        <label htmlFor="no" className=" text-grey500 text-[16px] font-[400]">
                          No
                        </label>
                      </div>
                    </div>

                    {applyPriceToAll && (
                      <CustomInput
                        type="text"
                        label="Enter price"
                        value={price}
                        error=""
                        onChange={(newValue) => handlePrice(newValue)}
                      />
                    )}

                    {/* <div className="">
                      <p className=" text-[18px] mb-[8px] font-[500] text-grey500">Add image</p>

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
                            className="text-[#5855B3] font-[500] text-[16px] mb-[8px] cursor-pointer"
                          >
                            Click to upload{" "}
                            <span className=" font-[400] text-grey300">or drag and drop</span>
                          </label>
                          <p className=" text-[14px] font-[400] text-grey300">
                            Max. file size: 2MB
                          </p>
                        </div>
                      </div>
                    </div> */}
                  </div>
                </div>

                <div className=" flex justify-end items-center pt-[12px] lg:pt-[24px] gap-2">
                  <div
                    className="border cursor-pointer border-purple500 rounded px-[24px]  py-[10px] font-[600] text-purple500"
                    onClick={() => setAddMenuGroup(false)}
                  >
                    <p className="font-[500] text-[16px] text-purple500 cursor-pointer">Cancel</p>
                    {/* <CancelButton text="Cancel" /> */}
                  </div>

                  <div
                    className="border border-purple500 bg-purple500 rounded px-[24px]  py-[10px] font-[500] text-[#ffffff]"
                    onClick={handleSaveMenuGroup}
                  >
                    <button className=" text-[16px]">
                      {menuGroupLoading ? "Saving..." : "Save Menu"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </Modal>

          <Modal isOpen={addMenuItem} onClose={() => setAddMenuItem(false)}>
            <div
              className=" py-[28px] 2xl:py-[36px] px-[28px] 2xl:px-[51px] bg-white relative rounded-[20px]  w-[539px] md:h-[600px] lg:h-screen overflow-y-scroll"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              <div className=" ">
                <p className="text-[24px] pb-[24px] font-[500] leading-[36px] text-purple500">
                  Add menu Item
                </p>
                <hr className="border border-[#E7E7E7] mb-[24px]" />

                <div className=" lg:mb-[24px]">
                  <div className=" grid gap-[32px] lg:gap-[32px] text-[16px] font-[400] text-grey200">
                    <CustomInput
                      type="text"
                      label="Enter menu item name"
                      value={menuName}
                      error=""
                      onChange={(newValue) => handleMenuName(newValue)}
                    />
                    <div className="">
                      <textarea
                        className=" w-full h-[153px] border text-[16px] font-[400] text-[#929292] border-gray-300 rounded-md p-2 outline-none"
                        value={menuDescription}
                        placeholder="Enter description of the menu item"
                        onChange={(e) => handleMenuDescription(e.target.value)}
                      />
                    </div>

                    <div className="">
                      <p className="text-[18px] mb-[8px] font-[500] text-grey500">Pricing</p>

                      <CustomInput
                        type="text"
                        label="Enter price"
                        value={menuPrice}
                        error=""
                        onChange={(newValue) => handleMenuPrice(newValue)}
                      />
                    </div>

                    <div className="">
                      <p className=" text-[18px] mb-[8px] font-[500] text-grey500">Add image</p>

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
                            className="text-[#5855B3] font-[500] text-[16px] mb-[8px] cursor-pointer"
                          >
                            Click to upload{" "}
                            <span className=" font-[400] text-grey300">or drag and drop</span>
                          </label>
                          <p className=" text-[14px] font-[400] text-grey300">
                            Max. file size: 2MB
                          </p>
                        </div>
                      </div>
                      {image && (
                        <div className="mt-4">
                          <p className="text-[14px] text-grey500">Image: {imageName}</p>
                          <img src={image} alt="Uploaded Preview" className="mt-2 w-full h-auto" />
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className=" flex justify-end items-center pt-[12px] lg:pt-[24px] gap-2">
                  <div
                    className="border cursor-pointer border-purple500 rounded px-[24px]  py-[10px] font-[600] text-purple500"
                    onClick={() => setAddMenuItem(false)}
                  >
                    <p className="font-[500] text-[16px] text-purple500 cursor-pointer">Cancel</p>
                    {/* <CancelButton text="Cancel" /> */}
                  </div>

                  <div className="border border-purple500 bg-purple500 rounded px-[24px]  py-[10px] font-[500] text-[#ffffff]">
                    <button onClick={handleSaveMenuItem} className=" text-[16px]">
                      {menuGroupLoading ? "Saving..." : "Save Menu Item"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </Modal>
        </div>
      </DashboardLayout>
    </div>
  );
};

export default MenuBuilder;
