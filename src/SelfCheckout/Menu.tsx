import fish1 from "../Mobile/assets/gilled tilapia fish big.png";
import fish2 from "../Mobile/assets/chicken suya big.png";
import fish3 from "../Mobile/assets/beef suya big.png";
import fish4 from "../Mobile/assets/grilled catfish big.png";
import fish5 from "../Mobile/assets/grilled plantain big.png";
import FriedRice from "../Mobile/assets/fried rice big.png";
import water from "../Mobile/assets/water big.png";
import cocktail from "../Mobile/assets/cocktail big.png";
import orangeJuice from "../Mobile/assets/orange juice big.png";
import Chapman from "../Mobile/assets/chapman big.png";
import fruitPunch from "../Mobile/assets/fruit punch big.png";
import PoundoYam from "../Mobile/assets/poundo yam big.png";
import semo from "../Mobile/assets/semo big.png";
import VillageRice from "../Mobile/assets/village jollof rice.png";
import OfadaRice from "../Mobile/assets/ofada rice big.png";
import Yam from "../Mobile/assets/yam and tomato sauce big.png";
import EggYam from "../Mobile/assets/yam and egg sauce big.png";
import ToastEgg from "../Mobile/assets/toast and egg big.png";
import Sandwich from "../Mobile/assets/sandwiich.png";
import image1 from "../Mobile/assets/image 39.png";
import image2 from "../Mobile/assets/image 40.png";
import Pap from "../Mobile/assets/pap and akara 1.png";
import TakeAway from "../SelfCheckout/assets/take-away.svg";
import DineIn from "../SelfCheckout/assets/dine-in.svg";
import Header from "./Header";
import { Link } from "react-router-dom";
import Modal from "../components/Modal";
import { useEffect, useState } from "react";

const Menu = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(true);
  }, []);

  const data = [
    {
      category: "Breakfast",
      image: `${image1}`,
      id: 1,
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
      image: `${image2}`,
      id: 2,
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
      image: `${image1}`,
      id: 3,
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
      image: `${image2}`,
      id: 4,
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
  return (
    <div>
      <Header />

      <div className=" mt-[123px]">
        <div className=" px-[21px] grid grid-cols-3 items-center place-items-center">
          {data.map((menu) => (
            <Link to={`/category-details/${menu.category}`}>
              <div className="mt-[24px] max-w-[246px] text-center border-2 border-[#B6B6B6] rounded-[10px] drop-shadow-md">
                <p className=" text-[32px] font-[500] text-[#121212]  uppercase py-[22px]">
                  {menu.category}
                </p>
                {/* 
                  <div className=" flex items-center">
                    <p className=" text-[14px] text-[#0B7F7C] font-[400] leading-[21px]">
                      Explore Menu
                    </p>
                    <img src={ArrowRight} alt="" />
                  </div>
                </Link> */}
                <div className="rounded-b-[10px] overflow-hidden">
                  <img
                    src={menu.image}
                    alt=""
                    className="object-cover w-full"
                  />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <div className=" pb-[128px] pt-[57px] px-[103px] flex flex-col items-center justify-center">
          <p className=" text-[36px] font-[500] text-[#000000]">
            How would you like your order?
          </p>
          <div
            className=" flex items-center gap-[23px] mt-[44px]"
            onClick={() => setIsOpen(false)}
          >
            <img src={TakeAway} alt="" className=" cursor-pointer" />
            <img src={DineIn} alt="" className=" cursor-pointer" />
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Menu;
