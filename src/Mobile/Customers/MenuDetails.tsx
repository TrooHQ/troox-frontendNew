import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import TopMenuNav from "./TopMenuNav";
import MenuImage from "../assets/menuImg.png";

const MenuDetails = () => {
  const { id } = useParams();
  const options = [
    { label: "Add Chicken Fillet (+#500)", value: "option1" },
    { label: "Add Sausage (+#500)", value: "option2" },
    { label: "Add More Pepper", value: "option3" },
  ];

  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

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
    price: string;
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
            price: "10.99",
          },
          {
            id: 2,
            title: "Pancakes",
            image: "menu2.jpg",
            price: "12.99",
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
            price: "8.99",
          },
          {
            id: 4,
            title: "Chicken Burger",
            image: "menu4.jpg",
            price: "15.99",
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
            price: "8.99",
          },
          {
            id: 6,
            title: "Chicken Sandwich",
            image: "menu6.jpg",
            price: "15.99",
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
            price: "8.99",
          },
          {
            id: 8,
            title: "Grilled Chicken",
            image: "menu8.jpg",
            price: "15.99",
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
    <div>
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

            <div className=" mx-[16px] mt-[16px]">
              <div className=" flex justify-between items-center py-[13px] px-[24px] bg-[#EFB519] rounded-[3px] ">
                <p className=" text-[16px] font-[500]">#1500</p>
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
