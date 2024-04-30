import { useState } from "react";

import fish1 from "../assets/gilled tilapia fish big.png";
import fish2 from "../assets/chicken suya big.png";
import fish3 from "../assets/beef suya big.png";
import fish4 from "../assets/grilled catfish big.png";
import fish5 from "../assets/grilled plantain big.png";
// import FriedRice from "../assets/fried rice big.png";
import water from "../assets/water big.png";
import cocktail from "../assets/cocktail big.png";
import orangeJuice from "../assets/orange juice big.png";
import Chapman from "../assets/chapman big.png";
import fruitPunch from "../assets/fruit punch big.png";
// import PoundoYam from "../assets/poundo yam big.png";
// import semo from "../assets/semo big.png";
// import VillageRice from "../assets/village jollof rice.png";
// import OfadaRice from "../assets/ofada rice big.png";
import Yam from "../assets/yam and tomato sauce big.png";
import EggYam from "../assets/yam and egg sauce big.png";
import ToastEgg from "../assets/toast and egg big.png";
import Sandwich from "../assets/sandwiich.png";
import image1 from "../assets/image 39.png";
import image2 from "../assets/image 40.png";
import Edit from "../assets/EditIconn.svg";
import Pap from "../assets/pap and akara 1.png";
import Add from "../assets/plusIconRound.svg";
import Adds from "../assets/plusIconn.svg";
// import { Link } from "react-router-dom";
import TopMenuNav from "./TopMenuNav";
import { Link, useParams } from "react-router-dom";

