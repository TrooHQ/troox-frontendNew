import React, { useState } from "react";
// import MenuImg from "../assets/tacosMenu.svg";
import Close from "../../assets/closeIcon.svg";
import EditIcon from "../assets/EditIcon.svg";
import Modal from "./Modal";
import CustomInput from "../inputFields/CustomInput";
import fish1 from "../assets/gilled tilapia fish big.png";
import fish2 from "../assets/chicken suya big.png";
import fish3 from "../assets/beef suya big.png";
import fish4 from "../assets/grilled catfish big.png";
import fish5 from "../assets/grilled plantain big.png";
import FriedRice from "../assets/fried rice big.png";
import water from "../assets/water big.png";
import cocktail from "../assets/cocktail big.png";
import orangeJuice from "../assets/orange juice big.png";
import Chapman from "../assets/chapman big.png";
import fruitPunch from "../assets/fruit punch big.png";
import PoundoYam from "../assets/poundo yam big.png";
import semo from "../assets/semo big.png";
import VillageRice from "../assets/village jollof rice.png";
import OfadaRice from "../assets/ofada rice big.png";
import Yam from "../assets/yam and tomato sauce big.png";
import EggYam from "../assets/yam and egg sauce big.png";
import ToastEgg from "../assets/toast and egg big.png";
import Sandwich from "../assets/sandwiich.png";
import Pap from "../assets/pap and akara 1.png";
// interface TabItem {
//   id: number;
//   label: string;
//   content: JSX.Element;
// }

interface MenuItem {
  title: string;
  price: string;
  id: number;
  image: string;
  details?: string;
  options?: {
    label: string;
    value: string;
    price: string;
  }[];
}

