import React, { useState } from "react";
import MenuImg from "../assets/tacosMenu.svg";
import Close from "../../assets/closeIcon.svg";
import EditIcon from "../assets/EditIcon.svg";
import Modal from "./Modal";
import CustomInput from "../inputFields/CustomInput";
interface TabItem {
  id: number;
  label: string;
  content: JSX.Element;
}

interface MenuItem {
  title: string;
  price: string;
}

interface MenuCategory {
  category: string;
  items: MenuItem[];
}

const MenuTab: React.FC = () => {
  const [email, setEmail] = useState<string>("");

  const [editModal, setEditModal] = useState(false);
  const [editItem, setEditItem] = useState<MenuItem | null>(null);
  const handleEditModal = (item: MenuItem) => {
    setEditItem(item);
    setEditModal(true);
  };

  const menuData: MenuCategory[] = [
    {
      category: "Soups",
      items: [
        { title: "Egusi Soup", price: "1200" },
        { title: "Okra  Soup", price: "300" },
        { title: "Ogbono Soup", price: "200" },
        { title: "White Soup", price: "1250" },
      ],
    },
    {
      category: "Swallows",
      items: [
        { title: "Akpu", price: "1200" },
        { title: "Semo", price: "300" },
        { title: "Starch ", price: "200" },
        { title: "Garri ", price: "1250" },
      ],
    },
  ];

  const tabItems: TabItem[] = [
    { id: 1, label: "Soups", content: renderMenuCategory(menuData) },
    { id: 2, label: "Swallow", content: <div>Content for Swallow</div> },
    { id: 3, label: "Rice", content: <div>Content for Rice</div> },
    { id: 4, label: "Special", content: <div>Content for Special</div> },
  ];

  const [activeTab, setActiveTab] = useState<number>(1);

  const handleTabChange = (tabId: number) => {
    setActiveTab(tabId);
  };

  function renderMenuCategory(menuData: MenuCategory[]) {
    return (
      <div className="">
        {menuData.map((categoryData, categoryIndex) => (
          <div key={categoryIndex}>
            <h2 className="border-b border-b-[#E7E7E7] py-[8px]  font-[500] text-[18px] uppercase">
              {categoryData.category}
            </h2>
            <ul className="grid gap-[8px] px-[16px]">
              {categoryData.items.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between border-b py-[8px]"
                >
                  <div className="flex items-center gap-[16px]">
                    <img src={MenuImg} alt="" />
                    <div className="grid gap-[8px]">
                      <p className="text-[16px] font-[500] text-grey500">
                        {item.title}
                      </p>
                      <p className="text-grey500 text-[16px] font-[400]">
                        ${item.price}
                      </p>
                    </div>
                  </div>
                  <div
                    className="cursor-pointer"
                    onClick={() => handleEditModal(item)}
                  >
                    <img src={EditIcon} alt="" />
                  </div>
                </div>
              ))}
            </ul>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div>
      <div className="flex border-b border-gray-200 mb-4">
        {tabItems.map((tab) => (
          <div
            key={tab.id}
            className={`cursor-pointer text-[16px] leading-[24px] py-4 px-4 ${
              activeTab === tab.id
                ? "font-[600] text-grey500 border-b-4 border-[#E16B07]"
                : "text-[#929292] font-[400]"
            }`}
            onClick={() => handleTabChange(tab.id)}
          >
            {tab.label}
          </div>
        ))}
      </div>
      <div>
        {tabItems.map((tab) => (
          <div
            key={tab.id}
            className={`${activeTab !== tab.id ? "hidden" : ""}`}
          >
            {tab.content}
          </div>
        ))}
      </div>

      <Modal isOpen={editModal}>
        <div className="bg-white w-[300px] relative">
          <div
            className="cursor-pointer  absolute top-0  right-0"
            onClick={() => setEditModal(false)}
          >
            <img src={Close} alt="" className="" />
          </div>
          <div className=" pt-[16px]">
            {editItem && (
              <>
                <p className=" text-[18px] font-[500] text-[#000000]">
                  {" "}
                  {editItem.title}
                </p>
                <div className=" my-[22px] flex items-center gap-[8px]">
                  <img src={MenuImg} alt="" />
                  <p className=" text-[14px] font-[400] text-[#5855B3]">
                    Click to replace image
                  </p>
                </div>
                <div className=" mb-[26px]">
                  <CustomInput
                    type="text"
                    label="Enter new price"
                    value={email}
                    onChange={(newValue) => setEmail(newValue)}
                  />
                </div>
              </>
            )}
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default MenuTab;
