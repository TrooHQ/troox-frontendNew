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
import image1 from "../assets/image 39.png";
import image2 from "../assets/image 40.png";
import Pap from "../assets/pap and akara 1.png";
import { Link } from "react-router-dom";
import TopMenuNav from "./TopMenuNav";
import ArrowRight from "../assets/chevronrightt.svg";

export const MenuPage = () => {
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
    <div className=" relative ">
      <div className="  ">
        <TopMenuNav />

        <div className=" px-[21px] ">
          {data.map((menu) => (
            <div className="mt-[24px]">
              <div className=" flex items-center justify-between ">
                <p className=" text-[16px] font-[500] text-[#121212]  uppercase">
                  {menu.category}
                </p>
                <Link to={`/category-details/${menu.category}`}>
                  <div className=" flex items-center">
                    <p className=" text-[14px] text-[#0B7F7C] font-[400] leading-[21px]">
                      Explore Menu
                    </p>
                    <img src={ArrowRight} alt="" />
                  </div>
                </Link>
              </div>
              <div className=" pt-[16px] pb-[20px] border-b">
                <img src={menu.image} alt="" className=" w-full" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
