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
import { fetchMenuCategories } from "../../slices/menuSlice";
import { truncateText } from "../../utils/truncateText";
// import CancelButton from "../Buttons/CancelButton";

interface MenuItem {
  type?: string;
  title: string;
  data: {
    type: string;
    data: {
      img: string;
      price: string;
      name: string;
    }[];
  }[];
}

const MenuBuilder = () => {
  const dispatch = useDispatch<AppDispatch>();

  const categories = useSelector((state: any) => state.menu.categories);
  const { selectedBranch } = useSelector((state: any) => state.branches);

  console.log(categories, "aaa", selectedBranch);

  useEffect(() => {
    dispatch(fetchMenuCategories(selectedBranch.id));
  }, [selectedBranch]);

  const userData = useSelector((state: RootState) => state.inviteUser);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [addMenuGroup, setAddMenuGroup] = useState(false);
  const [addMenuItem, setAddMenuItem] = useState(false);
  const [successModal, setSuccessModal] = useState(false);
  const [publishModal, setPublishModal] = useState(false);
  const [confirmPublishModal, setConfirmPublishModal] = useState(false);
  const [confirmSaveModal, setConfirmSaveModal] = useState(false);
  const [addModifierModar, setAddModifierModal] = useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
  };
  const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedOption(event.target.value);
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
  const [subMenu, setSubmenu] = useState<MenuItem[]>([]);

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
  const [activeMainMenu, setActiveMainMenu] = useState<string | null>(null);
  const [activeSubMenu, setActiveSubMenu] = useState<string | null>(null);
  const [menuType, setMenuType] = useState<string>("");

  const getSubmenu = (categoryName: string) => {
    const category = categories.find((cat: any) => cat.name === categoryName);

    if (category) {
      setActiveMainMenu(category.name);
      // Set submenu content with type included
      setSubmenuContent([{ type: category.name, data: [] }]);
      setActiveSubMenu(category.name);
    }
  };

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
                      {truncateText(category.name, 15)}
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
                        {subMenu.map((data, index) => (
                          <p
                            className={`${
                              activeSubMenu === data.type
                                ? " font-[500] text-[#5855B3] "
                                : " text-grey200"
                            }  hover:bg-purple100 flex justify-between cursor-pointer items-center w-[201px]  text-[16px] font-[400] py-[12px] px-[8px]`}
                            key={index}
                            onClick={() => {
                              // @ts-ignore
                              setSubmenuContent(data.data), setActiveSubMenu(data.type || null);
                              // @ts-ignore
                              setMenuType(data.type);
                            }}
                          >
                            {data.type}
                            {activeSubMenu === data.type ? (
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
                        <div className="" key={index}>
                          <div className="grid gap-[8px]">
                            <div className="flex items-center justify-between bg-[#F8F8F8] py-[8px] px-[16px]">
                              <div className="flex gap-[8px]">
                                {/* Assuming you want to display the image here, update with the correct image source */}
                                <img src={CoffeeImg} alt="" />
                                <div className="">
                                  <p className="text-[12px] font-[400] text-grey300">Item</p>
                                  {menuItem.data.map((item, itemIndex) => (
                                    <div key={itemIndex}>
                                      <p className="leading-[24px] text-[16px] text-grey500 font-[500] capitalize">
                                        {item.name}
                                      </p>
                                      <p className="text-[12px] font-[400] text-grey300">
                                        Modifier groups (6)
                                      </p>
                                      <p className="text-[16px] font-[500] text-grey500">
                                        {item.price}
                                      </p>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>
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
            <AddMenuCategory userData={userData} setIsModalOpen={setIsModalOpen} />
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
                      label="Enter menu name"
                      value={userData.firstName}
                      error=""
                      onChange={(newValue) => handleInputChange("firstName", newValue)}
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
                          checked={selectedOption === "yes"}
                          onChange={handleOptionChange}
                          className={`mr-2 ${selectedOption === "yes" ? " bg-purple500" : ""}`}
                        />
                        <label htmlFor="yes" className="mr-4  text-grey500 text-[16px] font-[400]">
                          Yes
                        </label>

                        <input
                          type="radio"
                          id="no"
                          name="options"
                          value="no"
                          checked={selectedOption === "no"}
                          onChange={handleOptionChange}
                          className={`mr-2 ${selectedOption === "no" ? " bg-purple500" : ""}`}
                        />
                        <label htmlFor="no" className=" text-grey500 text-[16px] font-[400]">
                          No
                        </label>
                      </div>
                    </div>

                    {selectedOption === "yes" && (
                      <CustomInput
                        type="text"
                        label="Enter price"
                        value=""
                        error=""
                        onChange={(newValue) => handleInputChange("lastName", newValue)}
                      />
                    )}
                    {/* <CustomInput
                      type="text"
                      label="Menu code"
                      value=""
                      error=""
                      onChange={(newValue) =>
                        handleInputChange("lastName", newValue)
                      }
                    /> */}

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
                    </div>
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
                    onClick={handleSendInvite}
                  >
                    <button className=" text-[16px]">Save Menu</button>
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
                      value={userData.firstName}
                      error=""
                      onChange={(newValue) => handleInputChange("firstName", newValue)}
                    />

                    {/* <CustomSelect2
                      options={["Channel1", "Channel2", "Channel3"]}
                      placeholder="Channels"
                    /> */}

                    <div className="">
                      <p className="text-[18px] mb-[8px] font-[500] text-grey500">Pricing</p>
                      <CustomInput
                        type="text"
                        label="Enter price"
                        value=""
                        error=""
                        onChange={(newValue) => handleInputChange("lastName", newValue)}
                      />
                    </div>
                    {/* <div className="">
                      <p className="text-[18px] mb-[8px] font-[500] text-grey500">
                        Pricing
                      </p>
                      <p className="text-[14px] font-[400] text-grey500">
                        Choose a pricing option.
                      </p>
                      <div className="flex items-center my-[8px]">
                        <input
                          type="radio"
                          id="base"
                          name="options"
                          value="base"
                          checked={selectedOption === "base"}
                          onChange={handleOptionChange}
                          className={`mr-2 ${
                            selectedOption === "base" ? "bg-purple-500" : ""
                          }`}
                        />
                        <label
                          htmlFor="base"
                          className="mr-4 text-grey500 text-[14px] font-[400]"
                        >
                          Base Price
                        </label>

                        <input
                          type="radio"
                          id="range"
                          name="options"
                          value="range"
                          checked={selectedOption === "range"}
                          onChange={handleOptionChange}
                          className={`mr-2 ${
                            selectedOption === "range" ? "bg-purple-500" : ""
                          }`}
                        />
                        <label
                          htmlFor="range"
                          className="mr-4 text-grey500 text-[14px] font-[400]"
                        >
                          Range Price
                        </label>

                        <input
                          type="radio"
                          id="time"
                          name="options"
                          value="time"
                          checked={selectedOption === "time"}
                          onChange={handleOptionChange}
                          className={`mr-2 ${
                            selectedOption === "time" ? "bg-purple-500" : ""
                          }`}
                        />
                        <label
                          htmlFor="time"
                          className="text-grey500 text-[14px] font-[400]"
                        >
                          Time Specific Price
                        </label>
                      </div>

                      {selectedOption === "base" && (
                        <>
                          <div className=" ">
                            <CustomInput
                              type="text"
                              label="Enter price"
                              value=""
                              error=""
                              onChange={(newValue) =>
                                handleInputChange("lastName", newValue)
                              }
                            />
                          </div>
                        </>
                      )}
                      {selectedOption === "range" && (
                        <>
                          <div className=" flex items-center gap-[8px] ">
                            <div className=" w-[180px]">
                              <CustomInput
                                type="text"
                                label="Pricing name"
                                value=""
                                error=""
                                onChange={(newValue) =>
                                  handleInputChange("lastName", newValue)
                                }
                              />
                            </div>
                            <div className=" flex-1">
                              <CustomInput
                                type="text"
                                label="Enter price"
                                value=""
                                error=""
                                onChange={(newValue) =>
                                  handleInputChange("lastName", newValue)
                                }
                              />
                            </div>
                            <p className=" flex hover:bg-[#F8F8F8] cursor-pointer  text-[#5955B3] font-[500] text-[13px] px-[4px] py-[10px] rounded">
                              <img src={AddWhite} alt="" />
                              New Pricing
                            </p>
                          </div>
                        </>
                      )}
                      {selectedOption === "time" && (
                        <>
                          <div className=" grid gap-[8px]">
                            <CustomInput
                              type="text"
                              label="Base Price"
                              value=""
                              error=""
                              onChange={(newValue) =>
                                handleInputChange("lastName", newValue)
                              }
                            />

                            <div className=" flex items-center gap-[8px] ">
                              <div className="  flex-1">
                                <CustomInput
                                  type="text"
                                  label="Enter Price"
                                  value=""
                                  error=""
                                  onChange={(newValue) =>
                                    handleInputChange("lastName", newValue)
                                  }
                                />
                              </div>
                              <div className="w-[100px]">
                                <CustomInput
                                  type="date"
                                  label="From:"
                                  value=""
                                  error=""
                                  onChange={(newValue) =>
                                    handleInputChange("lastName", newValue)
                                  }
                                />
                              </div>
                              <div className=" w-[100px]">
                                <CustomInput
                                  type="date"
                                  label="To:"
                                  value=""
                                  error=""
                                  onChange={(newValue) =>
                                    handleInputChange("lastName", newValue)
                                  }
                                />
                              </div>
                            </div>
                          </div>
                        </>
                      )}
                    </div> */}

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
                    </div>

                    {/* <div className="">
                      <p className=" text-[18px] mb-[11px] font-[500] text-grey500">
                        Tags
                      </p>
                      <div className=" flex items-center gap-[8px] justify-center">
                        <div className=" flex-grow  ">
                          <CustomInput
                            type="text"
                            label="Enter Tag Name"
                            value={userData.department}
                            error=""
                            onChange={(newValue) =>
                              handleInputChange("department", newValue)
                            }
                          />
                        </div>
                        <p className=" hover:bg-[#F8F8F8] cursor-pointer  text-[#5955B3] font-[500] text-[16px] px-[24px] py-[10px] rounded">
                          Create Tag
                        </p>
                      </div>
                    </div> */}
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
                    <button className=" text-[16px]">Save Menu Item</button>
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