interface MenuCategory {
  category: string;
  items: MenuItem[];
  id?: number;
  title?: string;
  price?: number;
  image?: string;
  details?: string;
  options?: {
    label: string;
    value: string;
    price: number;
  }[];
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
      category: "Breakfast",
      items: [
        {
          id: 1,
          title: "Pap and Akara",
          image: `${Pap}`,
          price: "1200",
          details: "Pap served with brown crunchy akara",
          options: [
            {
              label: "Add Milk (+#500)",
              value: "AddMilk",
              price: "500",
            },
          ],
        },
        {
          id: 2,
          title: "Sandwich",
          image: `${Sandwich}`,
          price: "1100",
          details: "Spicy Sandwich",
          options: [
            {
              label: "Add Chicken Fillet (+#500)",
              value: "chickenFillet",
              price: "500",
            },
            { label: "Add Lettuse (+#500)", value: "lettuse", price: "500" },
          ],
        },
        {
          id: 3,
          title: "Yam and Egg Sauce",
          image: `${EggYam}`,
          price: "1230",
          details: "Yam served with Egg Sauce",
          options: [
            {
              label: "Add Tomato Sauce (+#500)",
              value: "tomatoSauce",
              price: "500",
            },
            { label: "Add Lettuse (+#500)", value: "lettuse", price: "500" },
          ],
        },
        {
          id: 4,
          title: "Toast and Egg",
          image: `${ToastEgg}`,
          price: "1250",
          details: "Toast Bread served with Egg",
          options: [
            {
              label: "Add egg Sauce (+#500)",
              value: "eggSauce",
              price: "500",
            },
            {
              label: "Add More Pepper (+#1000)",
              value: "morePepper",
              price: "1000",
            },
          ],
        },
        {
          id: 5,
          title: "Yam and Tomato Sauce",
          image: `${Yam}`,
          price: "2000",
          details: "Yam served with Tomato Sauce",
          options: [
            {
              label: "Add Chicken Fillet (+#500)",
              value: "chickenFillet",
              price: "500",
            },
            { label: "Add Chicken (+#500)", value: "chicken", price: "500" },
            {
              label: "Add More Pepper (+#1000)",
              value: "morePepper",
              price: "1000",
            },
          ],
        },
      ],
    },
    {
      category: "Lunch",
      items: [
        {
          id: 33,
          title: "Fried Rice",
          image: `${FriedRice}`,
          price: "2000",
          details: "Fried Rice served with Chicken",
          options: [
            {
              label: "Add egg Sauce (+#500)",
              value: "eggSauce",
              price: "500",
            },
            {
              label: "Add More Pepper (+#1000)",
              value: "morePepper",
              price: "1000",
            },
          ],
        },
        {
          id: 43,
          title: "Village Jollof Rice",
          image: `${VillageRice}`,
          price: "3000",
          details: "Yam served with Tomato Sauce",
          options: [
            {
              label: "Add egg Sauce (+#500)",
              value: "eggSauce",
              price: "500",
            },
            {
              label: "Add More Pepper (+#1000)",
              value: "morePepper",
              price: "1000",
            },
          ],
        },
        {
          id: 44,
          title: "Semo",
          image: `${semo}`,
          price: "1500",
          details: "Yam served with Tomato Sauce",
          options: [
            {
              label: "Add egg Sauce (+#500)",
              value: "eggSauce",
              price: "500",
            },
            {
              label: "Add More Pepper (+#1000)",
              value: "morePepper",
              price: "1000",
            },
          ],
        },

        {
          id: 45,
          title: "Ofada Rice",
          image: `${OfadaRice}`,
          price: "1000",
          details: "Yam served with Tomato Sauce",
          options: [
            {
              label: "Add egg Sauce (+#500)",
              value: "eggSauce",
              price: "500",
            },
            {
              label: "Add More Pepper (+#1000)",
              value: "morePepper",
              price: "1000",
            },
          ],
        },
        {
          id: 46,
          title: "Poundo Yam",
          image: `${PoundoYam}`,
          price: "2500",
          details: "Pounded yam with Egusi soup",
          options: [
            {
              label: "Add egg (+#500)",
              value: "eggSauce",
              price: "500",
            },
            {
              label: "Add More Pepper (+#1000)",
              value: "morePepper",
              price: "1000",
            },
          ],
        },
      ],
    },
    {
      category: "Grill",
      items: [
        {
          id: 5,
          title: "Grilled Tilapia Fish",
          image: `${fish1}`,
          price: "1500",
        },
        {
          id: 61,
          title: "Chicken Suya",
          image: `${fish2}`,
          price: "5000",
        },
        {
          id: 62,
          title: "Beef Suya",
          image: `${fish3}`,

          price: "5000",
        },
        {
          id: 63,
          title: "Grilled Catfish",
          image: `${fish4}`,

          price: "5000",
        },
        {
          id: 64,
          title: "Grilled Plantain (Bole)",
          image: `${fish5}`,

          price: "5000",
        },
      ],
    },
    {
      category: "Drink",
      items: [
        {
          id: 7,
          title: "Chapman",
          image: `${Chapman}`,
          price: "1250",
          details: "Chilled Drink",
        },
        {
          id: 8,
          title: "Orange Juice",
          image: `${orangeJuice}`,
          price: "1250",
          details: "Fresh Orange Juice",
        },
        {
          id: 81,
          title: "Cocktail",
          image: `${cocktail}`,
          price: "1250",
          details: "French Cocktail",
        },
        {
          id: 82,
          title: "Fruit Punch",
          image: `${fruitPunch}`,
          price: "1250",
          details: "Fruit Punch",
        },
        {
          id: 83,
          title: "Water",
          image: `${water}`,
          price: "1250",
          details: "Water",
        },
      ],
    },
  ];

  const [activeTab, setActiveTab] = useState<number>(1);

  return (
    <div>
      <div>
        <div className="grid grid-cols-4 gap-[38px] text-center mx-[13px] items-center border-b  border-grey100 mt-[24px]">
          {menuData.map((menu, index) => (
            <button
              key={menu.category}
              className={`pb-[8px] ${
                index === activeTab
                  ? "border-b-[4px] border-b-[#E16B07] text-[#121212] text-[16px] flex items-center justify-center font-[500]"
                  : "text-grey100 font-[400]"
              }`}
              onClick={() => setActiveTab(index)}
            >
              {menu.category}
            </button>
          ))}
        </div>

        <div className="">
          {menuData.map((menu, categoryIndex) => (
            <div key={menu.category}>
              {activeTab === categoryIndex && (
                <div>
                  <h2 className=" border-b-[#E7E7E7] py-[8px]  font-[500] text-[18px] uppercase">
                    {menu.category}
                  </h2>
                  <ul className="grid gap-[8px] px-[16px]">
                    {menu.items.map((item, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between border-b py-[8px]"
                      >
                        <div className="flex items-center gap-[16px]">
                          <img src={item.image} alt="" className=" w-32 h-32" />
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
              )}
            </div>
          ))}
        </div>
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
                  <img src={editItem.image} alt="" className=" w-32 h-32" />
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