export const CategoryDetails = () => {
  const { id } = useParams();

  if (id) {
    sessionStorage.setItem("menuId", id);
  }

  // const [activeTab, setActiveTab] = useState(0);
  const [selectedGroup, setSelectedGroup] = useState("");
  const data = [
    {
      category: "Breakfast",
      image: `${image1}`,
      group: [
        {
          groupCategory: "Breakfast Meal",
          name: "Toast",
          items: [
            {
              id: 1,
              title: "Pap and Akara1",
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
              title: "Sandwich1",
              image: `${Sandwich}`,
              price: "1100",
              details: "Spicy Sandwich",
              options: [
                {
                  label: "Add Chicken Fillet (+#500)",
                  value: "chickenFillet",
                  price: "500",
                },
                {
                  label: "Add Lettuse (+#500)",
                  value: "lettuse",
                  price: "500",
                },
              ],
            },
            {
              id: 3,
              title: "Yam and Egg Sauce1",
              image: `${EggYam}`,
              price: "1230",
              details: "Yam served with Egg Sauce",
              options: [
                {
                  label: "Add Tomato Sauce (+#500)",
                  value: "tomatoSauce",
                  price: "500",
                },
                {
                  label: "Add Lettuse (+#500)",
                  value: "lettuse",
                  price: "500",
                },
              ],
            },
            {
              id: 4,
              title: "Toast and Egg1",
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
              title: "Yam and Tomato Sauce1",
              image: `${Yam}`,
              price: "2000",
              details: "Yam served with Tomato Sauce",
              options: [
                {
                  label: "Add Chicken Fillet (+#500)",
                  value: "chickenFillet",
                  price: "500",
                },
                {
                  label: "Add Chicken (+#500)",
                  value: "chicken",
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
          groupCategory: "Breakfast Meal2",
          name: "Oats and Meal",
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
                {
                  label: "Add Lettuse (+#500)",
                  value: "lettuse",
                  price: "500",
                },
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
                {
                  label: "Add Lettuse (+#500)",
                  value: "lettuse",
                  price: "500",
                },
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
                {
                  label: "Add Chicken (+#500)",
                  value: "chicken",
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
          groupCategory: "Breakfast Meal3",
          name: "Coffee",
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
                {
                  label: "Add Lettuse (+#500)",
                  value: "lettuse",
                  price: "500",
                },
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
                {
                  label: "Add Lettuse (+#500)",
                  value: "lettuse",
                  price: "500",
                },
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
                {
                  label: "Add Chicken (+#500)",
                  value: "chicken",
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
          groupCategory: "Breakfast Meal4",
          name: "Coffee Bread",
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
                {
                  label: "Add Lettuse (+#500)",
                  value: "lettuse",
                  price: "500",
                },
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
                {
                  label: "Add Lettuse (+#500)",
                  value: "lettuse",
                  price: "500",
                },
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
                {
                  label: "Add Chicken (+#500)",
                  value: "chicken",
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
      ],
    },
    {
      category: "Lunch",
      image: `${image2}`,
      group: [
        {
          groupCategory: "Lunch",
          name: "Toast",
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
                {
                  label: "Add Lettuse (+#500)",
                  value: "lettuse",
                  price: "500",
                },
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
                {
                  label: "Add Lettuse (+#500)",
                  value: "lettuse",
                  price: "500",
                },
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
                {
                  label: "Add Chicken (+#500)",
                  value: "chicken",
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
          groupCategory: "Lunch",
          name: "Oats and Meal",
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
                {
                  label: "Add Lettuse (+#500)",
                  value: "lettuse",
                  price: "500",
                },
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
                {
                  label: "Add Lettuse (+#500)",
                  value: "lettuse",
                  price: "500",
                },
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
                {
                  label: "Add Chicken (+#500)",
                  value: "chicken",
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
          groupCategory: "Lunch",
          name: "Coffee",
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
                {
                  label: "Add Lettuse (+#500)",
                  value: "lettuse",
                  price: "500",
                },
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
                {
                  label: "Add Lettuse (+#500)",
                  value: "lettuse",
                  price: "500",
                },
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
                {
                  label: "Add Chicken (+#500)",
                  value: "chicken",
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
      ],
      // items: [
      //   {
      //     id: 33,
      //     title: "Fried Rice",
      //     image: `${FriedRice}`,
      //     price: "2000",
      //     details: "Fried Rice served with Chicken",
      //     options: [
      //       {
      //         label: "Add egg Sauce (+#500)",
      //         value: "eggSauce",
      //         price: "500",
      //       },
      //       {
      //         label: "Add More Pepper (+#1000)",
      //         value: "morePepper",
      //         price: "1000",
      //       },
      //     ],
      //   },
      //   {
      //     id: 43,
      //     title: "Village Jollof Rice",
      //     image: `${VillageRice}`,
      //     price: "3000",
      //     details: "Yam served with Tomato Sauce",
      //     options: [
      //       {
      //         label: "Add egg Sauce (+#500)",
      //         value: "eggSauce",
      //         price: "500",
      //       },
      //       {
      //         label: "Add More Pepper (+#1000)",
      //         value: "morePepper",
      //         price: "1000",
      //       },
      //     ],
      //   },
      //   {
      //     id: 44,
      //     title: "Semo",
      //     image: `${semo}`,
      //     price: "1500",
      //     details: "Yam served with Tomato Sauce",
      //     options: [
      //       {
      //         label: "Add egg Sauce (+#500)",
      //         value: "eggSauce",
      //         price: "500",
      //       },
      //       {
      //         label: "Add More Pepper (+#1000)",
      //         value: "morePepper",
      //         price: "1000",
      //       },
      //     ],
      //   },

      //   {
      //     id: 45,
      //     title: "Ofada Rice",
      //     image: `${OfadaRice}`,
      //     price: "1000",
      //     details: "Yam served with Tomato Sauce",
      //     options: [
      //       {
      //         label: "Add egg Sauce (+#500)",
      //         value: "eggSauce",
      //         price: "500",
      //       },
      //       {
      //         label: "Add More Pepper (+#1000)",
      //         value: "morePepper",
      //         price: "1000",
      //       },
      //     ],
      //   },
      //   {
      //     id: 46,
      //     title: "Poundo Yam",
      //     image: `${PoundoYam}`,
      //     price: "2500",
      //     details: "Pounded yam with Egusi soup",
      //     options: [
      //       {
      //         label: "Add egg (+#500)",
      //         value: "eggSauce",
      //         price: "500",
      //       },
      //       {
      //         label: "Add More Pepper (+#1000)",
      //         value: "morePepper",
      //         price: "1000",
      //       },
      //     ],
      //   },
      // ],
    },
    {
      category: "Grill",
      image: `${image1}`,
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
  const ids = sessionStorage.getItem("ids");
  const price = sessionStorage.getItem("totalPrice");
  console.log("Selected Group:", selectedGroup);
  const count = sessionStorage.getItem("count");

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

        <div className="mt-[24px] mb-[8px] ">
          {data.map((menu) => (
            <div
              key={menu.category}
              className="flex items-center gap-[8px] text-center  "
              style={{ overflowX: "auto", whiteSpace: "nowrap" }}
            >
              {menu.category === id && (
                <>
                  {menu.group?.map((menuItem, itemIndex) => (
                    <div key={itemIndex} className="">
                      <p
                        className={`px-[12px] py-[8px] ${
                          selectedGroup === menuItem.groupCategory
                            ? "bg-[#0B7F7C] text-white font-[600]"
                            : "border text-[#606060] font-[400]"
                        }  text-[14px] cursor-pointer`}
                        onClick={() => setSelectedGroup(menuItem.groupCategory)}
                      >
                        {menuItem.groupCategory}
                      </p>
                    </div>
                  ))}
                </>
              )}
            </div>
          ))}
        </div>

        <div className=" mx-[24px]">
          {data.map((menu) => (
            //  ${index !== activeTab ? "hidden" : ""}
            <div key={menu.category} className={``}>
              {menu.category === id && (
                <>
                  {menu.group?.map((menuItem) => (
                    <div className="">
                      {menuItem.groupCategory === selectedGroup && (
                        <div className="">
                          <p className="text-[18px] font-[500] uppercase py-[9px] border-b ">
                            {menuItem.groupCategory}
                          </p>
                          {menuItem.items?.map((menuItem, itemsIndex) => (
                            <div
                              className=" py-[11px] border-b border-[#E7E7E7] "
                              key={itemsIndex}
                            >
                              <div className="flex items-center justify-between">
                                <div className=" w-[180px]">
                                  <p className=" text-[16px] text-[#121212] font-[500]">
                                    {menuItem.title}
                                  </p>
                                  <p className=" text-[12px] text-[#121212]">
                                    {menuItem.details}
                                  </p>
                                </div>
                                <div className="">
                                  <img
                                    src={menuItem.image}
                                    alt=""
                                    className=" w-[100px]"
                                  />
                                </div>
                              </div>

                              <div className="pt-[8px] flex items-center justify-between">
                                <p className=" text-[16px] text-[#121212] font-[500] ">
                                  From &#x20A6;{menuItem.price}
                                </p>

                                <div className="">
                                  <Link to={`/menu-details/${menuItem.id}`}>
                                    {ids?.includes(menuItem.id.toString()) ? (
                                      <div className=" px-[16px] py-[8px] bg-[#0B7F7C] flex items-center w-[100px] justify-center rounded-bl-[5px] rounded-br-[5px]">
                                        <p className=" text-[12px] font-[500] text-white">
                                          EDIT
                                        </p>
                                        <img src={Edit} alt="" className=" " />
                                      </div>
                                    ) : (
                                      <div className="">
                                        {!ids?.includes(
                                          menuItem.id.toString()
                                        ) && ids ? (
                                          <div className=" px-[16px] py-[8px] bg-[#0B7F7C] flex items-center w-[100px] justify-center rounded-bl-[5px] rounded-br-[5px] gap-[4px]">
                                            <p className=" text-[12px] font-[500] text-white">
                                              Add
                                            </p>
                                            <img
                                              src={Add}
                                              alt=""
                                              className=" "
                                            />
                                          </div>
                                        ) : (
                                          <img src={Adds} alt="" />
                                        )}
                                      </div>
                                    )}
                                  </Link>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </>
              )}
            </div>
          ))}
        </div>
        {ids && (
          <div className="px-[16px] sticky bottom-[10px] w-full">
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
