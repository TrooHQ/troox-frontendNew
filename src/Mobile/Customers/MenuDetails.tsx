import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import TopMenuNav from "./TopMenuNav";
import Favourite from "../assets/favorite.svg";
import Minus from "../assets/Minus.svg";
import Plus from "../assets/Plus.svg";
import Yam from "../assets/yam and tomato sauce big.png";
import EggYam from "../assets/yam and egg sauce big.png";
import ToastEgg from "../assets/toast and egg big.png";
import Sandwich from "../assets/sandwiich.png";
import Pap from "../assets/pap and akara 1.png";
import FriedRice from "../assets/fried rice big.png";
import PoundoYam from "../assets/poundo yam big.png";
import semo from "../assets/semo big.png";
import VillageRice from "../assets/village jollof rice.png";
import OfadaRice from "../assets/ofada rice big.png";

import fish1 from "../assets/gilled tilapia fish big.png";
import fish2 from "../assets/chicken suya big.png";
import fish3 from "../assets/beef suya big.png";
import fish4 from "../assets/grilled catfish big.png";
import fish5 from "../assets/grilled plantain big.png";

import water from "../assets/water big.png";
import cocktail from "../assets/cocktail big.png";
import orangeJuice from "../assets/orange juice big.png";
import Chapman from "../assets/chapman big.png";
import fruitPunch from "../assets/fruit punch big.png";

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

  // const handleAddToBasket = () => {
  //   const existingIdsString = sessionStorage.getItem("ids");
  //   const existingIds = existingIdsString ? JSON.parse(existingIdsString) : [];

  //   if (id && !existingIds.includes(id)) {
  //     existingIds.push(id);
  //     sessionStorage.setItem("ids", JSON.stringify(existingIds));
  //   }

  //   let totalPrice = menuItem?.price ? parseInt(menuItem.price) * count : 0;

  //   const existingPriceString = sessionStorage.getItem("totalPrice");
  //   const existingPrice = existingPriceString
  //     ? parseFloat(existingPriceString)
  //     : 0;
  //   totalPrice += existingPrice;

  //   selectedOptions.forEach((option) => {
  //     if (typeof option === "string") {
  //       const selectedOption = (
  //         menuItem?.options as unknown as {
  //           value: string;
  //           price: string;
  //           label: string;
  //         }[]
  //       )?.filter((opt) => opt.value === option)[0];

  //       if (selectedOption) {
  //         totalPrice += parseInt(selectedOption.price, 10);
  //       }
  //     }
  //   });

  //   sessionStorage.setItem("totalPrice", totalPrice.toString());
  // };
  // const handleAddToBasket = () => {
  //   const basketUpdated = sessionStorage.getItem("basketUpdated");
  //   if (basketUpdated) {
  //     return;
  //   }

  //   const existingIdsString = sessionStorage.getItem("ids");
  //   const existingIds = existingIdsString ? JSON.parse(existingIdsString) : [];
  //   if (id && !existingIds.includes(id)) {
  //     existingIds.push(id);
  //     sessionStorage.setItem("ids", JSON.stringify(existingIds));
  //   }

  //   let totalPrice = menuItem?.price ? parseInt(menuItem.price) * count : 0;

  //   selectedOptions.forEach((option) => {
  //     if (typeof option === "string") {
  //       const selectedOption = (
  //         menuItem?.options as unknown as {
  //           value: string;
  //           price: string;
  //           label: string;
  //         }[]
  //       )?.filter((opt) => opt.value === option)[0];

  //       if (selectedOption) {
  //         totalPrice += parseInt(selectedOption.price, 10);
  //       }
  //     }
  //   });

  //   sessionStorage.setItem("totalPrice", totalPrice.toString());

  //   sessionStorage.setItem("basketUpdated", "true");
  // };

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

    history("/explore-menu");
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
      <TopMenuNav />
      <div className="">
        {menuItem && (
          <div>
            <div className=" mx-[24px] mt-[32px]">
              <img
                src={menuItem.image}
                alt={menuItem.title}
                className=" w-full rounded-[20px] mb-[32px]"
              />
            </div>
            <div className=" pb-[16px] border-b ">
              <div className=" flex items-center justify-between mx-[24px]">
                <p className=" text-grey500 font-[500] text-[18px] mb-[17px] ">
                  {menuItem.details}
                </p>
                <img src={Favourite} alt="" />
              </div>
              <p className=" text-grey500 text-[16px]  mx-[24px]">
                &#x20A6; {menuItem.price}
              </p>
            </div>

            {menuItem && menuItem.options && (
              <div className=" pb-[16px] border-b">
                <p className=" text-[#E16B07]  mx-[24px] font-[500] text-[18px] pb-[16px] pt-[24px]">
                  Customize
                </p>
              </div>
            )}

            <div>
              {menuItem && menuItem.options && (
                <div>
                  {Array.isArray(menuItem.options) &&
                    menuItem.options.map(
                      (option: {
                        label?: string;
                        value: string;
                        price: string;
                      }) => (
                        <div key={option.value} className=" border-b">
                          <div className="flex items-center justify-between py-[16px] mx-[24px]">
                            <label htmlFor={option.value} className="ml-2">
                              {option.label}
                            </label>
                            <input
                              type="checkbox"
                              id={option.value}
                              value={option.value}
                              checked={selectedOptions.includes(option.value)}
                              onChange={() =>
                                handleCheckboxChange(option.value)
                              }
                              className={`h-5 w-5 ${
                                selectedOptions.includes(option.value)
                                  ? "bg-red-600"
                                  : "bg-white"
                              }`}
                            />
                          </div>
                        </div>
                      )
                    )}
                </div>
              )}
            </div>

            <div className="py-[16px] ">
              <p className=" text-[#E16B07] text-[16px] font-[500]  mx-[24px] mb-[10px]">
                Quantity
              </p>
              <hr className="" />
              <div className=" flex items-center justify-center">
                <div className=" mt-[24px] mb-[37px]  items-center  rounded-[5px] justify-center  inline-flex bg-[#E7E7E7]">
                  <p className=" py-[12px] px-[20px]" onClick={decrement}>
                    <img src={Minus} alt="" />
                  </p>
                  <p className=" bg-white py-[12px] px-[25px] text-[16px] font-[500]">
                    {count}
                  </p>
                  <p className=" py-[12px] px-[20px]" onClick={increment}>
                    <img src={Plus} alt="" />
                  </p>
                </div>
              </div>
            </div>
            <div className=" mx-[16px] my-[16px] ">
              <div
                className="flex justify-between  items-center py-[13px] px-[24px] bg-[#EFB519] rounded-[3px] cursor-pointer"
                onClick={handleAddToBasket}
              >
                <p className="text-[16px] font-[500]">
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

                <p className="text-[16px] font-[500]">Add to basket</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MenuDetails;
