import { useState } from "react";

import MenuImage from "../assets/menuImg.png";
import Favourite from "../assets/favorite.svg";
import { Link } from "react-router-dom";
import TopMenuNav from "./TopMenuNav";

export const MenuPage = () => {
  const [activeTab, setActiveTab] = useState(0);

  const data = [
    {
      category: "Breakfast",
      items: [
        {
          id: 1,
          title: "Egg and Toast",
          image: "menu1.jpg",
          price: "$10.99",
        },
        {
          id: 2,
          title: "Pancakes",
          image: "menu2.jpg",
          price: "$12.99",
        },
      ],
    },
    {
      category: "Burger",
      items: [
        {
          id: 3,
          title: "Classic Burger",
          image: "menu3.jpg",
          price: "$8.99",
        },
        {
          id: 4,
          title: "Chicken Burger",
          image: "menu4.jpg",
          price: "$15.99",
        },
      ],
    },
    {
      category: "Sandwich",
      items: [
        {
          id: 5,
          title: "Classic Sandwich",
          image: "menu3.jpg",
          price: "$8.99",
        },
        {
          id: 6,
          title: "Chicken Sandwich",
          image: "menu4.jpg",
          price: "$15.99",
        },
      ],
    },
    {
      category: "Chicken",
      items: [
        {
          id: 7,
          title: "Classic Chicken",
          image: "menu3.jpg",
          price: "$8.99",
        },
        {
          id: 8,
          title: "Chicken Burger",
          image: "menu4.jpg",
          price: "$15.99",
        },
      ],
    },
  ];

  const id = sessionStorage.getItem("id");
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
    <div className="  ">
      <TopMenuNav />
      <div className="grid grid-cols-4 items-center border-b border-grey100 mt-[24px] px-[20px]">
        {data.map((menu, index) => (
          <button
            key={menu.category}
            className={`pb-[8px] ${
              index === activeTab
                ? "border-b-[4px] border-b-[#E16B07] text-[#121212] text-[16px] text-center font-[500]"
                : "text-grey100 font-[400]"
            }`}
            onClick={() => setActiveTab(index)}
          >
            {menu.category}
          </button>
        ))}
      </div>

      <div className=" ">
        {data.map((menu, index) => (
          <div
            key={menu.category}
            className={`p-4 ${index !== activeTab ? "hidden" : ""}`}
          >
            <p className="text-[18px] font-[500] uppercase py-[9px] border-b ">
              {menu.category}
            </p>
            {menu.items.map((item) => (
              <Link to={`/menu-details/${item.id}`}>
                <div
                  key={item.id}
                  className={`flex items-center justify-between border-b pb-[5px] mt-[8px] ${
                    id === item.id.toString() ? "bg-red-500" : ""
                  }`}
                >
                  <div className=" flex items-start gap-[16px]">
                    <img
                      src={MenuImage}
                      alt={item.title}
                      className="w-32 h-32"
                    />
                    <div className=" grid gap-[16px] my-[16px]">
                      <p>{item.title}</p>
                      <p className="text-gray-600">{item.price}</p>
                    </div>
                  </div>
                  <img src={Favourite} alt="" />
                </div>
              </Link>
            ))}
          </div>
        ))}
      </div>

      <div className=" mx-[16px] my-[16px]">
        <div className=" flex justify-between items-center py-[13px] px-[24px] bg-[#EFB519] rounded-[3px] cursor-pointer">
          <div className=" flex items-center gap-[16px]">
            <p className=" bg-white py-[12px] px-[10px] text-[16px] font-[500]">
              {count}
            </p>
            <p>#{price}</p>
          </div>
          <p className=" text-[16px] font-[500]">Add to basket</p>
        </div>
      </div>
    </div>
  );
};
