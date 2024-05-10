import { useEffect, useState } from "react";

import fish1 from "../Mobile/assets/gilled tilapia fish big.png";
import fish2 from "../Mobile/assets/chicken suya big.png";
import fish3 from "../Mobile/assets/beef suya big.png";
import fish4 from "../Mobile/assets/grilled catfish big.png";
import fish5 from "../Mobile/assets/grilled plantain big.png";
import water from "../Mobile/assets/water big.png";
import cocktail from "../Mobile/assets/cocktail big.png";
import orangeJuice from "../Mobile/assets/orange juice big.png";
import Chapman from "../Mobile/assets/chapman big.png";
import fruitPunch from "../Mobile/assets/fruit punch big.png";
import Yam from "../Mobile/assets/yam and tomato sauce big.png";
import EggYam from "../Mobile/assets/yam and egg sauce big.png";
import ToastEgg from "../Mobile/assets/toast and egg big.png";
import Sandwich from "../Mobile/assets/sandwiich.png";
import image1 from "../Mobile/assets/image 39.png";
import image2 from "../Mobile/assets/image 40.png";
import Pap from "../Mobile/assets/pap and akara 1.png";
import Add from "../SelfCheckout/assets/incrementIcon.svg";
import Minus from "../SelfCheckout/assets/decrementIcon.svg";
import Back from "../SelfCheckout/assets/Back.svg";
import MiniLogo from "../SelfCheckout/assets/restaurantHeart.svg";
import { Link, useNavigate, useParams } from "react-router-dom";

export const CategoryDetails = () => {
  const navigate = useNavigate();

  const { id } = useParams();

  if (id) {
    sessionStorage.setItem("menuId", id);
  }

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
  const [counts, setCounts] = useState<number>(1);

  useEffect(() => {
    const storedCount = sessionStorage.getItem("count");
    if (storedCount !== null) {
      setCounts(Number(storedCount));
    }
  }, []);

  const incrementCount = () => {
    const updatedCount = counts + 1;
    setCounts(updatedCount);
    sessionStorage.setItem("count", String(updatedCount));
  };

  const decrementCount = () => {
    const updatedCount = counts - 1;
    setCounts(updatedCount);
    sessionStorage.setItem("count", String(updatedCount));
  };

  return (
    <div className=" relative mt-[83px]">
      <div className="  ">
        <div className=" px-[8px] flex items-center justify-between">
          <img
            src={Back}
            alt=""
            onClick={() => navigate(-1)}
            className=" cursor-pointer"
          />
          <img src={MiniLogo} alt="" />
          <div className="">
            <img src={MiniLogo} alt="" className=" hidden" />
          </div>
        </div>

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
                        className={`px-[32px] py-[8px] ${
                          selectedGroup === menuItem.groupCategory
                            ? "text-[#0B7F7C]  font-[600]"
                            : " text-[#606060] font-[400]"
                        }  text-[32px] cursor-pointer`}
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

        <div className=" mx-[16px]">
          {data.map((menu) => (
            //  ${index !== activeTab ? "hidden" : ""}
            <div key={menu.category} className={``}>
              {menu.category === id && (
                <>
                  {menu.group?.map((menuItem) => (
                    <div className="">
                      {menuItem.groupCategory === selectedGroup && (
                        <div className=" ">
                          <p className="text-[56px] font-[600] uppercase bg-[#0B7F7C] text-white border-b px-[115px] py-[63px] mt-[53px]">
                            {menu.category}
                          </p>
                          <div className="grid grid-cols-2">
                            {menuItem.items?.map((menuItem, itemsIndex) => (
                              <div
                                className=" pb-[34px] pt-[18px] rounded-[10px] px-[7px] my-[34px] border-2 drop-shadow border-[#E7E7E7] max-w-[500px]"
                                key={itemsIndex}
                              >
                                <div className="">
                                  <Link to={`/menu-details/${menuItem.id}`}>
                                    <div className="">
                                      <img
                                        src={menuItem.image}
                                        alt=""
                                        className=" w-full object-cover h-[217px]"
                                      />

                                      <p className=" text-[32px] text-[#121212] font-[500] px-[24px] mt-[24px]">
                                        {menuItem.title}
                                      </p>
                                    </div>
                                  </Link>
                                </div>

                                <div className="pt-[8px] flex items-center justify-between px-[24px]">
                                  <p className=" text-[36px] text-[#0B7F7C] font-[500] ">
                                    &#x20A6;{menuItem.price}
                                  </p>

                                  <div className="">
                                    {ids?.includes(menuItem.id.toString()) ? (
                                      <div className=" flex items-center justify-between gap-[20px]">
                                        <img
                                          src={Minus}
                                          alt=""
                                          onClick={decrementCount}
                                          className=" cursor-pointer"
                                        />
                                        <p className=" text-[16px] font-[500]">
                                          {counts}
                                        </p>
                                        <img
                                          src={Add}
                                          alt=""
                                          onClick={incrementCount}
                                          className=" cursor-pointer"
                                        />
                                      </div>
                                    ) : (
                                      <div className="">
                                        <Link
                                          to={`/menu-details/${menuItem.id}`}
                                        >
                                          <div className=" flex items-center justify-end">
                                            <img src={Add} alt="" />
                                          </div>
                                        </Link>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
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
            <div className="flex justify-between items-center py-[13px] px-[24px] bg-[#0B7F7C] rounded-[3px] ">
              <div className="flex items-center gap-[16px]">
                <p className=" text-[44px] font-[400] text-white">
                  Total #{price}
                </p>
              </div>
              <Link to="/basket">
                <p className=" text-white  text-[36px] font-[500] py-[14px] px-[38px] rounded-[5px] bg-[#F38D41]">
                  Checkout
                </p>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
