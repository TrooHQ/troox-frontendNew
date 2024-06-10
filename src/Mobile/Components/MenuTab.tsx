import React, { useEffect, useState } from "react";
import Close from "../../assets/closeIcon.svg";
import EditIcon from "../assets/EditIcon.svg";
import Modal from "./Modal";
import CustomInput from "../inputFields/CustomInput";
import { RootState } from "../../store/store";
import { useSelector } from "react-redux";
import axios from "axios";
import { SERVER_DOMAIN } from "../../Api/Api";
import { useParams } from "react-router-dom";

interface MenuItem {
  name: string;
  _id: string;
  business_name: string;
  menu_category_name: string;
  menu_group_name: string;
  menu_item_name: string;
  menu_item_image: string;
  menu_item_price: string;
}

interface Details {
  name: string;
  _id: string;
  business_name: string;
  menu_category_name: string;
  menu_group_name: string;
  menu_item_name: string;
  menu_item_image: string;
  menu_item_price: string;
}

const MenuTab: React.FC = () => {
  const { id } = useParams();
  const userDetails = useSelector((state: RootState) => state.user);
  const token = userDetails?.userData?.token;

  const [email, setEmail] = useState<string>("");
  const [editModal, setEditModal] = useState(false);
  const [editItem, setEditItem] = useState<MenuItem | null>(null);
  const [activeTab, setActiveTab] = useState<number>(1);
  const [menuGroup, setMenuGroup] = useState<Details[]>([]);
  const [menuItems, setMenuItems] = useState<Details[]>([]);
  const [selectedGroup, setSelectedGroup] = useState("");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const totalCount = useSelector((state: RootState) => state.basket);
  console.log(totalCount);

  const handleEditModal = (item: Details) => {
    setEditItem(item);
    setEditModal(true);
  };
  const closeEditModal = () => {
    setEditModal(false);
    setSelectedImage(null);
  };

  const getGroups = async () => {
    const headers = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const response = await axios.get(
        `${SERVER_DOMAIN}/menu/getAllMenuGroup/?menu_category_name=${id}`,
        headers
      );
      console.log(
        "Business groups Retrieved successfully:",
        response.data.data
      );
      setMenuGroup(response.data.data);
      if (response.data.data && response.data.data.length > 0) {
        setSelectedGroup(response.data.data[0].name);
      }
    } catch (error) {
      console.error("Error getting Business Details:", error);
    }
  };

  const getItems = async () => {
    const headers = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const response = await axios.get(
        `${SERVER_DOMAIN}/menu/filterMenuItems/?menu_group_name=${selectedGroup}`,
        headers
      );
      console.log("Business items Retrieved successfully:", response.data.data);
      setMenuItems(response.data.data);
    } catch (error) {
      console.error("Error getting Business Details:", error);
    }
  };

  useEffect(() => {
    if (id) {
      getGroups();
    }
  }, [id]);

  useEffect(() => {
    if (selectedGroup) {
      getItems();
    }
  }, [selectedGroup]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  console.log("Selected Group:", selectedGroup);

  return (
    <div>
      <div>
        <div className="flex gap-[38px] text-center mx-[13px] items-center border-b border-grey100 mt-[24px] w-full overflow-x-scroll">
          {menuGroup.map((menu, index) => (
            <button
              key={menu.name}
              className={`pb-[8px] ${
                index === activeTab
                  ? "border-b-[4px] border-b-[#E16B07] text-[#121212] text-[16px] flex items-center justify-center font-[500]"
                  : "text-grey100 font-[400]"
              }`}
              onClick={() => {
                setActiveTab(index);
                setSelectedGroup(menu.name);
              }}
            >
              {menu.name}
            </button>
          ))}
        </div>

        <div>
          {menuItems.map((menu, index) => (
            <div key={index}>
              {selectedGroup === menu.menu_group_name && (
                <div>
                  <ul className="grid gap-[8px] px-[16px]">
                    <div
                      key={index}
                      className="flex items-center justify-between border-b py-[8px]"
                    >
                      <div className="flex items-center gap-[16px]">
                        <img
                          src={menu.menu_item_image}
                          alt=""
                          className="w-32 h-32"
                        />
                        <div className="grid gap-[8px]">
                          <p className="text-[16px] font-[500] text-grey500">
                            {menu.menu_item_name}
                          </p>
                          <p className="text-grey500 text-[16px] font-[400]">
                            ${menu.menu_item_price}
                          </p>
                        </div>
                      </div>
                      <div
                        className="cursor-pointer"
                        onClick={() => handleEditModal(menu)}
                      >
                        <img src={EditIcon} alt="" />
                      </div>
                    </div>
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      <Modal isOpen={editModal}>
        <div className="bg-white w-[300px] relative">
          <div
            className="cursor-pointer absolute top-0 right-0"
            onClick={closeEditModal}
          >
            <img src={Close} alt="" />
          </div>
          <div className="pt-[16px]">
            {editItem && (
              <>
                <p className="text-[18px] font-[500] text-[#000000]">
                  {editItem.menu_item_name}
                </p>
                <div className="my-[22px] flex items-center gap-[8px]">
                  <img
                    src={selectedImage || editItem.menu_item_image}
                    alt=""
                    className="w-32 h-32"
                  />
                  <input
                    type="file"
                    onChange={handleFileChange}
                    className="text-[14px] font-[400] text-[#5855B3]"
                  />
                </div>
                <div className="mb-[26px]">
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
