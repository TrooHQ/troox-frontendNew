import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import TopMenuNav from "./TopMenuNav";
import MenuImage from "../assets/menuImg.png";
import Minus from "../assets/Minus.svg";
import Plus from "../assets/Plus.svg";

const MenuDetails = () => {
  const { id } = useParams();
  const [count, setCount] = useState<number>(1);
  const options = [
    {
      label: "Add Chicken Fillet (+#500)",
      value: "chickenFillet",
      price: 500,
    },
    { label: "Add Chicken (+#500)", value: "chicken", price: 500 },
    { label: "Add More Pepper (+#1000)", value: "morePepper", price: 1000 },
  ];

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

  const handleAddToBasket = () => {
    console.log("Selected Item ID:", id);
    if (id) {
      sessionStorage.setItem("id", id);
    }
    console.log("Selected Options:");
    let totalPrice = menuItem ? menuItem.price * count : 0;
    selectedOptions.forEach((option) => {
      const selectedOption = options.find((opt) => opt.value === option);
      if (selectedOption) {
        console.log(selectedOption.label + " - Price: " + selectedOption.price);
        totalPrice += selectedOption.price;
      }
    });
    sessionStorage.setItem("totalPrice", totalPrice.toString());
  };

  const handleCheckboxChange = (value: string) => {
    if (selectedOptions.includes(value)) {
      setSelectedOptions(selectedOptions.filter((option) => option !== value));
    } else {
      setSelectedOptions([...selectedOptions, value]);
    }
  };
  const [menuItem, setMenuItem] = useState<{
    id: number;
    title: string;
    image: string;
    price: number;
  } | null>(null);
  const hasRunRef = useRef(false);

  useEffect(() => {
    const data = [
      {
        category: "Breakfast",
        items: [
          {
            id: 1,
            title: "Egg and Toast",
            image: "menu1.jpg",
            price: 1500,
          },
          {
            id: 2,
            title: "Pancakes",
            image: "menu2.jpg",
            price: 2000,
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
            price: 3000,
          },
          {
            id: 4,
            title: "Chicken Burger",
            image: "menu4.jpg",
            price: 4000,
          },
        ],
      },
      {
        category: "Sandwich",
        items: [
          {
            id: 5,
            title: "Classic Sandwich",
            image: "menu5.jpg",
            price: 1500,
          },
          {
            id: 6,
            title: "Chicken Sandwich",
            image: "menu6.jpg",
            price: 5000,
          },
        ],
      },
      {
        category: "Chicken",
        items: [
          {
            id: 7,
            title: "Classic Chicken",
            image: "menu7.jpg",
            price: 2300,
          },
          {
            id: 8,
            title: "Grilled Chicken",
            image: "menu8.jpg",
            price: 3500,
          },
        ],
      },
    ];
    if (!hasRunRef.current) {
      const foundItem = data
        .flatMap((category) => category.items)
        .find((item) => item.id.toString() === id) as {
        id: number;
        title: string;
        image: string;
        price: string;
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
            <div className=" mx-[24px]">
              <img
                src={MenuImage}
                alt={menuItem.title}
                className=" w-full rounded-[20px] mb-[32px]"
              />
            </div>
            <div className=" pb-[16px] border-b">
              <p className=" text-grey500 font-[500] text-[18px] mb-[17px] mx-[24px]">
                {menuItem.title}
              </p>
              <p className=" text-grey500 text-[16px]  mx-[24px]">
                &#x20A6; {menuItem.price}
              </p>
            </div>

            <div className=" pb-[16px] border-b">
              <p className=" text-[#E16B07]  mx-[24px] font-[500] text-[18px] pb-[16px] pt-[24px]">
                Customize
              </p>
            </div>
            <div>
              {options.map((option) => (
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
                      onChange={() => handleCheckboxChange(option.value)}
                      className={`h-5 w-5 ${
                        selectedOptions.includes(option.value)
                          ? "bg-red-600"
                          : "bg-white"
                      }`}
                    />
                  </div>
                </div>
              ))}
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
            <div className=" mx-[16px] my-[16px]">
              <div
                className=" flex justify-between items-center py-[13px] px-[24px] bg-[#EFB519] rounded-[3px] cursor-pointer"
                onClick={handleAddToBasket}
              >
                <p className="text-[16px] font-[500]">
                  #
                  {menuItem && selectedOptions.length > 0
                    ? (menuItem.price +
                        selectedOptions.reduce(
                          (totalPrice, option) =>
                            totalPrice +
                            (options.find((opt) => opt.value === option)
                              ?.price || 0),
                          0
                        )) *
                      count
                    : menuItem
                    ? menuItem.price * count
                    : 0}
                </p>
                <p className=" text-[16px] font-[500]">Add to basket</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MenuDetails;
