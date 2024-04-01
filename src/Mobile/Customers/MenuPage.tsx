import { useState } from "react";

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
import Edit from "../assets/Edit.svg";
import Pap from "../assets/pap and akara 1.png";
import Add from "../assets/PlusIcon.svg";
import { Link } from "react-router-dom";
import TopMenuNav from "./TopMenuNav";

export const MenuPage = () => {
  const [activeTab, setActiveTab] = useState(0);

  // const data = [
  //   {
  //     category: "Breakfast",
  //     items: [
  //       {
  //         id: 1,
  //         title: "Pap and Akara",
  //         image: `${Pap}`,
  //         price: "1200",
  //         details: "Pap served with brown crunchy akara",
  //       },
  //       {
  //         id: 2,
  //         title: "Sandwich",
  //         image: `${Sandwich}`,
  //         price: "1100",
  //       },
  //       {
  //         id: 3,
  //         title: "Yam and Egg Sauce",
  //         image: `${EggYam}`,
  //         price: "1230",
  //       },
  //       {
  //         id: 4,
  //         title: "Toast and Egg",
  //         image: `${ToastEgg}`,
  //         price: "1250",
  //       },
  //       {
  //         id: 5,
  //         title: "Yam and Tomato Sauce",
  //         image: `${Yam}`,

  //         price: "2000",
  //       },
  //     ],
  //   },
  //   {
  //     category: "Lunch",
  //     items: [
  //       {
  //         id: 33,
  //         title: "Fried Rice",
  //         image: `${FriedRice}`,
  //         price: "2000",
  //       },
  //       {
  //         id: 43,
  //         title: "Village Jollof Rice",
  //         image: `${VillageRice}`,
  //         price: "3000",
  //       },
  //       {
  //         id: 44,
  //         title: "Semo",
  //         image: `${semo}`,
  //         price: "1500",
  //       },

  //       {
  //         id: 45,
  //         title: "Ofada Rice",
  //         image: `${OfadaRice}`,
  //         price: "1000",
  //       },
  //       {
  //         id: 46,
  //         title: "Poundo Yam",
  //         image: `${PoundoYam}`,
  //         price: "2500",
  //       },
  //     ],
  //   },
  //   {
  //     category: "Grill",
  //     items: [
  //       {
  //         id: 5,
  //         title: "Grilled Tilapia Fish",
  //         image: `${fish1}`,
  //         price: 1500,
  //       },
  //       {
  //         id: 61,
  //         title: "Chicken Suya",
  //         image: `${fish2}`,
  //         price: 5000,
  //       },
  //       {
  //         id: 62,
  //         title: "Beef Suya",
  //         image: `${fish3}`,

  //         price: 5000,
  //       },
  //       {
  //         id: 63,
  //         title: "Grilled Catfish",
  //         image: `${fish4}`,

  //         price: 5000,
  //       },
  //       {
  //         id: 64,
  //         title: "Grilled Plantain (Bole)",
  //         image: `${fish5}`,

  //         price: 5000,
  //       },
  //     ],
  //   },
  //   {
  //     category: "Drink",
  //     items: [
  //       {
  //         id: 7,
  //         title: "Chapman",
  //         image: `${Chapman}`,
  //         price: "1250",
  //       },
  //       {
  //         id: 8,
  //         title: "Orange Juice",
  //         image: `${orangeJuice}`,
  //         price: "1250",
  //       },
  //       {
  //         id: 81,
  //         title: "Cocktail",
  //         image: `${cocktail}`,
  //         price: "1250",
  //       },
  //       {
  //         id: 82,
  //         title: "Fruit Punch",
  //         image: `${fruitPunch}`,
  //         price: "1250",
  //       },
  //       {
  //         id: 83,
  //         title: "Water",
  //         image: `${water}`,
  //         price: "1250",
  //       },
  //     ],
  //   },
  // ];
  const data = [
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
          price: 1500,
        },
        {
          id: 61,
          title: "Chicken Suya",
          image: `${fish2}`,
          price: 5000,
        },
        {
          id: 62,
          title: "Beef Suya",
          image: `${fish3}`,

          price: 5000,
        },
        {
          id: 63,
          title: "Grilled Catfish",
          image: `${fish4}`,

          price: 5000,
        },
        {
          id: 64,
          title: "Grilled Plantain (Bole)",
          image: `${fish5}`,

          price: 5000,
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
          // options: [
          //   {
          //     label: "Add egg Sauce (+#500)",
          //     value: "eggSauce",
          //     price: "500",
          //   },
          //   {
          //     label: "Add More Pepper (+#1000)",
          //     value: "morePepper",
          //     price: "1000",
          //   },
          // ],
        },
        {
          id: 8,
          title: "Orange Juice",
          image: `${orangeJuice}`,
          price: "1250",
          details: "Fresh Orange Juice",
          // options: [
          //   {
          //     label: "Add egg Sauce (+#500)",
          //     value: "eggSauce",
          //     price: "500",
          //   },
          //   {
          //     label: "Add More Pepper (+#1000)",
          //     value: "morePepper",
          //     price: "1000",
          //   },
          // ],
        },
        {
          id: 81,
          title: "Cocktail",
          image: `${cocktail}`,
          price: "1250",
          details: "French Cocktail",
          // options: [
          //   {
          //     label: "Add egg Sauce (+#500)",
          //     value: "eggSauce",
          //     price: "500",
          //   },
          //   {
          //     label: "Add More Pepper (+#1000)",
          //     value: "morePepper",
          //     price: "1000",
          //   },
          // ],
        },
        {
          id: 82,
          title: "Fruit Punch",
          image: `${fruitPunch}`,
          price: "1250",
          details: "Fruit Punch",
          // options: [
          //   {
          //     label: "Add egg Sauce (+#500)",
          //     value: "eggSauce",
          //     price: "500",
          //   },
          //   {
          //     label: "Add More Pepper (+#1000)",
          //     value: "morePepper",
          //     price: "1000",
          //   },
          // ],
        },
        {
          id: 83,
          title: "Water",
          image: `${water}`,
          price: "1250",
          details: "Water",
          // options: [
          //   {
          //     label: "Add egg Sauce (+#500)",
          //     value: "eggSauce",
          //     price: "500",
          //   },
          //   {
          //     label: "Add More Pepper (+#1000)",
          //     value: "morePepper",
          //     price: "1000",
          //   },
          // ],
        },
      ],
    },
  ];
  const id = sessionStorage.getItem("ids");
  const price = sessionStorage.getItem("totalPrice");

  const count = sessionStorage.getItem("count");
  console.log(id);

  // const handleAddToBasket = () => {
  //   console.log("Selected Item ID:", id);
  //   if (id) {
  //     sessionStorage.setItem("id", id);
  //   }
  //   console.log("Selected Options:");
  //   selectedOptions.forEach((option) => {
  //     const selectedOption = options.find((opt) => opt.value === option);
  //     if (selectedOption) {
  //       console.log(selectedOption.label + " - Price: " + selectedOption.price);
  //     }
  //   });
  // };

  return (
    <div className=" relative ">
      <div className="  ">
        <TopMenuNav />

        <div className="grid grid-cols-4 gap-[38px] text-center mx-[13px] items-center border-b  border-grey100 mt-[24px]">
          {data.map((menu, index) => (
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

        <div className=" mt-[24px] mb-[100px] ">
          {data.map((menu, index) => (
            <div
              key={menu.category}
              className={` ${index !== activeTab ? "hidden" : ""}`}
            >
              <p className="text-[18px] font-[500] uppercase py-[9px] border-b mx-[24px]">
                {menu.category}
              </p>
              {menu.items.map((item) => (
                <Link to={`/menu-details/${item.id}`}>
                  <div
                    className={`${
                      id?.includes(item.id.toString())
                        ? "bg-[#F4EBD7] px-[16px]"
                        : "px-[16px]"
                    }`}
                  >
                    <div
                      key={item.id}
                      className={`flex  items-center justify-between  border-b py-[9px]  mt-[8px]                `}
                    >
                      <div className=" flex items-center gap-[16px] ">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-32 h-32"
                        />
                        <div className=" grid gap-[18px] ">
                          <p>{item.title}</p>
                          <p className="text-gray-600">&#x20A6;{item.price}</p>
                        </div>
                      </div>
                      {id?.includes(item.id.toString()) ? (
                        <img src={Edit} alt="" />
                      ) : (
                        <img src={Add} alt="" />
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ))}
        </div>

        {id && (
          <div className="px-[16px] fixed bottom-[10px] w-full">
            <div className="flex justify-between items-center py-[13px] px-[24px] bg-[#EFB519] rounded-[3px] cursor-pointer">
              <div className="flex items-center gap-[16px]">
                <p className="bg-white py-[12px] px-[10px] text-[16px] font-[500]">
                  {count || 1}
                </p>
                <p>#{price}</p>
              </div>
              <p className="text-[16px] font-[500]">Add to basket</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
