import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
// import Favourite from "../Mobile/assets/favorite.svg";
import Add from "../SelfCheckout/assets/incrementwhite.svg";
import Minus from "../SelfCheckout/assets/decrementwhite.svg";
import Yam from "../Mobile/assets/yam and tomato sauce big.png";
import EggYam from "../Mobile/assets/yam and egg sauce big.png";
import ToastEgg from "../Mobile/assets/toast and egg big.png";
import Sandwich from "../Mobile/assets/sandwiich.png";
import Pap from "../Mobile/assets/pap and akara 1.png";
import FriedRice from "../Mobile/assets/fried rice big.png";
import PoundoYam from "../Mobile/assets/poundo yam big.png";
import semo from "../Mobile/assets/semo big.png";
import VillageRice from "../Mobile/assets/village jollof rice.png";
import OfadaRice from "../Mobile/assets/ofada rice big.png";

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
import Back from "../SelfCheckout/assets/Back.svg";

import { useNavigate } from "react-router-dom";

interface Option {
  label: string;
  value: string;
  price: string;
}

const MenuDetails = () => {
  const history = useNavigate();

  const { id } = useParams();
  const [count, setCount] = useState<number>(1);

  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  const decrement = () => {
    if (count > 1) {
      setCount((prevCount) => {
        const updatedCount = prevCount - 1;
        sessionStorage.setItem("count", updatedCount.toString());
        return updatedCount;
      });
    }
  };

  const increment = () => {
    setCount((prevCount) => {
      const updatedCount = prevCount + 1;
      sessionStorage.setItem("count", updatedCount.toString());
      return updatedCount;
    });
  };

  useEffect(() => {
    const storedCount = sessionStorage.getItem("count");
    if (storedCount) {
      setCount(parseInt(storedCount));
    }
  }, []);

  const menuid = sessionStorage.getItem("menuId");
  const handleAddToBasket = () => {
    const existingIdsString = sessionStorage.getItem("ids");
    const existingIds = existingIdsString ? JSON.parse(existingIdsString) : [];

    if (id && !existingIds.includes(id)) {
      existingIds.push(id);
      sessionStorage.setItem("ids", JSON.stringify(existingIds));
    }

    let totalPrice = menuItem?.price ? parseInt(menuItem.price) * count : 0;

    selectedOptions.forEach((option) => {
      if (typeof option === "string") {
        const selectedOption = (
          menuItem?.options as unknown as {
            value: string;
            price: string;
            label: string;
          }[]
        )?.filter((opt) => opt.value === option)[0];

        if (selectedOption) {
          totalPrice += parseInt(selectedOption.price, 10);
        }
      }
    });

    const selectedOptionPrices = selectedOptions.map((option) => {
      const selectedOption = (
        menuItem?.options as unknown as {
          value: string;
          price: string;
          label: string;
        }[]
      )?.find((opt) => opt.value === option);
      return selectedOption ? parseInt(selectedOption.price) : 0;
    });

    const totalPriceWithSelectedOptions =
      totalPrice + selectedOptionPrices.reduce((acc, curr) => acc + curr, 0);

    sessionStorage.setItem(
      "totalPrice",
      totalPriceWithSelectedOptions.toString()
    );

    history(`/category-details/${menuid}`);
  };

  const handleCheckboxChange = (value: string) => {
    const updatedOptions = selectedOptions.includes(value)
      ? selectedOptions.filter((option) => option !== value)
      : [...selectedOptions, value];
    setSelectedOptions(updatedOptions);

    let totalPrice = menuItem ? parseInt(menuItem.price) * count : 0;

    {
      Array.isArray(menuItem?.options) &&
        menuItem.options.forEach((option: { value: string; price: string }) => {
          if (updatedOptions.includes(option.value)) {
            totalPrice += parseInt(option.price, 10);
          }
        });
    }

    sessionStorage.setItem("totalPrice", totalPrice.toString());
  };

  const [menuItem, setMenuItem] = useState<{
    id: number;
    title: string;
    image: string;
    price: string;
    details: string;
    options?: string;
    label?: string;
    value?: string;
  } | null>(null);
  const hasRunRef = useRef(false);

  useEffect(() => {
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
    if (!hasRunRef.current) {
      const foundItem = data
        .flatMap((category: { items: any[] }) => category.items)
        .find((item: { id: any }) => item.id.toString() === id) as {
        id: number;
        title: string;
        image: string;
        price: string;
        details: string;
      };
      setMenuItem(foundItem);
      hasRunRef.current = true;
    }
  }, [id]);

  return (
    <div className="  ">
      <div className=" px-[8px] flex items-center justify-between mt-[66px] mx-[32px]">
        <img
          src={Back}
          alt=""
          onClick={() => history(-1)}
          className=" cursor-pointer"
        />
      </div>
      <div className="">
        {menuItem && (
          <div>
            <div className=" mx-[24px] mt-[32px]">
              <img
                src={menuItem.image}
                alt={menuItem.title}
                className=" w-full h-[468px] object-cover rounded-[20px] mb-[32px]"
              />
            </div>
            <div className=" pb-[16px] mx-[49px]">
              <div className="">
                <div className=" flex items-start justify-between">
                  <p className=" text-grey500 font-[500] text-[36px] mb-[17px] ">
                    {menuItem.title}
                  </p>
                  <p className=" text-[#0B7F7C] text-[36px] font-[500]  mx-[24px]">
                    &#x20A6; {menuItem.price}
                  </p>
                </div>
                <div className=" flex items-center justify-between">
                  <p className=" text-grey500 font-[400] text-[28px] mb-[17px] ">
                    {menuItem.details}
                  </p>
                  {/* <img src={Favourite} alt="" /> */}
                </div>
              </div>
            </div>

            {menuItem && menuItem.options && (
              <div className=" ">
                <p className=" text-[#121212] mx-[49px] font-[500] text-[24px] pb-[16px] pt-[24px]">
                  Side Options
                </p>
              </div>
            )}

            <div className=" mx-[49px]">
              {menuItem && menuItem.options && (
                <div className=" grid grid-cols-2 gap-[24px]">
                  {Array.isArray(menuItem.options) &&
                    menuItem.options.map(
                      (option: {
                        label?: string;
                        value: string;
                        price: string;
                      }) => (
                        <div key={option.value} className="drop-shadow border ">
                          <div
                            className="flex items-center gap-[24px] py-[31px] px-[24px]"
                            onClick={() => handleCheckboxChange(option.value)}
                            style={{ cursor: "pointer" }}
                          >
                            <div
                              id={option.value}
                              className={`h-[48px] w-[48px] border rounded-full ${
                                selectedOptions.includes(option.value)
                                  ? "bg-blue-600"
                                  : "bg-white"
                              }`}
                            ></div>
                            <label
                              htmlFor={option.value}
                              className="ml-2 text-28px font-[500]"
                            >
                              {option.label}
                            </label>
                          </div>
                        </div>
                      )
                    )}
                </div>
              )}
            </div>

            <div className=" ">
              <p className=" text-[#121212] mx-[49px] font-[500] text-[24px] pb-[16px] pt-[24px]">
                Sauce
              </p>
            </div>

            <div className=" mx-[49px]">
              {menuItem && menuItem.options && (
                <div className=" grid grid-cols-2 gap-[24px]">
                  {Array.isArray(menuItem.options) &&
                    menuItem.options.map(
                      (option: {
                        label?: string;
                        value: string;
                        price: string;
                      }) => (
                        <div key={option.value} className=" border drop-shadow">
                          <div
                            className="flex items-center gap-[24px] py-[31px] px-[24px]"
                            onClick={() => handleCheckboxChange(option.value)}
                            style={{ cursor: "pointer" }}
                          >
                            <div
                              id={option.value}
                              className={`h-[48px] w-[48px] border rounded-full ${
                                selectedOptions.includes(option.value)
                                  ? "bg-blue-600"
                                  : "bg-white"
                              }`}
                            ></div>
                            <label
                              htmlFor={option.value}
                              className="ml-2 text-28px font-[500]"
                            >
                              {option.label}
                            </label>
                          </div>
                        </div>
                      )
                    )}
                </div>
              )}
            </div>

            <div className=" mx-[16px] my-[16px] ">
              <div className="flex justify-between  items-center py-[13px] px-[24px] bg-[#0B7F7C] text-white rounded-[3px]">
                <p className="text-[36px] font-[500]">
                  &#x20A6;{" "}
                  {menuItem &&
                    (parseInt(menuItem.price) +
                      selectedOptions.reduce(
                        (totalPrice, option) =>
                          totalPrice +
                          parseInt(
                            (menuItem.options as unknown as Option[])?.find(
                              (opt: Option) => opt.value === option
                            )?.price || "0"
                          ),
                        0
                      )) *
                      count}
                </p>

                <div className=" flex items-center justify-between gap-[20px]">
                  <img
                    src={Minus}
                    alt=""
                    onClick={decrement}
                    className=" cursor-pointer"
                  />
                  <p className=" text-[36px] font-[500]">{count}</p>
                  <img
                    src={Add}
                    alt=""
                    onClick={increment}
                    className=" cursor-pointer"
                  />
                </div>

                <p
                  className="text-[36px] font-[500] py-[14px] px-[48px] rounded-[5px] bg-[#F38D41] cursor-pointer"
                  onClick={handleAddToBasket}
                >
                  Add
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MenuDetails;
